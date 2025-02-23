const { Client, GatewayIntentBits, MessageEmbed } = require('discord.js');
const readline = require('readline');
require('dotenv').config();  // Load environment variables from .env file

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;  // Get server ID from .env

// Set up the bot and intents
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Set up readline interface for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to create and preview the embed
async function createEmbed() {
  // Ask for embed fields
  rl.question('Enter the channel ID where you want to send the embed: ', (channelId) => {
    rl.question('Enter the title of the embed: ', (title) => {
      rl.question('Enter the description of the embed: ', (description) => {
        rl.question('Enter the color of the embed (hex format, e.g., #FF0000): ', (color) => {
          rl.question('Enter the footer text: ', (footer) => {
            rl.question('Enter the footer icon URL (optional, press enter to skip): ', (footerIcon) => {

              // Create the embed object
              const embed = new MessageEmbed()
                .setTitle(title)
                .setDescription(description)
                .setColor(color)
                .setFooter(footer, footerIcon ? footerIcon : undefined)
                .setTimestamp();

              // Show a preview of the embed
              console.log('\nEmbed Preview:\n', embed);
              console.log('\n--- End of Embed Preview ---\n');

              // Ask for confirmation to send
              rl.question('Do you want to send this embed to the channel? (yes/no): ', async (confirm) => {
                if (confirm.toLowerCase() === 'yes') {
                  try {
                    // Fetch the channel by ID
                    const channel = await client.channels.fetch(channelId);
                    
                    // Send the embed
                    await channel.send({ embeds: [embed] });
                    console.log(`Embed successfully sent to channel ${channel.name}`);
                  } catch (error) {
                    console.error('Failed to send embed:', error);
                  }
                } else {
                  console.log('Embed creation canceled.');
                }
                rl.close(); // Close the readline interface
              });
            });
          });
        });
      });
    });
  });
}

client.once('ready', () => {
  console.log('Bot is ready!');
  createEmbed();  // Call the createEmbed function to start the process
});

client.login(token);  // Log in using the token from .env file
