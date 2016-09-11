const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'MjI0NTM2NDgyNzI2MDE5MDcz.Crb_jg.HUN4dum9fGVS1hajrBQwrQOQgiU';

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
    else if(cmdTxt === 'chat')
    {
      msg.channel.sendMessage('Hi WithinCoffee~');
    }
  }
});

bot.login(token);
