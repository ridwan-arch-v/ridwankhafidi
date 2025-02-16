const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const token = 'MTM0MDUxMDM5NDI3OTc4ODU5Ng.GVbjsr.06ywZ0eVNV6HjQ-PcNu7H-n7kl1PjVPXTvvtYQ';
const guildId = '1339264400846225542'; // The ID of the server where the channel will be created.

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
