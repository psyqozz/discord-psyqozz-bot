const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

exports.help = {
    name: "userinfo"
}

exports.run = async (client, message, args) => {
    const username = message.mentions.users.first() ? message.mentions.users.first() : message.author;

    const userInfoEmbed = new MessageEmbed()
	.setColor(config.embed.color)
    .setAuthor({ name: 'Psyqozz_', iconURL: config.embed.logoServeur})
	.setDescription(`Ìnformation sur l'utilisateur ${username.username}`)
	.setThumbnail(config.embed.logoServeur)
	.addFields(
		{ name: '**ID du membre**', value: `${username.id}`, inline: true },
		{ name: '**Pseudo sur le serveur**', value: `${username.nickname ? username.nickname : username.username}`, inline: true },
		{ name: '**Date de création du compte**', value: `${username.createdAt.toLocaleDateString('fr-FR')}` },
	)
	.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

message.channel.send({ embeds: [userInfoEmbed] });
}