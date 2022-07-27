const Levels = require('discord-xp');
const config = require('../config.json');
const { MessageEmbed } = require('discord.js');
require('dotenv').config();

Levels.setURL(process.env.DATABASE_URI);

exports.help = {
    name: 'level'
}

exports.run = async (client, message, args) => {
    const randxp = Math.floor(Math.random() * 10) + 1;
    const hasLevelUp = await Levels.appendXp(message.author.id, message.guild.id, randxp);
    if(hasLevelUp){
        const user = await Levels.fetch(message.author.id, message.guild.id);
        const ThisGuildOnly = client.guilds.cache.get(config.env.guild_id)
        const ChannelAnnounceLive = ThisGuildOnly.channels.cache.find(x => x.id === config.level.channel_id)
        const levelUp = new MessageEmbed()
        .setTitle(`UUU tu levelup gros BG, t'es lvl ${user.level}`)
        .setTimestamp()
        .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });
        ChannelAnnounceLive.send({ content: `<@${message.author.id}>` , embeds: [levelUp] });
    }
}