const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

/* Bot do Discord */
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, /*Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES,*/ GatewayIntentBits.GuildVoiceStates], partials: [Partials.Channel] });
const TOKEN = process.env.TOKEN;
const LoadBot = require('./robot/bot');
const Alert = require('./robot/alert');

/* Criando app express */
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '100mb'
}));
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname + "temp")
}));
app.use(cors());

/* Configurar para que o Node.js acesse a pasta public */
app.use(express.static(__dirname + '/public'));

app.get(`/`, (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + "\\public\\pages\\index.html");
});

app.post(`/result`, function(req, res) {
    res.send(req.body);
    Alert(client, req.body);
});

app.listen(port, () => {
    LoadBot(client, TOKEN);
    console.log(`🐶 Servidor ligado na porta ${port}!`);
});