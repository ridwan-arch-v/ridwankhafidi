const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.MessageReactionAdd] });

client.once('ready', async () => {
  console.log('Bot is ready!');
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return; // Ignore bot reactions

  // Ensure the reaction is on the correct message
  if (reaction.message.id === 'YOUR_MESSAGE_ID') {
    const role = reaction.emoji.name === '👍' ? 'RoleName1' : reaction.emoji.name === '👎' ? 'RoleName2' : null;
    
    if (role) {
      const member = await reaction.message.guild.members.fetch(user.id);
      const roleToAdd = await reaction.message.guild.roles.fetch(role);
      if (roleToAdd) {
        await member.roles.add(roleToAdd);
        console.log(`Added ${roleToAdd.name} to ${user.tag}`);
      }
    }
  }
});

client.on('messageReactionRemove', async (reaction, user) => {
  if (user.bot) return;

  if (reaction.message.id === 'YOUR_MESSAGE_ID') {
    const role = reaction.emoji.name === '👍' ? 'RoleName1' : reaction.emoji.name === '👎' ? 'RoleName2' : null;

    if (role) {
      const member = await reaction.message.guild.members.fetch(user.id);
      const roleToRemove = await reaction.message.guild.roles.fetch(role);
      if (roleToRemove) {
        await member.roles.remove(roleToRemove);
        console.log(`Removed ${roleToRemove.name} from ${user.tag}`);
      }
    }
  }
});

client.login(token);
