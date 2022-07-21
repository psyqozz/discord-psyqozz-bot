const config = require('../config.json');

module.exports = async(client) => {
    let guild = client.guilds.cache.find(guild => guild.id == config.env.guild_id);
    let channel = await guild.channels.cache.find(ch => ch.id == config.channel.rule_id)

    channel.messages.fetch({ limit: 10 });
}