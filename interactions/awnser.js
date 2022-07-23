const config = require('../config.json');
const embed = require("../assets/embed/embedStructure")

exports.help = {
    name: 'talk'
}

exports.run = async (client, message, args) => {
    const Interaction = config.interaction.bot;
    const member = message.guild.members.cache.get( message.author.id);
    const nickname = member ? member.displayName : username.username;    

    if (message.mentions.has(client.user.id)) {
        const title = `**${Interaction[Math.floor(Math.random() * Interaction.length)]} ${nickname}**`;
        embed(message, title, null, null, null, null, null, null, null);
    } 
    return;
}