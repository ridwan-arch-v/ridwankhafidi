const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const readline = require('readline');
require('dotenv').config();  // Load environment variables from .env file

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;  // Server ID
const logChannelId = process.env.LOG_CHANNEL_ID;  // ID channel untuk log metadata

// Set up the bot and intents
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.once('ready', async () => {
  console.log('Bot is ready!');

  try {
    // Fetch the guild (server) by guildId
    const guild = await client.guilds.fetch(guildId);
    console.log(`Connected to guild: ${guild.name}`);

    // Ask user to input the channel ID where the webhook will be created
    rl.question('Please enter the Channel ID where you want to create the webhook: ', async (channelIdInput) => {
      const channelId = channelIdInput.trim();

      // Fetch the specific channel to create a webhook in
      const channel = await guild.channels.fetch(channelId);
      if (channel.type !== ChannelType.GuildText) {
        console.log('The specified channel is not a text channel.');
        rl.close();
        return;
      }

      // Create the webhook
      const webhook = await channel.createWebhook({
        name: `${channel.name} Webhook`,  // Webhook name
        avatar: 'https://example.com/avatar.png',  // Avatar for webhook (you can change this)
      });

      // Log and send the webhook creation statistics
      const webhookStats = {
        createdAt: new Date().toISOString(),
        image: webhook.avatarURL(),
        webhook: {
          name: webhook.name,
          id: webhook.id,
          url: webhook.url,
          type: 'POST',  // Webhook type (can be adjusted depending on the request type)
          status: 'active',
        },
        channel: {
          name: channel.name,
          id: channel.id,
          description: channel.topic || 'No description available',
          type: channel.type,
          serverId: guild.id,
          membersCount: channel.members ? channel.members.size : 0,  // Count members in the channel
        },
        message: `Webhook for channel "${channel.name}" was successfully created.`,
        eventDetails: {
          eventType: 'creation',
          triggeredBy: 'bot',
          additionalInfo: 'Webhook created with default settings',
        },
        status: {
          code: 200,
          description: 'Webhook successfully created.',
        }
      };

      // Send the JSON log (you can send this to another channel, file, etc.)
      console.log(JSON.stringify(webhookStats, null, 2));

      // Send the JSON log message to the specified log channel
      const logChannel = await guild.channels.fetch(logChannelId);  // Fetch log channel by ID
      
      // Check if the channel is a valid text channel
      if (logChannel && logChannel.type === ChannelType.GuildText) {
        await logChannel.send(`\`\`\`json\n${JSON.stringify(webhookStats, null, 2)}\n\`\`\``);
        console.log('Webhook metadata sent to log channel.');
      } else {
        console.error('Log channel is not a valid text channel or cannot be accessed.');
      }

      console.log('Webhook created successfully and metadata sent to log channel.');
      rl.close(); // Close the readline prompt after processing
    });

  } catch (error) {
    console.error('Error fetching guild, channel, or creating webhook:', error);
  }
});

// Log in using the token from the .env file
client.login(token);
