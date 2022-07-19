const config = require('../config.json');
const { MessageEmbed } = require('discord.js');

exports.help = {
    name: 'hello'
}

exports.run = async (client, message, args) => {
    const username = message.mentions.users.first() ? message.mentions.users.first() : message.author;
    const member = message.guild.members.cache.get(username.id);
    const nickname = member ? member.displayName : username.username;
    const helloInteraction = config.interaction.hello;

    helloInteraction.forEach(e => {
        if(message.content.indexOf(e) !== -1) {
             const AnwserEmbed = new MessageEmbed()
            .setColor(config.embed.color)
            .setTitle(`**Hola ça va ${nickname}**`)
            .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });
        
            return message.channel.send({ embeds: [AnwserEmbed] });
        }
    });    
    return;
}