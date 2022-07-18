const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

exports.help = {
    name: "carlos"
}

exports.run = async (client, message, args) => {
    const CarlosEmbed = new MessageEmbed()
	.setColor(config.embed.color)
	.setTitle('**Le numéro 1 de Psyqozz_ ❤❤**')
    .setImage('https://media.tenor.com/images/67bb0cf5da35c54331703f6b52da7e32/tenor.gif')
	.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

message.channel.send({ embeds: [CarlosEmbed] });
}
