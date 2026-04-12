export function LandingHero() {
  return (
    <section
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div id="mulai" className="scroll-mt-28" aria-hidden tabIndex={-1} />

      {/* video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/ring.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        tabIndex={-1}
      />

      {/* overlay */}
      <div className="absolute inset-0 z-10 bg-black/55" aria-hidden />

      {/* content */}
      {/* Extra top padding so copy clears the fixed navbar; video still fills full section */}
      <div className="relative z-20 mx-auto max-w-5xl flex flex-col items-center justify-center">
        <p className="text-sm text-white/70">Temukita — undangan digital</p>

        <h1
            id="hero-heading"
            className="mt-4 text-4xl font-bold leading-snug tracking-tight text-white sm:text-5xl sm:leading-snug"
        >
          Undangan pernikahan modern
        </h1>
        <h1 className="text-4xl font-bold leading-snug tracking-tight text-white sm:text-5xl sm:leading-snug">
          langsung dari satu tautan
        </h1>

        <p className="mt-5 max-w-xl text-center text-sm leading-relaxed text-white/80">
          Buat undangan digital sendiri, bagikan ke tamu lewat WhatsApp atau
          media sosial, dan pantau konfirmasi kehadiran — tanpa perlu kirim
          file atau cetak kertas.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#mulai"
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-7 text-sm font-semibold text-white shadow-lg shadow-black/30 transition-colors hover:bg-accent-hover"
          >
            Buat undangan
          </a>
          <a
            href="#fitur"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Lihat fitur
          </a>
        </div>

        <p className="mt-8 text-sm text-white/60">
          Gratis untuk dicoba. Tidak perlu akun dulu.
        </p>
      </div>
    </section>
  );
}
