import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { LandingHeader } from '@/components/landing/LandingHeader'
import { Reveal } from '@/components/landing/Reveal'
import { Button, Section, SectionHeading, waLink } from '@/components/landing/ui'
import { Wave } from '@/components/landing/Wave'

export const metadata: Metadata = {
  title: 'Pilihan Template — Temukita',
  description:
    'Lihat semua template undangan digital Temukita. Buka contohnya langsung, lalu pilih yang paling cocok dengan acara Anda.',
}

/**
 * Thumbnails are real screenshots of each template's cover, captured from the
 * running pages at 1440×900 with the intro gate dismissed. Regenerate them the
 * same way after a template redesign — a stock photo here would show the
 * photography rather than the layout, which is the thing being chosen.
 */
type TemplateCard = {
  href: string
  name: string
  /** Set only when a template is not a wedding invitation. */
  category?: string
  tagline: string
  description: string
  image: string
  swatches: string[]
}

const templates: TemplateCard[] = [
  {
    href: '/template1',
    name: 'Botanis',
    tagline: 'Foto penuh, nama besar, ornamen daun',
    description:
      'Cover gelap dengan satu foto memenuhi layar dan nama dalam serif besar. Isi undangannya terang — ivory dengan aksen sage dan ilustrasi daun garis halus.',
    image: '/images/landing/template1.jpg',
    swatches: ['#231f1c', '#8a9a7b', '#faf7f2'],
  },
  {
    href: '/template2',
    name: 'Malam',
    tagline: 'Layar terbagi, huruf terukir, aksen emas',
    description:
      'Panel hijau malam berisi teks di samping foto penuh, dengan huruf kapital terukir dan label emas. Paling formal, dan paling menonjolkan foto prewedding.',
    image: '/images/landing/template2.jpg',
    swatches: ['#131a16', '#c9a227', '#f0ebe3'],
  },
  {
    href: '/template3',
    name: 'Hangat',
    tagline: 'Terang, ringkas, sudut membulat',
    description:
      'Latar krem dengan nama terracotta dan foto membulat yang sedikit miring. Versi paling ringkas — tanpa cerita panjang dan tanpa amplop digital.',
    image: '/images/landing/template3.jpg',
    swatches: ['#fbf7f1', '#c4674e', '#7a4a3c'],
  },
  {
    href: '/template4',
    name: 'Monokrom',
    tagline: 'Hitam-putih, huruf kapital, garis tipis',
    description:
      'Foto hitam-putih sepenuhnya, judul serif kapital berjarak lebar, dan pemisah berupa garis rambut. Bergantian antara halaman terang dan hitam pekat — paling tegas dan paling editorial.',
    image: '/images/landing/template4.jpg',
    swatches: ['#0b0b0b', '#efece7', '#ffffff'],
  },
  {
    href: '/template5',
    name: 'Sepia',
    tagline: 'Cokelat hangat, huruf kaligrafi, teks mesin tik',
    description:
      'Semua foto bernuansa sepia, nama mempelai dalam kaligrafi mengalir, dan seluruh teks memakai huruf mesin tik berjarak lebar. Paling lembut dan paling hangat dari enam undangan pernikahan di sini.',
    image: '/images/landing/template5.jpg',
    swatches: ['#2f2b25', '#ddd5c4', '#cec4b0'],
  },
  {
    href: '/template6',
    name: "Syar'i",
    tagline: 'Putih, kaligrafi Arab, ornamen geometris',
    description:
      'Dasar putih dengan kaligrafi Arab, ornamen bintang delapan, dan aksen hijau zaitun tua. Satu-satunya yang tidak menampilkan foto mempelai — yang tampil nama, doa, dan informasi acara.',
    image: '/images/landing/template6.jpg',
    swatches: ['#fdfdfb', '#46543f', '#9d8757'],
  },
  {
    href: '/azhaliya-inayah-safia',
    name: 'Mungil',
    category: 'Akikah',
    tagline: 'Pink lembut, ilustrasi bayi, tanpa foto',
    description:
      'Satu-satunya yang bukan undangan pernikahan. Merah muda lembut dengan ilustrasi cat air — bayi, pita, karangan bunga — dan tidak memakai foto sama sekali. Isinya ringkas: salam, detail acara, tanda kasih, dan doa.',
    image: '/images/landing/template7.jpg',
    swatches: ['#fdf0eb', '#e4a89c', '#63374a'],
  },
]

/** WhatsApp's own mark — the one thing on this page nobody has to read. */
function WhatsAppIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  )
}

export default function TemplatesPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background text-foreground">
      <LandingHeader solid />
      <main className="flex-1">
        <Section
          labelledBy="templates-heading"
          className="pt-32 sm:pt-40"
          tone="surface"
          bleed={<Wave position="bottom" className="text-background" />}
        >
          <Reveal>
            <SectionHeading
              id="templates-heading"
              eyebrow="Template"
              title={
                <>
                  Pilih <span className="text-accent">gaya undangan</span> Anda
                </>
              }
            >
              Tujuh gaya: enam undangan pernikahan dan satu tasyakuran akikah.
              Buka contohnya dulu — semuanya bisa dilihat penuh tanpa daftar
              akun.
            </SectionHeading>
          </Reveal>

          <ul className="mt-14 grid gap-8 sm:grid-cols-2">
            {templates.map((t, i) => (
              <Reveal key={t.href} delay={(i % 2) * 0.08}>
                <li className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-background shadow-sm shadow-foreground/5 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-foreground/10 motion-safe:hover:-translate-y-1">
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-surface">
                    <Image
                      src={t.image}
                      alt={`Contoh tampilan template ${t.name}`}
                      fill
                      sizes="(min-width: 640px) 30rem, 90vw"
                      className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                    />

                    {/* Only the non-wedding templates are labelled. A baby
                        invitation sitting unmarked in a grid of weddings reads
                        as a mistake. */}
                    {t.category && (
                      <span className="absolute top-3 left-3 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                        {t.category}
                      </span>
                    )}

                    {/* Scrim only at the foot, so the swatches read on any
                        thumbnail without dimming the design being shown. */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/45 to-transparent"
                      aria-hidden
                    />

                    {/* Palette at a glance — faster to scan than prose. Sitting
                        on the image keeps the card header to one clean line. */}
                    <div
                      className="absolute bottom-3 left-3 flex gap-1.5 rounded-full bg-black/25 p-1.5 backdrop-blur-sm"
                      aria-hidden
                    >
                      {t.swatches.map((c) => (
                        <span
                          key={c}
                          className="h-3 w-3 rounded-full ring-1 ring-inset ring-white/30"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                      {t.name}
                    </h2>
                    <p className="mt-1 text-xs text-subtle">{t.tagline}</p>

                    <p className="mt-3 text-sm leading-relaxed text-subtle">
                      {t.description}
                    </p>

                    {/* Sementara belum ada checkout: pemesanan lewat WhatsApp,
                        dengan nama template sudah terisi di pesannya. Dua tombol
                        sebaris — ditumpuk, keduanya terbaca sama penting dan
                        kartunya jadi berat di bagian bawah. */}
                    <div className="mt-auto flex items-center gap-2.5 pt-8">
                      <Button href={t.href} className="flex-1">
                        Lihat contoh
                      </Button>
                      <Button
                        href={waLink(
                          `Halo Temukita, saya tertarik memakai template ${t.name}.`,
                        )}
                        variant="outline"
                        className="gap-2"
                      >
                        <WhatsAppIcon />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-14 text-sm text-subtle">
            <p>
              Semua template pernikahan mendapat fitur yang sama — yang
              membedakan paket hanya kuota.{' '}
              <Link
                href="/#harga"
                className="font-semibold text-accent underline-offset-4 hover:underline"
              >
                Lihat harga
              </Link>
              . Belum yakin? Tanya dulu lewat{' '}
              <a
                href={waLink(
                  'Halo Temukita, saya ingin tanya soal template undangan.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline-offset-4 hover:underline"
              >
                WhatsApp
              </a>
              .
            </p>
          </Reveal>
        </Section>
      </main>
      <LandingFooter offSite />
    </div>
  )
}
