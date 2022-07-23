const embed = require("../../assets/embed/embedStructure")

exports.help = {
    name: "jerefuse"
}

exports.run = async (client, message, args) => {
	const title = '**Non, je refuse ❌📛**';
	const description = 'https://www.youtube.com/watch?v=4rpEP-f8B5Q&ab_channel=TheBlaBlaGuys';
	const thumbnail = 'https://i.imgur.com/EiFi7K4.png';
	embed(message, title, null, null, description, thumbnail, null, null, null);
}