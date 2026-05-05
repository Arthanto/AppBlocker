# 🔧 TROUBLESHOOTING GUIDE - AppBlocker

## Daftar Error Cepat

Cari error-mu di sini, klik untuk ke solusi:

1. [Node.js/npm errors](#nodekit-errors)
2. [Frontend errors](#frontend-errors)
3. [Backend/MongoDB errors](#backend-errors)
4. [Python/Client errors](#python-errors)
5. [Connection errors](#connection-errors)
6. [Token/Auth errors](#token-errors)

---

## NodeKit Errors

### ❌ `'node' is not recognized as an internal or external command`

**Penyebab:** Node.js tidak ada di PATH environment variable Windows

**Solusi 1 (Permanen - Disarankan):**
1. Buka Start → Settings
2. Cari dan buka "Edit environment variables for your account"
3. Klik "Environment Variables"
4. Di "System variables" section, cari `Path` → Edit
5. Klik "New" dan tambahkan: `C:\Program Files\nodejs`
6. Klik OK di semua dialog
7. **PENTING:** Tutup dan buka PowerShell/Command Prompt BARU
8. Cek: `node --version`

**Solusi 2 (Cepat - Temporary):**
Gunakan path lengkap ke node:
```powershell
& "C:\Program Files\nodejs\node.exe" server.js
```

**Solusi 3 (Alternative):**
Jalankan file `.bat` yang sudah disediakan:
```powershell
.\START_BACKEND.bat
```

---

### ❌ `'npm' is not recognized`

**Penyebab 1:** Sama seperti node, npm tidak ada di PATH

**Penyebab 2:** Menggunakan PowerShell tapi syntax salah

**Solusi 1 (Permanen):**
Ikuti solusi "Node.js not recognized" di atas (PATH system variable)

**Solusi 2 (PowerShell Temporary):**
Gunakan sintaks yang benar di PowerShell:
```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
npm run dev
```

**Solusi 3 (Command Prompt - Lebih Mudah):**
```cmd
set "PATH=C:\Program Files\nodejs;%PATH%"
npm run dev
```

**Solusi 4 (Gunakan .bat):**
```powershell
.\START_FRONTEND.bat
```

---

### ❌ `npm ERR! cb() never called!`

**Penyebab:** Cache npm rusak atau instalasi tidak lengkap

**Solusi:**
```powershell
npm cache clean --force
npm install
npm run dev
```

---

## Frontend Errors

### ❌ `'"node" is not recognized as an internal or external command'` saat `npm run dev`

**Penyebab:** npm memanggil node tapi node tidak ada di PATH

**Solusi 1:**
Tambahkan node ke PATH dulu:
```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
npm run dev
```

**Solusi 2:**
Jalankan next secara langsung dengan node:
```powershell
cd "C:\Users\LENOVO\Documents\AppBlockerProject\frontend"
& "C:\Program Files\nodejs\node.exe" node_modules\next\dist\bin\next dev
```

---

### ❌ Port 3000 already in use

**Penyebab:** Port 3000 sudah dipakai program lain

**Solusi 1 (Otomatis):**
Next.js akan otomatis pakai port 3001, 3002, dst. Biarkan saja dan buka browser ke port yang diminta.

**Solusi 2 (Paksa Henti):**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Kemudian jalankan Next.js lagi.

---

### ❌ `ENOENT: no such file or directory`

**Penyebab:** Dependencies belum terinstall

**Solusi:**
```powershell
cd frontend
npm install
npm run dev
```

---

## Backend Errors

### ❌ `MongoDB Connected` tidak muncul / timeout

**Penyebab:** MongoDB service tidak berjalan

**Solusi 1:**
Jalankan MongoDB service:
1. Buka Start → Services
2. Cari "MongoDB Server"
3. Status harus "Running"
4. Klik Start jika belum

**Solusi 2:**
Cek file `backend/.env`:
```
MONGO_URI=mongodb://localhost:27017/appblocker
```

Pastikan alamat benar.

**Solusi 3:**
Test koneksi MongoDB manual:
```powershell
mongosh
```

Jika berhasil masuk ke MongoDB shell, berarti MongoDB ok.

---

### ❌ `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Penyebab:** MongoDB server tidak jalan atau tidak di port 27017

**Solusi:**
1. Jalankan MongoDB service (lihat solusi di atas)
2. Tunggu beberapa detik agar service startup
3. Jalankan backend lagi

---

### ❌ Port 5000 already in use

**Penyebab:** Backend lama masih berjalan atau program lain pakai port 5000

**Solusi 1:**
Cek process:
```powershell
netstat -ano | findstr :5000
```

**Solusi 2:**
Matikan process dengan PID:
```powershell
taskkill /PID <PID> /F
```

**Solusi 3:**
Tunggu beberapa saat, coba jalankan backend lagi.

---

## Python Errors

### ❌ `'python' is not recognized`

**Penyebab:** Python tidak ada di PATH atau belum terinstall

**Solusi 1 (Install Python):**
1. Download dari https://www.python.org/downloads/
2. Jalankan installer
3. **PENTING:** Centang `Add Python to PATH` ✓
4. Klik Install
5. Restart PowerShell/Command Prompt
6. Verifikasi: `python --version`

**Solusi 2 (Jika sudah install tapi tidak di PATH):**
1. Buka Settings → Edit environment variables
2. Tambahkan ke Path: `C:\Users\LENOVO\AppData\Local\Programs\Python\Python312` (sesuaikan versi)
3. Restart PowerShell/Command Prompt

---

### ❌ `pip : The term 'pip' is not recognized`

**Penyebab:** pip tidak ada di PATH (biasanya Python installasinya salah)

**Solusi:**
Gunakan `python -m pip` sebagai gantinya:
```powershell
python -m pip install psutil requests customtkinter
```

---

### ❌ `ModuleNotFoundError: No module named 'psutil'`

**Penyebab:** Library belum terinstall

**Solusi:**
```powershell
python -m pip install psutil requests customtkinter
```

Atau jika sudah tapi masih error:
```powershell
python -m pip install --upgrade psutil requests customtkinter
```

---

### ❌ CustomTkinter display error atau GUI tidak muncul

**Penyebab:** Library CustomTkinter instalasi gagal

**Solusi:**
1. Uninstall dan reinstall:
```powershell
python -m pip uninstall customtkinter -y
python -m pip install customtkinter
```

2. Atau upgrade:
```powershell
python -m pip install --upgrade customtkinter
```

---

## Connection Errors

### ❌ Client muncul tapi `Server: Disconnected`

**Sebab 1:** Backend belum berjalan

**Solusi:**
1. Pastikan backend terjalankan dengan `& "C:\Program Files\nodejs\node.exe" server.js`
2. Tunggu sampai muncul `MongoDB Connected`
3. Restart client: `python client.py`

**Sebab 2:** Token tidak valid/expired

**Solusi:** Lihat bagian "TOKEN ERRORS" di bawah

**Sebab 3:** Port backend salah (bukan 5000)

**Solusi:**
Cek file `client/client.py`:
```python
API_URL = "http://localhost:5000/blocked"
```

Pastikan port adalah 5000 (port backend).

---

### ❌ Backend tidak merespon di `http://localhost:5000`

**Penyebab:** Backend belum berjalan

**Solusi:**
1. Di PowerShell jalankan:
```powershell
& "C:\Program Files\nodejs\node.exe" "C:\Users\LENOVO\Documents\AppBlockerProject\backend\server.js"
```

2. Tunggu output yang benar:
```
Server running on port 5000
MongoDB Connected
```

3. Test koneksi di PowerShell lain:
```powershell
curl http://localhost:5000/
```

---

## Token Errors

### ❌ `Invalid or expired token` di backend log

**Penyebab:** Token di `client/token.txt` sudah kadaluarsa

**Solusi 1 (Fastest via browser):**
1. Buka http://localhost:3000
2. Klik Register → username: `test`, password: `test123`
3. Klik Login dengan data yang sama
4. Token baru otomatis tersimpan
5. Restart client

**Solusi 2 (Via Command Prompt):**
1. Register user:
```cmd
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\"username\":\"test\",\"password\":\"test123\"}"
```

2. Login & dapat token:
```cmd
curl -X POST http://localhost:5000/login -H "Content-Type: application/json" -d "{\"username\":\"test\",\"password\":\"test123\"}"
```

3. Copy token dari response (string yang panjang setelah `"token":"`)
4. Buka `client/token.txt` dan ganti dengan token baru
5. Restart client

---

### ❌ `token.txt` file not found

**Penyebab:** File belum dibuat

**Solusi:**
1. Buka Command Prompt di folder `client/`
2. Login untuk generate token (lihat solusi di atas)
3. File `token.txt` akan otomatis dibuat
4. Jalankan client: `python client.py`

---

## Checklist Ketika Semuanya Error

Coba ikuti ini systematically:

- [ ] Restart semua terminal (PowerShell)
- [ ] Restart MongoDB service (services.msc)
- [ ] Buka C:\Users\LENOVO\Documents\AppBlockerProject
- [ ] Buka file `START_BACKEND.bat` (double-click) - tunggu 30 detik
- [ ] Buka file `START_FRONTEND.bat` (double-click, terminal baru) - tunggu 30 detik
- [ ] Cek browser: http://localhost:3000 - harus bisa akses
- [ ] Jika frontend ok, lanjut ke file `START_CLIENT.bat`
- [ ] Tunggu GUI terbuka
- [ ] Jika `Server: Disconnected`, lakukan register/login di browser

Jika masih error setelah ini, screenshot error message dan check PANDUAN_LENGKAP.md.

---

## Port Occupancy Check

Jika ada "port already in use" error, gunakan ini untuk cek:

```powershell
# Check port 5000 (backend)
netstat -ano | findstr :5000

# Check port 3000 (frontend)
netstat -ano | findstr :3000

# Kill process by PID
taskkill /PID 1234 /F
```

---

## Last Resort: Full Clean Restart

Jika semua tidak berhasil:

1. Tutup semua terminal
2. Restart computer
3. Jalankan MongoDB service manual (services.msc)
4. Buka START_BACKEND.bat
5. Tunggu 30 detik
6. Buka START_FRONTEND.bat (terminal baru)
7. Tunggu 20 detik lebih
8. Buka START_CLIENT.bat (terminal baru lagi)

---

**Masih bermasalah? Lihat PANDUAN_LENGKAP.md untuk detail lebih lanjut!** 📖
