const embed = require("../../assets/embed/embedStructure")

exports.help = {
    name: "userinfo"
}

exports.run = async (client, message, args) => {
    const username = message.mentions.users.first() ? message.mentions.users.first() : message.author;
    let member = message.guild.members.cache.get(username.id);
    let nickname = member ? member.displayName : username.username;

    const author = {name: `Information sur ${nickname} `, iconURL: username.displayAvatarURL()};
    const description = `Information sur l'utilisateur ${username.tag}`;
    const thumbnail = username.displayAvatarURL();
    const fields = [
        { name: '**ID**', value: `${username.id}`, inline: true},
		{ name: '**Pseudo**', value: `${nickname}`},
        { name: '**Modérateur**', value: `${member.permissions.has(['BAN_MEMBERS']) ? '🟢' : '🔴'}`, inline: true },
        { name: '**Bot**', value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true},
        { name: '**Rôles**', value: `${member.roles.cache.map(role => role).join(',')}`},
        { name: '**A rejoint le serveur le**', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`, inline: true },
        { name: '**A crée son compte le**', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`, inline: true },
    ]
    embed(message, null, null, author, description, thumbnail, fields, null, true);
}