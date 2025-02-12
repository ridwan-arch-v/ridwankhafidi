<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Style dasar untuk kontainer */
        .admonition-note {
            padding: 20px;
            margin: 20px 0;
            font-family: Arial, sans-serif;
            border-left: 5px solid #007BFF; /* Garis kiri */
            border-radius: 10px; /* Border yang melengkung */
            outline: 2px solid #007BFF; /* Outline berwarna biru */
            position: relative;
            box-shadow: 0 0 20px rgba(0, 123, 255, 0.5); /* Efek glow futuristik */
        }

        /* Label judul di dalam note */
        .admonition-note .title {
            font-weight: bold;
            margin-bottom: 10px;
            color: #007BFF; /* Teks judul warna biru */
        }

        /* Tema terang */
        .admonition-note.light {
            background-color: #e7f4ff; /* Biru muda terang */
            color: #333; /* Teks gelap */
        }

        /* Tema gelap */
        .admonition-note.dark {
            background-color: #2c3e50; /* Biru gelap */
            color: #ecf0f1; /* Teks terang */
        }

        /* Media query untuk mendeteksi tema gelap atau terang */
        @media (prefers-color-scheme: dark) {
            .admonition-note {
                background-color: #2c3e50;
                color: #ecf0f1;
                border-left-color: #3498db; /* Warna biru terang untuk tema gelap */
                outline-color: #3498db; /* Outline lebih terang pada tema gelap */
                box-shadow: 0 0 20px rgba(52, 152, 219, 0.7); /* Glow lebih kuat di tema gelap */
            }
        }

        @media (prefers-color-scheme: light) {
            .admonition-note {
                background-color: #e7f4ff;
                color: #333;
                border-left-color: #007BFF; /* Warna biru untuk tema terang */
                outline-color: #007BFF;
                box-shadow: 0 0 20px rgba(0, 123, 255, 0.5); /* Glow di tema terang */
            }
        }
    </style>
    <title>Admonition Example</title>
</head>
<body>

<div class="admonition-note">
    <div class="title">NOTE</div>
    <p>Ini adalah contoh teks untuk catatan dengan efek futuristik, termasuk outline, border-radius, dan efek glow pada garis tepi.</p>
</div>

</body>
</html>
