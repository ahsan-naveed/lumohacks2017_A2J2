
/*setup instructions are adapted from: https://www.smashingmagazine.com/2017/05/chatbot-microsoft-bot-framework-luis-nodejs-part1/*/

var restify = require('restify');
var builder = require('botbuilder');
var http = require('http');
var ThumbnailCardName = 'Thumbnail card';

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

let userMeds; // will store user selected meds from medsCategories
let usersDepCause; // stores user depression cause
let responseForOther;
let explainMore;

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
        	  ],
       	sideEffects: ['nausea', 
       				  'dry mouth', 
       				  'trouble falling asleep', 
       				  'tiredness', 
       				  'sweating',
       				  'problems with sex', 
       				  'unusual bleeding in stools'
       				 ] 
    },
    "TCAs": {
        meds: [
        	   'nortriptyline',
        	   'amitriptyline',
        	   'doxepin'
        	  ],
        sideEffects: ['dry mouth', 
        			  'blurry vision', 
        			  'constipation', 
        			  'hard to pee', 
        			  'confusion', 
        			  'sedation',
        			  'problems with sex'
        			 ]
    },
    "SNRIs": {
        meds: [
        	   'venlafaxine',
        	   'desvenlafaxine',
        	   'duloxetine'
        	  ],
        sideEffects: ['nausea', 
        			  'dry mouth', 
        			  'constipation', 
        			  'headache', 
        			  'dizziness', 
        			  'increased heart rate',
        			  'insomnia',
        			  'problems with sex'
        			 ]
    },
    "serotoninModulators": {
    	meds: [
    			'trazodone'
    		  ],
    	sideEffects: ['drowsiness',
    				  'nausea', 
    				  'headache', 
    				  'dry mouth'
    				  ]
    }
}; 

// causes of depression
let depCauses = ['Sleep?',
				'Drugs?',
				'Smoking?',
				'Anxiety?',
				'Apetite?'
	];

let commonReasonsToMissMedication = [
									 'Too expensive',
									 'Forgot',
									 'Hard to swallow pill',
									 'Side effects',
									 'other'
									];

/* 
** BOT DIALOG IMPLEMENTATION - WATERFALL
*/

// demographics
bot.dialog('/', function (session, args) {
    if (!session.userData.greeting) {
        session.send("Hi! I’d like to ask you some questions about your general health. Let's start with your name?");
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
	} else if(!session.userData.doctorName){
		getDoctorName(session);
	} else if(!session.userData.doctorPhone){
		getDoctorPhone(session);
	} else if(!session.userData.doctorAddress){
		getDoctorAddress(session);
	} else if(!session.userData.pharmaName){
		getPharmaName(session);
	} else if(!session.userData.pharmaPhone){
		getPharmaPhone(session);
	} else if(!session.userData.pharmaAddress){
		getPharmaAddress(session);
	} else if (!session.userData.concernFlag) {
		getConcernFlag(session);
	} else if (!session.userData.userMood) {
		getUserMood(session);
	} else if (!session.userData.missedDoses && session.message.text === 'forward') {
		getMissedDoses(session);
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
        session.send("What is your gender? Type M for male, F for female, T for trans or other.")
    } else {
    	session.send("Please type a valid email address. For example: test@domain.com");
    }
}

function getGender(session) {
	gender = session.message.text;
	session.userData.gender = gender;
	if (gender.toUpperCase() === "M") {
		session.send("How old are you, Sir?");
	} else if (gender.toUpperCase() === "F"){
		session.send("How old are you, Mam?");
	} else {
		session.send("How old are you?");
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
	switch(medications){
		case '1':
			userMeds = 'SSRIs';
			session.send("You selected SSRIs which inlcude " + medCategories.SSRIs.meds.toString());
			break;
		case '2':
			userMeds = 'TCAs';
			session.send("You selected TCAs which inlcude " + medCategories.TCAs.meds.toString());
			break;
		case '3':
			userMeds = 'SNRIs';
			session.send("You selected SNRIs which inlcude " + medCategories.SNRIs.meds.toString());
			break;
		case '4':
			userMeds = 'serotoninModulators';
			session.send("You selected Serotonin Modulators which inlcude " + medCategories.serotoninModulators.meds.toString());
			break;
		default:
			// user selected other
			session.send("You didn't select any category."); 
			break;
	}
	session.send("When do you start your therapy?");
}

function getTherapyDate(session) {
	therapyDate = session.message.text;
	session.userData.therapyDate = therapyDate;
	builder.Prompts.choice(session, "Do you worry about any of the following? Type in the respective number: ", depCauses);
}
 
function getDepCause(session) {
	depressionCause = session.message.text;
	session.userData.depressionCause = depressionCause;
	switch(depressionCause){
		case '1':
			session.send("You selected 'Sleep'.");
			usersDepCause = 'sleep';
			break;
		case '2':
			session.send("You selected 'Drugs'.");
			usersDepCause = 'drugs';
			break;
		case '3':
			session.send("You selected 'Smoking'.");
			usersDepCause = 'smoking';
			break;
		case '4':
			session.send("You selected 'Anxiety'.");
			usersDepCause = 'anxiety';
			break;
		case '5':
			session.send("You selected 'Appetite'.");
			usersDepCause = 'appetite';
			break;
		default:
			// no option selected
			break;

	}
	session.send("Thanks for providing the information. Your doctor might be interested in talking about other things that can make depression worse. Now I would like to collect some information about your doctor - please provide your doctor's name: ");
}


// obtain doctor's information
function getDoctorName(session) { 
	doctorName = session.message.text;
	session.userData.doctorName = doctorName;
	session.send('Doctor\'s phone number?');
}

function getDoctorPhone(session) { 
	doctorPhone = session.message.text;
	session.userData.doctorPhone = doctorPhone;
	session.send("Doctor's Address?");
}

function getDoctorAddress(session) { 
	doctorAddress = session.message.text;
	session.userData.doctorAddress = doctorAddress;
	session.send("Which pharmacy do you normally use? Please provide their name: ");
}

// obtain pharmacy's information
function getPharmaName(session) {
	pharmaName = session.message.text;
	session.userData.pharmaName = pharmaName;
	// implement phone number validation
	session.send('Pharmacy\'s phone number?');
}

function getPharmaPhone(session) {
	pharmaPhone = session.message.text;
	session.userData.pharmaPhone = pharmaPhone;
	session.send("Pharamcy's address please?");
}

function getPharmaAddress(session) {
	pharmaAddress = session.message.text;
	session.userData.pharmaAddress = pharmaAddress;
	session.send("Hey! Let’s do a quick check for side effects: ");
	builder.Prompts.choice(session,"Based on your medication class selection you might have following side-effects: ", medCategories[userMeds].sideEffects);
	session.send("Please provide a list of side-effects you are currently experiencing: (e.g. nausea, vomiting) ");
}

function getConcernFlag(session) {
	concernFlag = session.message.text;
	session.userData.concernFlag = concernFlag;
	if (concernFlag.toString().trim().split(',').join('').length >= 5) {
		session.send('Please consider calling your doctor: \n - Name: ' + session.userData.doctorName + '\n - Phone: ' + session.userData.doctorPhone + '\n - Address: ' + session.userData.doctorAddress); 
	} else {
		session.send("Sometimes smaller side effects will fade away after a few days of taking medication. Feel free to contact your doctor or pharmacy if they don't go away.");
	}
	session.send('How would you rate your mood now compared to 5 days ago? \n - :-) \n - :\'| \n - :(');
}

function getUserMood(session) {
	userMood = session.message.text;
	session.userData.userMood = userMood;
	if(userMood === ':\'|' || userMood === ':(') {
		session.send('Thanks, I\'ll let your doctor know - depending on your answers you might need to book a follow-up appointment with your doctor.');
	} else {
		session.send('I am glad you are doing great - we may contact you in a few weeks to see how things are going.');
	}
	session.send('Adios!');
}


// conversation after 2 weeks
function getMissedDoses(session) {
	session.send("Hey! how have you been? - I have couple of questions regarding your medications!");
	builder.Prompts.choice(session, 'Do any of the following explain why you\'ve been missing your medications?', commonReasonsToMissMedication);
	missedDoses = session.message.text;
	session.userData.missedDoses = missedDoses;
	session.send("Here are some suggestions that might help manage these issues: ");

	var card1 = createThumbnailCard1(session);
	var card2 = createThumbnailCard2(session);
	var card3 = createThumbnailCard3(session);

	var msg1 = new builder.Message(session).addAttachment(card1);
	session.send(msg1);

	var msg2 = new builder.Message(session).addAttachment(card2);
	session.send(msg2);

	var msg3 = new builder.Message(session).addAttachment(card3);
	session.send(msg3);
}

function createThumbnailCard1(session) {
    return new builder.ThumbnailCard(session)
        .title('Suggestive Remedies')
        .subtitle('Dedicated solution - for excellent service')
        .text('Solution 1. Did you know that some companies offer payment assistance - for further details contact your doctor.\nSolution 2. Try talking to your pharmacists they might have some tips as well - call here' + session.userData.pharmaPhone.toString() + '\n Solution 3. Pharmacists are able to swap your large for smaller ones or might even break it for you. \n For problems 4 & 5 I would suggest to contact your doctor.')
        .images([
            builder.CardImage.create(session, 'http://www.clker.com/cliparts/H/e/F/a/2/K/blue-robot-md.png')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'http://www.nhs.uk/Conditions/stress-anxiety-depression/Pages/dealing-with-depression.aspx', 'Learn More')
        ]);
}

function createThumbnailCard2(session) {
    return new builder.ThumbnailCard(session)
        .title('Some Extra Help')
        .subtitle('Check out some of these resources!')
        .text('Come back again if you feel like chatting with a bot friend :)')
        .images([
            builder.CardImage.create(session, 'http://www.clker.com/cliparts/H/e/F/a/2/K/blue-robot-md.png')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'http://www.nhs.uk/Conditions/stress-anxiety-depression/Pages/dealing-with-depression.aspx', 'Access Help')
        ]);
}

function createThumbnailCard3(session) {
    return new builder.ThumbnailCard(session)
        .title('Don\'t let depression limit your success!')
        .subtitle('UBC\'s new president talks depression, assaults on campus and why he refuses pay raises.')
        .text('Santa Ono is University of B.C.’s new president. He was born in Vancouver, grew up in Baltimore, Md., and was most recently president at the...')
        .images([
            builder.CardImage.create(session, 'https://media.bizj.us/view/img/6808192/hs-ono-santa*750xx1200-1600-0-0.jpg')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'http://www.nhs.uk/Conditions/stress-anxiety-depression/Pages/dealing-with-depression.aspx', 'Read More')
        ]);
}
