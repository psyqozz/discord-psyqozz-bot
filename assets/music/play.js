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

    embed(message,
        `**${song.title}**`, 
        song.url, 
        {name: "En cours de lecture"}, 
        null, 
        song.thumbnails, 
        [
            {name: "**Chaine**", value: `${song.ownerChannel}`, inline: true}, 
            {name: "**Durée**", value: `${song.duration}`, inline: true}
        ],
        null,
        true
    );

    serverQueue.player.on(discordVoice.AudioPlayerStatus.Idle, () => {
        serverQueue.songs.shift();
        play(message, serverQueue.songs[0], client);
    })

    serverQueue.player.on('error', error => {
        console.log(error);
        message.channel.send("❌ - Une erreur est survenue");
    });
}