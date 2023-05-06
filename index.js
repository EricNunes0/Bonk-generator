const express = require('express');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

/* Bot do Discord */
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences, /*Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES,*/ GatewayIntentBits.GuildVoiceStates], partials: [Partials.Channel] });
const TOKEN = process.env.TOKEN;
const LoadBot = require('./robot/bot');
const Alert = require('./robot/alert');

/* Criando app express */
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Configurar para que o Node.js acesse a pasta public */
app.use(express.static(__dirname + '/public'));

app.all(`/*`, function(req, res, next) {
    res.setHeader("Acess-Control-Allow-Origin", "*");
    res.setHeader("Acess-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

/* Enviando a página principal */
app.get(`/`, (req, res) => {
    res.sendFile(__dirname + "/public/pages/index.html");
});

app.post(`/send`, function(req, res) {
    let requestBody = req.body;
    if(!requestBody["channelId"]) {
        requestBody["channelId"] = `996780615393345636`;
    }
    res.status(200).sendFile(__dirname + "/public/pages/sent.html");
    Alert(client, requestBody);
    //res.end();
});

/* Buscando e enviando imagem por url para a página principal */
app.post(`/`, (req, res) => {
    let imgUrl = req.body.url;
    const response = axios.get(imgUrl, {
        responseType: 'arraybuffer'
    }).then((responseBuffer) => {
        const bufferConverted = Buffer.from(responseBuffer.data, 'binary').toString('base64');
        res.send(`<img src="data:image/png;base64,${bufferConverted}" />`);
    });
});

process.on(`unhandledRejection`, (reason, promise) => {
    console.error(`〔⚠️²〕Unhandled Rejection:`, reason);
});

app.listen(process.env.PORT || port, () => {
    LoadBot(client, TOKEN);
    console.log(`🐶 Servidor ligado na porta ${port}!`);
});