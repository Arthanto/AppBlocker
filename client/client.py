import os
import psutil
import requests
import time
import threading
import customtkinter as ctk

API_URL = "http://localhost:5000/blocked"
LOGIN_URL = "http://localhost:5000/login"
TOKEN = ""
blocked_apps = []
server_status = "Checking..."
threads_started = False

# Gunakan path absolut untuk token file
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
TOKEN_FILE = os.path.join(SCRIPT_DIR, "token.txt")

# Baca token dari file lokal token.txt jika ada
if os.path.exists(TOKEN_FILE):
    try:
        with open(TOKEN_FILE, "r") as f:
            TOKEN = f.read().strip()
            print(f"Token loaded from {TOKEN_FILE}")
    except Exception as e:
        print("Error membaca token:", e)


def save_token(token):
    global TOKEN
    TOKEN = token
    try:
        with open(TOKEN_FILE, "w") as f:
            f.write(token)
        print(f"Token saved to {TOKEN_FILE}")
    except Exception as e:
        print("Error menyimpan token:", e)


def clear_token():
    global TOKEN
    TOKEN = ""
    try:
        if os.path.exists(TOKEN_FILE):
            os.remove(TOKEN_FILE)
            print(f"Expired token removed: {TOKEN_FILE}")
    except Exception as e:
        print("Error menghapus token:", e)


def update_status(text):
    global server_status
    server_status = text
    try:
        status_label.configure(text=f"Server: {server_status}")
    except Exception:
        pass


def login_user():
    email = email_entry.get().strip()
    password = password_entry.get().strip()
    if not email or not password:
        update_status("Isi email dan password terlebih dahulu")
        return

    try:
        response = requests.post(LOGIN_URL, json={"email": email, "password": password}, timeout=5)
        if response.status_code == 200:
            token = response.json().get("token")
            if token:
                save_token(token)
                update_status("Token diterima, tersambung...")
                start_threads()
                login_button.configure(state="disabled")
                email_entry.configure(state="disabled")
                password_entry.configure(state="disabled")
                info_label.configure(text="Client siap. Menunggu data dari server...")
                return
        message = response.json().get("message", "Login gagal")
        update_status(f"Login gagal: {message}")
    except Exception as e:
        update_status(f"Login error: {e}")


def fetch_blocked_apps():
    global blocked_apps
    while True:
        if not TOKEN:
            update_status("Tidak ada token. Silakan login.")
            time.sleep(5)
            continue

        headers = {"Authorization": f"Bearer {TOKEN}"}
        try:
            res = requests.get(API_URL, headers=headers, timeout=5)
            if res.status_code == 200:
                data = res.json()
                blocked_apps = [app["name"].lower() for app in data]
                update_status("Connected")
            elif res.status_code in (401, 403):
                update_status("Token expired atau invalid")
                clear_token()
            else:
                update_status("Disconnected")
        except Exception as e:
            update_status(f"Fetch error: {e}")
        time.sleep(5)

def get_block_variants(app_name):
    variants = set()
    lower = (app_name or "").lower().strip()
    if not lower:
        return variants

    variants.add(lower)
    stripped = lower
    ext_list = [".exe", ".app", ".deb", ".msi", ".dmg", ".bin", ".sh", ".jar", ".apk"]
    has_ext = False
    for ext in ext_list:
        if stripped.endswith(ext):
            stripped = stripped[:-len(ext)]
            has_ext = True
            break

    variants.add(stripped)
    if stripped and not has_ext:
        variants.add(stripped + ".exe")
        variants.add(stripped + ".app")
    return {v for v in variants if v}


def monitor_apps():
    while True:
        if not blocked_apps:
            time.sleep(2)
            continue

        blocked_variants = set()
        for app_name in blocked_apps:
            blocked_variants.update(get_block_variants(app_name))

        for process in psutil.process_iter(['pid', 'name']):
            try:
                proc_name = (process.info['name'] or "").lower()
                if proc_name in blocked_variants or proc_name.replace('.exe', '') in blocked_variants:
                    print(f"Blocked: {process.info['name']}")
                    proc = psutil.Process(process.info['pid'])
                    proc.terminate()
                    try:
                        proc.wait(1)
                    except psutil.TimeoutExpired:
                        proc.kill()
            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                pass
            except Exception as e:
                print("monitor error:", e)
        time.sleep(2)


def start_threads():
    global threads_started
    if threads_started:
        return
    threads_started = True
    threading.Thread(target=fetch_blocked_apps, daemon=True).start()
    threading.Thread(target=monitor_apps, daemon=True).start()

# ================= UI =================
ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")

app = ctk.CTk()
app.geometry("520x420")
app.title("Modern App Blocker")

header = ctk.CTkLabel(app, text="🚀 App Blocker Active", font=("Arial", 24, "bold"))
header.pack(pady=(20, 10))

status_label = ctk.CTkLabel(app, text=f"Server: {server_status}", font=("Arial", 16))
status_label.pack(pady=10)

login_frame = ctk.CTkFrame(app)
login_frame.pack(pady=10, padx=20, fill="x")

ctk.CTkLabel(login_frame, text="Email", anchor="w").pack(fill="x", padx=10, pady=(10, 0))
email_entry = ctk.CTkEntry(login_frame, placeholder_text="test")
email_entry.pack(fill="x", padx=10, pady=5)

ctk.CTkLabel(login_frame, text="Password", anchor="w").pack(fill="x", padx=10, pady=(10, 0))
password_entry = ctk.CTkEntry(login_frame, placeholder_text="test123", show="*")
password_entry.pack(fill="x", padx=10, pady=5)

login_button = ctk.CTkButton(login_frame, text="Login ke Backend", command=login_user)
login_button.pack(padx=10, pady=15, fill="x")

info_label = ctk.CTkLabel(app, text="Silakan login menggunakan akun yang terdaftar di frontend.", font=("Arial", 14))
info_label.pack(pady=10)

if TOKEN:
    start_threads()

app.mainloop()
