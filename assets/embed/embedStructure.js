const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');


module.exports = async(message, title, url, author = {name: String, iconUrl: String, url: String}, description, thumbnail, fields = [{name: String, value: String, inline: Boolean}], image, timestamp) => {
    const embed = new MessageEmbed()
	.setColor(config.embed.color);
    if(author){
        embed.setAuthor({ name: author.name, iconURL: author.iconUrl, url: author.url});
    }
    if(title){
        embed.setTitle(title);
    }
    if(url){
        embed.setURL(url);
    }
    if(description){
        embed.setDescription(description);
    }
    if(thumbnail){
        embed.setThumbnail(thumbnail);
    }
	if(fields){
        fields.forEach(field => {
            embed.addFields(
                { name: field.name, value: field.value, inline: field.inline }
            )
        });
    }   
	if(timestamp){
        embed.setTimestamp();
    }
    if(image){
        embed.setImage(image);
    }
	embed.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

    return message.channel.send({ embeds: [embed] });

}