const { MessageEmbed } = require('discord.js');
const discordVoice = require("@discordjs/voice");
const config = require('../../config.json')
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');


exports.help = {
    name: "p"
}

exports.run = async (client, message, args) => {
    if(message.author.bot) return;

    const voice_channel = message.member.voice.channel;
    if(!voice_channel) return message.reply("❌ - Connecte toi dans un salon");
    //if(message.guild.me.voice.channel) return message.reply("❌ - Je suis déjà dans un channel");
    if(!args[0]) return message.reply("❌ - Balance une musique !play <music>");
    const permissions = voice_channel.permissionsFor(message.client.user);
    if(!permissions.has('CONNECT')) return message.reply("❌ - Je peux pas me connecter au channel");
    if(!permissions.has('SPEAK')) return message.reply("❌ - Je peux pas parler");
    let song = { title: '', url: '', thumbnails: '', duration: '', ownerChannel : ''};
    let info = "";
    if(ytdl.validateURL(args[0])) {
        info = await ytdl.getInfo(args[0]);
        let duration = info.videoDetails.lengthSeconds;
        if(duration > 60) {
            const minutes = Math.floor(duration/60);
            const seconds = duration - minutes * 60;
            duration = `${minutes}:${seconds}`
        } else {
            duration = `0:${duration}`
        }
        song = { title: info.videoDetails.title, url: info.videoDetails.video_url, duration: `${duration}`, thumbnails: info.videoDetails.thumbnails[0].url, ownerChannel : info.videoDetails.ownerChannelName }
    } else {
        const video_finder = async (query) => {
            const video_result = await ytSearch(query);
            return (video_result.videos.length > 1) ? video_result.videos[0] : null;
        }

        const video = await video_finder(args.join(' '));
        if(video){
            song = { title: video.title, url: video.url, thumbnails: video.thumbnail, duration: video.duration.timestamp, ownerChannel: video.author.name }
        } else {
            return message.reply("❌ - Aucune vidéo trouvé");
        }
    } 

    const connection = discordVoice.joinVoiceChannel(
    {
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    });
    const stream = ytdl(song.url, {filter: "audioonly"});
    const player = discordVoice.createAudioPlayer();
    const resource = discordVoice.createAudioResource(stream)

    player.play(resource);
    connection.subscribe(player)

    player.on(discordVoice.AudioPlayerStatus.Idle, () => {
        connection.destroy();
    })
    const noEmbed = new MessageEmbed()
	.setColor(config.embed.color)
	.setTitle(`**${song.title}**`)
    .setURL(song.url)
    .setThumbnail(song.thumbnails)
	.addFields(
        { name: '**Chaine**', value: `${song.ownerChannel}`, inline: true },
		{ name: '**Durée**', value: `${song.duration}`, inline: true },
	)
    .setTimestamp()
	.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

    message.channel.send({ embeds: [noEmbed] });
}