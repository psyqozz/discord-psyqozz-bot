const discordVoice = require("@discordjs/voice");
const playDl = require('play-dl')
const play = require('../../assets/music/play')
const embed = require("../../assets/embed/embedStructure")
const config = require("../../config.json");

exports.help = {
    name: "p"
}

exports.run = async (client, message, args) => {
    if(message.author.bot) return;

    const serverQueue = client.queue.get(message.guild.id);
    const voice_channel = message.member.voice.channel;

    if(!voice_channel) return embed(message, null, null, {name: config.musique.error.voice_channel, iconUrl: config.embed.cross}, null, null, null, null, false);
    if(!args[0]) return embed(message, null, null, {name: config.musique.error.wrong_command, iconUrl: config.embed.cross}, null, null, null, null, false);
    //if(client.voice.connections.size > 0) return message.reply("❌ - Je suis déjà dans un channel");
    const permissions = voice_channel.permissionsFor(message.client.user);
    if(!permissions.has('CONNECT')) return embed(message, null, null, {name: config.musique.error.permission_connect, iconUrl: config.embed.cross}, null, null, null, null, false);
    if(!permissions.has('SPEAK')) return embed(message, null, null, {name: config.musique.error.permission_speak, iconUrl: config.embed.cross}, null, null, null, null, false);

    let song = { title: '', url: '', thumbnails: '', duration: '', ownerChannel : ''};
    let info = "";
    if(playDl.yt_validate(args[0]) === "video" && playDl.yt_validate(args[0])) {
        info = await playDl.video_info(args[0]);
        song = { title: info.video_details.title, url: info.video_details.url, duration: info.video_details.durationRaw, thumbnails: info.video_details.thumbnails[0].url, ownerChannel : info.video_details.channel.name }
    } else {
        yt_info = await playDl.search(args.join(' '), {
            limit: 1
        })
        if(yt_info[0]){
            song = { title: yt_info[0].title, url: yt_info[0].url, thumbnails: yt_info[0].thumbnails[0].url, duration: yt_info[0].durationRaw, ownerChannel: yt_info[0].channel.name }
        } else {
            return embed(message, null, null, {name: config.musique.error.no_video, iconUrl: config.embed.cross}, null, null, null, null, false);
        }
    } 

    const player = discordVoice.createAudioPlayer();  
    const connection = discordVoice.joinVoiceChannel(
    {
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    });

    if(!serverQueue){
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voice_channel,
            player: null,
            connection: null,
            songs: [],
            defaultVolume: 100 / 100,
            loop: false,
            resource: null, 
        };

        client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        try {
            queueConstruct.player = player;
            queueConstruct.connection = connection;

            play(message, queueConstruct.songs[0], client);
        } catch (error) {
            embed(message, null, null, {name: config.musique.error.some_error, iconUrl: config.embed.cross}, null, null, null, null, false);
            console.log(error);
        }
    } else {
        serverQueue.songs.push(song);
        const title = `**${song.title}**`;
        const author = {name: "Son ajouté à la queue"};
        const fields =  [
            {name: "**Chaine**", value: `${song.ownerChannel}`, inline: true}, 
            {name: "**Durée**", value: `${song.duration}`, inline: true}
        ];
        return embed(message, title, song.url, author, null, song.thumbnails, fields, null, true);
    }
}