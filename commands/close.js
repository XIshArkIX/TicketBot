const { settings } = require('../process');
module.exports = {
	name: 'close',
	alias: ['solve', 'solved'],
	args: {
		value: false,
	},
	guildOnly: true,
	ownerOnly: false,
	disabled: false,
	execute(msg, args) {
    if (settings.has(msg.guild.id.toString()) && settings.has(msg.guild.id.toString(), 'staffRole')) {
      var rolename = settings.get(msg.guild.id.toString()).staffRole;
      var role = msg.guild.roles.find(r => r.name === rolename);
      var member = role.members.find(user => user.id === msg.author.id);
      // console.log(`role.member:\n${role.members}`, `member:\n${member}`);
      var value = (member === null) ? true : false;
      // console.log(value);
    } else {
      var value = false;
    }
    if (msg.author.id === msg.guild.ownerID) {
      if (args.length > 0) {
        // console.log(!msg.guild.me.hasPermission(['MANAGE_CHANNELS']) && !msg.guild.me.hasPermission(['ADMINISTRATOR']));
        args = args.shift().toString();
        let channel = msg.guild.channels.find(ch => ch.name.includes(args));
        if (channel === null) msg.reply(`cannot delete the channel.\nMost likely this channel did not exist.`);
        else if (channel.deleted || !channel.deletable || (!msg.guild.me.hasPermission(['MANAGE_CHANNELS']) && !msg.guild.me.hasPermission(['ADMINISTRATOR']))) msg.reply(`cannot delete the channel. Here's a tip that can help you.\nMaybe he already removed? **${channel.deleted}**\nMaybe it can not be removed? **${!channel.deletable}**\nMaybe I have no permissions?\n\tMANAGE_CHANNELS: **${msg.guild.me.hasPermission(['MANAGE_CHANNELS'])}**\n\tADMINISTRATOR: **${msg.guild.me.hasPermission(['ADMINISTRATOR'])}**`);
        else channel.delete();
      } else {
        msg.channel.delete();
      }
    } else if (!value) {
      if (args.length > 0) {
        // console.log(!msg.guild.me.hasPermission(['MANAGE_CHANNELS']) && !msg.guild.me.hasPermission(['ADMINISTRATOR']));
        args = args.shift().toString();
        let channel = msg.guild.channels.find(ch => ch.name.includes(args));
        if (channel === null) msg.reply(`cannot delete the channel.\nMost likely this channel did not exist.`);
        else if (channel.deleted || !channel.deletable || (!msg.guild.me.hasPermission(['MANAGE_CHANNELS']) && !msg.guild.me.hasPermission(['ADMINISTRATOR']))) msg.reply(`cannot delete the channel. Here's a tip that can help you.\nMaybe he already removed? **${channel.deleted}**\nMaybe it can not be removed? **${!channel.deletable}**\nMaybe I have no permissions?\n\tMANAGE_CHANNELS: **${msg.guild.me.hasPermission(['MANAGE_CHANNELS'])}**\n\tADMINISTRATOR: **${msg.guild.me.hasPermission(['ADMINISTRATOR'])}**`);
        else channel.delete();
      } else {
        msg.channel.delete();
      }
    } else {
      return msg.reply('this command can be used only by owner and staff team.');
    }

	}
};
