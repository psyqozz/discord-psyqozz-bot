const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');


module.exports = async(message, title, url, author = {name: String, iconUrl: String, url: String}, description, thumbnail, fields = [{name: String, value: String, inline: Boolean}], image, timestamp) => {
    const embed = new MessageEmbed()
	.setColor(config.embed.color);

    author ? embed.setAuthor({ name: author.name, iconURL: author.iconUrl, url: author.url}) : null;
    title ? embed.setTitle(title) : null;
    url ? embed.setURL(url) : null;
    description ? embed.setDescription(description) : null;
    thumbnail ? embed.setThumbnail(thumbnail) : null;
    fields ? fields.forEach(field => { embed.addFields({ name: field.name, value: field.value, inline: field.inline }) }) : null;
    timestamp ? embed.setTimestamp() : null;
    image ? embed.setImage(image) : null;

	embed.setFooter({ text: config.embed.thanks, iconURL: config.embed.picture });

    return message.channel.send({ embeds: [embed] });

}