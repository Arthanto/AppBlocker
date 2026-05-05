"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Profile() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("fetchProfile error", err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-slate-900/90 p-10 shadow-2xl shadow-slate-950/40 text-center">
          <p className="text-xl text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-slate-900/90 p-10 shadow-2xl shadow-slate-950/40 text-center">
          <h1 className="text-4xl font-bold">Profile</h1>
          <p className="mt-4 text-slate-400">Silakan login untuk melihat informasi profil Anda.</p>
          <Link href="/login" className="mt-8 inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-400">User Profile</p>
              <h1 className="text-4xl font-bold text-white">{user.name}</h1>
              <p className="mt-3 text-slate-400">Akun profesional Anda untuk AppBlocker. Simpan informasi dengan standar keamanan dan tampilan modern.</p>
            </div>
            <img src={user.avatar || "/favicon.ico"} alt="Profile avatar" className="h-28 w-28 rounded-full border border-slate-700 object-cover" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h2 className="text-2xl font-semibold text-white">Account Details</h2>
            <div className="mt-6 space-y-5 text-slate-300">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Full Name</p>
                <p className="mt-2 text-lg font-semibold text-white">{user.name}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Email</p>
                <p className="mt-2 text-lg font-semibold text-white">{user.email}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Role</p>
                <p className="mt-2 text-lg font-semibold text-white">{user.role}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h2 className="text-2xl font-semibold text-white">Security Summary</h2>
            <div className="mt-6 space-y-5 text-slate-300">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Account Created</p>
                <p className="mt-2 text-lg font-semibold text-white">{new Date(user.createdAt).toLocaleString()}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Last Login</p>
                <p className="mt-2 text-lg font-semibold text-white">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Belum login"}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Status Akun</p>
                <p className="mt-2 text-lg font-semibold text-white">{user.isActive ? "Active" : "Inactive"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <h2 className="text-2xl font-semibold text-white">Professional Notes</h2>
          <p className="mt-4 text-slate-400">Data profil Anda kini tersimpan dengan format profesional, lengkap dengan avatar, status akun, dan detail keamanan.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Best practice</p>
              <p className="mt-3 text-slate-300">Gunakan email resmi dan pastikan password kuat untuk menjaga keamanan AppBlocker Anda.</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Next step</p>
              <p className="mt-3 text-slate-300">Untuk pengalaman lebih lengkap, silakan buka Dashboard dan gunakan AI Hub untuk rekomendasi otomatis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
