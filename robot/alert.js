const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require(`canvas`);

module.exports = async (client, content) => {
    try {
        const dataURL = content['input-canvas-name'];
        const canvas = Canvas.createCanvas(741, 556);
        const ctx = canvas.getContext(`2d`);
        const imageLoaded = await Canvas.loadImage(dataURL);   
        ctx.drawImage(imageLoaded, 0, 0, canvas.width, canvas.height);     
        const attachment = new AttachmentBuilder(canvas.toBuffer(), {name: `bonk-generator.png`});
        const alertChannel = client.channels.cache.get(`996780615393345636`);
        const alertEmbed = new EmbedBuilder().setTitle(`<:c_Dog:942871347841892482> Novo bonk!`).setColor(`#ff5530`).setImage(`attachment://bonk-generator.png`).setTimestamp();
        alertChannel.send({embeds: [alertEmbed], files: [attachment]});
    } catch (e) {
        console.error(e);
    }
};