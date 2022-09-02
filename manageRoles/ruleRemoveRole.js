const config = require('../config.json');

exports.help = {
    name: 'reglement_remove_role'
}

exports.run = async (reaction, user) => {
    if(reaction.emoji.name === "✅"){
        const followerRole = reaction.message.guild.roles.cache.find(
            (r) => r.id === config.channel.role_id
        );

        let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
        if(!member){
            await reaction.message.guild.members.fetch();
            member = reaction.message.guild.members.cache.find(member => member.id === user.id);
        }
        member.roles.remove(followerRole).then(success => {
            console.log(`Role ${followerRole} removed to ${member}`);
        }, error => {
            console.log("Error : ", error);
        });
    }   
}