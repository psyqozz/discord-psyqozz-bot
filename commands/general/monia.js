const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

exports.help = {
    name: "monia"
}

exports.run = async (client, message, args) => {
    const MoniaEmbed = new MessageEmbed()
	.setColor(config.embed.color)
	.setTitle('**EBK EBK**')
    .setImage('https://tenor.com/view/sponge-bob-keep-running-your-mouth-blah-shut-up-already-gif-14858997')
	.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

message.channel.send({ embeds: [MoniaEmbed] });
}