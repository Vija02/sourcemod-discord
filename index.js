const Discord = require('discord.js');
const bot = new Discord.Client();
const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();

var conn;

// Get token from discord panel
const token = '<Your Token>';

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
        if (!conn || !conn.connected) {
          msg.channel.sendMessage('Websocket is not connected');
        }else{
          conn.sendUTF(suffix);
        }

      }
    }
  }
});
bot.login(token);

// WEBSOCKET STUFF

// TODO: Add reconnect, probably needed if server is restarted
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    conn = connection;
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
});
client.connect('ws://x.x.x.x', 'echo-protocol');

// SIMPLE WEB PAGE
const express = require('express');
const app = express();

app.get('*', function (req, res) {
  res.send('This is sourcemod-discord\'s webpage!');
});

app.listen(process.env.PORT || 3000);
