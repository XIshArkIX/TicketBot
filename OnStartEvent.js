const fs = require('fs');
const consola = require('consola');
const Discord = require('discord.js');
// const enmap = require("enmap");
// const EnmapLevel = require('enmap-level');
const commandCollection = new Discord.Collection();
const settingsCollection = new Discord.Collection();
// const commandCollectionProvider = new EnmapLevel({ name: 'command' });
// const commandCollection = new enmap({ provider: commandCollectionProvider });
// const settingsCollectionProvider = new EnmapLevel({ name: 'settings' });
// const settingsCollection = new enmap({ provider: settingsCollectionProvider });

let getDir = (path) => {
  if (path === undefined) path = './commands/'; else getDir(path);
  // if (path === undefined) path = './commands/';
  // console.log(path);
  if (typeof path !== 'string') throw new Error('Указанный путь не является строкой.');
  return path;
}

let commandPrefix = class commandPrefix {
  constructor(prefix, pattern) {
    this.prefix = prefix;
    this.pattern = new RegExp(`\S+`, 'i');
  }
  generatePrefix(prefix = this.prefix, pattern = this.pattern) {
    // if (prefix === undefined) prefix = '.'; Не нужна, т.к. есть проверка в pre.js
    if (typeof prefix !== 'string') throw new Error('Префикс должен быть строкой.');
    if (pattern.test(prefix)) throw new Error('Префикс не соответствует регулярному выражению.');
    if (prefix.length >= 20) throw new Error('Максимальная длина префикса равна 20.');
    consola.info(`[PREFIX] Сгенерированный префикс: ${prefix}`);
    settingsCollection.set('nameOfPrefix', prefix);
    settingsCollection.set('lengthOfPrefix', prefix.length);
    return settingsCollection;
  }
  set changePrefix(newPrefix) {
    this.prefix = newPrefix;
    if (this.pattern.test(newPrefix) || newPrefix.length === 0 || newPrefix === undefined) throw new Error('Префикс не соответствует регулярному выражению.');
    consola.info(`[PREFIX] Сгенерированный префикс: ${newPrefix}`);
  }
  get getName() {
    return settingsCollection.get('nameOfPrefix');
  }
  get getLenght() {
    return settingsCollection.get('lengthOfPrefix');
  }
}

// let generatePrefix = (prefix, pattern = new RegExp(`\S+`, 'i')) => {
//   if (prefix === undefined) prefix = defaultPrefix ? defaultPrefix : '.';
//   // if (prefix.match(pattern) === null) throw new Error('Каким-то образом ты умудрился запороть генерацию префикса.');
//   if (prefix.length >= 20) throw new Error('Максимальная длина префикса равна 20.');
//   consola.info(`[PREFIX] Сгенерированный префикс: ${prefix}`);
//   return prefix;
// }

let commandsIn = (dirName) => {
  // console.log(dirName);
  let files = fs.readdirSync(dirName);
  // console.log(files);
  if (typeof files !== 'object') throw new Error('Указанный путь не папка.');
  return files;
}

let registryCommand = (path, dirName) => {
  dirName = getDir(path);
  for (let data of commandsIn(dirName)) {
    if (data instanceof Function) throw new Error('Команда(ы) не имеют вид функций.');
    // console.log(data);
    const modules = require(`${dirName + data}`);
    consola.info(`[MODULE] Регистрирую модуль: ${modules.name}`);
    // if ( === undefined) settings = null;
    commandCollection.set(modules.name, modules);
  }
  return commandCollection;
}

let reload = (cmdName, /*isOwner, */user, returnedValue) => {
  // if (isOwner === false) returnedValue = false;
  cmdName = cmdName.toString();
  // console.log(cmdName);
  // console.log(commandCollection);
  let cmd = getDir() + cmdName + '.js';
  // console.log(cmd);
  let cmdResult = commandCollection.delete(cmdName);
  if (cmdResult === true) {
    let reloadedCmd = require(cmd);
    commandCollection.set(reloadedCmd.name, reloadedCmd);
    // console.log(reloadedCmd);
    // console.log(commandCollection);
    consola.info(`[MODULE] Следующий модуль был перезагружен ${user}: ${cmdName}`);
    returnedValue = true;
  } else {
    consola.error(e => 'Что-то пошло не так:', e);
    returnedValue = false;
  }
  // console.log(returnedValue);
  return returnedValue;
}

// let addLenght = () => {
//
//   // commandCollection.modules.name.set('length', modules.name.length);
// }

// let OnStartEvent = class OnStartEvent {
//   constructor(name, aliases, guildOnly, ownerOnly) {
//     this.name = registryCommand;
//     this.aliases = this.name.aliases;
//     this.name.aliases = aliasName();
//   }
// }
//
// let data1 = new OnStartEvent();
// console.log(data1);

module.exports = { registryCommand, commandPrefix, commandCollection, reload };
