const features = [
  {
    title: 'Desain tenang dan fleksibel',
    description:
      'Pilih gaya yang selaras dengan acara Anda. Tipografi dan warna diset agar nyaman dibaca tanpa terasa berlebihan.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.077c0-.19-.01-.377-.027-.56a3 3 0 0 0-.073-1.18M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    ),
  },
  {
    title: 'RSVP tanpa ribet',
    description:
      'Tamu bisa mengonfirmasi kehadiran lewat undangan. Anda mendapat gambaran jumlah tamu secara terpusat.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    title: 'Peta & arah lokasi',
    description:
      'Sematkan petunjuk menuju venue agar tamu tidak perlu mencari alamat di obrolan terpisah.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
  },
  {
    title: 'Satu tautan untuk dibagikan',
    description:
      'Bagikan undangan lewat pesan atau media sosial. Tampilan tetap rapi di ponsel maupun desktop.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.19 8.688a4.5 4.5 0 0 1 6.364 6.364l-3 3a4.5 4.5 0 0 1-6.364-6.364l1.5-1.5Zm-6.364 6.364a4.5 4.5 0 0 1 6.364 0l3 3a4.5 4.5 0 0 1-6.364 6.364l-1.5-1.5a4.5 4.5 0 0 1 0-6.364Z"
        />
      </svg>
    ),
  },
]

export function LandingFeatures() {
  return (
    <section
      id="fitur"
      className="border-b border-border/60 bg-surface py-20 sm:py-28"
      aria-labelledby="fitur-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2
          id="fitur-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Yang Anda butuhkan untuk undangan digital
        </h2>
        <p className="mt-3 max-w-2xl text-subtle">
          Fokus pada kejelasan dan kenyamanan tamu — bukan pada elemen yang
          mengalihkan perhatian dari momen Anda.
        </p>
        <ul className="mt-14 grid gap-8 sm:grid-cols-2">
          {features.map((f) => (
            <li
              key={f.title}
              className="rounded-2xl border border-border/80 bg-background/60 p-6 shadow-sm shadow-foreground/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background text-accent">
                {f.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-subtle">
                {f.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
