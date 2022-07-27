const config = require('../../config.json')
const embed = require("../../assets/embed/embedStructure")

exports.help = {
    name: "help"
}

exports.run = async (client, message, args) => {
	const title = '**🧾 __Liste des commandes__ 🧾**';
	const description = 'Nom de la catégorie et les commandes associées';
	const fields = [
		{ name: '**🌍 - Général**', value: '`!help, !bark, !jerefuse, !carlos, !monia, !#`' },
		{ name: '**⚔ - Modération**', value: '`!ban, !kick`' },
		{ name: '**🛠 - Outils**', value: '`!clear`' },
		{ name: '**🥇 - Ranking**', value: '`!rank, !lb`' },
		{ name: '**🎶 - Musique**', value: '`!play, !stop, !skip`' },
	]
	embed(message, title, null, null, description, config.embed.picture, fields, null, null);
};