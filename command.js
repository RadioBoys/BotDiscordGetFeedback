
const tokenClient = process.env.TOKEN_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'feedback',
        description: 'Send feedback to us',
    },
];

const rest = new REST({ version: '10' }).setToken(tokenClient);

async function slash() {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}
slash();

