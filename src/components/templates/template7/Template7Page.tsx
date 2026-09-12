'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useParallax, useSmoothScroll, useStagger } from '../template1/scroll'
import {
  Blob,
  HeartMark,
  Icon,
  LeafMark,
  RuleWithHeart,
  Sparkle,
  Sprig,
} from './Botanical'
import { BabyGirl } from './BabyGirl'

/**
 * Template 7 — tasyakuran akikah.
 *
 * The only invitation here that is not a wedding, and the only one with no
 * intro gate, no music player, no countdown and no RSVP. That is the design
 * rather than an omission: an akikah invitation is an announcement, and the
 * reference it was drawn from is one uninterrupted poster. Because there is no
 * gate there is also no body-scroll lock and `useSmoothScroll` runs
 * unconditionally.
 *
 * It is also the only template with no photographs at all — the baby is drawn.
 * Photographs of somebody's newborn are exactly the thing a demo page should
 * not be showing.
 */

/* ------------------------------------------------------------------ shared */

/** Small tracked label above a value or a heading. */
function Label({
  children,
  className = '',
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={`text-[10px] font-semibold uppercase tracking-[0.32em] text-moss ${className}`}
    >
      {children}
    </span>
  )
}

function Heading({
  children,
  className = '',
  ...rest
}: {
  children: ReactNode
  className?: string
} & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...rest}
      className={`font-book font-semibold leading-[1.3] text-pine ${className}`}
      style={{ fontSize: 'clamp(1.35rem, 3.6vw, 1.95rem)' }}
    >
      {children}
    </h2>
  )
}

function Body({
  children,
  className = '',
  ...rest
}: {
  children: ReactNode
  className?: string
} & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...rest} className={`text-sm leading-[1.95] text-bark ${className}`}>
      {children}
    </p>
  )
}

/** The two leaf glyphs that flank every section heading in the reference. */
function Flanked({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <LeafMark className="h-5 w-5 shrink-0 -scale-x-100 text-leaf" />
      {children}
      <LeafMark className="h-5 w-5 shrink-0 text-leaf" />
    </div>
  )
}

/* -------------------------------------------------------------------- hero */

const BAYI = 'Khanza Almahyra'
const ORANG_TUA = 'Rangga Prasetya & Aulia Rahmani'
const TANGGAL = 'Sabtu, 20 Juni 2026'

function HeroSection() {
  const copy = useRef<HTMLDivElement>(null)
  const blob = useRef<HTMLDivElement>(null)
  useStagger(copy, '[data-fx]', { y: 18, stagger: 0.1, start: 'top 92%' })
  useParallax(blob, 6)

  return (
    <section className="relative isolate overflow-hidden bg-milk px-6 pt-24 pb-20 sm:px-10 md:flex md:min-h-svh md:items-center md:py-24">
      {/* Soft ground. Two sage shapes bleeding off the left, one barely-there
          cream shape on the right — the reference's only "background".

          The big one moves on small screens: in a single column it would sit
          under the name and the gold rule, and gold on sage is 1.2:1. Behind
          the illustration it is decoration; behind the type it is a bug. */}
      <div ref={blob} className="pointer-events-none absolute inset-0" aria-hidden>
        <Blob className="absolute -top-28 -left-32 h-[22rem] w-[22rem] text-fern-blob/80 md:top-auto md:-bottom-40 md:-left-44 md:h-[34rem] md:w-[34rem] motion-safe:animate-wave-drift" />
        <Blob className="absolute -top-56 -left-28 h-[30rem] w-[30rem] rotate-[28deg] text-fern-mist" />
        <Blob className="absolute -top-24 -right-52 hidden h-[34rem] w-[34rem] rotate-[140deg] text-milk-pure sm:block" />
      </div>

      {/* Botanicals and sparks. Hidden on the narrowest screens, where they
          land on top of the illustration instead of around it. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Sprig className="absolute top-4 right-4 hidden h-28 w-auto rotate-[24deg] text-leaf sm:block md:h-36 motion-safe:animate-petal-sway" />
        <Sprig className="absolute bottom-8 left-2 hidden h-32 w-auto -rotate-[18deg] -scale-x-100 text-leaf/85 sm:block md:h-44 motion-safe:animate-petal-sway" />
        <Sparkle className="absolute top-[18%] left-[8%] hidden h-5 w-5 text-gold sm:block" />
        <Sparkle className="absolute bottom-[24%] left-[38%] hidden h-4 w-4 text-gold/80 sm:block" />
        <Sparkle className="absolute top-[52%] left-[30%] hidden h-3 w-3 text-gold/70 md:block" />
        <HeartMark className="absolute top-[10%] left-[46%] hidden h-4 w-4 text-gold/80 md:block" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-10">
        <div className="mx-auto w-[min(78vw,22rem)] md:w-full md:max-w-[30rem]">
          <BabyGirl
            className="h-auto w-full"
            label={`Ilustrasi bayi perempuan yang sedang tidur — ${BAYI}`}
          />
        </div>

        <div ref={copy} className="text-center">
          <Label data-fx className="block">
            Undangan
          </Label>

          <h1
            data-fx
            className="mt-5 font-book font-bold leading-[1.12] text-pine"
            style={{ fontSize: 'clamp(2rem, 7vw, 3.3rem)' }}
          >
            {/* One span per line. Left to wrap on its own, "Tasyakuran" breaks
                mid-word at the widths this template is actually read on. */}
            <span className="block">Tasyakuran</span>
            <span className="block">Akikah</span>
          </h1>

          <p data-fx className="mt-4 text-sm text-bark/85">
            Putri Kami
          </p>

          <RuleWithHeart
            data-fx
            id="t7-rule-hero"
            className="mx-auto mt-6 h-4 w-56 text-gold sm:w-64"
          />

          <p
            data-fx
            className="mt-6 font-round italic text-moss"
            style={{ fontSize: 'clamp(1.9rem, 6vw, 2.9rem)' }}
          >
            {BAYI}
          </p>

          <p data-fx className="mt-5 text-sm leading-[1.9] text-bark">
            Putri dari
            <span className="mt-1 block">{ORANG_TUA}</span>
          </p>

          <p
            data-fx
            className="mt-8 inline-flex items-center gap-2.5 text-sm text-bark"
          >
            <Icon name="calendar" className="h-5 w-5 shrink-0 text-leaf" />
            {TANGGAL}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- salam */

function SalamSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 16, stagger: 0.12 })

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-milk-pure px-6 py-24 sm:px-10 sm:py-28"
    >
      <Sprig
        className="absolute top-1/2 -left-10 hidden h-40 w-auto -translate-y-1/2 rotate-[12deg] text-leaf/45 lg:block"
      />
      <Sprig
        className="absolute top-1/2 -right-10 hidden h-40 w-auto -translate-y-1/2 -rotate-[12deg] -scale-x-100 text-leaf/45 lg:block"
      />

      <div className="relative mx-auto max-w-xl text-center">
        <LeafMark data-fx className="mx-auto h-6 w-6 text-leaf" />

        <h2
          data-fx
          className="mt-6 font-book font-bold leading-[1.5] text-pine"
          style={{ fontSize: 'clamp(1.05rem, 3vw, 1.4rem)' }}
        >
          Assalamu&rsquo;alaikum Warahmatullahi Wabarakatuh
        </h2>

        <Body data-fx className="mt-6">
          Dengan penuh rasa syukur kepada Allah SWT, kami mengundang
          Bapak/Ibu/Saudara/i untuk hadir dalam acara tasyakuran akikah putri
          kami.
        </Body>

        <RuleWithHeart
          data-fx
          id="t7-rule-salam"
          className="mx-auto mt-10 h-4 w-56 text-gold sm:w-64"
        />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- acara */

const acara = [
  {
    icon: 'calendar' as const,
    label: 'Hari & Tanggal',
    lines: ['Sabtu, 20 Juni 2026'],
  },
  { icon: 'clock' as const, label: 'Waktu', lines: ['10.00 — 13.00 WIB'] },
  { icon: 'dome' as const, label: 'Acara', lines: ['Tasyakuran Akikah'] },
  {
    icon: 'pin' as const,
    label: 'Lokasi',
    lines: ['Rumah Kami', 'Jl. Melati No. 12', 'Palu, Sulawesi Tengah'],
  },
]

const MAPS = 'https://www.google.com/maps/search/?api=1&query=Palu+Sulawesi+Tengah'

function AcaraSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.1 })

  return (
    <section
      ref={root}
      className="relative bg-fern-mist px-6 pt-24 pb-24 sm:px-10 sm:pt-28"
    >
      {/* Filled with the colour of the band above, so the seam dissolves. */}
      <SoftSeam className="text-milk-pure" />

      <div className="relative mx-auto max-w-5xl">
        <Flanked>
          <Heading data-fx>Detail Acara</Heading>
        </Flanked>

        <dl className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-leaf/30">
          {acara.map((item) => (
            <div key={item.label} data-fx className="px-2 text-center lg:px-6">
              <Icon name={item.icon} className="mx-auto h-7 w-7 text-leaf" />
              <dt className="mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-moss">
                {item.label}
              </dt>
              <dd className="mt-2 text-sm leading-[1.85] text-bark">
                {item.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        <div data-fx className="mt-14 text-center">
          <a
            href={MAPS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-moss px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-milk transition-colors hover:bg-pine focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss"
          >
            <Icon name="pin" className="h-4 w-4" />
            Lihat Lokasi
            <span className="sr-only">(buka di tab baru)</span>
          </a>
        </div>
      </div>
    </section>
  )
}

/**
 * The organic seam at the top of a band. Lives with the band it shapes rather
 * than with the one above it, so moving a section moves its edge too.
 *
 * It sits *inside* the top of its own section and is filled with the colour of
 * the section above — the previous band spilling down with a soft edge. Placing
 * it above the section instead would paint cream on cream and vanish.
 */
function SoftSeam({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 leading-[0] ${className}`}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        fill="currentColor"
        className="block h-[38px] w-full rotate-180 sm:h-[64px]"
      >
        <path d="M0,42 C 260,84 520,10 760,34 C 1000,58 1220,86 1440,54 L1440,90 L0,90 Z" />
      </svg>
    </div>
  )
}

/* ---------------------------------------------------------------- rekening */

const accounts = [
  { bank: 'BSI', number: '7133 0049 21', holder: 'Rangga Prasetya' },
  { bank: 'Mandiri', number: '1520 0088 4471', holder: 'Aulia Rahmani' },
]

function RekeningSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.1 })

  const [copied, setCopied] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  async function copy(bank: string, number: string) {
    const plain = number.replace(/\s/g, '')
    let ok = false

    // `navigator.clipboard` only exists in a secure context. These pages get
    // opened from WhatsApp and previewed over plain http on a LAN, where the
    // property is undefined — so this is an optional-chain, not just a catch.
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(plain)
        ok = true
      }
    } catch {
      ok = false
    }

    if (!ok) ok = legacyCopy(plain)

    setCopied(ok ? bank : null)
    setMessage(
      ok
        ? `Nomor rekening ${bank} disalin.`
        : `Gagal menyalin. Nomor rekening ${bank}: ${plain}`,
    )

    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setCopied(null)
      setMessage('')
    }, 2400)
  }

  return (
    <section
      ref={root}
      className="relative bg-fern-mist px-6 pb-28 sm:px-10"
      aria-labelledby="t7-rekening"
    >
      <div className="relative mx-auto max-w-2xl">
        <Flanked>
          <Heading data-fx id="t7-rekening">
            Tanda Kasih
          </Heading>
        </Flanked>

        <Body data-fx className="mt-6 text-center">
          Doa dan kehadiran Anda sudah lebih dari cukup bagi kami. Bila ingin
          memberi lebih, kami menerimanya dengan penuh syukur.
        </Body>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {accounts.map((a) => (
            <li
              key={a.bank}
              data-fx
              className="rounded-2xl border border-leaf/30 bg-milk-pure p-6 text-left"
            >
              <Label className="block">{a.bank}</Label>
              <p className="mt-3 text-lg tabular-nums tracking-[0.12em] text-pine">
                {a.number}
              </p>
              <p className="mt-1 text-xs text-bark/80">a.n. {a.holder}</p>

              <button
                type="button"
                onClick={() => copy(a.bank, a.number)}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-moss/45 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-moss transition-colors hover:bg-moss hover:text-milk focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss"
              >
                {copied === a.bank && <Icon name="check" className="h-3.5 w-3.5" />}
                {copied === a.bank ? 'Tersalin' : 'Salin'}
              </button>
            </li>
          ))}
        </ul>

        {/* One live region for the whole section, mounted outside the list so a
            card re-render cannot remount it — a remounted region never speaks. */}
        <p role="status" aria-live="polite" className="sr-only">
          {message}
        </p>
      </div>
    </section>
  )
}

/** Last resort for insecure contexts. `execCommand` is deprecated and is also
 *  the only thing that works there, so it stays until that changes. */
function legacyCopy(text: string) {
  try {
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none'
    document.body.appendChild(field)
    field.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(field)
    return ok
  } catch {
    return false
  }
}

/* --------------------------------------------------------------------- doa */

function DoaSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.1 })

  return (
    <section
      ref={root}
      className="relative bg-fern-veil px-6 pt-24 pb-16 sm:px-10 sm:pt-28"
    >
      <SoftSeam className="text-fern-mist" />

      <div className="relative mx-auto max-w-2xl text-center">
        <Flanked>
          <Heading data-fx>Doa &amp; Harapan</Heading>
        </Flanked>

        <blockquote
          data-fx
          className="mt-8 font-book italic leading-[1.85] text-pine"
          style={{ fontSize: 'clamp(0.95rem, 2.6vw, 1.1rem)' }}
        >
          <span className="block">
            &ldquo;Semoga Ananda tumbuh menjadi anak yang sehat,
          </span>
          <span className="block">
            sholehah, berbakti kepada kedua orang tua,
          </span>
          <span className="block">
            berguna bagi agama, bangsa, dan negara.&rdquo;
          </span>
        </blockquote>

        <RuleWithHeart
          data-fx
          id="t7-rule-doa"
          className="mx-auto mt-10 h-4 w-56 text-gold sm:w-64"
        />
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- penutup */

function PenutupSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 14, stagger: 0.08 })

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-fern-veil px-6 pt-8 pb-24 text-center sm:px-10 sm:pb-28"
    >
      <Sprig
        className="absolute -bottom-6 -left-8 h-40 w-auto rotate-[18deg] text-leaf/75 sm:h-56 md:h-64 motion-safe:animate-petal-sway"
      />
      <Sprig
        className="absolute -right-8 -bottom-6 h-40 w-auto -rotate-[18deg] -scale-x-100 text-leaf/75 sm:h-56 md:h-64 motion-safe:animate-petal-sway"
      />

      <div className="relative mx-auto max-w-md">
        <Body data-fx>
          Terima kasih atas doa dan kehadiran Bapak/Ibu/Saudara/i
        </Body>

        <p data-fx className="mt-8 text-xs tracking-[0.06em] text-bark/80">
          Kami yang berbahagia,
        </p>

        <p
          data-fx
          className="mt-3 font-round italic text-moss"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}
        >
          Keluarga Besar
        </p>

        <p data-fx className="mt-14 text-[10px] uppercase tracking-[0.28em] text-moss/80">
          Dibuat dengan{' '}
          <Link
            href="/"
            className="underline decoration-moss/40 underline-offset-4 transition-colors hover:text-pine"
          >
            Temukita
          </Link>
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- page */

export function Template7Page() {
  useSmoothScroll(true)

  return (
    // `font-round` is load-bearing: `body` in globals.css sets the Bricolage
    // stack, so body copy only picks up Nunito if the template opts in.
    // `overflow-x-clip`, not `hidden` — `hidden` breaks ScrollTrigger, and the
    // hero blobs really do bleed past the left edge.
    <div className="overflow-x-clip bg-milk font-round text-bark">
      <HeroSection />
      <SalamSection />
      <AcaraSection />
      <RekeningSection />
      <DoaSection />
      <PenutupSection />
    </div>
  )
}
