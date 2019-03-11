const { commandPrefix } = require('./OnStartEvent.js');
const { defaultPrefix } = require('./config.json');
// const EventEmitter = require('events').EventEmitter;
// const debug = new EventEmitter();
var prefix = new commandPrefix(defaultPrefix);
// console.log(defaultPrefix);
var CommandPrefix = (defaultPrefix === undefined) ? prefix.generatePrefix() : new commandPrefix("-").generatePrefix();
var nameOfPrefix = prefix.getName;
var lengthOfPrefix = prefix.getLenght;

module.exports = { nameOfPrefix, lengthOfPrefix };
