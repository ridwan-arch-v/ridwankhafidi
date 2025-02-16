const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
require('dotenv').config();  // Load environment variables from .env file

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;  // Get server ID from .env

// Set up the bot and intents
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', async () => {
  console.log('Bot is ready!');

  try {
    // Fetch the guild (server) by guildId
    const guild = await client.guilds.fetch(guildId);
    console.log(`Connected to guild: ${guild.name}`);

    // Fetch all channels in the guild
    const channels = await guild.channels.fetch();

    // Loop through all channels to delete webhooks
    for (const [channelId, channel] of channels) {
      // Skip if the channel is not a text channel
      if (channel.type !== ChannelType.GuildText) continue;

      try {
        // Fetch webhooks for the channel
        const webhooks = await channel.fetchWebhooks();
        
        // Loop through all webhooks in the channel and delete them
        for (const webhook of webhooks) {
          await webhook.delete();
          console.log(`Deleted webhook from channel "${channel.name}"`);
        }
      } catch (error) {
        console.error(`Failed to delete webhook from channel "${channel.name}":`, error);
      }
    }

    console.log('Webhook deletion process completed.');

  } catch (error) {
    console.error('Error fetching guild or channels:', error);
  }
});

// Log in using the token from the .env file
client.login(token);
