export default function Services() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-400">Services</p>
          <h1 className="mt-4 text-4xl font-bold text-white">Solusi lengkap untuk proteksi aplikasi.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Dari login aman hingga pemblokiran aplikasi secara otomatis, AppBlocker dirancang untuk memberikan kontrol penuh dalam lingkungan digital Anda.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h2 className="text-xl font-semibold text-white">Web Dashboard</h2>
            <p className="mt-4 text-slate-300">Tampilan profesional untuk mengelola daftar aplikasi yang diblokir dengan mudah.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h2 className="text-xl font-semibold text-white">Client Monitoring</h2>
            <p className="mt-4 text-slate-300">Client Python memonitor proses dan menghentikan aplikasi terlarang secara real-time.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h2 className="text-xl font-semibold text-white">User Authentication</h2>
            <p className="mt-4 text-slate-300">Login dan signup sederhana namun aman untuk semua pengguna.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
