export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-400">Contact</p>
          <h1 className="mt-4 text-4xl font-bold text-white">Get in touch</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Jika Anda memerlukan bantuan pada konfigurasi, login, atau ingin menambahkan fitur baru, silakan hubungi tim pengembang.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h2 className="text-2xl font-semibold text-white">Support</h2>
            <p className="mt-4 text-slate-300">Email: support@appblocker.local</p>
            <p className="mt-2 text-slate-300">Phone: +62 812-3456-7890</p>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h2 className="text-2xl font-semibold text-white">Address</h2>
            <p className="mt-4 text-slate-300">Jakarta, Indonesia</p>
            <p className="mt-2 text-slate-300">Open for local integration and support.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
