const { Client, Intents, Collection } = require('discord.js');
const config = require('./config.json')
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const client = new Client({intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
})
client.commands = new Collection();
client.interactions = new Collection();
client.manageRoles = new Collection();
client.queue = new Map();

const options = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}
mongoose.connect(process.env.DATABASE_URI, options).then(() => { console.log("client connected to database")})
.catch(err => {console.log("Erreur db : ",err)})

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

const interactionsFiles = fs.readdirSync('./interactions/').filter(f => f.endsWith('.js'));
for (const file of interactionsFiles) {
    const props = require(`./interactions/${file}`);

    console.log(`L'intéraction ${file} est chargée avec succès !`)
    client.interactions.set(props.help.name, props)
}

const manageRolesFiles = fs.readdirSync('./manageRoles/').filter(f => f.endsWith('.js'));
for (const file of manageRolesFiles) {
    const props = require(`./manageRoles/${file}`);

    console.log(`Le gestionnaire de role ${file} est chargée avec succès !`)
    client.manageRoles.set(props.help.name, props)
}

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