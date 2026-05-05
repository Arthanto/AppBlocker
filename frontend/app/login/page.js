"use client";
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/login`, {
        email: identifier,
        password,
      });

      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err) {
      alert("Login gagal. Pastikan email dan password benar.");
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
              Secure sign-in
            </div>
            <h1 className="text-4xl font-bold text-white">Welcome back to AppBlocker</h1>
            <p className="text-slate-400">
              Masuk untuk mengelola aplikasi terblokir, melihat status server, dan menjaga produktivitas tim Anda.
            </p>
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Sample Account</p>
                <p className="mt-2 text-lg text-slate-200">Email: test</p>
                <p className="text-lg text-slate-200">Password: test123</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-950 p-8 shadow-xl shadow-slate-950/30">
            <h2 className="mb-6 text-3xl font-semibold text-white">Sign In</h2>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-300">Email</label>
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-400"
                placeholder="test"
              />
            </div>
            <div className="mt-4 space-y-4">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-400"
                placeholder="Password"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="mt-8 w-full rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="mt-6 text-center text-sm text-slate-400">
              Belum punya akun?{' '}
              <Link href="/signup" className="font-semibold text-white hover:text-sky-300">
                Sign Up sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
