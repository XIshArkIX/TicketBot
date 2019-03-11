const { nameOfPrefix, lengthOfPrefix } = require('./pre.js');
// console.log(nameOfPrefix, lengthOfPrefix);

// const getMsg = class getMsg {
//   constructor(msg) {
//     this.msg = msg;
//   }
//   get RealMsg() {
//     return this.msg.substr(lengthOfPrefix);
//   }
//   // get arg() {
//   //
//   // }
// }

const getMsg = (msg) => {
  return this.msg.substr(lengthOfPrefix);
}

module.exports = { getMsg };
