
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

let userMeds = []; // will store user selected meds from medsCategories
let usersDepCause; // stores user depression cause
let usersDoctorInfo = {}; // stores user's doctor information
let usersPharmacyInfo = {}; // sotres user's pharmacy information

// categories of medications - can be expanded
var medCategories = {
    "SSRIs": {
        meds: [
        	   'escitalopram', 
        	   'citalopram', 
        	   'fluoxetine', 
        	   'fluvoxamine', 
        	   'paroxetine', 
        	   'sertraline'
        	  ] 
    },
    "TCAs": {
        meds: [
        	   'nortriptyline',
        	   'amitriptyline',
        	   'doxepin'
        	  ]
    },
    "SNRIs": {
        meds: [
        	   'venlafaxine',
        	   'desvenlafaxine',
        	   'duloxetine'
        	  ]
    },
    "serotoninModulators": {
    	meds: [
    			'trazodone'
    		  ]
    }
}; 

// causes of depression
let depCauses = ['Sleep?',
				'Drugs?',
				'Smoking?',
				'Anxiety?',
				'Apetite?'
	]

/* 
** BOT DIALOG IMPLEMENTATION - WATERFALL
*/

// demographics
bot.dialog('/', function (session, args) {
    if (!session.userData.greeting) {
        session.send("Hi! I’d like to ask you some questions about your general health!. Let's start with your name?");
        session.userData.greeting = true;
    } else if (!session.userData.name) {
        getName(session);
    } else if (!session.userData.email) {
        getEmail(session);
    } else if (!session.userData.gender) {
        getGender(session);
    } else if(!session.userData.age){
    	getAge(session);
    } else if (!session.userData.medications){
    	getMedications(session);
	} else if (!session.userData.therapyDate) {
		getTherapyDate(session);
	} else if(!session.userData.depressionCause){
		getDepCause(session);
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
    session.send("What is your gender? Type M for male, F for female, T for trans or other.")
}

function getGender(session) {
	gender = session.message.text;
	session.userData.gender = gender;
	if (gender.toUpperCase() === "M") {
		session.send("How old are you, Sir?")
	} else {
		session.send("How old are you, Mam?")
	}
}

function getAge(session) {
	age = session.message.text;
	session.userData.age = age;
	builder.Prompts.choice(session, "Please select the medication category you are starting on - type in the respective number: ", medCategories);
}

function getMedications(session) {
	medications = session.message.text;
	session.userData.medications = medications;
	console.log(medications);
	switch(medications){
		case '1':
			session.send("You selected SSRIs which inlcude " + medCategories.SSRIs.meds.toString());
			userMeds.push(medCategories.SSRIs.meds);
			break;
		case '2':
			session.send("You selected TCAs which inlcude " + medCategories.TACs.meds.toString());
			userMeds.push(medCategories.TCAs.meds);
			break;
		case '3':
			session.send("You selected SNRIs which inlcude " + medCategories.SNRIs.meds.toString());
			userMeds.push(medCategories.SNRIs.meds);
			break;
		case '4':
			session.send("You selected Serotonin Modulators which inlcude " + medCategories.serotoninModulators.meds.toString());
			userMeds.push(medCategories.serotoninModulators.meds);
			break;
		default:
			// user selected other
			session.send("You didn't select any category."); 
			break;
	}
	console.log(userMeds);
	session.send("When do you start your therapy?");
}

function getTherapyDate(session) {
	therapyDate = session.message.text;
	session.userData.therapyDate = therapyDate;
	builder.Prompts.choice(session, "Do you worry about any of the following - type in the respective number: ", depCauses);
}
 
function getDepCause(session) {
	depressionCause = session.message.text;
	session.userData.depressionCause = depressionCause;
	switch(depressionCause){
		case '1':
			session.send("You selected 'Sleep' as your depression cause.");
			usersDepCause = 'sleep';
			break;
		case '2':
			session.send("You selected 'Drugs' as your depression cause.");
			usersDepCause = 'drugs';
			break;
		case '3':
			session.send("You selected 'Smoking' as your depression cause.");
			usersDepCause = 'smoking';
			break;
		case '4':
			session.send("You selected 'Apetite' as your depression cause.");
			usersDepCause = 'apetite';
			break;
		default:
			// no option selected 
			session.send("I'm glad you don't have any depression cause.");
			break;
	}
	session.send("Thanks for providing all the information. Now I would like to collect some information about your doctor - please provide their name, address and phone number: ");
}
