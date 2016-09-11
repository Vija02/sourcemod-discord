const Discord = require('discord.js');
const bot = new Discord.Client();
const connection = new WebSocket("ws://103.57.72.87:8081");

// Get token from discord panel
const token = 'MjI0NTM2NDgyNzI2MDE5MDcz.Crb_jg.HUN4dum9fGVS1hajrBQwrQOQgiU';

// TODO: Keep alive to avoid heroku server from sleeping (maybe)

bot.on('ready', () => {
  console.log('Server is ready');
});
bot.on('message', msg => {
  if (msg.author.id != bot.user.id && msg.content[0] === '`') {

    var cmdTxt = msg.content.split(" ")[0].substring(1);
    var suffix = msg.content.substring(cmdTxt.length+2);
    if(cmdTxt === 'ping')
    {
      msg.channel.sendMessage('pong');
    }
    else if(cmdTxt === 'mirror')
    {
      if(suffix === ''){
        msg.channel.sendMessage('Please enter a message!');
      }else{
        conenction.send(suffix);
        msg.channel.sendMessage(suffix);
      }
    }
  }
});
bot.login(token);

// WEBSOCKET STUFF

// TODO: Add reconnect, probably needed if server is restarted
connection.onopen = () => {
	console.log("Connection opened")
}
connection.onclose = () => {
	console.log("Connection closed");
}
connection.onerror = () => {
	console.error("Connection error");
}
// connection.onmessage = (event) => {
    // Get message data using event.data
// }

// SIMPLE WEB PAGE
const express = require('express');
const app = express();

app.get('*', function (req, res) {
  res.send('This is sourcemod-discord\'s webpage!');
});

app.listen(process.env.PORT || 3000);
