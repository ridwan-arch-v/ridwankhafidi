// Import required modules
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const fs = require('fs');
const readline = require('readline');
require('dotenv').config();  // Load environment variables from the .env file

// Fetch the bot token and server ID from environment variables
const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;  // Get server ID from .env

// Log if variables are not found
if (!token || !guildId) {
  console.error('Error: DISCORD_TOKEN or GUILD_ID is not defined in the .env file');
  process.exit(1);  // Exit the program if the required env variables are not present
}

// Set up the bot and intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.once('ready', async () => {
  console.log('Bot is ready!');
  
  try {
    const guild = await client.guilds.fetch(guildId);  // Fetch the guild

    // Read channel names from the file asynchronously
    fs.readFile('channel_name.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        rl.close();
        return;
      }

      // Split the file content into channel names (by line)
      const channelNames = data.split('\n').map(name => name.trim()).filter(Boolean);

      // Prompt user to choose a category ID where channels will be created
      rl.question('Enter the category ID where channels will be created: ', async (categoryId) => {
        // Prompt for the target channel ID where messages will be sent
        rl.question('Enter the channel ID to send creation info: ', async (messageChannelId) => {
          try {
            const category = await guild.channels.fetch(categoryId);  // Fetch the category by ID
            const messageChannel = await guild.channels.fetch(messageChannelId);  // Fetch the message channel by ID

            // Loop through the channel names and create channels
            for (const name of channelNames) {
              try {
                // Create the channel in the specified category
                const channel = await guild.channels.create({
                  name: name,
                  type: ChannelType.GuildText,   // Creating a text channel
                  parent: category.id,           // Assign the channel to the specified category
                });

                console.log(`Created channel: ${channel.name}`);

                // Prepare JSON output with channel details
                const channelDetails = {
                  channelName: channel.name,
                  channelId: channel.id,
                  categoryId: category.id,
                  categoryName: category.name,
                  createdAt: channel.createdAt,
                  creationDate: new Date().toLocaleString(),
                  message: `Channel "${channel.name}" was successfully created.`
                };

                // Send the creation details to the specified channel as a JSON message
                await messageChannel.send({
                  content: 'Channel creation details:',
                  embeds: [{
                    title: 'Channel Created',
                    description: `Channel "${channel.name}" has been created successfully.`,
                    fields: [
                      { name: 'Channel Name', value: channel.name },
                      { name: 'Channel ID', value: channel.id },
                      { name: 'Category Name', value: category.name },
                      { name: 'Creation Date', value: new Date().toLocaleString() },
                    ],
                    color: 0x00ff00,
                  }],
                });

              } catch (error) {
                console.error(`Failed to create channel ${name}:`, error);
              }
            }
          } catch (categoryError) {
            console.error(`Error fetching category or message channel: ${categoryError}`);
          }

          rl.close();  // Close the prompt after processing
        });
      });
    });
  } catch (error) {
    console.error('Error fetching guild:', error);
  }
});

client.login(token);  // Log in using the token from the .env file
