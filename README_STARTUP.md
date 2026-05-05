# 🚀 AppBlocker Project - Startup Guide

## Quick Start (3 Steps)

### 1. Backend
Buka file: **`START_BACKEND.bat`** (double-click)
- Tunggu sampai muncul: `Server running on port 5000` + `MongoDB Connected`

### 2. Frontend  
Buka file: **`START_FRONTEND.bat`** (double-click)
- Tunggu sampai muncul: `ready - started server on 0.0.0.0:3000` (atau 3001)
- Buka browser: http://localhost:3000

### 3. Client
Buka file: **`START_CLIENT.bat`** (double-click)
- Window GUI akan terbuka
- Status harus: `Server: Connected`

---

## First Time Setup

**Langkah pertama kali (perlu setup token):**

Di browser http://localhost:3000:
1. Klik **Register**
2. Username: `test`, Password: `test123`
3. Klik **Login** dengan data yang sama
4. Token otomatis tersimpan di `client/token.txt`

Selesai! Token tidak perlu setup ulang.

---

## File-File Penting

| File | Fungsi |
|------|--------|
| `START_BACKEND.bat` | Jalankan backend server |
| `START_FRONTEND.bat` | Jalankan frontend web |
| `START_CLIENT.bat` | Jalankan client GUI Python |
| `PANDUAN_LENGKAP.md` | Dokumentasi lengkap + troubleshooting |
| `CHECKLIST_SETUP.md` | Checklist setup step-by-step |

---

## Troubleshooting Quick Links

Jika ada error, buka **`PANDUAN_LENGKAP.md`** dan cari:
- Error: `node not recognized` → Solusi di bagian "TROUBLESHOOTING BACKEND"
- Error: `npm not recognized` → Solusi di bagian "TROUBLESHOOTING FRONTEND"
- Error: `python not recognized` → Solusi di bagian "TROUBLESHOOTING CLIENT"
- Status `Server: Disconnected` → Solusi di bagian "SETUP TOKEN"

---

## Status Aplikasi

Ketika semua berjalan, status harus:
```
✅ Backend (http://localhost:5000) - Server: Connected
✅ Frontend (http://localhost:3000) - Browser buka
✅ Client (GUI Python) - App Blocker Active, Server: Connected
```

---

## Setiap Run Berikutnya

Cukup buka 3 file `.bat` di atas dalam urutan:
1. START_BACKEND.bat
2. START_FRONTEND.bat
3. START_CLIENT.bat

Tidak perlu setup ulang apapun!

---

**Butuh bantuan? Lihat PANDUAN_LENGKAP.md** 📖
