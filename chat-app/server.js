import bcrypt from 'bcrypt';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import escape from 'escape-html';
import { EventEmitter } from 'events';
import acl from 'express-acl';
import { getUserByName, getConversationById, Message, Conversation, User } from './data.js';
import { conversationNotFoundError, emptyMessageError, userNotInConversationError } from './errors.js';

// Configure passport
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await getUserByName(username);
        if (user && await bcrypt.compare(password, user.password)) {
            return done(null, { username: username });
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(async function (username, done) {
    try {
        const user = await getUserByName(username);
        user.role = 'user';
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

const app = express();

let emitter = new EventEmitter()

// Configure express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(session({
    secret: 'secret_string_asdfghjkl',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Log all requests to console
app.use('/', (req, res, next) => {
    console.log("Request for " + req.originalUrl, req.user?.role, req.user ? `by ${req.user.username}` : "by unknown user");
    next()
})

// Configure ACL
acl.config({
    baseUrl: '',
    filename: 'acl.json',
    defaultRole: 'guest',
    roleSearchPath: 'user.role',
    denyCallback: (res) => {
        res.status(403).json({ error: 'Access Denied', message: 'You are not allowed to access this resource' });
    }
});
app.use(acl.authorize);

// Log all requests to console
app.use('/', (req, res, next) => {
    console.log("Request for " + req.originalUrl);
    next()
})

// Handle browser trying to fetch favicon
app.get('/favicon.ico', (req, res) => res.status(204));

// Serve login page
app.get('/login', (req, res) => {
    let username = (req.cookies.username) ? escape(req.cookies.username) : undefined;
    let errorMessage = (req.query.error) ? escape(req.query.error) : undefined;
    res.render('login', { username, errorMessage });
})

// Extract username and password from login request
app.post('/login', (req, res, next) => {
    console.log("POST login middleware")
    req.username = (req.body.username) ? escape(req.body.username) : undefined;
    if (req.username) {
        res.cookie('username', req.username, { maxAge: 900000, sameSite: 'Strict' });
    } 
    next()
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?error=' + encodeURIComponent("Error during login")
}));

// Redirect to login if not authenticated
app.use('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login?error=' + encodeURIComponent("You need to login first"));
});

// Handle logout
app.all('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
})

// SSE notifications of new messages
app.get("/notifications", (req, res) => {
    let user = req.user;
    console.log(`Received notifications request from ${user.username}`);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");

    const onMessage = (message) => {
        console.log(`event emission received, sending notification to ${user.username}`);
        res.write(`data: ${JSON.stringify(message)}\n\n`);
    };

    emitter.addListener("message::" + user.id, onMessage);

    console.log(`Listeners for ${user.username}: ${emitter.listenerCount("message::" + user.id)}`);

    req.on("close", () => {
        console.log(`Notification connection closed for ${user.username}`);
        emitter.removeListener("message::" + user.id, onMessage);
    });
});

function convertConvsForRender(user) {
    return user.getConversations()
        .then((conversations) => Promise.all(conversations.map(async (conversation) => {
            let other = await conversation.getOtherUser(user);
            let lastMessage = await conversation.getLastMessage();
            return {
                uid: conversation.id,
                otherUser: other,
                lastMessage: lastMessage,
            }
        })));
}

// Serve index page
app.get('/', async (req, res) => {
    let user = req.user;
    let conversations = await convertConvsForRender(user)

    res.render('index', { currentUser: user, conversations, mainConvUid: undefined, mainConvMessages: [] });
});

// Conversation authorization middleware
app.use('/conversation/:conversationId', async (req, res, next) => {
    let user = req.user;
    getConversationById((req.params.conversationId) ? escape(req.params.conversationId) : undefined).then(
        (conversation) => {
            if (!conversation.hasUser(user)) {
                console.log(`Trying to get another user's conversation. Requester is ${user.username} (${user.id}))`)
                res.status(403).json(userNotInConversationError(user, conversation))
                return
            }

            req.conversation = conversation;
            next();
        },
        () => {
            res.status(404).send(conversationNotFoundError());
        }
    )
});

// Getting a full conversation
app.get("/conversation/:conversationId", async (req, res) => {
    let user = req.user
    let mainConvMessages = await req.conversation.getMessages()
    let mainConvUid = req.conversation.id
    let conversations = await convertConvsForRender(user)

    res.render('index', { currentUser: user, conversations, mainConvUid, mainConvMessages })
})

// Posting a message
app.post("/conversation/:conversationId", async (req, res) => {
    let user = req.user
    let mainConversation = req.conversation
    let message = (req.body.message) ? escape(req.body.message) : undefined;

    const other = await mainConversation.getOtherUser(user)

    if (message.length == 0) {
        res.status(403).json(emptyMessageError(user, other))

        return
    }

    // Wait for a second, to avoid spamming if they manage to create a loop.
    await new Promise(resolve => setTimeout(resolve, 500));

    await mainConversation.addMessage(user.id, message);

    emitter.emit("message::" + user.id, [{ conversationId: mainConversation.id, fromMe: true, message }]);
    emitter.emit("message::" + other.id, [{ conversationId: mainConversation.id, fromMe: false, message }]);

    res.status(200).send("Message sent")
})

// Allow clearing all conversations
app.get("/clear", async (req, res) => {
    let user = req.user

    await user.clearAllConversations();

    for (let conv of await user.getConversations()) {
        let other = await conv.getOtherUser(user);
        emitter.emit("message::" + other.id, {});
    }

    res.redirect("/")
})

// Allow changing display name
app.post("/displayname", (req, res) => {
    let user = req.user
    let displayName = (req.body.displayName) ? escape(req.body.displayName) : undefined;
    console.log(`Asked to change display name to ${displayName}`)
    user.changeDisplayName(displayName);
    emitter.emit("message::" + user.id, {});

    res.redirect("/")
})

export default app;
