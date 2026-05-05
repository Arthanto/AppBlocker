## ✅ CHECKLIST SETUP APPBLOCKER

### Sebelum Memulai
- [ ] Node.js terinstall (cek: `node --version`)
- [ ] npm terinstall (cek: `npm --version`)
- [ ] Python terinstall (cek: `python --version`)
- [ ] MongoDB service active (cek di services.msc)

---

### LANGKAH 1: JALANKAN BACKEND

**Di PowerShell:**
```
cd C:\Users\LENOVO\Documents\AppBlockerProject\backend
& "C:\Program Files\nodejs\node.exe" server.js
```

**Tunggu sampai output:**
```
✓ Server running on port 5000
✓ MongoDB Connected
```

**Status:** ✅ Backend running

**Jika error?** Lihat PANDUAN_LENGKAP.md bagian TROUBLESHOOTING BACKEND

---

### LANGKAH 2: JALANKAN FRONTEND

**Di PowerShell BARU:**
```
cd C:\Users\LENOVO\Documents\AppBlockerProject\frontend
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
npm install
npm run dev
```

**Tunggu sampai output:**
```
✓ ready - started server on 0.0.0.0:3000 (atau 3001)
```

**Status:** ✅ Frontend running

**Buka browser:** http://localhost:3000 (atau 3001)

**Jika error?** Lihat PANDUAN_LENGKAP.md bagian TROUBLESHOOTING FRONTEND

---

### LANGKAH 3: SETUP TOKEN (PERTAMA KALI SAJA)

**Via Browser:**
1. Di http://localhost:3000 → Klik Register
2. Username: `test`
3. Password: `test123`
4. Klik Login dengan data yang sama
5. Token akan otomatis disimpan

**atau Via Command Prompt:**
```
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\"username\":\"test\",\"password\":\"test123\"}"

curl -X POST http://localhost:5000/login -H "Content-Type: application/json" -d "{\"username\":\"test\",\"password\":\"test123\"}"
```

Copy token dari response login, simpan di `client/token.txt`

**Status:** ✅ Token ready

---

### LANGKAH 4: JALANKAN CLIENT

**Di PowerShell BARU:**
```
cd C:\Users\LENOVO\Documents\AppBlockerProject\client
python -m pip install psutil requests customtkinter
python client.py
```

**Tunggu sampai output:**
```
✓ GUI window terbuka
✓ Status: Server: Connected
✓ Watching dashboard...
```

**Status:** ✅ Client running

**Jika error?** Lihat PANDUAN_LENGKAP.md bagian TROUBLESHOOTING CLIENT

---

## 🎯 FINAL STATUS

```
✅ Backend (port 5000) - RUNNING
✅ Frontend (port 3000/3001) - RUNNING  
✅ Client (GUI Python) - RUNNING
✅ Server status = Connected
```

**Selamat! Aplikasi AppBlocker siap digunakan! 🎉**

---

## 🔄 SEtelah Pertama Kali Setup

Untuk menjalankan lagi di hari berikutnya, cukup jalankan:

**Terminal 1:**
```
cd C:\Users\LENOVO\Documents\AppBlockerProject\backend
& "C:\Program Files\nodejs\node.exe" server.js
```

**Terminal 2:**
```
cd C:\Users\LENOVO\Documents\AppBlockerProject\frontend
$env:PATH = "C:\Program Files\nodejs;$env:PATH"; npm run dev
```

**Terminal 3:**
```
cd C:\Users\LENOVO\Documents\AppBlockerProject\client
python client.py
```

Token tidak perlu di-setup ulang, sudah tersimpan di `client/token.txt`

---

**Lihat PANDUAN_LENGKAP.md untuk troubleshooting detail!**
