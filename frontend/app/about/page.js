export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-400">About AppBlocker</p>
          <h1 className="mt-4 text-4xl font-bold text-white">Profesional, ringkas, dan aman.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            AppBlocker membantu tim Anda mengontrol aplikasi yang berjalan pada perangkat dengan cara yang mudah dan modern. Kombinasikan web dashboard dengan client Python untuk proteksi real-time.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h2 className="text-2xl font-semibold text-white">Visi</h2>
            <p className="mt-4 text-slate-300">
              Membuat pengalaman manajemen aplikasi terblokir semudah penggunaan aplikasi profesional terkemuka, dengan tampilan yang elegan dan alur pengguna yang jelas.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h2 className="text-2xl font-semibold text-white">Misi</h2>
            <p className="mt-4 text-slate-300">
              Memberikan antarmuka yang bersih dengan fitur login, dashboard, dan manajemen blokir aplikasi sehingga semua pengguna bisa langsung bekerja tanpa kebingungan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
