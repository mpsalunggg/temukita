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
const templates = [
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
]

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
              Tiga gaya, isi dan fitur yang sama. Buka contohnya dulu — semuanya
              bisa dilihat penuh tanpa daftar akun.
            </SectionHeading>
          </Reveal>

          <ul className="mt-14 grid gap-8 sm:grid-cols-2">
            {templates.map((t, i) => (
              <Reveal key={t.href} delay={(i % 3) * 0.08}>
                <li className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-background shadow-sm shadow-foreground/5">
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-surface">
                    <Image
                      src={t.image}
                      alt={`Contoh tampilan template ${t.name}`}
                      fill
                      sizes="(min-width: 640px) 30rem, 90vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">
                          {t.name}
                        </h2>
                        <p className="mt-0.5 text-xs text-subtle">{t.tagline}</p>
                      </div>
                      {/* Palette at a glance — faster to scan than prose. */}
                      <div className="mt-1 flex shrink-0 gap-1" aria-hidden>
                        {t.swatches.map((c) => (
                          <span
                            key={c}
                            className="h-3.5 w-3.5 rounded-full ring-1 ring-inset ring-foreground/10"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-subtle">
                      {t.description}
                    </p>

                    {/* Sementara belum ada checkout: pemesanan lewat WhatsApp,
                        dengan nama template sudah terisi di pesannya. */}
                    <div className="mt-6 flex flex-col gap-2 pt-2">
                      <Button href={t.href} full>
                        Lihat contoh
                      </Button>
                      <Button
                        href={waLink(
                          `Halo Temukita, saya tertarik memakai template ${t.name}.`,
                        )}
                        variant="outline"
                        full
                      >
                        Pesan via WhatsApp
                      </Button>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-14 text-sm text-subtle">
            <p>
              Semua template mendapat fitur yang sama — yang membedakan paket
              hanya kuota.{' '}
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
