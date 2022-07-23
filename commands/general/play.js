const { MessageEmbed } = require('discord.js');
const discordVoice = require("@discordjs/voice");
const config = require('../../config.json')
const playDl = require('play-dl')

exports.help = {
    name: "p"
}

exports.run = async (client, message, args) => {
    if(message.author.bot) return;

    const serverQueue = client.queue.get(message.guild.id);
    const voice_channel = message.member.voice.channel;

    if(!voice_channel) return message.reply("❌ - Connecte toi dans un salon");
    if(!args[0]) return message.reply("❌ - Balance une musique !play <music>");
    //if(client.voice.connections.size > 0) return message.reply("❌ - Je suis déjà dans un channel");
    const permissions = voice_channel.permissionsFor(message.client.user);
    if(!permissions.has('CONNECT')) return message.reply("❌ - Je peux pas me connecter au channel");
    if(!permissions.has('SPEAK')) return message.reply("❌ - Je peux pas parler");

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
            return message.reply("❌ - Aucune vidéo trouvé");
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

            play(message, queueConstruct.songs[0], client, queueConstruct.stream);
        } catch (error) {
            message.channel.send("❌ - Une erreur est survenue");
            console.log(error);
        }
    } else {
        serverQueue.songs.push(song);
        const addedSongEmbed = new MessageEmbed()
        .setColor(config.embed.color)
        .setAuthor({ name: 'Son ajouté à la queue'})
        .setTitle(`**${song.title}**`)
        .setURL(song.url)
        .setThumbnail(song.thumbnails)
        .addFields(
            { name: '**Chaine**', value: `${song.ownerChannel}`, inline: true },
            { name: '**Durée**', value: `${song.duration}`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });
        return message.channel.send({ embeds: [addedSongEmbed] });   
    }
}

async function play(message, song, client){
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

    const playEmbed = new MessageEmbed()
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

    message.channel.send({ embeds: [playEmbed] });

    serverQueue.player.on(discordVoice.AudioPlayerStatus.Idle, () => {
        serverQueue.songs.shift();
        play(message, serverQueue.songs[0], client);
    })

    serverQueue.player.on('error', error => {
        console.log(error);
        message.channel.send("❌ - Une erreur est survenue");
    });
}