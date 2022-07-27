const embed = require("../../assets/embed/embedStructure")

exports.help = {
    name: "kick"
}

exports.run = async (client, message, args) => {
    if(message.member.permissions.has(['KICK_MEMBERS'])) {
        user = message.mentions.users.first();
        const reason = args.slice(1).join(" ");

        message.delete();
        const title = '**Modération - Pour kick une personne**';
        let description = '**⛔ - kick <member> <raison>**';
        if(!user || !reason) return embed(message, title, null, null, description, null, null, null, true).then(mes => {
            setTimeout(() => mes.delete(), 10000)
        });

        description = `⛔ - le membre ${user} a été kick du serveur`;
        const fields = [
            { name: '**Raison**', value: `${reason}` },
            { name: '**kick par**', value: `${message.author.username}` }
        ];

        message.guild.members.kick(user, {reason: reason});
        embed(message, config.moderation.title_moderation, null, null, description, null, fields, null, true).then(mes => {
            setTimeout(() => mes.delete(), 5000)
        });
    } else {       
        embed(message, config.moderation.title_moderation, null, null, config.moderation.no_permission, null, null, null, true).then(mes => {
            setTimeout(() => mes.delete(), 10000)
        });
    }
  
}