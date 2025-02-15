# global warming

> dependences instaleer

    pip install requests

> python codes

```py
import json
import requests

tugas = {
    "mapel": "PPKN",
    "kelas": "X1 TITL 2",
    "mulai_dari": "12/02/2025",
    "deadline": "26/02/2025",
    "kelompok": "Ridwan",
    "jenis_tugas": "Gambar",
    "judul": "Global Warming"
}

with open('tugas.json', 'w') as json_file:
    json.dump(tugas, json_file, indent=2)

webhook_url = "" # belum ke set apara

message = {
    "content": "```json\n" + json.dumps(tugas, indent=2) + "\n```"
}

response = requests.post(webhook_url, json=message)

if response.status_code == 204:
    print("Data berhasil dikirim ke Discord!")
else:
    print(f"Terjadi kesalahan. Status Code: {response.status_code}")
```

> dicord output

    {
    "mapel": "PPKN",
    "kelas": "X1 TITL 2",
    "mulai_dari": "12/02/2025",
    "deadline": "26/02/2025",
    "kelompok": "Ridwan",
    "jenis_tugas": "Gambar",
    "judul": "Global Warming"
    }

---
