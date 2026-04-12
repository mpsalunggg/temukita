const CheckIcon = () => (
  <svg
    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
      clipRule="evenodd"
    />
  </svg>
)

const DotIcon = () => (
  <span
    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-border"
    aria-hidden
  />
)

type Feature = { label: string; active: boolean }

interface Plan {
  slug: string
  name: string
  subtitle: string
  price: string
  badge?: string
  featured?: boolean
  features: Feature[]
}

const plans: Plan[] = [
  {
    slug: 'sederhana',
    name: 'Sederhana',
    subtitle: 'Wedding · Birthday · Aqiqah',
    price: 'Rp 49.000',
    features: [
      { label: 'Link undangan aktif', active: true },
      { label: 'RSVP konfirmasi hadir', active: true },
      { label: 'Info acara & lokasi', active: true },
      { label: 'Bagikan via WA & QR', active: true },
      { label: 'Galeri foto', active: false },
      { label: 'Amplop digital', active: false },
      { label: 'Musik latar', active: false },
    ],
  },
  {
    slug: 'elegan',
    name: 'Elegan',
    subtitle: 'Wedding · Anniversary · Wisuda',
    price: 'Rp 99.000',
    badge: 'Terlaris',
    featured: true,
    features: [
      { label: 'Semua fitur Sederhana', active: true },
      { label: 'Galeri foto (maks 20)', active: true },
      { label: 'Musik latar pilihan', active: true },
      { label: 'Countdown timer acara', active: true },
      { label: 'Amplop digital & rekening', active: true },
      { label: 'Ucapan & doa tamu', active: true },
      { label: 'Custom domain', active: false },
    ],
  },
  {
    slug: 'mewah',
    name: 'Mewah',
    subtitle: 'Wedding · Corporate · Gala',
    price: 'Rp 199.000',
    badge: 'Premium',
    features: [
      { label: 'Semua fitur Elegan', active: true },
      { label: 'Galeri foto tak terbatas', active: true },
      { label: 'Custom domain sendiri', active: true },
      { label: 'Video intro undangan', active: true },
      { label: 'Manajemen tamu & tabel', active: true },
      { label: 'Rekap RSVP (export CSV)', active: true },
      { label: 'Prioritas support WA', active: true },
    ],
  },
]

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <li
      className={[
        'relative flex flex-col rounded-2xl border bg-background',
        plan.featured
          ? 'border-2 border-accent shadow-xl shadow-accent/10'
          : 'border-border shadow-sm shadow-foreground/5',
      ].join(' ')}
    >
      {/* Name + badge */}
      <div className="flex items-center gap-2 px-6 pt-5">
        <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
        {plan.badge && (
          <span
            className={[
              'rounded-full px-2 py-0.5 text-[11px] font-semibold',
              plan.featured
                ? 'bg-accent/10 text-accent'
                : 'bg-foreground/8 text-foreground/60',
            ].join(' ')}
          >
            {plan.badge}
          </span>
        )}
      </div>

      {/* Subtitle */}
      <p className="px-6 pt-1 text-xs text-subtle">{plan.subtitle}</p>

      {/* Price */}
      <p
        className={[
          'px-6 pt-4 text-2xl font-bold',
          plan.featured ? 'text-accent' : 'text-foreground',
        ].join(' ')}
      >
        {plan.price}
      </p>

      {/* Feature list */}
      <ul className="mt-5 flex flex-col gap-2.5 px-6">
        {plan.features.map((f) => (
          <li
            key={f.label}
            className={[
              'flex items-start gap-2 text-sm',
              f.active ? 'text-foreground' : 'text-subtle',
            ].join(' ')}
          >
            {f.active ? <CheckIcon /> : <DotIcon />}
            {f.label}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto px-6 pb-6 pt-8">
        <a
          href={`#preview-${plan.slug}`}
          className={[
            'flex h-11 w-full items-center justify-center rounded-full border text-sm font-semibold transition-colors',
            plan.featured
              ? 'border-accent bg-accent text-white hover:bg-accent-hover'
              : 'border-border bg-background text-foreground hover:border-accent/40 hover:bg-surface',
          ].join(' ')}
        >
          Lihat preview
        </a>
      </div>
    </li>
  )
}

export function LandingPricing() {
  return (
    <section
      id="harga"
      className="border-b border-border/60 bg-surface py-20 sm:py-28"
      aria-labelledby="harga-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section label */}
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-subtle">
          Contoh template &amp; bundle fitur
        </p>
        <h2
          id="harga-heading"
          className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          Pilih paket yang sesuai acara Anda
        </h2>
        <p className="mt-3 max-w-xl text-subtle">
          Mulai gratis, lalu pilih paket yang sesuai. Semua harga sudah termasuk
          akses seumur hidup undangan.
        </p>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.slug} plan={plan} />
          ))}
        </ul>
      </div>
    </section>
  )
}
