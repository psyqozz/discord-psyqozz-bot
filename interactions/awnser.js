const config = require('../config.json');
const { MessageEmbed } = require('discord.js');

exports.help = {
    name: 'talk'
}

exports.run = async (client, message, args) => {
    const Interaction = config.interaction.bot;
    const member = message.guild.members.cache.get( message.author.id);
    const nickname = member ? member.displayName : username.username;    

    if (message.mentions.has(client.user.id)) {
        const AnwserEmbed = new MessageEmbed()
        .setColor(config.embed.color)
        .setTitle(`**${Interaction[Math.floor(Math.random() * Interaction.length)]} ${nickname}**`)
        .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });
        message.channel.send({ embeds: [AnwserEmbed] });
    } 
    return;
}