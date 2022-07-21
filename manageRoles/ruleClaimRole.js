const config = require('../config.json');

exports.help = {
    name: 'reglement_add_role'
}

exports.run = async (reaction, user) => {
    if(reaction.emoji.name === "✅"){
        const followerRole = reaction.message.guild.roles.cache.find(
            (r) => r.id === config.channel.role_id
        );
    
        const member = reaction.message.guild.members.cache.find(member => member.id === user.id);
        member.roles.add(followerRole).then(success => {
            console.log(`Role ${followerRole} added to ${member}`);
        }, error => {
            console.log("Error : ", error);
        });
    }   
}