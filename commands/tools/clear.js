const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

exports.help = {
    name: "clear"
}

exports.run = async (client, message, args) => {
    if(message.member.permissions.has(['MANAGE_MESSAGES'])) {
        message.delete();

        if(args[0] >= 1 && args[0] <= 100){
            message.channel.bulkDelete(args[0], true)
            const description = args[0] > 1 ? config.tools.multiple_message : config.tools.one_message
            const clearEmbed = new MessageEmbed()
            .setColor(config.embed.color)
            .setTitle('**Messages**')
            .setDescription(`🛠 - ${args[0]} ${description}`)
            .setTimestamp()
            .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });
            message.channel.send({ embeds: [clearEmbed] }).then(mes => {
                mes.delete({timeout: 5000});
            });
        } else {
            const wrongEmbed = new MessageEmbed()
            .setColor(config.embed.color)
            .setTitle('**Effacer des messages**')
            .setDescription(`⛔ - il faut préciser un nombre entre 1 et 99`)
            .setTimestamp()
            .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });
            message.channel.send({ embeds: [wrongEmbed] }).then(mes => {
                mes.delete({timeout: 5000});
            });
        }
    } else {
        const noPermsEmbed = new MessageEmbed()
        .setColor(config.embed.color)
        .setTitle('**Modération**')
        .setDescription('⛔ - Tu n\'as pas la permission pour faire ça.')
        .setTimestamp()
        .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });
        
        message.channel.send({ embeds: [noPermsEmbed] }).then(mes => {
            mes.delete({timeout: 5000});
        });
    }
  
}