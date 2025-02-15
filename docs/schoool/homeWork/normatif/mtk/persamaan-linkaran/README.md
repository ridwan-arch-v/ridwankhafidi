# persamaan lingkaran 

## Stats Profile
    dependeces installer

```bash
pip install requests
```

```python
import json
import requests

tugas = {
    "mata_pelajaran": "MTK",
    "hari": "Jumat",
    "tanggal": "14/02/2025",
    "status": "Revisi",
    "jenis_tugas": "PPT Presentasi",
    "kelompok": 5,
    "kelompok_5": {
        "anggota": [
            "Ridwan", "Khorunas", "Sultan", "Indri", "Melani"
        ]
    },
    "judul": "Persamaan Lingkaran"
}

with open('tugas.json', 'w') as json_file:
    json.dump(tugas, json_file, indent=2)

print("Data tugas berhasil disimpan!")

webhook_url = 'YOUR_DISCORD_WEBHOOK_URL'

formatted_message = "```json\n" + json.dumps(tugas, indent=2) + "\n```"

response = requests.post(webhook_url, json={"content": formatted_message})

if response.status_code == 204:
    print("Data berhasil dikirim ke Discord!")
else:
    print(f"Terjadi kesalahan dalam mengirim data ke Discord: {response.status_code}")
```
