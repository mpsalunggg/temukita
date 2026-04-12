export function LandingCta() {
  return (
    <section
      className="border-b border-border/60 bg-linear-to-br from-background via-surface to-background py-20 sm:py-24"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <h2
          id="cta-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Siap membuat undangan digital pertama Anda?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-subtle">
          Mulai dari satu halaman yang tenang dan mudah dibagikan — lalu
          kembangkan sesuai kebutuhan acara Anda.
        </p>
        <a
          href="#mulai"
          className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-accent px-10 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Buat undangan
        </a>
      </div>
    </section>
  )
}
