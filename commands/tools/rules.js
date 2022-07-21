const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');

exports.help = {
    name: "reglement"
}

exports.run = async (client, message, args) => {
    message.delete();

    if(!message.member.permissions.has('MANAGE_GUILD')) {
         const noPermsEmbed = new MessageEmbed()
        .setColor(config.embed.color)
        .setTitle('**Modération**')
        .setDescription('⛔ - Tu n\'as pas la permission pour faire ça.')
        .setTimestamp()
        .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });
        
        return message.channel.send({ embeds: [noPermsEmbed] }).then(mes => {
            mes.delete({timeout: 5000});
        });
    }

    const AnwserEmbed = new MessageEmbed()
	.setColor(config.embed.color)
	.setTitle(config.channel.title)
    .setThumbnail(config.embed.picture)
    .addFields(
		{ name: `**📖 - ** ${config.channel.rule_title}`, value: `${config.channel.rules}` },
		{ name: `**⚔ - ** ${config.channel.sanction_title}`, value: `${config.channel.sanction}` },
	)
	.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

    await message.channel.send({ embeds: [AnwserEmbed] }).then(message => {
        message.react("✅");
    });
    
}