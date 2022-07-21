const config = require('../config.json');

module.exports = {
    name: 'messageReactionAdd',
    execute(message, user, client) {
        if(message.message.channel.id !== config.channel.rule_id) return;

        cmd = client.manageRoles.get("reglement_add_role");
        cmd.run(message, user);
    }
}