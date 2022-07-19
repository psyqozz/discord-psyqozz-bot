const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

exports.help = {
    name: "ban"
}

exports.run = async (client, message, args) => {
    if(message.member.permissions.has(['BAN_MEMBERS'])) {
        user = message.mentions.users.first();
        let reason = args.slice(1).join(" ");

        message.delete();
        const wrongEmbed = new MessageEmbed()
        .setColor(config.embed.color)
        .setTitle('**Modération - Pour ban une personne**')
        .setDescription(`⛔ - ban <member> <raison>`)
        .setTimestamp()
        .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });
        if(!user || !reason) return message.channel.send({ embeds: [wrongEmbed] });

        const BannedEmbed = new MessageEmbed()
        .setColor(config.embed.color)
        .setTitle('**Modération**')
        .setDescription(`⛔ - le membre ${user} a été bannis du serveur`)
        .addFields({ name: '**Raison**', value: `${reason}` })
        .addFields({ name: '**Ban par**', value: `${message.author.username}` })
        .setTimestamp()
        .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

        message.guild.members.ban(user, {reason: reason});
        message.channel.send({ embeds: [BannedEmbed] });
    } else {
        const noPermsEmbed = new MessageEmbed()
        .setColor(config.embed.color)
        .setTitle('**Modération**')
        .setDescription('⛔ - Tu n\'as pas la permission pour faire ça.')
        .setTimestamp()
        .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });
        
        message.channel.send({ embeds: [noPermsEmbed] });
        message.delete({timeout: 1000});
    }
  
}