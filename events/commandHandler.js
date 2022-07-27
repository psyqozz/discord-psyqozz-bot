const config = require('../config.json');

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if(message.author.bot || message.channel.type === 'dm') return;

        const messageArray = message.content.split(" ");
        const cmd = messageArray[0];
        const args = messageArray.slice(1);

        if(!cmd.startsWith(config.client.prefix)) return;

        const commandeFile = client.commands.get(cmd.slice(config.client.prefix.length));
        if(commandeFile) commandeFile.run(client, message, args);
    }
}