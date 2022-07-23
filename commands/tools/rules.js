const config = require('../../config.json');
const embed = require("../../assets/embed/embedStructure")

exports.help = {
    name: "reglement"
}

exports.run = async (client, message, args) => {
    message.delete();

    if(!message.member.permissions.has('MANAGE_GUILD')) {
        let title = '**Modération**';
        let description = '⛔ - Tu n\'as pas la permission pour faire ça.';
        
        return embed(message, title, null, null, description, null, null, null, true).then(mes => {
            mes.delete({timeout: 5000});
        });
    }

    let fields = [
        { name: `**📖 - ** ${config.channel.rule_title}`, value: `${config.channel.rules}` },
		{ name: `**⚔ - ** ${config.channel.sanction_title}`, value: `${config.channel.sanction}` },
    ];

    await embed(message, config.channel.title, null, null, null, config.embed.picture, fields, null, null).then(message => {
        message.react("✅");
    });
    
}