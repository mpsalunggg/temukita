'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import gsap from 'gsap'
import {
  bento,
  bride,
  ceremony,
  cover,
  garden,
  groom,
  story,
  table,
} from './assets'
import { Template2Intro } from './Template2Intro'
import { Template2MusicPlayer } from './Template2MusicPlayer'
import {
  MOTION,
  MOTION_DESKTOP,
  parallaxLayer,
  useClipReveal,
  useParallax,
  useScrollFx,
  useSmoothScroll,
  useStagger,
} from '../template1/scroll'

/* ─── Shared pieces ──────────────────────────────────────── */

/**
 * Every photo in this template goes through here. The shared desaturate +
 * `.veil` tint is what makes frames from a dozen different shoots read as one
 * wedding — bypass it and the page turns back into a moodboard.
 */
function Photo({
  src,
  alt,
  className = '',
  sizes,
  position = 'center',
  priority = false,
  parallax = 0,
  soft = false,
}: {
  src: string
  alt: string
  className?: string
  sizes: string
  position?: string
  priority?: boolean
  parallax?: number
  /** Lighter veil + less dimming. For portraits and small cards, where the
   *  full-strength treatment leaves nothing but a dark rectangle. */
  soft?: boolean
}) {
  const layer = useRef<HTMLDivElement>(null)
  useParallax(layer, parallax)

  return (
    <div
      className={`veil overflow-hidden bg-forest-deep ${soft ? 'veil-soft' : ''} ${className}`}
    >
      <div ref={layer} className={parallaxLayer}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover saturate-[0.8] contrast-[1.05] ${
            soft ? 'brightness-100' : 'brightness-[0.82]'
          }`}
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  )
}

/**
 * Section marker: roman numeral and label inside one gold rule. Template 1 uses
 * an arabic numeral on a long horizontal rule, so the shapes stay distinct.
 * The numeral sits beside the label rather than alone in a box — on its own,
 * `II` in Cinzel is two vertical bars and reads as a pause button, especially
 * next to the music toggle.
 */
function Numeral({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-4 border border-gilt/35 px-5 py-2.5">
      <span className="font-engraved text-[11px] tracking-[0.12em] text-gilt">
        {n}
      </span>
      <span className="h-3 w-px bg-gilt/40" aria-hidden />
      <span className="font-smallcaps text-[14px] tracking-[0.08em] text-gilt/85">
        {children}
      </span>
    </span>
  )
}

function Title({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={`font-engraved font-normal uppercase leading-[1.2] tracking-[0.07em] text-pearl ${className}`}
      style={{ fontSize: 'clamp(1.4rem, 3.4vw, 2.4rem)' }}
    >
      {children}
    </h2>
  )
}

function Rule({ className = '' }: { className?: string }) {
  return <div className={`h-px bg-gilt/25 ${className}`} />
}

function SectionHead({
  n,
  eyebrow,
  title,
}: {
  n: string
  eyebrow: string
  title: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <span data-fx>
        <Numeral n={n}>{eyebrow}</Numeral>
      </span>
      <div data-fx>
        <Title className="max-w-lg">{title}</Title>
      </div>
    </div>
  )
}

/* ─── I. Cover — split screen ────────────────────────────── */

function CoverSection({ opened }: { opened: boolean }) {
  const root = useRef<HTMLElement>(null)

  // Panel slides in from the left while the photo wipes open from the right —
  // template 1 does a parallax push with a bottom-up mask, so neither the
  // direction nor the mechanism is shared.
  useEffect(() => {
    if (!opened || !root.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .set('[data-cover-panel]', { xPercent: -8, opacity: 0 })
        .set('[data-cover-photo]', { clipPath: 'inset(0% 0% 0% 100%)' })
        .set('[data-cover-line]', { opacity: 0, y: 16 })
        .to('[data-cover-photo]', {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
        })
        .to(
          '[data-cover-panel]',
          { xPercent: 0, opacity: 1, duration: 1.1 },
          0.15,
        )
        .to(
          '[data-cover-line]',
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          0.5,
        )
    }, root)

    return () => ctx.revert()
  }, [opened])

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] bg-forest md:grid md:grid-cols-[1fr_1.1fr]"
    >
      <div data-cover-photo className="relative h-[52svh] md:order-2 md:h-full">
        <Photo
          src={cover}
          alt="Raisa dan Daniel"
          className="absolute inset-0"
          sizes="(max-width: 768px) 100vw, 55vw"
          position="center 40%"
          priority
        />
      </div>

      <div
        data-cover-panel
        className="relative flex min-h-[48svh] flex-col justify-center px-8 py-16 md:order-1 md:min-h-0 md:px-14 lg:px-20"
      >
        <div
          className="pointer-events-none absolute inset-5 border border-gilt/20 md:inset-8"
          aria-hidden
        />

        <p
          data-cover-line
          className="relative font-smallcaps text-[15px] tracking-[0.1em] text-gilt"
        >
          Undangan Pernikahan
        </p>

        <h1
          data-cover-line
          className="relative mt-10 font-engraved font-normal uppercase leading-[1.1] tracking-[0.08em] text-pearl"
          style={{ fontSize: 'clamp(2.2rem, 7vw, 4.2rem)' }}
        >
          Raisa
          <span className="mt-2 block text-blush" style={{ fontSize: '0.45em' }}>
            &amp;
          </span>
          Daniel
        </h1>

        <div data-cover-line className="relative mt-10 max-w-xs">
          <Rule />
          <dl className="mt-5 space-y-2 font-smallcaps text-[15px] tracking-[0.06em] text-pearl-soft">
            <div className="flex justify-between gap-6">
              <dt className="text-gilt/70">Tanggal</dt>
              <dd>20 · 09 · 2026</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-gilt/70">Tempat</dt>
              <dd>Hotel Mulia, Jakarta</dd>
            </div>
          </dl>
        </div>

        <div
          data-cover-line
          className="relative mt-14 flex items-center gap-4 font-smallcaps text-[14px] tracking-[0.08em] text-pearl-soft/60"
        >
          <span className="h-8 w-px animate-pulse bg-gilt/50" aria-hidden />
          Gulir ke bawah
        </div>
      </div>
    </section>
  )
}

/* ─── II. Quote — the only full-bleed photo background ───── */

function QuoteSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { stagger: 0.14, y: 28 })

  return (
    <section
      ref={root}
      className="relative flex min-h-[85svh] items-center justify-center overflow-hidden px-6 py-24"
    >
      <Photo
        src={garden}
        alt=""
        className="absolute inset-0"
        sizes="100vw"
        parallax={8}
      />

      <div className="relative z-10 w-full max-w-2xl border border-gilt/25 bg-forest/85 px-7 py-14 text-center backdrop-blur-[3px] sm:px-14 sm:py-20">
        <div data-fx>
          <Numeral n="I">Firman Allah</Numeral>
        </div>
        <p
          data-fx
          className="mt-10 font-serif font-light leading-relaxed text-pearl/90"
          style={{ fontSize: 'clamp(1.15rem, 2.6vw, 1.6rem)' }}
        >
          Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
          pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan
          merasa tenteram kepadanya.
        </p>
        <div data-fx className="mt-10">
          <Rule className="mx-auto w-16" />
          <p className="mt-6 font-smallcaps text-[15px] tracking-[0.08em] text-gilt">
            QS. Ar-Rum : 21
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── III. Mempelai ──────────────────────────────────────── */

function Portrait({
  src,
  name,
  role,
  parents,
  drift,
}: {
  src: string
  name: string
  role: string
  parents: string
  /** Signed parallax — the two portraits drift against each other. */
  drift: number
}) {
  const frame = useRef<HTMLDivElement>(null)
  useClipReveal(frame)

  return (
    <div data-fx>
      <div ref={frame} className="relative border border-gilt/20 p-3">
        <Photo
          src={src}
          alt={name}
          className="relative aspect-[3/4] w-full"
          sizes="(max-width: 768px) 90vw, 30vw"
          parallax={drift}
          soft
        />
      </div>

      <div className="mt-7 text-center">
        <p className="font-smallcaps text-[15px] tracking-[0.08em] text-gilt">
          {role}
        </p>
        <h3
          className="mt-3 font-engraved font-normal uppercase leading-tight tracking-[0.06em] text-pearl"
          style={{ fontSize: 'clamp(1.4rem, 3.4vw, 2rem)' }}
        >
          {name}
        </h3>
        <Rule className="mx-auto mt-6 w-12" />
        <p className="mx-auto mt-6 max-w-[22ch] text-sm leading-relaxed text-pearl-soft/80">
          {parents}
        </p>
      </div>
    </div>
  )
}

function CoupleSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { stagger: 0.16, y: 32 })

  return (
    <section
      ref={root}
      className="relative bg-forest px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHead
          n="II"
          eyebrow="Mempelai"
          title="Dengan memohon rahmat Tuhan"
        />

        <div className="mt-16 grid gap-14 sm:grid-cols-2 sm:gap-10 md:gap-16">
          <Portrait
            src={bride}
            name="Raisa Anindya"
            role="Putri Pertama"
            parents="Bapak Wirawan & Ibu Sulastri"
            drift={7}
          />
          <Portrait
            src={groom}
            name="Daniel Prakoso"
            role="Putra Kedua"
            parents="Bapak Suryadi & Ibu Handayani"
            drift={-7}
          />
        </div>
      </div>
    </section>
  )
}

/* ─── IV. Love story — pinned stacking cards ─────────────── */

const milestones = [
  {
    year: '2020',
    title: 'Pertama bertemu',
    text: 'Sebuah resepsi teman di Jakarta. Kami duduk semeja karena kehabisan kursi, lalu tidak berhenti bicara sampai acaranya usai.',
    image: story[0],
  },
  {
    year: '2022',
    title: 'Menjadi kita',
    text: 'Tidak ada momen dramatis. Hanya satu sore ketika keduanya sadar bahwa setiap rencana sudah ditulis dengan dua nama.',
    image: story[1],
  },
  {
    year: '2025',
    title: 'Lamaran',
    text: 'Di ruang tamu rumah keluarga, disaksikan orang-orang yang membesarkan kami berdua. Jawabannya sudah lama diketahui.',
    image: story[2],
  },
  {
    year: '2026',
    title: 'Hari yang dinanti',
    text: 'Dan hari itu akhirnya punya tanggal. Kami ingin Anda ada di sana untuk menyaksikannya.',
    image: story[3],
  },
]

function StorySection() {
  const root = useRef<HTMLElement>(null)
  const stack = useRef<HTMLDivElement>(null)
  useStagger(root, '[data-fx]', { stagger: 0.12, y: 28 })

  /*
   * The signature scroll moment. The section pins and each card rises to cover
   * the one before it — a dealt deck. Template 1 pins its gallery and pans
   * sideways, so the two never read as the same trick.
   *
   * Desktop only: pinning on a phone fights the address-bar resize, and the
   * cards are legible as a plain vertical stack anyway.
   */
  useScrollFx((mm) => {
    mm.add(MOTION_DESKTOP, () => {
      const section = root.current
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]', stack.current)
      if (!section || cards.length < 2) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${(cards.length - 1) * 80}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          // card heights settle only once the photos load
          invalidateOnRefresh: true,
        },
      })

      cards.slice(1).forEach((card, i) => {
        tl.fromTo(
          card,
          { yPercent: 108 },
          { yPercent: 0, ease: 'none', duration: 1 },
          i,
        )
      })
    })
  })

  return (
    <section
      ref={root}
      className="relative bg-forest-deep px-6 py-24 sm:px-10 md:flex md:h-screen md:flex-col md:justify-center md:py-16"
    >
      <div className="mx-auto w-full max-w-3xl">
        <SectionHead n="III" eyebrow="Perjalanan Kami" title="Enam tahun, satu cerita" />

        <div
          ref={stack}
          className="relative mt-14 md:mt-12 md:h-[21rem]"
        >
          {milestones.map((m, i) => (
            <article
              key={m.year}
              data-card
              style={{ zIndex: i + 1 }}
              /* The upward shadow is what makes the overlap read as a card
                 sitting on top of another. Without it the card below just
                 looks like text cut off mid-sentence. */
              className="mb-5 border border-gilt/20 bg-forest last:mb-0 md:absolute md:inset-x-0 md:top-0 md:mb-0 md:h-[21rem] md:border-t-gilt/45 md:shadow-[0_-24px_48px_-12px_rgb(0_0_0/0.85)]"
            >
              <div className="grid h-full sm:grid-cols-[13rem_1fr] md:grid-cols-[16rem_1fr]">
                <Photo
                  src={m.image}
                  alt=""
                  className="relative aspect-16/10 w-full sm:aspect-auto sm:h-full"
                  sizes="(max-width: 640px) 100vw, 16rem"
                  soft
                />
                <div className="flex flex-col justify-center p-7 sm:p-9">
                  <span className="font-engraved text-sm tracking-[0.14em] text-blush">
                    {m.year}
                  </span>
                  <h3
                    className="mt-3 font-engraved font-normal uppercase leading-tight tracking-[0.06em] text-pearl"
                    style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)' }}
                  >
                    {m.title}
                  </h3>
                  <Rule className="my-6 w-14" />
                  <p className="max-w-[42ch] text-sm leading-relaxed text-pearl-soft/85">
                    {m.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── V. Events — two cards ──────────────────────────────── */

const events = [
  {
    label: 'Akad Nikah',
    day: 'Minggu',
    date: '20 Sep 2026',
    time: '09.00 WIB',
    place: 'Grand Ballroom',
    venue: 'Hotel Mulia Senayan',
    address: 'Jl. Asia Afrika No. 8, Senayan, Jakarta Pusat',
    maps: 'https://maps.google.com/?q=Hotel+Mulia+Senayan+Jakarta',
    image: ceremony,
  },
  {
    label: 'Resepsi',
    day: 'Minggu',
    date: '20 Sep 2026',
    time: '19.00 WIB',
    place: 'The Ballroom',
    venue: 'Hotel Mulia Senayan',
    address: 'Jl. Asia Afrika No. 8, Senayan, Jakarta Pusat',
    maps: 'https://maps.google.com/?q=Hotel+Mulia+Senayan+Jakarta',
    image: table,
  },
]

function EventCard({ ev }: { ev: (typeof events)[number] }) {
  const frame = useRef<HTMLDivElement>(null)
  useClipReveal(frame, 'top 85%')

  return (
    <article
      data-fx
      className="flex flex-col border border-gilt/20 bg-forest"
    >
      <div ref={frame}>
        <Photo
          src={ev.image}
          alt={ev.label}
          className="relative aspect-16/10 w-full"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <p className="font-smallcaps text-[15px] tracking-[0.08em] text-gilt">
          {ev.label}
        </p>
        <h3
          className="mt-3 font-engraved font-normal uppercase leading-tight tracking-[0.06em] text-pearl"
          style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}
        >
          {ev.place}
        </h3>
        <p className="mt-2 text-sm text-pearl-soft">{ev.venue}</p>

        {/* One boxed strip rather than three justify-between rows — the data
            reads at a glance, and it echoes the countdown grid below. */}
        <dl className="mt-7 grid grid-cols-3 border border-gilt/20 text-center">
          {[
            { k: 'Hari', v: ev.day },
            { k: 'Tanggal', v: ev.date },
            { k: 'Waktu', v: ev.time },
          ].map((row, i) => (
            <div
              key={row.k}
              className={`px-2 py-4 ${i < 2 ? 'border-r border-gilt/20' : ''}`}
            >
              <dt className="font-smallcaps text-[13px] tracking-[0.06em] text-gilt/70">
                {row.k}
              </dt>
              <dd className="mt-1.5 font-smallcaps text-[15px] tracking-[0.04em] text-pearl">
                {row.v}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 text-xs leading-relaxed text-pearl-soft/70">
          {ev.address}
        </p>

        {/* mt-auto: the button stays on the card floor whatever the copy does */}
        <a
          href={ev.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center border border-gilt/40 py-3.5 font-smallcaps text-[15px] tracking-[0.08em] text-gilt transition-colors hover:bg-gilt hover:text-forest-deep"
        >
          Buka di Maps
        </a>
      </div>
    </article>
  )
}

function EventSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { stagger: 0.16, y: 34 })

  return (
    <section ref={root} className="bg-forest px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHead n="IV" eyebrow="Detail Acara" title="Dua rangkaian acara" />
        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {events.map((ev) => (
            <EventCard key={ev.label} ev={ev} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── VI. Gallery — asymmetric bento ─────────────────────── */

/**
 * Explicit placement — auto-flow with mixed row spans leaves holes.
 *
 * `area` tiles a 4×5 desktop grid exactly (4+1+2+1+2+4+2+2+2 = 20 cells).
 * `mobile` is a separate rhythm for the 2-column grid: wide-1-1 repeating, so
 * every row fills. Mixing a `col-span-2` into an odd position pushes it to the
 * next row and leaves the cell beside it empty.
 */
const tiles = [
  { area: 'md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-2', mobile: 'col-span-2 aspect-16/9' },
  { area: 'md:col-start-3 md:col-span-1 md:row-start-1 md:row-span-1', mobile: 'aspect-[3/4]' },
  { area: 'md:col-start-4 md:col-span-1 md:row-start-1 md:row-span-2', mobile: 'aspect-[3/4]' },
  { area: 'md:col-start-3 md:col-span-1 md:row-start-2 md:row-span-1', mobile: 'aspect-[3/4]' },
  { area: 'md:col-start-1 md:col-span-1 md:row-start-3 md:row-span-2', mobile: 'aspect-[3/4]' },
  { area: 'md:col-start-2 md:col-span-2 md:row-start-3 md:row-span-2', mobile: 'col-span-2 aspect-16/9' },
  { area: 'md:col-start-4 md:col-span-1 md:row-start-3 md:row-span-2', mobile: 'aspect-[3/4]' },
  { area: 'md:col-start-1 md:col-span-2 md:row-start-5 md:row-span-1', mobile: 'aspect-[3/4]' },
  { area: 'md:col-start-3 md:col-span-2 md:row-start-5 md:row-span-1', mobile: 'col-span-2 aspect-16/9' },
]

/** The two large tiles settle out of a slight zoom as they cross the viewport. */
const wideTiles = new Set([0, 5])

function BentoTile({ src, i }: { src: string; i: number }) {
  const cell = useRef<HTMLDivElement>(null)

  useScrollFx((mm) => {
    mm.add(MOTION, () => {
      if (!wideTiles.has(i) || !cell.current) return
      gsap.fromTo(
        cell.current,
        { scale: 1.06 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: cell.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })
  })

  return (
    <div
      data-fx
      className={`relative ${tiles[i].mobile} ${tiles[i].area} md:aspect-auto`}
    >
      <div ref={cell} className="absolute inset-0 will-change-transform">
        <Photo
          src={src}
          alt={`Galeri foto ${i + 1}`}
          className="absolute inset-0"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
    </div>
  )
}

function GallerySection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { stagger: 0.07, y: 30, start: 'top 85%' })

  return (
    <section ref={root} className="bg-forest-deep px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead n="V" eyebrow="Momen Kami" title="Sekilas perjalanan kami" />

        <div className="mt-16 grid grid-cols-2 gap-1 md:grid-cols-4 md:grid-rows-[repeat(5,8.5rem)] lg:grid-rows-[repeat(5,10rem)]">
          {bento.map((src, i) => (
            <BentoTile key={src} src={src} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── VII. Countdown ─────────────────────────────────────── */

const TARGET = new Date('2026-09-20T09:00:00+07:00').getTime()

/* The clock is external state — reading it through an effect trips
   react-hooks/set-state-in-effect and risks a hydration mismatch. Server
   snapshot is null so both sides render the placeholder first. */
const subscribeToClock = (onChange: () => void) => {
  const id = setInterval(onChange, 1000)
  return () => clearInterval(id)
}
const getClientNow = () => Math.floor(Date.now() / 1000) * 1000
const getServerNow = () => null

function useCountdown(target: number) {
  const now = useSyncExternalStore(subscribeToClock, getClientNow, getServerNow)

  return useMemo(() => {
    if (now === null) return null
    const diff = Math.max(0, target - now)
    const s = Math.floor(diff / 1000)
    return {
      reached: diff === 0,
      days: Math.floor(s / 86400),
      hours: Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
    }
  }, [now, target])
}

const pad = (n: number) => String(n).padStart(2, '0')

function CountdownStrip() {
  const t = useCountdown(TARGET)
  const root = useRef<HTMLElement>(null)
  const grid = useRef<HTMLDivElement>(null)

  /* Rolling up from zero on first sight. `rollup` holds the in-flight values;
     while it is set the real per-second value is ignored, so the tick cannot
     overwrite a digit mid-animation. */
  const [rollup, setRollup] = useState<number[] | null>(null)
  const armed = useRef(false)
  const latest = useRef(t)
  // mirrored in an effect, not during render — the trigger below fires on
  // scroll, long after paint, so it always sees a current value
  useEffect(() => {
    latest.current = t
  }, [t])

  useScrollFx((mm) => {
    mm.add(MOTION, () => {
      if (!grid.current) return
      gsap.from(grid.current.children, {
        opacity: 0,
        y: 26,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            const now = latest.current
            if (armed.current || !now || now.reached) return
            armed.current = true
            const proxy = { d: 0, h: 0, m: 0, s: 0 }
            gsap.to(proxy, {
              d: now.days,
              h: now.hours,
              m: now.minutes,
              s: now.seconds,
              duration: 1.4,
              ease: 'power2.out',
              snap: { d: 1, h: 1, m: 1, s: 1 },
              onUpdate: () => setRollup([proxy.d, proxy.h, proxy.m, proxy.s]),
              onComplete: () => setRollup(null),
            })
          },
        },
      })
    })
  })

  const units = t
    ? [
        { value: rollup?.[0] ?? t.days, label: 'Hari' },
        { value: rollup?.[1] ?? t.hours, label: 'Jam' },
        { value: rollup?.[2] ?? t.minutes, label: 'Menit' },
        { value: rollup?.[3] ?? t.seconds, label: 'Detik' },
      ]
    : null

  return (
    <section
      ref={root}
      className="bg-forest-deep px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center text-center">
          <Numeral n="VI">Menuju hari bahagia</Numeral>
        </div>

        {t?.reached ? (
          <p className="mt-14 text-center font-engraved uppercase tracking-[0.08em] text-pearl text-2xl sm:text-4xl">
            Hari yang dinanti telah tiba
          </p>
        ) : (
          <div
            ref={grid}
            className="mt-14 grid grid-cols-2 border border-gilt/25 sm:grid-cols-4"
          >
            {units?.map((u, i) => (
              <div
                key={u.label}
                className={[
                  'px-4 py-9 text-center',
                  // hairlines between cells, without doubling the frame edge
                  i % 2 === 0 ? 'border-r border-gilt/25' : '',
                  i < 2 ? 'border-b border-gilt/25 sm:border-b-0' : '',
                  'sm:border-r sm:border-gilt/25 sm:last:border-r-0',
                ].join(' ')}
              >
                <p
                  className="font-engraved leading-none tabular-nums text-blush"
                  style={{ fontSize: 'clamp(2.2rem, 7vw, 3.6rem)' }}
                >
                  {pad(u.value)}
                </p>
                <p className="mt-4 font-smallcaps text-[14px] tracking-[0.08em] text-pearl-soft/70">
                  {u.label}
                </p>
              </div>
            ))}
          </div>
        )}
        {!t && <div className="mt-14 h-40" aria-hidden />}
      </div>
    </section>
  )
}

/* ─── VIII + IX. RSVP and the wishes it feeds ────────────── */

type RsvpStatus = 'idle' | 'submitting' | 'success'
type Wish = { name: string; when: string; message: string }

const seedWishes: Wish[] = [
  {
    name: 'Bramantyo & Kirana',
    when: '2 hari lalu',
    message:
      'Selamat Raisa & Daniel. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Sampai bertemu di Mulia.',
    },
  {
    name: 'Larasati Dewi',
    when: '3 hari lalu',
    message: 'Akhirnya sampai juga di titik ini. Bahagia lihat kalian berdua.',
  },
  {
    name: 'Keluarga Besar Suryadi',
    when: '4 hari lalu',
    message:
      'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fi khair.',
  },
  {
    name: 'Rangga Aditama',
    when: '5 hari lalu',
    message: 'Dari teman satu tim jadi pengantin. Selamat, Dan!',
  },
  {
    name: 'Nadhira Puspa',
    when: '1 minggu lalu',
    message: 'Semoga lancar sampai hari H dan seterusnya. Nggak sabar!',
  },
  {
    name: 'Tim Ruang Sembilan',
    when: '1 minggu lalu',
    message: 'Turut berbahagia. Semoga langgeng sampai kakek nenek.',
  },
]

const field =
  'w-full border border-gilt/25 bg-forest-deep/60 px-4 py-3 text-sm text-pearl outline-none transition-colors placeholder:text-pearl-soft/40 focus:border-gilt'

function RsvpAndWishes() {
  const [status, setStatus] = useState<RsvpStatus>('idle')
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [wishes, setWishes] = useState<Wish[]>(seedWishes)

  const rsvpRoot = useRef<HTMLElement>(null)
  const wishRoot = useRef<HTMLElement>(null)
  useStagger(rsvpRoot, '[data-fx]', { stagger: 0.1, y: 26 })
  useStagger(wishRoot, '[data-fx]', { stagger: 0.08, y: 24 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Mohon isi nama Anda terlebih dahulu.')
      return
    }
    if (!attendance) {
      setError('Mohon pilih konfirmasi kehadiran.')
      return
    }
    setError('')
    setStatus('submitting')
    // Simulated submit — replace with a real endpoint.
    setTimeout(() => {
      setStatus('success')
      if (message.trim()) {
        setWishes((prev) => [
          { name: name.trim(), when: 'Baru saja', message: message.trim() },
          ...prev,
        ])
      }
    }, 1200)
  }

  return (
    <>
      <section
        ref={rsvpRoot}
        className="bg-forest px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto max-w-lg">
          <div className="flex flex-col items-center gap-8 text-center">
            <span data-fx>
              <Numeral n="VII">Konfirmasi Kehadiran</Numeral>
            </span>
            <div data-fx>
              <Title>Apakah Anda hadir?</Title>
            </div>
          </div>

          <div
            data-fx
            className="mt-12 border border-gilt/25 bg-forest-deep/50 p-7 sm:p-10"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="font-engraved uppercase tracking-[0.08em] text-pearl text-xl sm:text-2xl">
                    Terima kasih, {name.split(' ')[0]}
                  </p>
                  <Rule className="mx-auto mt-7 w-16" />
                  <p className="mt-7 text-sm leading-relaxed text-pearl-soft">
                    Konfirmasi Anda sudah kami terima. Sampai jumpa di hari
                    bahagia.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="rsvp2-name"
                      className="font-smallcaps text-[15px] tracking-[0.08em] text-gilt/80"
                    >
                      Nama lengkap
                    </label>
                    <input
                      id="rsvp2-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      className={`mt-3 ${field}`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="rsvp2-guests"
                      className="font-smallcaps text-[15px] tracking-[0.08em] text-gilt/80"
                    >
                      Jumlah tamu
                    </label>
                    <input
                      id="rsvp2-guests"
                      type="number"
                      min={1}
                      max={5}
                      placeholder="1"
                      className={`mt-3 ${field}`}
                    />
                  </div>

                  <div>
                    <p className="font-smallcaps text-[15px] tracking-[0.08em] text-gilt/80">
                      Konfirmasi
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {['Hadir', 'Tidak hadir', 'Belum pasti'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAttendance(opt)}
                          aria-pressed={attendance === opt}
                          className={[
                            'border py-3 font-smallcaps text-[14px] tracking-[0.04em] transition-colors',
                            attendance === opt
                              ? 'border-gilt bg-gilt text-forest-deep'
                              : 'border-gilt/25 text-pearl-soft hover:border-gilt/60',
                          ].join(' ')}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="rsvp2-message"
                      className="font-smallcaps text-[15px] tracking-[0.08em] text-gilt/80"
                    >
                      Ucapan &amp; doa (opsional)
                    </label>
                    <textarea
                      id="rsvp2-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tulis ucapan untuk pasangan..."
                      className={`mt-3 resize-none ${field}`}
                    />
                  </div>

                  <p
                    role="alert"
                    aria-live="polite"
                    className="min-h-4 text-xs text-rose-300"
                  >
                    {error}
                  </p>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="flex w-full items-center justify-center gap-3 bg-gilt py-4 font-smallcaps text-[16px] tracking-[0.08em] text-forest-deep transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border border-forest-deep/40 border-t-forest-deep" />
                        Mengirim
                      </>
                    ) : (
                      'Kirim konfirmasi'
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section
        ref={wishRoot}
        className="bg-forest-deep px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHead
            n="VIII"
            eyebrow="Ucapan & Doa"
            title="Dari mereka yang menyayangi kami"
          />

          <div className="mt-16 gap-x-8 sm:columns-2">
            {wishes.map((w, i) => (
              <figure
                key={`${w.name}-${i}`}
                data-fx
                className="mb-6 break-inside-avoid border border-gilt/15 bg-forest p-6"
              >
                <blockquote className="font-serif text-base font-light leading-relaxed text-pearl/90 sm:text-lg">
                  {w.message}
                </blockquote>
                <Rule className="my-5 w-10" />
                <figcaption className="flex items-baseline justify-between gap-4">
                  <span className="font-smallcaps text-[15px] tracking-[0.06em] text-pearl">
                    {w.name}
                  </span>
                  <span className="font-smallcaps text-[13px] tracking-[0.06em] text-pearl-soft/60">
                    {w.when}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ─── X. Gift ────────────────────────────────────────────── */

const accounts = [
  { bank: 'BCA', number: '702 118 4463', holder: 'Raisa Anindya' },
  { bank: 'Mandiri', number: '119 004 552 8871', holder: 'Daniel Prakoso' },
]

function GiftSection() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState('')
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { stagger: 0.12, y: 26 })

  const copy = async (number: string, bank: string) => {
    try {
      await navigator.clipboard.writeText(number.replace(/\s/g, ''))
      setCopied(bank)
      setTimeout(() => setCopied(''), 2000)
    } catch {
      setCopied('')
    }
  }

  return (
    <section ref={root} className="bg-forest px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHead
          n="IX"
          eyebrow="Tanda Kasih"
          title="Doa restu Anda adalah hadiah terindah"
        />

        <p
          data-fx
          className="mx-auto mt-8 max-w-[46ch] text-center text-sm leading-relaxed text-pearl-soft/80"
        >
          Bila Anda ingin memberi tanda kasih, kami sediakan amplop digital
          berikut.
        </p>

        {!open ? (
          <div data-fx className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="border border-gilt/40 px-9 py-4 font-smallcaps text-[16px] tracking-[0.08em] text-gilt transition-colors hover:bg-gilt hover:text-forest-deep"
            >
              Buka amplop digital
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid gap-6 sm:grid-cols-2"
          >
            {accounts.map((a) => (
              <div
                key={a.bank}
                className="border border-gilt/20 bg-forest-deep/50 p-7"
              >
                <p className="font-smallcaps text-[15px] tracking-[0.08em] text-gilt">
                  {a.bank}
                </p>
                <p className="mt-4 font-engraved text-2xl tabular-nums tracking-wide text-pearl">
                  {a.number}
                </p>
                <p className="mt-2 text-xs text-pearl-soft/70">
                  a.n. {a.holder}
                </p>
                <Rule className="my-6" />
                <button
                  type="button"
                  onClick={() => copy(a.number, a.bank)}
                  className="font-smallcaps text-[14px] tracking-[0.06em] text-gilt underline underline-offset-4 transition-colors hover:text-pearl"
                >
                  {copied === a.bank ? 'Tersalin' : 'Salin nomor'}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

/* ─── XI. Footer — monogram medallion ────────────────────── */

function InvitationFooter() {
  const root = useRef<HTMLElement>(null)
  const seal = useRef<HTMLDivElement>(null)
  useStagger(root, '[data-fx]', { stagger: 0.12, y: 24 })

  useScrollFx((mm) => {
    mm.add(MOTION, () => {
      if (!seal.current) return
      gsap.fromTo(
        seal.current,
        { scale: 0.7, rotate: -12, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: seal.current,
            start: 'top 92%',
            end: 'top 55%',
            scrub: 0.6,
          },
        },
      )
    })
  })

  return (
    <footer
      ref={root}
      className="bg-forest-deep px-6 py-24 text-center sm:py-32"
    >
      <div
        ref={seal}
        className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-gilt/40"
      >
        <span className="font-engraved text-xl tracking-[0.1em] text-gilt">
          R &amp; D
        </span>
      </div>

      <p
        data-fx
        className="mt-12 font-engraved font-normal uppercase leading-tight tracking-[0.12em] text-pearl"
        style={{ fontSize: 'clamp(1.5rem, 5vw, 2.6rem)' }}
      >
        Raisa <span className="text-blush">&amp;</span> Daniel
      </p>
      <p
        data-fx
        className="mt-6 font-smallcaps text-[15px] tracking-[0.1em] text-gilt/70"
      >
        20 · 09 · 2026
      </p>

      <Rule className="mx-auto mt-12 w-24" />

      <p
        data-fx
        className="mx-auto mt-12 max-w-md text-sm leading-relaxed text-pearl-soft"
      >
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda
        berkenan hadir dan memberikan doa restu.
      </p>

      <p className="mt-14 font-smallcaps text-[13px] tracking-[0.08em] text-pearl-soft/40">
        Dibuat dengan{' '}
        <Link
          href="/"
          className="text-gilt/70 underline underline-offset-4 transition-colors hover:text-gilt"
        >
          Temukita
        </Link>{' '}
        · {new Date().getFullYear()}
      </p>
    </footer>
  )
}

/* ─── Page composition ───────────────────────────────────── */

export function Template2Page() {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  useSmoothScroll(opened)

  return (
    <>
      <AnimatePresence mode="wait">
        {!opened && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-100"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Template2Intro onOpen={() => setOpened(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* clip, not hidden — `overflow: hidden` here makes a scroll container,
          which breaks the ScrollTrigger pin in the story section */}
      <div className="overflow-x-clip bg-forest">
        <CoverSection opened={opened} />
        <QuoteSection />
        <CoupleSection />
        <StorySection />
        <EventSection />
        <GallerySection />
        <CountdownStrip />
        <RsvpAndWishes />
        <GiftSection />
        <InvitationFooter />
        <Template2MusicPlayer shouldPlay={opened} />
      </div>
    </>
  )
}
