const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

exports.help = {
    name: "monia"
}

exports.run = async (client, message, args) => {
    const MoniaEmbed = new MessageEmbed()
	.setColor(config.embed.color)
	.setTitle('**EBK EBK**')
    .setImage('https://c.tenor.com/y0UAftfinY8AAAAC/spongebob-squarepants-spongebob.gif')
	.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

message.channel.send({ embeds: [MoniaEmbed] });
}