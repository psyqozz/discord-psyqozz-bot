const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

exports.help = {
    name: "jerefuse"
}

exports.run = async (client, message, args) => {
    const noEmbed = new MessageEmbed()
	.setColor(config.embed.color)
	.setTitle('**Non, je refuse ❌📛**')
    .setDescription('https://www.youtube.com/watch?v=4rpEP-f8B5Q&ab_channel=TheBlaBlaGuys')
	.setThumbnail('https://i.imgur.com/EiFi7K4.png')
	.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

message.channel.send({ embeds: [noEmbed] });
}