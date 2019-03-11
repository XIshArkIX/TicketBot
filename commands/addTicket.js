const { settings } = require('../process');
module.exports = {
	name: 'addTicket',
	alias: ['new'],
	args: {
		value: true,
	},
	guildOnly: true,
	ownerOnly: false,
	disabled: false,
	execute(msg, args) {
    args = args.toString().replace(',', ' ');
    var user = msg.author;
    var guild = msg.guild;
    guild.createChannel(`ticket-of-${user.username}`, 'text', [{ id: guild.roles.find(botRole => botRole.name === 'TicketBot'), allowed: ['CREATE_INSTANT_INVITE', 'MANAGE_ROLES', 'VIEW_CHANNEL'] }]).then(channel => {
        channel.overwritePermissions(guild.roles.find(role => role.name === '@everyone'), {
          VIEW_CHANNEL: false,
          READ_MESSAGE_HISTORY: false,
          USE_EXTERNAL_EMOJIS: false,
          ADD_REACTIONS: false,
          SEND_MESSAGES: false,
          EMBED_LINKS: false
        });
        channel.overwritePermissions(user, {
          VIEW_CHANNEL: true,
          READ_MESSAGE_HISTORY: true,
          USE_EXTERNAL_EMOJIS: true,
          ADD_REACTIONS: true,
          SEND_MESSAGES: true,
          EMBED_LINKS: true
        });
        if (settings.has(msg.guild.id.toString()) && settings.has(msg.guild.id.toString(), 'staffRole')) {
          let rolename = settings.get(msg.guild.id.toString()).staffRole;
          let role = msg.guild.roles.find(r => r.name === rolename);
          channel.overwritePermissions(role, {
            VIEW_CHANNEL: true,
            READ_MESSAGE_HISTORY: true,
            USE_EXTERNAL_EMOJIS: true,
            ADD_REACTIONS: true,
            SEND_MESSAGES: true,
            EMBED_LINKS: true
          });
        }
        channel.createInvite({ maxAge: 3600, maxUses: 2, unique: true }, `Create ticket for ${user.tag} for reason: ${args}`).then(invite => {
          user.createDM().then(() => { user.dmChannel.send(`You created a ticket on **${guild.name}**\nIf you don't see a channel you've created here's a link to invite\n__**${invite.url}**__`); });
        });
        msg.channel.send({
          embed: {
            author: {
              name: `Ticket created by ${user.tag}`,
              icon_url: user.avatarURL
            },
            fields: [
              {
                name: 'Issue:',
                value: args,
                inline: true
              },
              {
                name: 'Channel:',
                value: `<#${channel.id}>`,
                inline: true
              }
            ],
            timestamp: new Date(),
            color: 4886754
          }
        });
    });
	}
};
