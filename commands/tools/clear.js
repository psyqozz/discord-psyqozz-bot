const config = require('../../config.json')
const embed = require("../../assets/embed/embedStructure")

exports.help = {
    name: "clear"
}

exports.run = async (client, message, args) => {
    if(message.member.permissions.has(['MANAGE_MESSAGES'])) {
        message.delete();

        if(args[0] >= 1 && args[0] <= 100){
            message.channel.bulkDelete(args[0], true)
            const description = args[0] > 1 ? config.tools.multiple_message : config.tools.one_message
            let title = '**Messages**';
            let embedDescription = `🛠 - ${args[0]} ${description}`;
            embed(message, title, null, null, embedDescription, null, null, null, true).then(mes => {
                setTimeout(() => mes.delete(), 10000)
            });
        } else {
            title = '**Effacer des messages**';
            embedDescription = `⛔ - il faut préciser un nombre entre 1 et 99`;
            embed(message, title, null, null, embedDescription, null, null, null, true).then(mes => {
                setTimeout(() => mes.delete(), 10000)
            });
        }
    } else {
        title = '**Modération**';
        embedDescription = '⛔ - Tu n\'as pas la permission pour faire ça.';
        embed(message, title, null, null, embedDescription, null, null, null, true).then(mes => {
            setTimeout(() => mes.delete(), 10000)
        });
    }
  
}