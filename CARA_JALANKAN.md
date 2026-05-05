# Cara Menjalankan AppBlocker Project

## Prasyarat
Pastikan sudah terinstall:
- **Node.js** & **npm** (untuk backend & frontend)
- **Python 3** & **pip** (untuk client)
- **MongoDB** (sudah berjalan sebagai service Windows)

## Langkah-Langkah Menjalankan

### 1. Backend (Node.js - Port 5000)

Buka **Terminal / PowerShell** dan jalankan:

```powershell
cd "C:\Users\LENOVO\Documents\AppBlockerProject\backend"
& "C:\Program Files\nodejs\node.exe" server.js
```

**Output yang benar:**
```
[dotenv@17.2.4] injecting env (1) from .env
Server running on port 5000
MongoDB Connected
```

✅ Backend berjalan di `http://localhost:5000`

---

### 2. Frontend (Next.js - Port 3000)

Buka **Terminal / PowerShell BARU** dan jalankan:

```powershell
cd "C:\Users\LENOVO\Documents\AppBlockerProject\frontend"
set "PATH=C:\Program Files\nodejs;%PATH%"
npm install
npm run dev
```

Jika `npm` masih tidak dikenali, jalankan fallback:

```powershell
cd "C:\Users\LENOVO\Documents\AppBlockerProject\frontend"
& "C:\Program Files\nodejs\node.exe" node_modules\next\dist\bin\next dev
```

**Output yang benar:**
```
> next dev
- ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

✅ Frontend berjalan di `http://localhost:3000`

---

### 3. Client (Python GUI)

Buka **Terminal / PowerShell BARU** dan jalankan:

```powershell
cd "C:\Users\LENOVO\Documents\AppBlockerProject\client"
python -m pip install psutil requests customtkinter
python client.py
```

Jika `python` tidak dikenali, install Python 3 dan centang **Add Python to PATH**.

✅ Client UI akan terbuka sebagai window GUI (CustomTkinter)

---

## Urutan Menjalankan (PENTING!)

1. **PERTAMA**: Backend (port 5000) - tunggu sampai "MongoDB Connected"
2. **KEDUA**: Frontend (port 3000) - tunggu sampai server ready
3. **KETIGA**: Client (GUI Python) - setelah 2 sudah jalan

---

## Testing Backend

### Cek apakah backend berjalan:

**Method 1: PowerShell**
```powershell
curl http://localhost:5000/
```

**Method 2: Netstat**
```powershell
netstat -ano | findstr :5000
```

### Test Register User

```powershell
curl -X POST http://localhost:5000/register `
  -H "Content-Type: application/json" `
  -d '{"username":"testuser","password":"password123"}'
```

### Test Login

```powershell
curl -X POST http://localhost:5000/login `
  -H "Content-Type: application/json" `
  -d '{"username":"testuser","password":"password123"}'
```

Response akan berisi token JWT:
```json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

---

## File Penting

- **Backend**: `backend/.env` - Konfigurasi MongoDB URI
- **Frontend**: `frontend/package.json` - Dependencies React/Next.js
- **Client**: `client/client.py` - Script Python GUI
- **Token**: `client/token.txt` - Token JWT disimpan di sini

---

## Troubleshooting

### Error: "npm not recognized"
- Refresh PATH: `$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")`
- Atau gunakan path lengkap: `& "C:\Program Files\nodejs\npm.cmd"` atau `& "C:\Program Files\nodejs\node.exe"`

### Error: "MongoDB not connected"
- Pastikan MongoDB service berjalan: `Get-Service MongoDB`
- Jika tidak running: Buka Services.msc dan start MongoDB service

### Error: "Port 5000 already in use"
- Backend masih running. Cek dengan: `netstat -ano | findstr :5000`
- Kill process jika perlu: `taskkill /PID <PID> /F`

### Error: "Cannot find module" (backend)
- Pastikan sudah install: `& "C:\Program Files\nodejs\npm.cmd" install` di folder backend

### Error: "ModuleNotFoundError" (client)
- Install dependencies Python: `pip install psutil requests customtkinter`

---

## Akses Aplikasi

- **Web Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Endpoints**:
  - POST `/register` - Daftar user baru
  - POST `/login` - Login (dapatkan token)
  - GET `/blocked` - Dapatkan list app yang diblokir

---

## Tips

- Jalankan **3 terminal terpisah** untuk ketiga komponen (backend, frontend, client)
- Jangan close terminal ketika aplikasi sedang berjalan
- Untuk development, terminal akan otomatis reload jika ada perubahan kode
- Jika mau stop semua, tekan `Ctrl+C` di setiap terminal

---

**Status Running:**
- ✅ Backend: Port 5000
- ✅ Frontend: Port 3000  
- ✅ Client: GUI Python
- ✅ Database: MongoDB (localhost:27017)
