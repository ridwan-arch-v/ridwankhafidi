const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config(); // Load environment variables

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', async () => {
  console.log('Bot is ready!');
  const guild = await client.guilds.fetch(guildId);

  // Get the channel where you want to send the message
  const channel = await guild.channels.fetch('YOUR_CHANNEL_ID');  // Replace with actual channel ID
  
  // Send a message with emoji options for reaction roles
  const message = await channel.send('React to this message to get your role!');
  
  // Add emoji reactions
  message.react('👍');  // Add thumbs up emoji for one reaction
  message.react('👎');  // Add thumbs down emoji for another reaction
});

client.login(token);
