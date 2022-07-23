const embed = require("../../assets/embed/embedStructure")

exports.help = {
    name: "bark"
}

exports.run = async (client, message, args) => {
	const title = '🔴🔴 Va voir cette masterclass !!! 🔴🔴';
	const description = 'https://www.youtube.com/watch?v=XS4ostn5EjY&ab_channel=ZORUYOUNG';
	const thumbnail = 'https://i.imgur.com/iWJiieP.jpg';
	embed(message, title, null, null, description, thumbnail, null, null, null);
}