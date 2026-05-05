"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Lengkapi semua field sebelum mendaftar.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/register`, {
        name,
        email,
        password,
      });
      alert("Registrasi berhasil! Silakan login.");
      router.push("/login");
    } catch (err) {
      const message = err?.response?.data?.message || "Registrasi gagal.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <div className="grid w-full gap-10 rounded-[2rem] bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-300">
              Join AppBlocker
            </div>
            <h1 className="text-4xl font-bold text-white">Buat akun dan mulai proteksi aplikasi Anda.</h1>
            <p className="text-slate-400">
              Daftar sekarang untuk mengelola aplikasi terblokir, memantau status server, dan mendapatkan pengalaman UI yang modern.
            </p>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5 text-slate-300 shadow-lg shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Keuntungan</p>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li>• Dashboard profesional</li>
                <li>• Proteksi real-time di client Python</li>
                <li>• Login dan manajemen app mudah</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-950 p-8 shadow-xl shadow-slate-950/30">
            <h2 className="mb-6 text-3xl font-semibold text-white">Sign Up</h2>
            <div className="space-y-5">
              <label className="block text-sm font-medium text-slate-300">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-400"
                placeholder="Nama lengkap"
              />
            </div>
            <div className="mt-4 space-y-5">
              <label className="block text-sm font-medium text-slate-300">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-400"
                placeholder="email@domain.com"
              />
            </div>
            <div className="mt-4 space-y-5">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-400"
                placeholder="Password kuat"
              />
            </div>

            <button
              onClick={handleSignup}
              disabled={loading}
              className="mt-8 w-full rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Membuat akun..." : "Create Account"}
            </button>

            <p className="mt-6 text-center text-sm text-slate-400">
              Sudah punya akun?{' '}
              <Link href="/login" className="font-semibold text-white hover:text-sky-300">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
