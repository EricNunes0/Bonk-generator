const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas');

module.exports = async (client, content) => {
    try {
        const userId = content['id'];
        const userName = content['username'];
        const userDiscriminator = content['discriminator'];
        const userAvatarURL = content['avatar-url'];
        const format = content['format'];
        const dataURL = content['dataurl'];
        const channelId = content['channelId'];
        let idArgs = channelId.trim().split(/ +/g);
        const canvas = Canvas.createCanvas(741, 556);
        const ctx = canvas.getContext("2d");
        const imageLoaded = await Canvas.loadImage(dataURL);   
        ctx.drawImage(imageLoaded, 0, 0, canvas.width, canvas.height);
        const attachment = new AttachmentBuilder(canvas.toBuffer(), {name: `bonk-generator.${format}`});
        const alertEmbed = new EmbedBuilder().setAuthor({name: `〔🐶〕${userName} te deu um:`, iconURL: userAvatarURL}).setTitle(`Bonk! <:c_Dog:942871347841892482>`).setColor(`#c9885f`).setImage(`attachment://bonk-generator.${format}`).setFooter({text: `ID: ${userId}`, iconURL: userAvatarURL});
        for(let id of idArgs) {
            let sendChannel;
            if(client.users.cache.get(`${id}`)) {
                sendChannel = client.users.cache.get(id);
            } else if(client.channels.cache.get(id)) {
                sendChannel = client.channels.cache.get(id);
            };
            if(!sendChannel) {
                sendChannel = client.channels.cache.get(`996780615393345636`);
            };
            sendChannel.send({embeds: [alertEmbed], files: [attachment]});
            console.log(`Mensagem enviada para ${id}`);
        };
    } catch (e) {
        console.error(e);
    }
};