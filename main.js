// import * as Discord from 'discord.js'; NOTE: go to ES6
const Discord = require('discord.js');
const consola = require('consola');
// const { getMsg } = require('./parser.js');
const { commandCollection, registryCommand } = require('./OnStartEvent.js');
const { nameOfPrefix, lengthOfPrefix } = require('./pre.js');
const { token } = require('./config.json');
const { isOwner, validate } = require('./checker.js');
// const friendlyError = require('./friendlyError.js');
let bugCounter = 0;

const client = new Discord.Client();

// commandCollection.deleteAll();
registryCommand();
// console.log(commandCollection);

client.on('ready', () => consola.start('Ready!'))
      .on('message', msg => {
        // console.log(commandCollection);
        if (!msg.content.startsWith(nameOfPrefix) || msg.author.bot) return;
        let rmsg = msg.content.substr(lengthOfPrefix)/*.toLowerCase()*/.trim().split(/ +/);
        let command = rmsg.shift().toLowerCase();
        // console.log(command);
        // console.log(`Команда ${command}\nАргументы: ${rmsg}`);
        let rcmd = commandCollection.get(command) || commandCollection.find(a => a.alias && a.alias.includes(command));
        // console.log(rcmd, isOwner(rcmd, msg.author.id), rcmd.disabled, validate(rcmd, rmsg));
        if (!rcmd ||/* isOwner(rcmd, msg.author.id) || */rcmd.disabled/* || validate(rcmd, rmsg)*/) return; // NOTE: пофиксить isOwner и validate
        try {
          rcmd.execute(msg, rmsg, client);
        } catch (e) {
          // console.log(commandCollection);
          bugCounter = bugCounter + 1;
          msg.channel.send(`An unexpected error has occurred. #${bugCounter}`);
          console.error(e);
        }
      })
      .on('error', err => consola.error(err));

process.on('unhandledRejection', error => consola.error('Uncaught Promise Rejection', error));

client.login(token);
