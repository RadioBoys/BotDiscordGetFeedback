require('dotenv').config();

const tokenClient = process.env.TOKEN_ID;
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

async function postData(comment, uid, username, cid, status) {
    const data = {
        comment: comment ,
        discordUID: uid ,
        discordUsername: username ,
        discordCID: cid ,
        status: status,
    }

    await fetch('http://localhost:3000/api/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
// 1184585616701276281
client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith('/feedback')) {
        const comment = message.content.split('/feedback ')[1];

        postData(comment, message.author.id, message.author.username, message.channelId, "new");

        message.reply("Thanks for reaching out! We’ll be passing this along to the team directly! Good luck playing the game!");
    } else {
        message.reply("Please use format: /feedback + message");
    }
});



client.login(tokenClient);