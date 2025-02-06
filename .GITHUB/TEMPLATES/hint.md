Pada format pesan commit yang menggunakan konvensi **Conventional Commits**, ada dua bagian yang perlu dipahami: **type** dan **scope**. Berikut penjelasannya:

### 1. **type** (Tipe Perubahan)
Ini menunjukkan **jenis perubahan** yang Anda lakukan pada kode. Beberapa tipe yang umum digunakan antara lain:
- **feat**: Menambahkan fitur baru.
- **fix**: Memperbaiki bug atau masalah di kode.
- **docs**: Perubahan yang berkaitan dengan dokumentasi.
- **style**: Perubahan yang berhubungan dengan gaya (seperti formatting, spasi, indentasi) tanpa mengubah fungsionalitas kode.
- **refactor**: Perubahan kode yang bertujuan untuk meningkatkan struktur atau kualitas kode, tetapi tidak mengubah fungsionalitas.
- **perf**: Perubahan yang meningkatkan kinerja aplikasi.
- **test**: Perubahan atau penambahan terkait pengujian.
- **chore**: Perubahan yang bersifat pemeliharaan atau tugas rutin (misalnya pembaruan dependensi).

### 2. **scope** (Lingkup Perubahan)
Ini menunjukkan **bagian spesifik dari aplikasi atau modul** yang terpengaruh oleh perubahan. Misalnya:
- **auth**: Perubahan terkait sistem otentikasi.
- **ui**: Perubahan pada antarmuka pengguna.
- **api**: Perubahan pada antarmuka pemrograman aplikasi (API).
- **db**: Perubahan pada database.
- **core**: Perubahan pada bagian inti aplikasi.

### 3. **short-summary** (Ringkasan Perubahan)
Bagian ini memberikan deskripsi **singkat dan jelas** mengenai apa yang diubah atau ditambahkan dalam commit tersebut.

### Contoh Penggunaan:
```
feat(auth): add Google login functionality
```
- **feat**: Tipe perubahan adalah penambahan fitur baru.
- **auth**: Perubahan ini terkait dengan sistem otentikasi.
- **add Google login functionality**: Ringkasan perubahan yang dilakukan adalah menambahkan fitur login dengan Google.

Jadi, bagian **type** menggambarkan jenis perubahan yang dilakukan, **scope** memberi tahu bagian kode atau modul yang terpengaruh, dan **short-summary** memberikan deskripsi singkat tentang perubahan itu sendiri.