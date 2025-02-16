const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();  // Load environment variables from .env file

// Fetch the bot token and server ID from environment variables
const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;  // Get server ID from .env

// Check if the necessary environment variables are defined
if (!token || !guildId) {
  console.error('Error: DISCORD_TOKEN or GUILD_ID is not defined in the .env file');
  process.exit(1);  // Exit the program if the required env variables are not present
}

// Set up the bot and intents
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Event listener when the bot is ready
client.once('ready', async () => {
  console.log('Bot is ready!');
  
  // Fetch the guild (server) based on the guildId
  try {
    const guild = await client.guilds.fetch(guildId);
    console.log(`Connected to guild: ${guild.name}`);

    // Ask the user for category ID
    const categoryId = '1339274132075974789'; // Replace with actual category ID to test

    // Fetch the category by ID
    const category = await guild.channels.fetch(categoryId);

    // Check if the category exists and is valid
    if (category && category.type === 'GUILD_CATEGORY') {
      console.log(`Category found: ${category.name} (ID: ${category.id})`);

      // List all channels in the category
      const channels = category.children.cache.map(channel => channel.name);
      console.log('Channels in this category:', channels);
    } else {
      console.error('The provided ID is not a valid category or the category does not exist.');
    }
  } catch (error) {
    console.error('Error fetching category or guild:', error);
  }
});

// Log in using the token from the .env file
client.login(token);
