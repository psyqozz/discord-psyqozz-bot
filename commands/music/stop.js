const config = require('../../config.json')
const embed = require('../../assets/embed/embedStructure');

exports.help = {
    name: "stop"
}

exports.run = async (client, message, args) => {
    const serverQueue = client.queue.get(message.guild.id);
    if (!message.member.voice.channel) return embed(message, null, null, {name: config.musique.error.voice_channel, iconUrl: config.embed.cross}, null, null, null, null, false);

    if (!serverQueue) return embed(message, null, null, {name: config.musique.error.no_sound, iconUrl: config.embed.cross}, null, null, null, null, false);

    serverQueue.connection.destroy();
    client.queue.set(message.guild.id, null);

    embed(message, null, null, {name: config.musique.status.stop, iconUrl: config.embed.cross}, null, null, null, null, false);
}