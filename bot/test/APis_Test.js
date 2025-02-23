require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

// Membaca token dan channel ID dari .env
const token = process.env.DISCORD_TOKEN;
const channelId = process.env.CHANNEL_ID;
const serverId = process.env.SERVER_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.once('ready', () => {
    console.log('Bot is online!');
    testSendMetadataToDiscord();
});

client.login(token);

// Fungsi untuk mengirim metadata sample ke Discord
async function testSendMetadataToDiscord() {
    try {
        // Mendapatkan informasi tambahan seperti server, anggota, dan status bot
        const guild = await client.guilds.fetch(serverId);
        const memberCount = guild.memberCount;
        const botStatus = client.user.presence ? client.user.presence.status : 'offline';

        // Membuat metadata tambahan
        const creationDate = guild.createdAt ? guild.createdAt.toISOString() : 'N/A';  // Pengecekan tambahan

        const metadata = {
            id: '1234567890',
            name: 'Sample Webhook',
            avatar: 'https://example.com/avatar.png',
            channel_id: channelId,
            guild_id: serverId,
            created_at: new Date().toISOString(),
            user: {
                id: '987654321',
                username: 'SampleUser',
                discriminator: '1234',
                avatar_url: 'https://example.com/user_avatar.png',
                email: 'sampleuser@example.com',
                is_admin: false,
                join_date: new Date().toISOString(),
                roles: ['Member', 'Moderator'],
                badges: ['Early Supporter', 'Verified'],
                last_login: new Date().toISOString(),
                permissions: ['read', 'write', 'manage'],
            },
            server: {
                id: guild.id,
                name: guild.name,
                region: guild.region,
                member_count: memberCount,
                creation_date: creationDate,  // Menggunakan nilai yang telah diperbaiki
                owner_id: guild.ownerId,
                vanity_url_code: guild.vanityURLCode,
                icon_url: guild.iconURL({ dynamic: true }),  // Perbaikan di sini
                verification_level: guild.verificationLevel,
                system_channel_id: guild.systemChannelId,
                premium_tier: guild.premiumTier,
                emojis_count: guild.emojis.cache.size,
                features: guild.features,
                roles: guild.roles.cache.map(role => role.name),
            },
            bot_status: botStatus,
            timestamp: new Date().toISOString(),
            additional_info: {
                uptime: process.uptime(),
                platform: process.platform,
                node_version: process.version,
                memory_usage: process.memoryUsage(),
                cpu_usage: process.cpuUsage(),
            },
            extended_info: {
                server_ping: guild.shard.ping,
                bot_latency: client.ws.ping,
                database_info: {
                    db_host: 'localhost',
                    db_name: 'discord_data',
                    db_size: '1GB',
                    db_last_updated: new Date().toISOString(),
                },
                system_info: {
                    os: 'Linux',
                    arch: 'x64',
                    cpu: 'Intel i7-9700K',
                    ram: '16GB',
                },
            },
        };

        // Membuat string JSON dengan format code block (3 backticks)
        const message = `\`\`\`json\n${JSON.stringify(metadata, null, 2)}\n\`\`\``;

        // Mengirimkan metadata ke Discord
        await axios.post(`https://discord.com/api/v10/channels/${channelId}/messages`, {
            content: message,
        }, {
            headers: {
                Authorization: `Bot ${token}`,
            },
        });

        console.log('Webhook metadata sent successfully!');
    } catch (error) {
        console.error('Error sending webhook metadata:', error);
    }
}
