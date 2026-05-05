# 🚀 SETUP LENGKAP DALAM 3 LANGKAH MUDAH

## YANG HARUS SUDAH TERINSTALL:
- ✅ Node.js 18+ (https://nodejs.org)
- ✅ Python 3.8+ (https://python.org - CENTANG "Add to PATH")
- ✅ MongoDB (running as Windows Service)

---

## LANGKAH 1: JALANKAN BACKEND ✅

**Cara paling mudah:**
1. **Double-click** file: `RUN_BACKEND.bat`
2. Jendela baru akan terbuka
3. Tunggu sampai muncul:
   ```
   Server running on port 5000
   MongoDB Connected
   ```

❌ **Jika error "MongoDB tidak connect":**
- Buka PowerShell (Run as Administrator)
- Ketik: `mongod`
- Biarkan running, buka PowerShell baru
- Ulang langkah 1

---

## LANGKAH 2: JALANKAN FRONTEND ✅

**TUNGGU BACKEND COMPLETELY READY DULU (sampai "MongoDB Connected" muncul)**

**Cara paling mudah:**
1. **Double-click** file: `RUN_FRONTEND.bat`
2. Jendela baru akan terbuka
3. Tunggu sampai muncul:
   ```
   ✓ ready - started server on 0.0.0.0:3000
   ```
   atau
   ```
   ✓ ready - started server on 0.0.0.0:3001
   ```

4. **BUKA BROWSER** ke salah satu:
   - http://localhost:3000 ATAU
   - http://localhost:3001

---

## LANGKAH 3: REGISTER & LOGIN ✅

Di browser yang sudah dibuka:

### A. Register (Pertama Kali Saja)
1. Klik tombol **"Sign Up"** (warna biru)
2. Isi form:
   - **Name:** `test`
   - **Email:** `test`
   - **Password:** `test123`
3. Klik **"Create Account"**
4. Tunggu sampai redirect ke Login page

### B. Login
1. Klik tombol **"Sign In"**
2. Isi form:
   - **Email:** `test`
   - **Password:** `test123`
3. Klik **"Sign In"**
4. Tunggu sampai masuk ke **Dashboard**

✅ **Token otomatis tersimpan** (tidak perlu repetir login)

---

## LANGKAH 4: JALANKAN CLIENT GUI ✅

**SETELAH LOGIN BERHASIL, BARU JALANKAN INI**

**Cara paling mudah:**
1. **Double-click** file: `RUN_CLIENT.bat`
2. Jendela GUI akan terbuka dengan title: **"🚀 App Blocker Active"**
3. Tunggu sampai status berubah dari:
   ```
   Server: Checking...
   ```
   Menjadi:
   ```
   Server: Connected
   ```

✅ **SELESAI! Aplikasi siap digunakan!**

---

## 📋 RINGKAS URUTAN (PENTING!)

| No | Buka File | Port | Tunggu Tanda |
|----|-----------|------|-------------|
| 1 | `RUN_BACKEND.bat` | 5000 | "MongoDB Connected" |
| 2 | `RUN_FRONTEND.bat` | 3000/3001 | "ready - started server" |
| 3 | (Browser) | - | Register + Login berhasil |
| 4 | `RUN_CLIENT.bat` | GUI | "Server: Connected" |

---

## ⚠️ JIKA ADA MASALAH

### ❌ Frontend error atau tidak jalan:
1. Buka PowerShell di folder `frontend`
2. Ketik:
   ```powershell
   npm install
   npm run dev
   ```

### ❌ Client tidak connect:
1. Pastikan Backend dan Frontend SUDAH berjalan
2. Pastikan sudah login di browser dulu
3. Baru jalankan Client

### ❌ "MongoDB not connected":
1. Buka PowerShell (Admin)
2. Ketik: `mongod`
3. Biarkan running (jangan tutup)
4. Buka PowerShell baru, jalankan backend lagi

### ❌ Port sudah dipakai:
- Frontend otomatis pakai 3001 jika 3000 dipakai
- Buka browser ke port yang disarankan

---

## 🎯 NEXT STEPS (Setelah semuanya jalan)

Di Dashboard (http://localhost:3000 atau 3001):
1. Blokir aplikasi dari "Recommendations"
2. Atau input nama aplikasi manual (cth: `notepad.exe`)
3. Lihat status real-time di Client GUI
4. Client akan otomatis stop aplikasi yang diblokir

---

**PERLU BANTUAN?** Buka file `TROUBLESHOOTING.md`
