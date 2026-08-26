import { PricingCard, type Plan } from './PricingCard'
import { Reveal } from './Reveal'
import { Section, SectionHeading, waLink } from './ui'
import { Wave } from './Wave'

const plans: Plan[] = [
  {
    slug: 'wedding',
    name: 'Undangan Wedding',
    subtitle: 'Pernikahan, akad, dan resepsi',
    price: 250_000,
    activeMonths: 12,
    inviteQuota: 300,
    waQuota: 100,
    ctaHref: '/templates',
    ctaLabel: 'Lihat contoh',
  },
  {
    slug: 'birthday',
    name: 'Undangan Birthday',
    subtitle: 'Ulang tahun, aqiqah, dan syukuran',
    price: 150_000,
    activeMonths: 12,
    inviteQuota: 150,
    waQuota: 40,
    // ponytail: belum ada template birthday — arahkan ke form di hero, bukan
    // ke preview palsu. Ganti ke /template4 kalau template birthday jadi.
    ctaHref: '#mulai',
    ctaLabel: 'Buat undangan',
  },
  {
    slug: 'custom',
    name: 'Undangan Custom',
    subtitle: 'Desain dibuat dari nol, bukan dari template',
    // Bespoke work has no fixed scope, so there is no honest number to print.
    price: null,
    priceNote: 'harga sesuai kebutuhan',
    activeMonths: 24,
    inviteQuota: null,
    waQuota: 200,
    ctaHref: waLink(
      'Halo Temukita, saya ingin tanya soal paket Undangan Custom.',
    ),
    ctaLabel: 'Chat WhatsApp',
  },
]

// Berlaku di semua paket — tidak ada fitur yang digembok antar card.
const features = [
  'Link undangan aktif',
  'RSVP konfirmasi hadir',
  'Info acara, peta, & countdown',
  'Galeri foto & musik latar',
  'Amplop digital & buku ucapan',
  'Bagikan via WA & QR',
  'Rekap RSVP & daftar tamu',
]

// Kuota undangan sudah bisa ditambah langsung di kartu, jadi tidak diulang di sini.
const addons = [
  '+100 pesan WA blast — Rp 79.000',
  'Perpanjang 12 bulan — Rp 49.000',
]

export function LandingPricing() {
  return (
    <Section
      id="harga"
      labelledBy="harga-heading"
      tone="surface"
      bleed={<Wave position="top" className="text-background" />}
    >
      <Reveal>
        <SectionHeading
          id="harga-heading"
          eyebrow="Harga & kuota"
          title={
            <>
              Bayar sesuai <span className="text-accent">jumlah undangan</span>
            </>
          }
        >
          Bayar sekali, tanpa langganan bulanan. Semua fitur dasar ada di setiap
          paket — atur jumlah undangan sesuai besar acara Anda.
        </SectionHeading>
      </Reveal>

      {/* Three cards never divide evenly into two columns, so it goes straight
          from one column to three — a lone card on a second row is what made
          the heights look mismatched in the first place. */}
      <ul className="mt-14 grid gap-8 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal key={plan.slug} delay={i * 0.08} className="flex">
            <li className="flex w-full">
              <PricingCard plan={plan} features={features} />
            </li>
          </Reveal>
        ))}
      </ul>

      {/* Add-ons — dijual setelah pembelian, bukan paket terpisah */}
      <Reveal className="mt-10">
        <p className="text-xs font-semibold text-foreground">
          Add-on setelah undangan aktif
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-subtle">
          {addons.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-subtle">
          WA blast dikirim lewat WhatsApp Business API resmi.
        </p>
      </Reveal>
    </Section>
  )
}
