const config = require('../../config.json');
const Levels = require('discord-xp');
const { MessageEmbed } = require('discord.js');

exports.help = {
    name: "lb"
}

exports.run = async (client, message, args) => {
	const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
    const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
    if(rawLeaderboard.length < 1) return message.reply('Pas de classement poto');

    const ThisGuildOnly = client.guilds.cache.get(config.env.guild_id)
    const ChannelAnnounceLive = ThisGuildOnly.channels.cache.find(x => x.id === config.level.channel_id)
    const fieldsMap = [];
    leaderboard.map(e => (
        fieldsMap.push({name :"🧿 - Rank", value : `\`${e.position}. ${e.username}#${e.discriminator}\``}) , 
        fieldsMap.push({name :"⌛ - level",  value :`\`${e.level}\``, inline: true}),
        fieldsMap.push({name :"📕 - XP",  value :`\`${e.xp.toString()}\``, inline: true}))
    );
    const levelUp = new MessageEmbed()
    .setTitle(`**🥇 Classement du serveur 🥇**`)
    .setDescription('Qui est le meilleur (Psyqozz_ bien sûr)')
    .setTimestamp()
    .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });
    fieldsMap.forEach(field => { levelUp.addFields({ name: field.name, value: field.value, inline: field.inline }) })
    ChannelAnnounceLive.send({ embeds: [levelUp] });
}