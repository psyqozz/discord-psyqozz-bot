const embed = require("../../assets/embed/embedStructure")

exports.help = {
    name: "carlos"
}

exports.run = async (client, message, args) => {
    const title = '**Le numéro 1 de Psyqozz_ ❤❤**';
    const image = 'https://media.tenor.com/images/67bb0cf5da35c54331703f6b52da7e32/tenor.gif';
    embed(message, title, null, null, null, null, null, image, null);
}
