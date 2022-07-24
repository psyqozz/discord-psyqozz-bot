const config = require('../../config.json')
const play = require('../../assets/music/play')
const embed = require('../../assets/embed/embedStructure');

const queue = new Map()

exports.help = {
    name: "skip"
}

exports.run = async (client, message, args) => {
    const serverQueue = client.queue.get(message.guild.id);
    
    if (!message.member.voice.channel) return embed(message, null, null, {name: config.musique.error.voice_channel, iconUrl: config.embed.cross}, null, null, null, null, false);
    if (!serverQueue) return embed(message, null, null, {name: config.musique.error.no_sound, iconUrl: config.embed.cross}, null, null, null, null, false);
    if(serverQueue.songs.length <= 1) return embed(message, null, null, {name: config.musique.error.no_sound_skipped, iconUrl: config.embed.cross}, null, null, null, null, false);

    serverQueue.songs.shift()
    play(message, serverQueue.songs[0], client);
}