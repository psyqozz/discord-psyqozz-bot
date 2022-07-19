const config = require('../config.json');
const { MessageEmbed } = require('discord.js');

exports.help = {
    name: "369563482615709696"
}

exports.run = async (client, message, args) => {
    if(message.author.id === "369563482615709696") {

    const AnwserEmbed = new MessageEmbed()
	.setColor(config.embed.color)
	.setTitle('**PA LU**')
	.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

    message.channel.send({ embeds: [AnwserEmbed] });
    }
    return;
}