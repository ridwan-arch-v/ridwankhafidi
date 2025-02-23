require('dotenv').config(); // Memuat variabel dari file .env
const { Client, GatewayIntentBits } = require('discord.js');

// Ambil nilai token dan guild_id dari variabel lingkungan
const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;
const channelId = process.env.CHANNEL_ID;

// Buat client bot dengan intents yang benar
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,         // Untuk mengakses server (guild)
    GatewayIntentBits.GuildMessages,  // Untuk mengakses pesan di server (guild)
  ]
});

// Event: Ketika bot siap
client.once('ready', async () => {
    console.log('Bot sudah siap!');

    try {
        // Cek apakah bot dapat mengakses server (guild) berdasarkan guildId
        const guild = await client.guilds.fetch(guildId);
        console.log(`Bot berhasil terhubung ke server: ${guild.name} (ID: ${guild.id})`);

        // Cek apakah bot dapat mengakses channel berdasarkan channelId
        const channel = await client.channels.fetch(channelId);
        console.log(`Bot berhasil mengakses channel: ${channel.name} (ID: ${channel.id})`);

        // Kirim pesan percakapan untuk memastikan semuanya berjalan
        await channel.send('Test berhasil! Bot dapat mengakses server dan channel ini.');

        console.log('Pesan percakapan berhasil dikirim!');

    } catch (error) {
        console.error('Gagal mengakses guild atau channel:', error);
    }
});

// Login dengan token bot
client.login(token).catch(console.error);
