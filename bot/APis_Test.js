const path = require('path');
console.log('Current directory:', __dirname);
console.log('Looking for .env at:', path.resolve(__dirname, 'discord_token.env'));

// Memuat file .env sebelum menggunakan variabel dari file tersebut
require('dotenv').config({ path: path.resolve(__dirname, 'discord_token.env') });

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;

console.log('Discord Token:', token);
console.log('Guild ID:', guildId);
