const { MessageEmbed } = require('discord.js');
const discordVoice = require("@discordjs/voice");
const config = require('../../config.json')
const play = require('play-dl')


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
    if(play.yt_validate(args[0]) === "video" && play.yt_validate(args[0])) {
        info = await play.video_info(args[0]);
        song = { title: info.video_details.title, url: info.video_details.url, duration: info.video_details.durationRaw, thumbnails: info.video_details.thumbnails[0].url, ownerChannel : info.video_details.channel.name }
    } else {
        yt_info = await play.search(args.join(' '), {
            limit: 1
        })
        if(yt_info[0]){
            song = { title: yt_info[0].title, url: yt_info[0].url, thumbnails: yt_info[0].thumbnails[0].url, duration: yt_info[0].durationRaw, ownerChannel: yt_info[0].channel.name }
        } else {
            return message.reply("❌ - Aucune vidéo trouvé");
        }
    } 
    const stream = await play.stream(song.url);
    const connection = discordVoice.joinVoiceChannel(
    {
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    });
    const player = discordVoice.createAudioPlayer({
        behaviors: {
            noSubscriber: discordVoice.NoSubscriberBehavior.Play
        }
    });
    const resource = discordVoice.createAudioResource(stream.stream, {
        inputType : stream.type
    });

    player.play(resource);
    connection.subscribe(player)

    player.on(discordVoice.AudioPlayerStatus.Idle, () => {
        connection.destroy();
    })
    const noEmbed = new MessageEmbed()
	.setColor(config.embed.color)
    .setAuthor({ name: 'En cours de lecture'})
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