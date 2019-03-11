const { settings } = require('../process');
module.exports = {
	name: 'addStaff',
	alias: ['add', 'staff'],
	args: {
		value: true,
	},
	guildOnly: true,
	ownerOnly: false,
	disabled: false,
	execute(msg, args) {
    if (msg.author.id !== msg.guild.ownerID) return msg.reply('only owner of the guild can use this command.');
    let rolename = settings.get(msg.guild.id.toString()).staffRole;
    let role = msg.guild.roles.find(r => r.name === rolename);
    if (!msg.mentions.users.size) {
        msg.member.addRole(role)
        .then(() => {
          msg.reply('done!');
        })
        .catch(err => {
          console.error(err);
          msg.reply(`something wrong. Here's a tip that can help you.\nMaybe I have no permissions?\n\tMANAGE_ROLES: **${msg.guild.me.hasPermission(['MANAGE_ROLES'])}**\n\tADMINISTRATOR: **${msg.guild.me.hasPermission(['ADMINISTRATOR'])}**`);
        });
    } else {
      msg.mentions.users.map(user => {
          msg.guild.member(user).addRole(role)
          .then(() => {
            msg.reply('done!');
          })
          .catch(err => {
            console.error(err);
            msg.reply(`something wrong. Here's a tip that can help you.\nMaybe I have no permissions?\n\tMANAGE_ROLES: **${msg.guild.me.hasPermission(['MANAGE_ROLES'])}**\n\tADMINISTRATOR: **${msg.guild.me.hasPermission(['ADMINISTRATOR'])}**`);
          });
      });
    }
	}
};
