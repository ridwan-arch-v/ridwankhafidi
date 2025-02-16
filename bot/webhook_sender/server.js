const express = require('express');
const path = require('path');
const axios = require('axios');
const moment = require('moment');

const app = express();
const port = 3000;

app.use(express.json()); // Untuk parse JSON request
app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

// Endpoint untuk menampilkan HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Mengarahkan ke file HTML
});

// Endpoint untuk mengirim pesan ke webhook
app.post('/send', async (req, res) => {
    const { webhook_url, message } = req.body;

    if (!webhook_url || !message) {
        return res.status(400).json({
            status: 'error',
            message: 'Webhook URL or message is missing!',
        });
    }

    // Membuat struktur payload JSON sesuai yang Anda inginkan
    const jsonPayload = {
        message: {
            content: message,  // Isi pesan
            timestamp: moment().toISOString(),  // Tanggal dan waktu sekarang
            status: "sent",  // Status pesan
            channel: {
                id: "987654321",  // ID channel
                name: "general",  // Nama channel
                type: "text",  // Tipe channel
                description: "Main channel for discussions"  // Deskripsi channel
            },
            sender: {
                userId: "user123",  // ID user pengirim
                username: "JohnDoe",  // Nama user pengirim
                roles: ["admin"],  // Peran pengguna
                status: "online",  // Status pengguna
                joinDate: "2024-01-15T08:30:00Z"  // Tanggal bergabung
            },
            webhook: {
                webhookId: "987654321",  // ID webhook
                webhookName: "ExampleWebhook",  // Nama webhook
                webhookUrl: webhook_url,  // URL webhook
                createdAt: moment().subtract(1, 'hours').toISOString(),  // Waktu pembuatan webhook
                lastTriggered: moment().subtract(10, 'minutes').toISOString(),  // Waktu terakhir webhook dipicu
                status: "active"  // Status webhook
            },
            deliveryStats: {
                totalMessagesSent: 100,  // Total pesan yang terkirim
                successfulDeliveries: 98,  // Jumlah pengiriman sukses
                failedDeliveries: 2,  // Jumlah pengiriman gagal
                lastDeliveryTime: moment().subtract(5, 'minutes').toISOString()  // Waktu pengiriman terakhir
            }
        }
    };

    // Format pesan untuk block code JSON
    const data = {
        content: `\`\`\`json\n${JSON.stringify(jsonPayload, null, 2)}\n\`\`\``
    };

    try {
        // Mengirim pesan ke Discord Webhook
        const response = await axios.post(webhook_url, data);

        // Menampilkan hasil dalam format JSON block code
        return res.status(200).json({
            status: 'success',
            message: 'Message sent successfully!',
            webhook_url,
            sent_message: message,
            jsonPayload: data.content  // Kirimkan blok kode JSON
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Failed to send message to the webhook.',
            error: error.response ? error.response.data : error.message,
        });
    }
});

// Server berjalan pada port 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
