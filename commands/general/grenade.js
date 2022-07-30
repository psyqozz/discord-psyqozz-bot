const embed = require("../../assets/embed/embedStructure")

exports.help = {
    name: "grenade"
}

exports.run = async (client, message, args) => {
    const title = '**💥 Attention les jeunes, bescherelle 💥**';
    const image = 'https://c.tenor.com/zAr15P6KMyAAAAAC/bescherelle-militaire.gif';
    embed(message, title, null, null, null, null, null, image, null);
}