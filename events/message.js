const config = require('../config.json');

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if(message.author.bot || message.channel.type === 'dm') return;

        client.interactions.forEach(cmd => {
            cmd.run(client, message);
        });
        
    }
}