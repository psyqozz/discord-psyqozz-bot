const config = require('../config.json');
const getHistoryRuleMessage = require('../assets/channelHistory/ruleChannelHistory');
const twitterFeed = require('../socialNetwork/twitter');
const twitchFeed = require('../socialNetwork/twitch');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);

        client.user.setPresence({ activities: [{ name: config.client.activity, type: config.client.type }] });
        getHistoryRuleMessage(client);
        twitterFeed(client);
        twitchFeed(client);
    }
}