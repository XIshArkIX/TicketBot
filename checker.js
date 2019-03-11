const { ownerID } = require('./config.json');

const isOwner = (cmd, value) => {
  if (cmd.ownerOnly === true) {
    // console.log(value);
    if (Number(value) == ownerID) {
      return true;
    }
  }
}

// const isDisabled = (cmd) => {
//   return cmd.disabled;
// }

const validate = (cmd, argToValidate) => {
  if (cmd.args.validate !== undefined && cmd.args.value === true) {
    return cmd.args.validate(argToValidate);
  }
}

// const isRole =

module.exports = { isOwner, validate };
