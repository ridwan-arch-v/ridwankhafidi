const { Client, GatewayIntentBits } = require('discord.js');
const readline = require('readline');
require('dotenv').config();  // Load environment variables from the .env file

// Load your token
const token = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// Readline interface to prompt the user in the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

client.once('ready', async () => {
  console.log('Bot is ready!');

  // Ask for the channel ID where webhooks are located
  rl.question('Enter the Channel ID to fetch webhooks: ', async (channelId) => {
    try {
      const channel = await client.channels.fetch(channelId);

      // Fetch webhooks for the channel
      const webhooks = await channel.fetchWebhooks();

      // If no webhooks found, notify the user
      if (webhooks.size === 0) {
        console.log('No webhooks found in this channel.');
        rl.close();
        return;
      }

      // Display all webhooks with a number
      console.log('Available webhooks:');
      let counter = 1;
      webhooks.forEach((webhook, index) => {
        console.log(`${counter++}. Webhook Name: ${webhook.name}, Webhook ID: ${webhook.id}`);
      });

      // Ask the user to select a webhook
      rl.question('Select the webhook number: ', async (number) => {
        const selectedWebhook = Array.from(webhooks.values())[number - 1]; // Fix here
        
        if (!selectedWebhook) {
          console.log('Invalid selection.');
          rl.close();
          return;
        }

        // Handle the case if user info is not available
        const creatorInfo = selectedWebhook.user 
          ? {
              id: selectedWebhook.user.id,
              username: selectedWebhook.user.username,
            }
          : {
              id: 'N/A',
              username: 'N/A',
            };

        // Format the webhook information into JSON
        const webhookInfo = {
          createdAt: selectedWebhook.createdAt,
          name: selectedWebhook.name,
          id: selectedWebhook.id,
          url: selectedWebhook.url,
          channel: {
            name: selectedWebhook.channel.name,
            id: selectedWebhook.channel.id,
          },
          creator: creatorInfo,  // Using creatorInfo here
        };

        // Send the JSON to the channel
        channel.send(`Here is the webhook information:\n\`\`\`json\n${JSON.stringify(webhookInfo, null, 2)}\n\`\`\``);
        console.log('Webhook information has been sent to the channel.');

        // Close the readline interface
        rl.close();
      });
    } catch (error) {
      console.error('Error occurred:', error);
      rl.close();
    }
  });
});

// Log in using the bot token
client.login(token);
