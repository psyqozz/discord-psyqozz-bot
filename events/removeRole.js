const config = require('../config.json');

module.exports = {
    name: 'messageReactionRemove',
    execute(message, user, client) {
        if(message.message.channel.id !== config.channel.rule_id) return;

        cmd = client.manageRoles.get("reglement_remove_role");
        cmd.run(message, user);
    }
}