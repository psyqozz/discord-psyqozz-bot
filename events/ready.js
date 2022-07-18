const config = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);

        client.user.setPresence({ activities: [{ name: config.client.activity, type: config.client.type }] });
    }
}