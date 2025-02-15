# Jobsheet 11

## Stats
> dependences instaleer

    pip install requests

> python codes

```py

import json
import requests

def create_tugas(mapel, hari, tanggal, status, jenis_tugas, kelompok, anggota, judul):
    tugas = {
        "mata_pelajaran": mapel,
        "hari": hari,
        "tanggal": tanggal,
        "status": status,
        "jenis_tugas": jenis_tugas,
        "kelompok": kelompok,
        f"kelompok_{kelompok}": {
            "anggota": anggota
        },
        "judul": judul
    }
    
    return tugas

def save_and_send_tugas(tugas, webhook_url):
    with open('tugas.json', 'w') as json_file:
        json.dump(tugas, json_file, indent=2)
    
    print("Data tugas berhasil disimpan!")

    formatted_message = "```json\n" + json.dumps(tugas, indent=2) + "\n```"
    response = requests.post(webhook_url, json={"content": formatted_message})

    if response.status_code == 204:
        print("Data berhasil dikirim ke Discord!")
    else:
        print(f"Terjadi kesalahan dalam mengirim data ke Discord: {response.status_code}")


webhook_url = 'b'gAAAAABnsNSNbPZ0WXRqL4wve7VJQp4odwuzPP4SQxc24-GpeD_MrujGKBTN4aQLfTv9HPJ1GF7oKlOWJ1vLdsb90vavnRhOOA-C-Wio7UE6-SCLG5ATOoe-BSA7AdDVyyfvfpwJ6fxLnpxAmPjkRVVRCkiraEijJ6saDvZKPdXwTHYwmASjDezLwPsuG3NG4FUaFRZRVfUxu1GaiJ7HERh-CSjJB47FYj7XRttiIH3e0FZuf0b-oeE='' # Encrip This

mapel = "ITL"
hari = "Senin"
tanggal = "17/02/2025"
status = "Todo"
jenis_tugas = "Catatan, Praktek"
kelompok = 1
anggota = ["Ridwan"]
judul = "Instalasi Listrik 1 Fasa Pakai Busbar"

tugas = create_tugas(mapel, hari, tanggal, status, jenis_tugas, kelompok, anggota, judul)

save_and_send_tugas(tugas, webhook_url)

```