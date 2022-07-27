const config = require('../../config.json');
const Levels = require('discord-xp');
const canvacord = require('canvacord');
const discord = require('discord.js');

exports.help = {
    name: "rank"
}

exports.run = async (client, message, args) => {
	const target = message.mentions.users.first() || message.author;
    const memberTarget = message.guild.members.cache.get(target.id);
    const user = await Levels.fetch(target.id, message.guild.id, true);
    const neededXp = Levels.xpFor(parseInt(user.level ? user.level : 0) + 1);
    if(user.lenght < 1) return message.reply("T'as pas d'xp, parle un peu là");

    const rank = new canvacord.Rank()
    .setAvatar(memberTarget.user.displayAvatarURL({dynamic: false, format: 'png'}))
    .setCurrentXP(user.xp || 0)
    .setLevel(user.level || 0)
    .setRequiredXP(neededXp)
    .setRank(user.position || 0)
    .setStatus('online')
    .setProgressBar(config.embed.color, 'COLOR')
    .setUsername(memberTarget.user.username)
    .setDiscriminator(memberTarget.user.discriminator);

    const ThisGuildOnly = client.guilds.cache.get(config.env.guild_id)
    const ChannelAnnounceLive = ThisGuildOnly.channels.cache.find(x => x.id === config.level.channel_id)
    
    rank.build().then(data => {
        const attachement = new discord.MessageAttachment(data, "rankcard.png");
        ChannelAnnounceLive.send({
            content: `<@${target.id}> tiens bg :`,
            files: [attachement]
        });
    })
}