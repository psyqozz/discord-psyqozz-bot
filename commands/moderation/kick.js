const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

exports.help = {
    name: "kick"
}

exports.run = async (client, message, args) => {
    if(message.member.permissions.has(['KICK_MEMBERS'])) {
        user = message.mentions.users.first();
        let reason = args.slice(1).join(" ");

        message.delete();
        const wrongEmbed = new MessageEmbed()
        .setColor(config.embed.color)
        .setTitle('**Modération - Pour kick une personne**')
        .setDescription(`⛔ - kick <member> <raison>`)
        .setTimestamp()
        .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });
        if(!user || !reason) return message.channel.send({ embeds: [wrongEmbed] }).then(mes => {
            setTimeout(() => mes.delete(), 10000)
        });

        const KickedEmbed = new MessageEmbed()
        .setColor(config.embed.color)
        .setTitle('**Modération**')
        .setDescription(`⛔ - le membre ${user} a été kick du serveur`)
        .addFields({ name: '**Raison**', value: `${reason}` })
        .addFields({ name: '**kick par**', value: `${message.author.username}` })
        .setTimestamp()
        .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

        message.guild.members.kick(user, {reason: reason});
        message.channel.send({ embeds: [KickedEmbed] }).then(mes => {
            setTimeout(() => mes.delete(), 5000)
        });
    } else {
        const noPermsEmbed = new MessageEmbed()
        .setColor(config.embed.color)
        .setTitle('**Modération**')
        .setDescription('⛔ - Tu n\'as pas la permission pour faire ça.')
        .setTimestamp()
        .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });
        
        message.channel.send({ embeds: [noPermsEmbed] }).then(mes => {
            setTimeout(() => mes.delete(), 10000)
        });
    }
  
}