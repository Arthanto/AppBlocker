"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Dashboard() {
  const [apps, setApps] = useState([]);
  const [newApp, setNewApp] = useState("");
  const [path, setPath] = useState("");
  const [reason, setReason] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("Checking...");
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState({ total: 0, byCategory: {}, recent: [] });
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchDashboard();
    }
  }, [token]);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const [blockedRes, analyticsRes, suggestionsRes] = await Promise.all([
          axios.get(`${API_BASE}/blocked`, headers),
          axios.get(`${API_BASE}/analytics`, headers),
          axios.get(`${API_BASE}/suggestions`, headers)
      ]);

      setApps(blockedRes.data);
      setAnalytics(analyticsRes.data);
      setSuggestions(suggestionsRes.data.suggestions.slice(0, 6));
      setStatus("Connected");
    } catch (err) {
      setStatus("Disconnected");
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 400 || err.response.status === 401) {
          localStorage.removeItem("token");
          setToken("");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const addApp = async () => {
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      return;
    }
    if (!newApp.trim()) return;
    try {
      await axios.post(
        `${API_BASE}/blocked`,
        { name: newApp.trim(), path: path.trim() || null, blockedReason: reason.trim() || "User blocked" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewApp("");
      setPath("");
      setReason("");
      fetchDashboard();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const statusCode = err.response.status;
        if (statusCode === 400 || statusCode === 401) {
          alert("Token tidak valid. Silakan login ulang.");
          localStorage.removeItem("token");
          setToken("");
          return;
        }
      }
      alert("Gagal menambahkan aplikasi.");
    }
  };

  const deleteApp = async (id) => {
    try {
      await axios.delete(`${API_BASE}/blocked/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDashboard();
    } catch (err) {
      alert("Gagal menghapus aplikasi.");
    }
  };

  const blockSuggestedApp = async (name) => {
    try {
      await axios.post(
        `${API_BASE}/blocked`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboard();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 409) {
          alert("Aplikasi sudah diblokir.");
          return;
        }
      }
      alert("Gagal memblokir aplikasi rekomendasi.");
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-slate-900/90 p-10 shadow-2xl shadow-slate-950/40">
          <h1 className="text-4xl font-bold">Akses Dashboard</h1>
          <p className="mt-4 text-slate-400">Silakan masuk terlebih dahulu untuk melihat daftar aplikasi yang diblokir.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/login" className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
              Sign In
            </Link>
            <Link href="/signup" className="rounded-full border border-slate-700 px-6 py-3 text-sm transition hover:border-slate-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-400">Dashboard</p>
              <h1 className="mt-3 text-4xl font-bold text-white">Smart AppBlocker Control</h1>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-950/70 px-5 py-3 text-sm text-slate-200 shadow-lg shadow-slate-950/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Server: {status}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6 rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-sky-400">Manage blocked applications</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Active Protection List</h2>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={newApp}
                  onChange={(e) => setNewApp(e.target.value)}
                  placeholder="Contoh: notepad.exe atau /path/to/app"
                  className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-sky-400"
                />
                <input
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  placeholder="Optional app path / location"
                  className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-sky-400"
                />
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason for block (optional)"
                  className="min-w-0 flex-1 rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-400"
                />
                <button onClick={addApp} className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
                  Tambah
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {loading && <p className="text-slate-400">Memuat daftar aplikasi...</p>}
              {apps.length === 0 && !loading ? (
                <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/70 p-8 text-center text-slate-400">
                  Tidak ada aplikasi terblokir. Tambahkan aplikasi di atas.
                </div>
              ) : (
                apps.map((app) => (
                  <div key={app._id} className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-inner shadow-slate-950/20">
                    <div>
                      <p className="font-medium text-white">{app.name}</p>
                      <p className="text-sm text-slate-500">Category: {app.category || "unknown"}</p>
                    </div>
                    <button onClick={() => deleteApp(app._id)} className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500">
                      Hapus
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
            <h3 className="text-xl font-semibold text-white">Quick Tips</h3>
            <div className="mt-5 space-y-4 text-slate-400">
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="font-semibold text-slate-200">Use exact process names</p>
                <p className="mt-2 text-sm text-slate-400">Masukkan nama proses seperti <code>notepad.exe</code> atau <code>canva.exe</code>.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="font-semibold text-slate-200">Akses AI Hub</p>
                <p className="mt-2 text-sm text-slate-400">Gunakan fitur AI untuk rekomendasi smart dan perintah natural language.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-400">Total blocked</p>
            <p className="mt-4 text-4xl font-bold text-white">{apps.length}</p>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-400">Analytics</p>
            <div className="mt-4 space-y-3 text-slate-300">
              <p>Productivity: {analytics.byCategory?.productivity || 0}</p>
              <p>Social: {analytics.byCategory?.social || 0}</p>
              <p>Design: {analytics.byCategory?.design || 0}</p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-400">Recent blocked</p>
            <div className="mt-4 space-y-2 text-slate-300">
              {analytics.recent?.length ? (
                analytics.recent.map((item) => (
                  <p key={item.name}>{item.name}</p>
                ))
              ) : (
                <p className="text-slate-500">Belum ada data terbaru.</p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-400">AI Suggestions</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Recommended apps</h2>
            </div>
            <Link href="/ai" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
              Open AI Hub
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.length === 0 ? (
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 text-center text-slate-400">
                Tidak ada rekomendasi saat ini.
              </div>
            ) : (
              suggestions.map((item) => (
                <div key={item.name} className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-slate-400">{item.category}</p>
                    </div>
                    <button
                      onClick={() => blockSuggestedApp(item.name)}
                      className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-sky-400"
                    >
                      Block
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
