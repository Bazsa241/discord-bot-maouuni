'use strict';
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()

client.on('ready', () => {
  console.log('Hey! I am ready!');
});

const foodMsg = [
  "There is no food! Go and cook for yourself!",
  "PIZZA COMING SOON"
]

const usrMsgPercent = 5
const robotEmojiPercent = 10
const botReactions = ['🤖', '👾', '🦾', '🕵️', '👀', '🦠']
let pingCounter = {}
let fruitsCounter = 0

client.on('message', message => {
  const author = message.author.username
  const msg = message.content.toLowerCase()
  const rnd = Math.floor(Math.random() * 101)

  if(author === "Maouuni") return

  if(fruitsCounter > 0) {
    Promise.all([
      message.react('🍎'),
      message.react('🍑'),
      message.react('🍆'),
      message.react('🍇'),
      message.react('🍍'),
      message.react('🥑')
    ])
    fruitsCounter--
  }

  if(msg === "!fruits") {
    fruitsCounter = 3
    Promise.all([
      message.react('🍎'),
      message.react('🍑'),
      message.react('🍆'),
      message.react('🍇'),
      message.react('🍍'),
      message.react('🥑')
    ])
  }

  if (robotEmojiPercent >= rnd) {
    const randomReact = Math.floor(Math.random() * botReactions.length)
    message.react(botReactions[randomReact])
  }

  if (msg.includes("love")) {
    message.react('🇱').then(() =>
      message.react('🇴')).then(() =>
      message.react('🇻')).then(() =>
      message.react('🇪')).then(() =>
      message.react('🤖'))
  }

  if (msg === "ping") {

    if(pingCounter[author] === undefined) {
      pingCounter[author] = 0
    }

    if(pingCounter[author] >= 2) {
      message.reply("are you retard?");
      pingCounter[author] = 0
    } else {  
      message.channel.send("pong");
      pingCounter[author]++
    }
    message.react('🤖')
    // console.log(message.author);
  }

  if (msg === "hey") {
      message.channel.send("Hey " + message.author.username +  "! How are you?")
  } else if (msg.includes("maouuni")) {
    message.channel.send("Yes?")
  }

  if (message.content === 'what is my avatar') {
    message.reply(message.author.displayAvatarURL());
  }

  if ((msg.includes("need") || msg.includes("have")) && msg.includes("food")) {
    const rndNum = Math.floor(Math.random() * foodMsg.length)
    message.reply(foodMsg[rndNum]);
  }

  if (msg.includes("stupid")) {
    message.reply("Stupid is as stupid does");
  }

  if(message.author.username === "Miklos Szabo") {
    if(usrMsgPercent >= rnd) {
      message.reply("why are you purple?")
    }
  }

  if(message.author.username === "FE3 Kocsi Andras") {
    if(usrMsgPercent >= rnd) {
      message.reply("you are my Godfather!")
    }
  }

  if(message.author.username === "apolloniiaa") {
    if(usrMsgPercent >= rnd) {
      message.reply("do you know something about clip-path?!")
    }
  }

  // if(message.author.username === "DarabosG") {
  //   if(usrMsgPercent >= rnd) {
  //     message.reply("hey G, DarabosG")
  //   }
  // }

});


client.login(process.env.TOKEN);
