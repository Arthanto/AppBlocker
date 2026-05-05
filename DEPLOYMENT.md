# Deployment Guide for AppBlocker

## Overview
Aplikasi AppBlocker terdiri dari tiga bagian:

1. `frontend` → Next.js web UI
2. `backend` → Node.js Express API
3. `client` → Python desktop GUI (jalankan secara lokal)

Frontend bisa di-deploy gratis ke Vercel, dan backend bisa di-deploy gratis ke Render / Railway / Fly.

---

## 1. Siapkan GitHub

1. Buat repository GitHub baru.
2. Push seluruh kode project ke repository tersebut.
3. Pastikan `.gitignore` sudah ada dan tidak mem-push file sensitif.

> Catatan: Saya tidak bisa melakukan push dari sini karena tidak ada `git` di environment ini.

---

## 2. Deploy Frontend ke Vercel

1. Buka https://vercel.com dan login.
2. Pilih `New Project` → `Import Git Repository`.
3. Pilih repository AppBlocker.
4. Pada bagian `Root Directory`, pilih `frontend`.
5. Set `Build Command` ke:
   ```bash
   npm run build
   ```
6. Set `Output Directory` ke default.
7. Tambahkan environment variable:
   - `NEXT_PUBLIC_API_URL` = `https://<your-backend-url>`
8. Deploy.

Jika berhasil, frontend akan tersedia di URL Vercel.

---

## 3. Deploy Backend ke Render

1. Buka https://render.com dan login.
2. Pilih `New` → `Web Service`.
3. Pilih `Connect a GitHub repository` dan pilih repo AppBlocker.
4. Pada bagian `Root Directory`, isi `backend`.
5. Set `Environment` ke `Node`.
6. Set `Build Command` ke:
   ```bash
   npm install
   ```
7. Set `Start Command` ke:
   ```bash
   npm start
   ```
8. Tambahkan environment variables:
   - `MONGO_URI` = `mongodb+srv://<username>:<password>@cluster0.mongodb.net/appblocker?retryWrites=true&w=majority`
   - `JWT_SECRET` = `your_secret_key`

---

## 4. Update Frontend API URL

Set `NEXT_PUBLIC_API_URL` di Vercel ke URL backend Render, misalnya:
```
https://appblocker-backend.onrender.com
```

---

## 5. Jalankan Client Lokal

Setelah backend live, ubah `client/client.py` agar `API_URL` menunjuk ke backend publik:
```python
API_URL = "https://<your-backend-url>/blocked"
```

Lalu jalankan:
```powershell
cd client
python client.py
```

---

## Tips Tambahan
- `client` tetap dijalankan di komputer lokal, karena itu bukan aplikasi web.
- Jika Anda ingin GitHub Actions atau deploy otomatis, saya bisa bantu siapkan workflow.
