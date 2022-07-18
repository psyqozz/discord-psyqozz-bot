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
		{ name: '**!help**', value: '`Affiche les commandes`' },
		{ name: '**!bark**', value: '`Test tu verras 😏`' },
		{ name: '**!jerefuse**', value: '`Non je refuse`' },
		{ name: '**!carlos**', value: '`Numéro 1`' },
		{ name: '**!monia**', value: '`EBK EBK`' },
		{ name: '**!#**', value: '`Humour tsé`' },
	)
	.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

message.channel.send({ embeds: [helpEmbed] });
};