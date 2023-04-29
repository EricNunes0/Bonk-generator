const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = async (client, content) => {
    try {
        const dataURL = content['input-canvas-name'];
        //const canvas = Canvas.createCanvas(741, 556);
        //const imageLoaded = new Image(); await Canvas.loadImage(dataURL);   
        //ctx.drawImage(imageLoaded, 0, 0, canvas.width, canvas.height);    
        console.log(dataURL);
        const attachment = new AttachmentBuilder(Buffer.from(dataURL), {name: `bonk-generator.png`});
        const alertChannel = client.channels.cache.get(`996780615393345636`);
        const alertEmbed = new EmbedBuilder().setTitle(`<:c_Dog:942871347841892482> Novo bonk gerado!`).setColor(`#ff5530`).setImage(`attachment://bonk-generator.png`).setTimestamp();
        alertChannel.send({embeds: [alertEmbed], files: [attachment]});
    } catch (e) {
        console.error(e);
    }
};