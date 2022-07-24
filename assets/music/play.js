const playDl = require('play-dl')
const discordVoice = require("@discordjs/voice");
const embed = require("../../assets/embed/embedStructure")

module.exports = async(message, song, client) => {
    play(message, song, client);
}

async function play(message, song, client) {
    const guild = message.guild;
    const serverQueue = client.queue.get(guild.id);
    if(!song){
        serverQueue ? serverQueue.connection.destroy() : null;
        client.queue.delete(message.guild.id)
        return;
    }

    const stream = await playDl.stream(song.url);
    serverQueue.connection.subscribe(serverQueue.player);

    const resource = discordVoice.createAudioResource(stream.stream, {
        inputType : stream.type
    });
    serverQueue.player.play(resource);
    serverQueue.resource = resource;

    const title = `**${song.title}**`;
    const author = {name: "En cours de lecture"};
    const fields = [
        {name: "**Chaine**", value: `${song.ownerChannel}`, inline: true}, 
        {name: "**Durée**", value: `${song.duration}`, inline: true}
    ];
    embed(message, title, song.url, author, null, song.thumbnails, fields,null,true);

    serverQueue.player.on(discordVoice.AudioPlayerStatus.Idle, () => {
        serverQueue.songs.shift();
        play(message, serverQueue.songs[0], client);
    })

    serverQueue.player.on('error', error => {
        embed(message, null, null, {name: config.musique.error.some_error, iconUrl: config.embed.cross}, null, null, null, null, false);
        console.log(error);
    });
}