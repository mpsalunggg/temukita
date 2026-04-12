const steps = [
  {
    step: '01',
    title: 'Pilih gaya',
    text: 'Sesuaikan undangan dengan nuansa acara — dari formal hingga santai.',
  },
  {
    step: '02',
    title: 'Isi detail',
    text: 'Tambahkan waktu, lokasi, cerita singkat, dan informasi yang ingin disampaikan.',
  },
  {
    step: '03',
    title: 'Bagikan tautan',
    text: 'Undangan siap dibagikan. Tamu membuka satu halaman yang konsisten di semua perangkat.',
  },
]

export function LandingHowItWorks() {
  return (
    <section
      id="cara-kerja"
      className="border-b border-border/60 bg-background py-20 sm:py-28"
      aria-labelledby="cara-kerja-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2
          id="cara-kerja-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Cara kerja
        </h2>
        <p className="mt-3 max-w-2xl text-subtle">
          Tiga langkah sederhana dari ide hingga undangan yang bisa dibagikan.
        </p>
        <ol className="mt-14 grid gap-10 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.step}>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                {s.step}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-subtle">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
