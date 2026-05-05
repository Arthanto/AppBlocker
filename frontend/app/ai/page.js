"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AI() {
  const [token, setToken] = useState("");
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
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
      fetchSuggestions();
    }
  }, [token]);

  const fetchSuggestions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/suggestions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuggestions(res.data.suggestions.slice(0, 8));
    } catch (err) {
      console.error("fetchSuggestions error", err);
    }
  };

  const sendCommand = async () => {
    if (!command.trim()) return;
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    const userMessage = { role: "user", text: command };
    setMessages((current) => [...current, userMessage]);
    setLoading(true);
    setCommand("");

    try {
      const res = await axios.post(
        `${API_BASE}/ai/command`,
        { command },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const responseText = res.data.message || "AI response received.";
      setMessages((current) => [...current, { role: "assistant", text: responseText }]);
      if (res.data.suggestions) {
        setSuggestions(res.data.suggestions.slice(0, 8));
      }
    } catch (err) {
      console.error("sendCommand error", err);
      alert("Gagal mengirim perintah AI. Pastikan token masih valid.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-slate-900/90 p-10 shadow-2xl shadow-slate-950/40">
          <h1 className="text-4xl font-bold">AI Hub</h1>
          <p className="mt-4 text-slate-400">Login dulu untuk menggunakan fitur AI dan rekomendasi blokir aplikasi.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/login" className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
              Sign In
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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-400">AI Hub</p>
              <h1 className="text-4xl font-bold text-white">Natural Language Control</h1>
            </div>
            <Link href="/dashboard" className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700">
              Back to Dashboard
            </Link>
          </div>
          <p className="mt-4 text-slate-400">Gunakan perintah bahasa Indonesia atau Inggris untuk memblokir, membuka blokir, atau mendapatkan rekomendasi aplikasi.</p>
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-400">AI Commands</p>
              <h2 className="text-2xl font-semibold text-white">Coba perintah berikut</h2>
            </div>
            <button
              onClick={() => setCommand("block social media apps")}
              className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
            >
              Contoh Command
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <textarea
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              rows={4}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none transition focus:border-sky-400"
              placeholder="Contoh: block all social media apps atau unblock notepad.exe"
            />
            <button
              onClick={sendCommand}
              disabled={loading}
              className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Processing..." : "Send Command"}
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h3 className="text-xl font-semibold text-white">Chat History</h3>
            <div className="mt-6 space-y-4">
              {messages.length === 0 ? (
                <p className="text-slate-500">Belum ada interaksi AI. Kirim perintah untuk mulai.</p>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`rounded-3xl p-4 ${msg.role === "user" ? "bg-slate-950 text-white" : "bg-slate-800 text-slate-200"}`}
                  >
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{msg.role}</p>
                    <p className="mt-2 whitespace-pre-line">{msg.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h3 className="text-xl font-semibold text-white">Suggested apps</h3>
            <p className="mt-3 text-slate-400">Gunakan rekomendasi ini sebagai daftar blokir cepat.</p>
            <div className="mt-6 space-y-3">
              {suggestions.length === 0 ? (
                <p className="text-slate-500">Memuat rekomendasi...</p>
              ) : (
                suggestions.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-slate-400">{item.category}</p>
                    </div>
                    <button
                      onClick={() => blockSuggestedApp(item.name)}
                      className="rounded-full bg-sky-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-sky-400"
                    >
                      Block
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function blockSuggestedApp(name) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) return;
  try {
    await axios.post(
      `${API_BASE}/blocked`,
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert("Gagal memblokir aplikasi rekomendasi.");
  }
}