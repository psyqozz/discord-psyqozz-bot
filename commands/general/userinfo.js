const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

exports.help = {
    name: "userinfo"
}

exports.run = async (client, message, args) => {
    const username = message.mentions.users.first() ? message.mentions.users.first() : message.author;
    let member = message.guild.members.cache.get(username.id);
    let nickname = member ? member.displayName : username.username;

    const userInfoEmbed = new MessageEmbed()
	.setColor(config.embed.color)
    .setAuthor({ name: `Information sur ${nickname} `, iconURL: username.displayAvatarURL()})
	.setDescription(`Information sur l'utilisateur ${username.tag}`)
	.setThumbnail(username.displayAvatarURL())
	.addFields(
		{ name: '**ID**', value: `${username.id}`},
		{ name: '**Pseudo**', value: `<@${nickname}>`},
        { name: '**Modérateur**', value: `${member.kickable ? '🟢' : '🔴'}`, inline: true },
        { name: '**Bot**', value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true},
        { name: '**Rôles**', value: `${member.roles.cache.map(role => role).join(',')}`},
        { name: '**A rejoint le serveur le**', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`, inline: true },
        { name: '**A crée son compte le**', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`, inline: true },
	)
	.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

message.channel.send({ embeds: [userInfoEmbed] });
}