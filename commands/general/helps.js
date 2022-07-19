const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')


exports.help = {
    name: "help"
}



exports.run = async (client, message, args) => {
	const helpEmbed = new MessageEmbed()
	.setColor(config.embed.color)
	.setTitle('**🧾 __Liste des commandes__ 🧾**')
	.setDescription('Nom de la commande et sa déscription')
	.setThumbnail(config.embed.picture)
	.addFields(
		{ name: '**🌍 - Général**', value: '`!help, !bark, !jerefuse, !carlos, !monia, !#`' },
		{ name: '**⚔ - Modération**', value: '`!ban, !kick`' },
		{ name: '**🛠 - Outils**', value: '`!clear`' },

	)
	.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

message.channel.send({ embeds: [helpEmbed] });
};