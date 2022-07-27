const config = require('../../config.json');

module.exports = async(client) => {
    const guild = client.guilds.cache.find(guild => guild.id == config.env.guild_id);
    const channel = await guild.channels.cache.find(ch => ch.id == config.channel.rule_id)

    channel.messages.fetch({ limit: 10 });
}