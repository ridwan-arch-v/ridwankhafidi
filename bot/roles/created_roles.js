const { Client, GatewayIntentBits, MessageEmbed } = require('discord.js');
require('dotenv').config(); // Load environment variables

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', async () => {
  console.log('Bot is ready!');
  const guild = await client.guilds.fetch(guildId);

  // Create a new role
  guild.roles.create({
    name: 'NewRole',  // Name of the role
    color: 'BLUE',  // Role color
    reason: 'Role created for reaction role feature',
  }).then(role => {
    console.log(`Role created: ${role.name}`);
  }).catch(err => console.error('Error creating role:', err));
});

client.login(token);
