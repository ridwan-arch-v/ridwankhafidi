const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const readline = require('readline');
require('dotenv').config();  // Load environment variables from .env file

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;  // Get server ID from .env

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

    // Ask user if they want to create webhooks for all channels in the guild
    rl.question('Do you want to create webhooks for all channels in the server? (yes/no): ', async (answer) => {
      if (answer.toLowerCase() === 'yes') {
        // Fetch all channels in the guild
        const channels = await guild.channels.fetch();

        // Loop through all channels and create webhooks
        for (const [channelId, channel] of channels) {
          // Skip if the channel is not a text channel
          if (channel.type !== ChannelType.GuildText) continue;

          try {
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

            // Send the JSON log message to a specific channel (you can specify a channel to log in)
            const logChannel = await guild.channels.fetch('1340527372381716490');  // Replace with your log channel ID
            if (logChannel) {
              logChannel.send(`\`\`\`json\n${JSON.stringify(webhookStats, null, 2)}\n\`\`\``);
            }

          } catch (error) {
            console.error(`Failed to create webhook for channel "${channel.name}":`, error);
          }
        }

        console.log('Webhook creation process completed.');
      } else {
        console.log('No webhooks created.');
      }

      rl.close();  // Close the readline prompt after processing
    });
  } catch (error) {
    console.error('Error fetching guild or channels:', error);
  }
});

// Log in using the token from the .env file
client.login(token);
