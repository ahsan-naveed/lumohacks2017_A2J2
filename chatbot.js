
/*code adapted from: https://www.smashingmagazine.com/2017/05/chatbot-microsoft-bot-framework-luis-nodejs-part1/*/

var restify = require('restify');
var builder = require('botbuilder');
var http = require('http');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('listening to %s', server.url);
});

var connector = new builder.ChatConnector({
    appId: '72659b72-ecc9-45e2-b94c-d5ff10611de2',
    appPassword: 'CYWGvhOx7wHpcLnyZjzhzyn'
});
var bot = new builder.UniversalBot(connector);

// connector.listen() to catch messages on the /api/messages route
server.post('/api/messages', connector.listen());

/* 
BOT DIALOG IMPLEMENTATION
*/

// demographics
bot.dialog('/', function (session, args) {
    if (!session.userData.greeting) {
        session.send("Hi! I’d like to ask you some questions about your general health!. What is your name?");
        session.userData.greeting = true;
    } else if (!session.userData.name) {
        getName(session);
    } else if (!session.userData.email) {
        getEmail(session);
    } else if (!session.userData.gender) {
        getGender(session);
    } else if(!session.userData.age){
    	getAge(session);
    } else {
        session.userData = null;
    }
    session.endDialog();
});

function getName(session) {
	name = session.message.text;
	session.userData.name = name;
	session.send("Hello, " + name + ". What is your Email ID?");
} 

function getEmail(session) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    email = session.message.text;
    if (re.test(email)) {
        session.userData.email = email;
        session.send("Thank you, " + session.userData.name );
    } 
    session.send("What is your gender? Type M for male or F for female.")
}

function getGender(session) {
	gender = session.message.text;
	session.userData.gender = gender;
	session.send("What is your age?")
}

function getAge(session) {
	age = session.message.text;
	session.userData.age = age;
	session.send("Thanks");
}