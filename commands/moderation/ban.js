const embed = require("../../assets/embed/embedStructure")

exports.help = {
    name: "ban"
}

exports.run = async (client, message, args) => {
    if(message.member.permissions.has(['BAN_MEMBERS'])) {
        user = message.mentions.users.first();
        let reason = args.slice(1).join(" ");

        message.delete();
        let title = '**Modération - Pour ban une personne**';
        let description = '**⛔ - ban <member> <raison>**';
        if(!user || !reason) return embed(message, title, null, null, description, null, null, null, true).then(mes => {
            setTimeout(() => mes.delete(), 10000)
        });

        title = '**Modération**';
        description = `⛔ - le membre ${user} a été bannis du serveur`;
        let fields = [
            { name: '**Raison**', value: `${reason}` },
            { name: '**Ban par**', value: `${message.author.username}` }
        ];

        message.guild.members.ban(user, {reason: reason});
        embed(message, title, null, null, description, null, fields, null, true).then(mes => {
            setTimeout(() => mes.delete(), 5000)
        });
    } else {
        title = '**Modération**';
        description = `⛔ - Tu n\'as pas la permission pour faire ça.`;
        embed(message, title, null, null, description, null, null, null, true).then(mes => {
            setTimeout(() => mes.delete(), 10000)
        });
    }
  
}