const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

exports.help = {
    name: "#"
}

exports.run = async (client, message, args) => {
    const DiezEmbed = new MessageEmbed()
	.setColor(config.embed.color)
	.setTitle('**⚠⚠ ALERTE HUMOUR !!! ⚠⚠**')
    .setDescription('Humour poto allo')
	.setThumbnail(config.embed.picture)
    .addFields(
		{ name: '😝', value: '#boutade #haha #joke #C\'estLeDiscordDePsyqozzIci' },
	)
	.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

message.channel.send({ embeds: [DiezEmbed] });
}