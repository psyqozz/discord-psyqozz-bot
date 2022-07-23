const embed = require("../../assets/embed/embedStructure")

exports.help = {
    name: "monia"
}

exports.run = async (client, message, args) => {
    const title = '**EBK EBK**';
    const image = 'https://c.tenor.com/y0UAftfinY8AAAAC/spongebob-squarepants-spongebob.gif';
    embed(message, title, null, null, null, null, null, image, null);
}