const config = require('../config.json');

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if(message.author.bot) return;

        if(message.channel.type === 'dm') return;

        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);

        if(!cmd.startsWith(config.client.prefix)) return;

        let commandeFile = client.commands.get(cmd.slice(config.client.prefix.length));
        if(commandeFile) commandeFile.run(client, message, args);
    }
}