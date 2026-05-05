"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    window.location.href = "/login";
  };

  return (
    <nav className="flex flex-wrap justify-between items-center gap-4 px-6 py-4 bg-slate-950 text-white shadow-xl">
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold tracking-tight">AppBlocker</div>
        <div className="hidden md:flex items-center gap-4 text-sm text-slate-300">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/ai" className="rounded-full border border-slate-600 px-4 py-2 text-sm transition hover:bg-slate-800">
          AI Hub
        </Link>
        {token ? (
          <button
            onClick={logout}
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold transition hover:bg-red-500"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className="rounded-full border border-slate-600 px-4 py-2 text-sm transition hover:bg-slate-800">
              Sign In
            </Link>
            <Link href="/signup" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
