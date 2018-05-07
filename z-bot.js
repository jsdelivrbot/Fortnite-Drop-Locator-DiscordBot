"use strict";

process.title = 'Ziggurat Bot - Fortnite Drop Locator';
const version = '1.1 | 05/05/18 5:00 PM EST';
const version_notes = "Added #grid and #challenge functions! Created by BitBruce ♡";
const commands = "Commands: \n- #drop\n- #grid\n- #challenge\n- help";

require('dotenv').config(); // Pulls env variables from hidden `.env` file

const Discord = require('discord.js');
const discordClient = new Discord.Client();

const prefix = '#'; // User input symbo
const msg_prefix = 'Ziggurat Bot: '; // outgoing message prefix
const msg_intro = '\n\n======= Ziggurat Bot Starting =======\n\n';
const msg_disconnect = '\n\n======= Ziggurat Bot Disconnecting =======\n\n';
const msg_error = '\nE R R O R : ';

const debug = false;

var bot;

/* Discord Client Functions */

// On ready
discordClient.on('ready', () => {
  console.log(msg_intro + msg_prefix + 'I am ready!');
  bot = discordClient.user;
});

// On disconnect
discordClient.on('disconnect', event => {
  var msg = msg_prefix;

  if (event.reason === 'Authentication failed.') {
    msg += event.reason + ' Supply api token in `.env`.';
  } else {
    if (debug) {
    msg += 'Client disconnected. Reason: ' + event.reason + '\n' +  event;
    } else {
      msg += 'Client disconnected. Reason: ' + event.reason;
    }
  }

  console.log(msg + msg_disconnect);
});

// On error
discordClient.on('error', error => {
  console.log(msg_prefix + msg_error + error.reason);
  process.exit(1);
});

// On message
discordClient.on('message', function(message) {
  if (message.author.bot) {
    // Prevent the bot from talking to itself!
  } else if (message.content.startsWith(prefix)) {
    console.log('Trimmed message: ' + trimMsg(message.content));
    processMessage(message);
  } else if (message.content == 'prefix' || message.content == 'help') {
    message.reply('The message prefix for the bot is: ' + prefix);
  } else {

  }
});

// On message deleted - Example
// discordClient.on('messageDelete', (message) => {
//     blastDeletedMessage(message);
// });

/* Helper functions */

var blastDeletedMessage = function(message) {
  // var channel = discordClient.channels.find('id', ''); // insert id of channel, or programmatically find channels
  var channel = message.channel;
  console.log("Blasting deleted message to channel: {}", channel.id);

  var name = message.member.nickname || message.author.username;
  channel.send("Message deleted by " + name +"\n" + "Message: " + message.content)
  .then(message => console.log(`Deleted message: ${message.content}`))
  .catch(console.error);
};

var selectRandomLocation = function() {
  var rand = genRand(namedLocations.length);
  var location = namedLocations[rand];
  return location;
}

var selectRandomCoordinate = function() {
  var rand = genRand(coordLocations.length);
  var coord = coordLocations[rand];
  return coord;
}

var selectRandomChallenge = function() {
  var rand = genRand(defaultChallenges.length);
  var challenge = defaultChallenges[rand];
  return challenge.name + ": " + challenge.desc;
  // return challenge;
}

/* Utility functions */

var trimMsg = function(msg) {
  return (msg.substring(prefix.length)).trim(); // Trim the post-prefix message
};

var processMessage = function(message) {
  var msg = trimMsg(message.content);
  if (msg == 'ping') {
    message.reply('pong!');
  } else if (msg == 'help' || msg == 'commands') {
    message.reply(commands);
  } else if (msg == 'version') {
    message.channel.send('Version: ' + version + '. Version notes: ' + version_notes);
  } else if (msg == 'drop') {
    message.channel.send('Drop on ' + selectRandomLocation() + '!');
  } else if (msg == 'grid') {
    message.channel.send('Drop on ' + selectRandomCoordinate() + '.');
  } else if (msg == 'challenge') {
    message.channel.send('Challenge - ' + selectRandomChallenge());
  } else {
    // Do something with message. Maybe pass it to Dialogflow.
  }
};

var genRand = function(max) {
  return Math.floor(Math.random() * max);
}

/* Data */
var namedLocations = [
    'Anarchy Acres',
    'Dusty Divot',
    'Fatal Fields',
    'Flush Factory',
    'Greasy Grove',
    'Haunted Hills',
    'Junk Junction',
    'Lonely Lodge',
    'Loot Lake',
    'Lucky Landing',
    'Moisty Mire',
    'Pleasant Park',
    'Retail Row',
    'Risky Reels',
    'Salty Springs',
    'Shifty Shafts',
    'Snobby Shores',
    'Tilted Towers',
    'Tomato Town',
    'Wailing Woods',
    'Prison (South of Retail Row)',
    'Racetrack (East of Retail Row)',
    'Crate Yard (North of Retail Row)',
    'Soccer Stadium (West of Tilted Towers)'
];

var coordLocations = [
          'B1', 'C1', 'D1',
          'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2',
          'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3', 'J3',
    'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4', 'J4',
    'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5', 'J5',
    'A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'I6', 'J6',
          'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7', 'I7', 'J7',
                'C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'I8', 'J8',
                      'D9', 'E9', 'F9', 'G9', 'H9', 'I9',
                      'D10', 'E10', 'F10', 'G10'
];

var defaultChallenges = [
    {
        name : 'Pistols only',
        desc : 'The only weapons that may be used are Pistols, Revolvers, and Hand Cannons.'
    },
    {
        name : 'SMGs only',
        desc : 'The only weapons that may be used are SMGs.'
    },
    {
        name : 'Shotguns only',
        desc : 'The only weapons that may be used are Shotguns.'
    },
    {
        name : 'Rifles only',
        desc : 'The only weapons that may be used are Rifles.'
    },
    {
        name : 'Shotty Snipers',
        desc : 'Throwback to the classic Halo gametype, you may only use Shotguns and Sniper Rifles.',
    },
    {
        name : 'Explosives only',
        desc : 'You may only use explosive weapons (Grenades, Grenade Launcher, Rocket Launcher, etc.)'
    },
    {
        name : 'Common Weapons',
        desc : 'Only use common tier (white) weapons.'
    },
    {
        name : 'Agent 47',
        desc : 'You may only use suppressed weapons. Traps and other non-weapon items are okay.'
    },
    {
        name : 'Secret Service',
        desc : 'Squads only. One player is selected as the President, he cannot use weapons. The rest of the squad are Secret Service agents and must protect the President at all costs. If the President is killed, you lose.'
    },
    {
        name : 'No Building',
        desc : 'Building is off limits. Traps on existing structures is allowed.'
    },
    {
        name : 'No Medical Supplies',
        desc : 'Anything that restores health is prohibited. Shields are allowed.'
    },
    {
        name : 'No Shields',
        desc : 'Consumables that give shields may not be used.'
    },
    {
        name : 'Gun Swap',
        desc : 'One weapon allowed at a time, must swap for a new weapon after each kill.'
    },
    {
        name : 'No Reloading',
        desc : 'Weapons may not be reloaded. Swap empty or low ammo weapons for fresh ones.'
    },
    {
        name : 'Scavenger',
        desc : 'You may only loot the first building you enter and people you kill. After the first building no chests, airdrops or resource collecting.'
    },
    {
        name : 'No Chests',
        desc : 'You cannot open any chests. Ground loot, dead players, and chests opened by other players are fair game.'
    },
    {
        name : 'Pacifist',
        desc : 'Win without directly harming any other players.'
    },
];

// var otherLocations = [
//     { name: 'Broken Town' },
//     { name: 'Motel' },
//     { name: 'Soccer/Football Pitch' },
//     { name: 'Crate Yard' },
//     { name: 'Racetrack' },
//     { name: 'Trailer Park' },
//     { name: 'Prison' },
//     { name: 'Factory by Retail Row' },
//     { name: 'Factory by Flush Factory' },
//     { name: 'Giant Chair' }
// ];

/* Main */
var initialize = function() {
  console.log('Connecting...');
  discordClient.login(process.env.DISCORD_TOKEN); //Located in hidden .env file
};

(function() {
  initialize();
})();
