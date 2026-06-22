AppBlocker Application — Manual Book
Version: 1.0 Last Updated: May 2026 Project: AppBlocker - Smart Application Blocking System

Daftar Isi
Pendahuluan
Persyaratan Sistem
Instalasi & Setup
Panduan Cepat
Panduan Antarmuka
Fitur Utama
Fitur AI Assistant
Troubleshooting
FAQ
Lampiran

Pendahuluan
Apa itu AppBlocker?
AppBlocker adalah aplikasi intelligent blocking system yang dirancang untuk meningkatkan produktivitas dengan memblokir aplikasi yang mengganggu fokus. Fitur utama meliputi:
Smart blocking berdasarkan kategori aplikasi
AI Assistant untuk rekomendasi dan tips produktivitas
Analytics untuk tracking penggunaan aplikasi
Knowledge base dengan tips dan best practices



Manfaat Utama
Manfaat
Deskripsi
Productivity Boost
Blokir distraksi otomatis, fokus pada pekerjaan penting
Smart Categories
Aplikasi sudah dikategorikan (social, games, entertainment, dll.)
AI Recommendations
AI memberikan tips produktivitas dan rekomendasi blocking
Real-time Analytics
Lihat statistik aplikasi yang diblokir dan waktu blocking
Multi-Platform
Web interface, CLI client, dan GUI desktop app
Easy to Use
Interface intuitif dengan dukungan natural language commands

Arsitektur Sistem
┌─────────────────────────────────────────────────────┐
│               AppBlocker System                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Frontend (Web UI)        Backend (Node.js)         │
│  - React/Next.js          - Express Server          │
│  - Dashboard              - AI Handler              │
│  - AI Hub                 - MongoDB Database        │
│  - Analytics              - Authentication (JWT)    │
│                           - Blocking Logic          │
│                                                     │
│  Client (Desktop)                                   │
│  - Python GUI App                                   │
│  - System Integration                               │
│  - Real-time Blocking                               │
│                                                     │
└─────────────────────────────────────────────────────┘





Persyaratan Sistem
Hardware
Komponen
Minimum
Rekomendasi
Processor
Intel i5 / AMD Ryzen 5
Intel i7 / AMD Ryzen 7
RAM
4 GB
8 GB atau lebih
Storage
500 MB free space
1 GB
Network
10 Mbps
50 Mbps

Software
Software
Versi
Fungsi
Node.js
14.0+
Backend runtime
npm
6.0+
Package manager
Python
3.8+
Desktop client
MongoDB
4.0+
Database
Browser
Chrome/Firefox terbaru
Web UI

Sistem Operasi yang Didukung
Windows 10 / 11
macOS 10.14+
Ubuntu 18.04+
Distribusi Linux lainnya




Instalasi & Setup
Langkah 1: Download & Extract
Download project AppBlocker dari repository.
Extract ke folder yang diinginkan.
Buka folder tersebut menggunakan terminal atau command prompt.
Langkah 2: Setup Backend
cd backend
npm install

# Buat file .env dan isi dengan:
# MONGO_URI=mongodb://localhost:27017/appblocker
# JWT_SECRET=your_secret_key_here

npm start

Output yang diharapkan:
[dotenv] injecting env
Server running on port 5000
MongoDB Connected

Langkah 3: Setup Frontend
cd frontend
npm install
npm run dev

Output yang diharapkan:
▲ Next.js 15.x.x
- Local: http://localhost:3000
✓ Ready in 1500ms

Langkah 4: Setup Client Desktop (Opsional)
cd client
pip install -r requirements.txt
python client.py

Langkah 5: Verifikasi Instalasi
Buka browser dan akses:
Frontend: http://localhost:3000 → Tampilkan halaman Login
Backend API: http://localhost:5000 → Tampilkan pesan API running

Panduan Cepat
Setup Pertama Kali (±5 Menit)
1. Buat Akun
Buka http://localhost:3000
Klik Register
Isi nama, email, dan password, lalu klik Register
2. Login
Masukkan email dan password
Klik Sign In → masuk ke Dashboard
3. Blokir Aplikasi Pertama
Lihat bagian Quick Block di Dashboard
Klik Block pada aplikasi yang ingin diblokir (misal: YouTube, Facebook)
4. Cek Analytics
Scroll ke bawah di Dashboard
Lihat bagian Analytics untuk statistik aplikasi yang sudah diblokir
Alur Kerja Dasar
Login → Dashboard → Browse Apps → Block Apps → View Analytics
                                                     ↓
                         AI Hub → Tips & Suggestions → Block More Apps



Panduan Antarmuka
1. Landing Page — http://localhost:3000
Halaman utama berisi navigasi, hero section, dan tombol Sign In / Sign Up.
2. Login Page — http://localhost:3000/login
Masukkan email dan password, lalu klik Sign In untuk masuk ke Dashboard.
3. Register Page — http://localhost:3000/signup
Isi nama, email, password, dan konfirmasi password, lalu klik Register.
4. Dashboard — http://localhost:3000/dashboard
Halaman utama setelah login. Berisi:
Header — Greeting user dan status koneksi server
Quick Actions — Tombol tambah app, refresh, dan settings
Active Blocked Apps — Daftar semua aplikasi yang sedang diblokir beserta kategori dan tanggal
Quick Block Panel — Saran aplikasi untuk diblokir dengan satu klik
Analytics Section — Total apps diblokir, breakdown per kategori, dan aktivitas terbaru
5. AI Hub — http://localhost:3000/ai
Halaman untuk berinteraksi dengan AI menggunakan natural language. Berisi:
Command Input — Textarea untuk mengetik perintah ke AI
Chat History — Riwayat percakapan yang bisa di-scroll
Suggestions Panel — Rekomendasi aplikasi untuk diblokir
Contoh tipe respons AI:
Tipe
Contoh Output
Block
Daftar aplikasi yang berhasil diblokir
Tips
Tips produktivitas beserta saran tindakan
Q&A
Jawaban dari knowledge base
Help
Daftar fitur yang tersedia

6. Profile Page — http://localhost:3000/profile
Menampilkan informasi akun (nama, email, tanggal bergabung) dan opsi edit profil, ganti password, serta logout.
7. Services Page — http://localhost:3000/services
Menampilkan overview layanan yang disediakan oleh AppBlocker.

Fitur Utama
1. Application Blocking
Cara memblokir aplikasi:
Via Dashboard — Klik "Add Blocked App", masukkan nama aplikasi dan kategori
Via Quick Block — Klik "Block" di panel saran pada Dashboard
Via AI — Ketik perintah seperti "block social media" di AI Hub
Kategori Aplikasi:
Kategori
Contoh
Social Media
Facebook, Instagram, Twitter, TikTok, Discord
Entertainment
YouTube, Spotify, Steam, Netflix
Games
Game launcher dan executable game
Productivity
VS Code, Office apps, browser
Communication
Zoom, Teams, Slack
Utility
System tools, cmd, powershell




2. Unblocking Aplikasi
Via Dashboard — Klik tombol Delete pada aplikasi yang ingin di-unblock
Via AI — Ketik perintah seperti "unblock youtube" di AI Hub
Catatan: Unblock berlaku segera. History blocking tetap tersimpan untuk referensi.
3. Analytics & Reporting
Tersedia di bagian bawah Dashboard. Metrik yang ditampilkan:
Metrik
Deskripsi
Total Blocked
Jumlah total aplikasi yang diblokir
By Category
Breakdown per kategori
Recent Activity
5 aplikasi terakhir yang diblokir
Blocking Timeline
Kapan aplikasi diblokir

4. Real-time Blocking
Cara kerja: User memblokir aplikasi melalui web → Backend update database → Client Python cek database setiap 2 detik → Jika aplikasi berjalan, client langsung menutupnya.
Status koneksi client:
Hijau (Connected) — Blocking aktif
Merah (Disconnected) — Blocking tidak aktif
Kuning (Connecting) — Sedang menghubungkan





Fitur AI Assistant
Perintah yang Didukung
Block / Unblock
"block social media apps"
"block youtube, facebook, instagram"
"unblock notepad.exe"
"block all entertainment"

Tips & Saran
"tips for productivity"
"how to focus better"
"tips to avoid burnout"
"what about work-life balance"

Tanya Jawab (Knowledge Base)
"what is pomodoro"
"how to manage stress"
"tell me about meditation"
"sleep tips"

Status & Analytics
"show status"
"what apps are blocked"
"analytics report"

Saran Aplikasi
"suggest"
"what should i block"
"recommendations"

Bantuan
"help"
"how to use this"
"tutorial"


Troubleshooting
"app is not blocking"
"connection error"
"token expired"

Topik Knowledge Base
Produktivitas: Pomodoro Technique, Time Management, Procrastination, Goal Setting
Kesehatan & Wellness: Sleep Quality, Olahraga, Meditasi, Diet, Focus Tips
Mental Health: Stress Management, Burnout Prevention, Motivasi, Kepercayaan Diri
Pengembangan Profesional: Komunikasi, Leadership, Teamwork, Learning
Cara Kerja AI
Input User → Deteksi Intent → Cari Knowledge Base / Proses Perintah → Generate Respons → Tampilkan

Intent yang didukung: Block/Unblock, Q&A, Tips, Help, Status, Suggest, Troubleshoot, Chat.

Troubleshooting
Masalah 1: Tidak Bisa Konek ke Backend
Gejala: Pesan "Connection Error", Dashboard tidak bisa dimuat, AI Hub tidak merespons.
Solusi:
Pastikan backend berjalan — jalankan npm start di folder backend/
Pastikan MongoDB aktif (lihat panduan MongoDB di bawah)
Cek apakah port 5000 tidak dipakai proses lain:
 # Windowsnetstat -ano | findstr :5000taskkill /PID [PID] /F


Allow port 5000 di firewall atau antivirus

Masalah 2: Token Error / Tidak Terautentikasi
Gejala: Pesan "Token expired", redirect ke login berulang, atau "Access denied".
Solusi:
Bersihkan cache browser (F12 → Application → Storage → hapus semua)
Bersihkan localStorage via console browser:
 localStorage.clear()location.reload()


Token berlaku 1 hari — login kembali jika sudah expired
Masalah 3: AI Hub Tidak Bekerja
Gejala: Error 500, perintah AI tidak diproses.
Solusi:
Cek log backend di terminal — pastikan tidak ada error
Pastikan file backend/ai-handler.js ada
Restart frontend: tekan Ctrl+C lalu jalankan npm run dev kembali
Cek Network Tab (F12 → Network) — POST /ai/command harus return 200
Masalah 4: Aplikasi Tidak Terblokir
Gejala: App sudah ditambahkan tapi masih bisa dibuka, client menampilkan "Disconnected".
Solusi:
Pastikan Python client berjalan: cd client && python client.py
GUI client harus menampilkan status "Server: Connected"
Nama aplikasi bersifat case-sensitive dan harus menyertakan ekstensi .exe di Windows (misal: youtube.exe)
Coba jalankan client sebagai Administrator




Masalah 5: Database Connection Error
Gejala: "MongoDB Connected" tidak muncul, tidak bisa menyimpan data.
Solusi:
Pastikan MongoDB berjalan:
Windows: Services → MongoDB → Start
Linux: sudo systemctl start mongod
Mac: brew services start mongodb-community
Cek file .env di folder backend/ — pastikan MONGO_URI sudah benar
Default: mongodb://localhost:27017/appblocker
Masalah 6: Frontend Tidak Bisa Dibuka
Gejala: Halaman blank, loading terus, atau error "Cannot find module".
Solusi:
Restart frontend: Ctrl+C lalu npm run dev
Jika masih gagal, bersihkan node_modules:
 cd frontendrm -rf node_modules package-lock.jsonnpm installnpm run dev


Pastikan Node.js versi 14.0+ (idealnya 18+): node --version
Jika port 3000 sudah terpakai, Next.js akan otomatis pakai port 3001

FAQ
AppBlocker gratis? Ya, sepenuhnya gratis dan open-source.
Apakah data aman? Ya, password dienkripsi dan akses dijaga dengan JWT authentication.
Bisa dipakai untuk banyak user? Ya, setiap user punya akun dan blocking list masing-masing.
Berapa lama proses setup? 15–20 menit untuk setup pertama kali, tergantung kecepatan download.
Apakah perlu MongoDB cloud? Tidak. MongoDB lokal sudah cukup, tapi opsi cloud tersedia jika diperlukan.
Berapa maksimal aplikasi yang bisa diblokir? Tidak terbatas, tapi disarankan tidak lebih dari 100 untuk performa optimal.
Apakah bisa memblokir website? Tidak di versi ini. Pemblokiran website membutuhkan browser extension.
Apakah AI perlu koneksi internet? Tidak. Semua logika AI berjalan secara lokal.
Apakah ada API documentation? Ya, tersedia di folder backend/. Akses melalui /api-docs.
Apakah bisa di-deploy ke server? Ya, bisa di-deploy ke Heroku, AWS, DigitalOcean, dan layanan cloud lainnya.











Lampiran
A. Struktur File Proyek
AppBlockerProject/
├── backend/
│   ├── server.js              # Main backend file
│   ├── ai-handler.js          # AI logic
│   ├── models/
│   │   ├── User.js
│   │   ├── BlockedApp.js
│   │   └── Log.js
│   ├── package.json
│   ├── .env
│   └── Procfile
│
├── frontend/
│   ├── app/
│   │   ├── page.js            # Landing page
│   │   ├── layout.js
│   │   ├── globals.css
│   │   ├── ai/page.js         # AI Hub
│   │   ├── dashboard/page.js
│   │   ├── login/page.js
│   │   ├── signup/page.js
│   │   ├── profile/page.js
│   │   ├── services/page.js
│   │   └── contact/page.js
│   ├── components/
│   │   └── Navbar.js
│   ├── package.json
│   └── next.config.mjs
│
├── client/
│   ├── client.py              # Desktop app
│   ├── requirements.txt
│   ├── client.spec
│   ├── build/                 # Compiled app
│   ├── token.txt
│   └── login.json
│
├── MANUAL_BOOK.md
├── AI_ENHANCED_FEATURES.md
├── AI_QUICK_START.md
├── README_STARTUP.md
└── package.json

B. API Endpoints
Authentication
POST /register — Buat akun baru
POST /login — Login dengan kredensial
Blocked Apps
GET /blocked — Ambil semua aplikasi yang diblokir
POST /blocked — Tambah aplikasi ke daftar blokir
DELETE /blocked/:id — Hapus aplikasi dari daftar blokir
AI & Analytics
POST /ai/command — Kirim perintah ke AI
GET /suggestions — Ambil saran aplikasi
GET /analytics — Ambil data analytics
User
GET /profile — Ambil profil user
C. Environment Variables
Backend — backend/.env:
MONGO_URI=mongodb://localhost:27017/appblocker
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development

Frontend — frontend/.env.local:
NEXT_PUBLIC_API_URL=http://localhost:5000


D. Akun Default untuk Testing
Email: test@example.com
Password: test123
Ganti kredensial ini setelah testing selesai.
E. Keyboard Shortcuts
Shortcut
Aksi
Ctrl+Enter
Kirim perintah AI
F12
Buka browser dev tools
Ctrl+Shift+Del
Hapus data browser
Escape
Tutup modal

F. Kontak & Dukungan
Laporan bug: Buat issue di GitHub repository
Dokumentasi: Lihat file markdown di root folder
Update: Star repository untuk notifikasi update
Kontribusi: Pull requests sangat disambut!







Penutup
AppBlocker adalah solusi lengkap untuk meningkatkan produktivitas melalui pemblokiran distraksi. Dengan AI assistant dan analytics yang detail, kamu bisa memantau dan mengoptimalkan fokus secara konsisten.
Checklist Memulai:
[ ] Backend berjalan di port 5000
[ ] Frontend berjalan di port 3000
[ ] MongoDB terhubung
[ ] Akun sudah dibuat
[ ] Aplikasi pertama sudah diblokir
[ ] AI Hub sudah dicoba
[ ] Analytics sudah dilihat

Version: 1.0 | Status: Production Ready | Last Updated: May 2026

