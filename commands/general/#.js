const config = require('../../config.json')
const embed = require("../../assets/embed/embedStructure")

exports.help = {
    name: "#"
}

exports.run = async (client, message, args) => {
	const title = '**⚠⚠ ALERTE HUMOUR !!! ⚠⚠**';
	const description = 'Humour poto allo';
	const fields = [
		{ name: '😝', value: '#boutade #haha #joke #C\'estLeDiscordDePsyqozzIci'}
	]
	embed(message, title, null, null, description, config.embed.picture, fields, null, null);
}