const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;  // Get server ID from .env

client.once('ready', async () => {
    console.log('Bot is ready!');
    const guild = await client.guilds.fetch(guildId);
    
    // Create a text channel
    const channel = await guild.channels.create({
        name: 'test_channel', // The name of the new channel
        type: ChannelType.GuildText,   // Correct way to specify a text channel type
    });

    console.log(`Created new channel: ${channel.name}`);
});

client.login(token);
