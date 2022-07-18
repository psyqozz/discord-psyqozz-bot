const { consumers } = require("stream");

exports.help = {
    name: "help"
}

exports.run = async (client, message, args) => {
    message.reply("**🧾 __Liste des commandes :__ 🧾 ** \n" + 
        "**!help** : Affiche les commandes \n" +
        "**!bark** : Test tu verras 😏 \n" +
        "**!jerefuse** : Non je refuse \n" +
        "**!carlos** : numero 1 dans mon consumer 💖 \n" +
        "**!#** : humour tsé "
    );
};