import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-800 px-6 py-20 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex rounded-full bg-sky-500/20 px-4 py-1 text-sm font-semibold text-sky-300">
              Professional App Control
            </span>
            <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Kontrol aplikasi dengan tampilan web modern yang profesional.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              AppBlocker menawarkan dashboard blokir aplikasi, login aman, dan antarmuka yang rapi untuk pengalaman seperti Canva, ChatGPT, dan Copilot.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 shadow-xl shadow-sky-500/20 transition hover:bg-sky-400">
                Sign In
              </Link>
              <Link href="/signup" className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-base font-semibold text-white transition hover:border-slate-500">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-800 bg-white/5 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl md:w-[520px]">
            <div className="flex items-center justify-between text-slate-300">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-sky-300">Active Protection</p>
                <p className="mt-2 text-2xl font-semibold text-white">Dashboard Overview</p>
              </div>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">Live</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900 p-4 text-slate-300 shadow-lg shadow-slate-950/20">
                <p className="text-sm font-semibold text-slate-100">Blocked Apps</p>
                <p className="mt-3 text-3xl font-bold text-white">12</p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-4 text-slate-300 shadow-lg shadow-slate-950/20">
                <p className="text-sm font-semibold text-slate-100">Active Sessions</p>
                <p className="mt-3 text-3xl font-bold text-white">3</p>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-900 p-4 text-slate-300 shadow-lg shadow-slate-950/20">
              <p className="text-sm font-semibold text-slate-100">Latest Blocked</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>canva.exe</li>
                <li>notepad.exe</li>
                <li>chrome.exe</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-400">Fitur Utama</p>
            <h2 className="mt-4 text-4xl font-bold text-white">Semua kebutuhan keamanan aplikasi dalam satu tempat.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/20">
              <h3 className="text-xl font-semibold text-white">Dashboard Modern</h3>
              <p className="mt-4 text-slate-400">Kelola daftar aplikasi yang diblokir dan pantau status server dengan UI profesional.</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/20">
              <h3 className="text-xl font-semibold text-white">Login & Signup</h3>
              <p className="mt-4 text-slate-400">Akses aman dengan login dan registrasi yang mudah digunakan, cocok untuk pengguna modern.</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/20">
              <h3 className="text-xl font-semibold text-white">Proteksi Otomatis</h3>
              <p className="mt-4 text-slate-400">Client Python akan memonitor proses secara real-time dan menghentikan aplikasi terlarang.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}