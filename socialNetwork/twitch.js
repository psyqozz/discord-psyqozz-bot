const config = require('../config.json');
const { MessageEmbed } = require('discord.js');
const TwitchApi = require('node-twitch').default

const twitch = new TwitchApi({
    client_id: config.twitch.app_client_id,
    client_secret: config.twitch.app_secret_token
})

module.exports = async(client) => {
    let isLiveMemory = false;

    const run = async function Run() {
        await twitch.getStreams({ channel: `${config.twitch.user}` }).then(async data => {
            const r = data.data[0]
            let ThisGuildOnly = client.guilds.cache.get(config.env.guild_id)
            const ChannelAnnounceLive = ThisGuildOnly.channels.cache.find(x => x.id === config.twitch.channel_id)
            if (r !== undefined) {
                if (r.type === "live") {
                    isLiveMemory === false ? isLiveMemory = true : isLiveMemory = null;
                    if (isLiveMemory) {
                        const embed = new MessageEmbed()
                        .setColor(config.embed.color)
                        .setTitle(r.title)
                        .setURL(`https://www.twitch.tv/${config.twitch.user}`)
                        .setAuthor({ name: r.user_name})
                        .addFields(
                            { name: "Jeu", value: `${r.game_name}`, inline: true},
                            { name: "Viewers", value: `${r.viewer_count}`, inline: true},
                        )
                        .setImage(r.getThumbnailUrl())
                        .setTimestamp();                        
                        ChannelAnnounceLive.send({content: `${config.twitch.channel_message} https://www.twitch.tv/${config.twitch.user}`, embeds: [embed]});
                        return;
                    }
                } else {
                    isLiveMemory = false;
                }
            } else {
                isLiveMemory = false;
            }
        })
    }
    setInterval(run, 30000);
}