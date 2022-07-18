const { Client, Intents, Collection } = require('discord.js');
const config = require('./config.json')
const fs = require('fs');

const client = new Client({intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
})
client.commands = new Collection();


const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'));
for (const file of commandFiles) {
    const props = require(`./commands/${file}`);

    console.log(`La commande ${file} est chargée avec succès !`)
    client.commands.set(props.help.name, props)
}

const commandSubFolders = fs.readdirSync('./commands/').filter(f => !f.endsWith('.js'));
commandSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith('.js'));

    for(const file of commandFiles) {
        const props = require(`./commands/${folder}/${file}`);
        console.log(`La commande ${file} est chargés avec succès depuis ${folder} !`)
        client.commands.set(props.help.name, props)
    }
})

const eventFiles = fs.readdirSync('./events/').filter(f => f.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args, client))
    } else {
        client.on(event.name, (...args) => event.execute(...args, client))
    }
}

client.login(config.env.token)