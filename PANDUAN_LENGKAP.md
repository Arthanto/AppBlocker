# 🚀 Panduan Lengkap Menjalankan AppBlocker Project

## ✅ Prasyarat Instalasi
Pastikan sudah terinstall:
- **Node.js 18+** (download dari https://nodejs.org)
- **Python 3.8+** (download dari https://python.org, **CENTANG "Add to PATH"**)
- **MongoDB** (sudah berjalan sebagai service Windows)

---

## 📋 Urutan Menjalankan (WAJIB)

### 1️⃣ BACKEND (Port 5000) - JALANKAN PERTAMA

#### Opsi A: Gunakan Skrip Batch
Buka PowerShell di folder project root dan jalankan:
```powershell
.\run-backend.bat
```

#### Opsi B: Manual
Buka PowerShell dan jalankan:
```powershell
cd "C:\Users\LENOVO\Documents\AppBlockerProject\backend"
& "C:\Program Files\nodejs\node.exe" server.js
```

#### ✅ Output Yang Benar
```
[dotenv@17.2.4] injecting env (1) from .env
Server running on port 5000
MongoDB Connected
```

**Jangan lanjut sampai muncul "MongoDB Connected"!**

---

### 🔧 TROUBLESHOOTING BACKEND

#### Error: `'node' is not recognized as an internal or external command`
**Penyebab:** Node.js tidak ada di PATH sistem.

**Solusi:**
1. Buka Settings Windows → "Edit environment variables"
2. Di "System variables", cari `Path` → Edit
3. Tambahkan: `C:\Program Files\nodejs`
4. Restart PowerShell

Atau gunakan perintah dengan path lengkap:
```powershell
& "C:\Program Files\nodejs\node.exe" server.js
```

---

#### Error: `MongoDB Connected` tidak muncul / tidak connect
**Penyebab:** MongoDB service tidak berjalan atau alamat database salah.

**Solusi:**
1. Pastikan MongoDB service Windows aktif:
   - Buka Services (services.msc)
   - Cari "MongoDB" → klik Start jika belum

2. Cek file `.env` di folder backend:
   - Buka: `backend/.env`
   - Pastikan berisi: `MONGO_URI=mongodb://localhost:27017/appblocker`

3. Test koneksi MongoDB

 secara manual:
   ```powershell
   mongosh
   ```
   Jika berhasil akan masuk ke shell MongoDB.

---

#### Error: Port 5000 sudah digunakan
**Penyebab:** Ada proses lain yang menggunakan port 5000.

**Solusi:**
```powershell
netstat -ano | findstr :5000
```

Lihat PID process, kemudian:
```powershell
taskkill /PID <PID> /F
```

---

### 2️⃣ FRONTEND (Port 3000/3001) - JALANKAN KEDUA

Buka **PowerShell BARU** (jangan yang running backend).

#### Opsi A: Gunakan Skrip Batch
```powershell
cd "C:\Users\LENOVO\Documents\AppBlockerProject"
.\run-frontend.bat
```

#### Opsi B: Manual (PowerShell)
```powershell
cd "C:\Users\LENOVO\Documents\AppBlockerProject\frontend"
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
npm install
npm run dev
```

#### Opsi C: Manual (Command Prompt - Lebih Mudah)
```cmd
cd "C:\Users\LENOVO\Documents\AppBlockerProject\frontend"
set "PATH=C:\Program Files\nodejs;%PATH%"
npm install
npm run dev
```

#### ✅ Output Yang Benar
```
> next dev
- ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

atau jika port 3000 sudah dipakai:
```
- ready - started server on 0.0.0.0:3001, url: http://localhost:3001
```

---

### 🔧 TROUBLESHOOTING FRONTEND

#### Error: `'npm' is not recognized`
**Penyebab:** npm tidak ada di PATH atau sintaks PowerShell salah.

**Solusi:** Gunakan sintaks yang benar di PowerShell:
```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
npm run dev
```

Atau gunakan Command Prompt (cmd) instead:
```cmd
set "PATH=C:\Program Files\nodejs;%PATH%"
npm run dev
```

---

#### Error: `'node' is not recognized` saat `npm run dev`
**Penyebab:** npm memanggil node tapi node tidak ada di PATH.

**Solusi:** Jalankan langsung dengan node.exe:
```powershell
cd "C:\Users\LENOVO\Documents\AppBlockerProject\frontend"
& "C:\Program Files\nodejs\node.exe" node_modules\next\dist\bin\next dev
```

---

#### Error: Port 3000/3001 sudah digunakan
Frontend akan otomatis ambil port 3001, 3002, dll. Biarkan saja.

Atau cek dan matikan process di port 3000:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### 3️⃣ CLIENT PYTHON (GUI) - JALANKAN KETIGA

Buka **PowerShell BARU** lagi.

#### Opsi A: Gunakan Skrip Batch
```powershell
cd "C:\Users\LENOVO\Documents\AppBlockerProject"
.\run-client.bat
```

#### Opsi B: Manual
```powershell
cd "C:\Users\LENOVO\Documents\AppBlockerProject\client"
python -m pip install psutil requests customtkinter
python client.py
```

#### ✅ Output Yang Benar
GUI window "App Blocker Active" akan terbuka dengan status:
```
Server: Connected
Watching dashboard...
```

---

### 🔧 TROUBLESHOOTING CLIENT

#### Error: `'python' is not recognized`
**Penyebab:** Python tidak ada di PATH sistem.

**Solusi:**
1. Install Python dari https://www.python.org/downloads/
2. **PENTING:** Centang `Add Python to PATH` saat install
3. Restart PowerShell
4. Verifikasi:
   ```powershell
   python --version
   ```

---

#### Error: `pip : The term 'pip' is not recognized`
**Penyebab:** pip tidak ada di PATH.

**Solusi:** Gunakan `python -m pip` instead:
```powershell
python -m pip install psutil requests customtkinter
```

---

#### Error: `ModuleNotFoundError: No module named 'psutil'`
**Penyebab:** Library belum terinstall.

**Solusi:** Install kembali:
```powershell
python -m pip install psutil requests customtkinter
```

---

#### Error: GUI terbuka tapi `Server: Disconnected`
**Penyebab 1:** Backend belum berjalan di port 5000.
- **Solusi:** Pastikan backend sudah running (langkah 1 pertama).

**Penyebab 2:** Token tidak valid atau expired.
- **Solusi:** Lihat bagian "SETUP TOKEN" di bawah.

---

---

## 🔐 SETUP TOKEN (Login Pertama Kali)

Jika client tetap `Server: Disconnected`, perlu register dan login dulu.

### Via Browser Frontend
1. Buka: `http://localhost:3000` (atau 3001)
2. Klik **Register**
   - Username: `test`
   - Password: `test123`
3. Klik **Login** dengan username/password yang sama
4. Akan dapat token yang otomatis disimpan di `client/token.txt`
5. Jalankan ulang `python client.py`

### Via Command Prompt (Lebih Cepat)

#### Register User
```cmd
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\"username\":\"test\",\"password\":\"test123\"}"
```

Jika berhasil:
```json
{"message":"User registered"}
```

#### Login & Get Token
```cmd
curl -X POST http://localhost:5000/login -H "Content-Type: application/json" -d "{\"username\":\"test\",\"password\":\"test123\"}"
```

Jika berhasil, akan muncul:
```json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

#### Copy Token ke File
1. Copy string token (yang panjang setelah `"token":"`)
2. Buka file: `C:\Users\LENOVO\Documents\AppBlockerProject\client\token.txt`
3. Ganti isinya dengan token baru
4. Simpan
5. Jalankan: `python client.py`

---

## 📊 CCHECK STATUS APLIKASI

### Cek Backend Running
```powershell
curl http://localhost:5000/
```

Jika berhasil:
```
{"message":"App Blocker API"}
```

---

### Cek Frontend Running
```powershell
curl http://localhost:3000/
```

Atau buka di browser: `http://localhost:3000`

---

### Cek Port Apa Saja Yang Running
```powershell
netstat -ano | findstr :5000
netstat -ano | findstr :3000
netstat -ano | findstr :3001
```

---

## 📝 QUICK START COMMANDS

**Terminal 1 - Backend:**
```powershell
cd "C:\Users\LENOVO\Documents\AppBlockerProject\backend"
& "C:\Program Files\nodejs\node.exe" server.js
```

**Terminal 2 - Frontend:**
```powershell
cd "C:\Users\LENOVO\Documents\AppBlockerProject\frontend"
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
npm run dev
```

**Terminal 3 - Client:**
```powershell
cd "C:\Users\LENOVO\Documents\AppBlockerProject\client"
python client.py
```

---

## ⚡ ENVIRONMENT VARIABLES (Opsional)

Jika mau setup PATH permanen agar tidak perlu set setiap kali:

1. Buka Windows Settings
2. Cari "Edit environment variables"
3. Klik "Edit the system environment variables"
4. Klik "Environment Variables" button
5. Di "System variables", klik "New"
6. Variable name: `NODEJS_PATH`
   Value: `C:\Program Files\nodejs`
7. Atau langsung tambahkan ke `Path` variable

---

## 🎯 RINGKASAN ERROR & SOLUSI

| Error | Penyebab | Solusi |
|-------|---------|--------|
| `node not recognized` | Node.js tidak di PATH | Tambahkan ke PATH atau gunakan full path |
| `npm not recognized` | npm tidak di PATH | Gunakan `$env:PATH = "..."; npm` di PS |
| `MongoDB Connected` tidak muncul | MongoDB service off | Jalankan MongoDB service (services.msc) |
| `Server: Disconnected` | Token expired | Register & login ulang, update token.txt |
| Port already in use | Program lain pakai port | Jalankan `netstat -ano \| findstr :PORT` |
| `python not recognized` | Python belum install | Install Python dan centang "Add to PATH" |
| `Module not found` | Library belum install | Jalankan `python -m pip install ...` |

---

## 📞 PERLU BANTUAN?

Jika masih ada error:
1. Salin error message lengkapnya
2. Cross-check dengan bagian TROUBLESHOOTING di atas
3. Pastikan ikut urutan eksekusi (Backend → Frontend → Client)
4. Restart PowerShell/Command Prompt

**PENTING:** Jangan tutup PowerShell backend/frontend, biarkan tetap running sampai selesai.

---

**Last Updated:** 14 April 2026
