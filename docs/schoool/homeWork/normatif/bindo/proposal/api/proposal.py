import json
import requests

tugas = {
    "mapel": "B Indo",
    "guru": "Bu Endah Kumala Wongso",
    "kelas": "X1 TITL 2",
    "tanggal": "10/02/2025",
    "deadline": "24/04/2025",
    "jenis_tugas": "Slide TikTok",
    "kelompok": {
        "anggota": [
            "Ridwan", "Khorunas", "Faisal"
        ]
    },
    "tugas": "Bikin proposal tentang bazar ramadhan, trus di-upload ke TikTok dan buat di kertas HPS 1 lagi kayak kertas yang di kasih itu"
}

with open('tugas.json', 'w') as json_file:
    json.dump(tugas, json_file, indent=2)

print("Data tugas berhasil disimpan!")

webhook_url = 'webhok url here'

formatted_message = "```json\n" + json.dumps(tugas, indent=2) + "\n```"

response = requests.post(webhook_url, json={"content": formatted_message})

if response.status_code == 204:
    print("Data berhasil dikirim ke Discord!")
else:
    print(f"Terjadi kesalahan dalam mengirim data ke Discord: {response.status_code}")
