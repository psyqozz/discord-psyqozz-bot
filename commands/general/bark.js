const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

exports.help = {
    name: "bark"
}

exports.run = async (client, message, args) => {
    const barkEmbed = new MessageEmbed()
	.setColor(config.embed.color)
	.setTitle('🔴🔴 Va voir cette masterclass !!! 🔴🔴')
    .setDescription('https://www.youtube.com/watch?v=XS4ostn5EjY&ab_channel=ZORUYOUNG')
	.setThumbnail('https://i.imgur.com/iWJiieP.jpg')
	.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

message.channel.send({ embeds: [barkEmbed] });
}