const config = require('../config.json');
const embed = require("../assets/embed/embedStructure")

exports.help = {
    name: 'hello'
}

exports.run = async (client, message, args) => {
    const username = message.mentions.users.first() ? message.mentions.users.first() : message.author;
    const member = message.guild.members.cache.get(username.id);
    const nickname = member ? member.displayName : username.username;
    const helloInteraction = config.interaction.hello;

    helloInteraction.forEach(e => {
        if(message.content.indexOf(e) !== -1) {
            const title = `**Hola ça va ${nickname} **`;
            embed(message, title, null, null, null, null, null, null, null)
        }
    });    
    return;
}