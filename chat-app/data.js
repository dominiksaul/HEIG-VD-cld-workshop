import { Sequelize, Op } from 'sequelize';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
});

const UserModel = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING
    },
    displayName: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

const ConversationModel = sequelize.define('conversation', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user1: {
        type: Sequelize.INTEGER
    },
    user2: {
        type: Sequelize.INTEGER
    }
});

const MessageModel = sequelize.define('message', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sender: {
        type: Sequelize.INTEGER
    },
    content: {
        type: Sequelize.STRING
    },
    conversation: {
        type: Sequelize.INTEGER
    }
});

await sequelize.sync({ force: true });

export class User extends UserModel {
    async getConversations() {
        let convs = await Conversation.findAll({ where: { [Op.or]: [{ user1: this.id }, { user2: this.id }] } });
        return convs;
    }

    async clearAllConversations() {
        let conversations = this.getConversations();
        return Promise.all(conversations.map((conversation) => Message.drop({ where: { conversation: conversation.id } })));
    }

    changeDisplayName(displayName) {
        this.setDataValue('displayName', displayName);
        super.save();
    }
}

export class Message extends MessageModel {
    wasSentBy(user) {
        return this.sender === user.id;
    }
}

export class Conversation extends ConversationModel {
    async getMessages() {
        return Message.findAll({ where: { conversation: this.id } });
    }

    async getLastMessage() {
        let lastMessage = await Message.findOne({ where: { conversation: this.id }, order: [['id', 'DESC']] })
            .catch(() => undefined);

        return lastMessage;
    }

    async getOtherUser(user) {
        let otherId = this.user1 === user.id ? this.user2 : this.user1;
        let other = await User.findOne({ where: { id: otherId } });
        return other
    }

    hasUser(user) {
        return this.user1 === user.id || this.user2 === user.id;
    }

    async addMessage(sender, content) {
        await Message.create({ sender: sender, content: content, conversation: this.id });
    }
}

export async function getUserByName(username) {
    return await User.findOne({ where: { username: username } })
}

export async function getConversationById(id) {
    return await Conversation.findOne({ where: { id: id } })
}

// Create dummy users
await User.create({ username: 'elon.musk', displayName: 'Elon Musk', password: await bcrypt.hash('imdabo$$', saltRounds)});
await User.create({ username: 'donald.trump', displayName: 'Donald Trump', password: await bcrypt.hash('1234', saltRounds) });
await User.create({ username: 'jane.doe', displayName: 'Jane Doe', password: await bcrypt.hash('p@ssw0rd', saltRounds) });

// Create conversations for every user pair
await User.findAll().then(async (users) => {
    for (let i = 0; i < users.length; i++) {
        for (let j = i + 1; j < users.length; j++) {
            let user1 = users[i];
            let user2 = users[j];
            let conversation = Conversation.build({ user1: user1.id, user2: user2.id });
            await conversation.save()
            conversation.addMessage(user1.id, 'Hello there!');
            conversation.save();
        }
    }
});
