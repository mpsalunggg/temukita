'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import gsap from 'gsap'
import { cover, detail1, detail2, gallery, hero2, story } from './assets'
import { Bloom, CornerSpray, FloralDivider, Sprig } from './Florals'
import { Template1Intro } from './Template1Intro'
import { Template1MusicPlayer } from './Template1MusicPlayer'
import {
  MOTION,
  MOTION_DESKTOP,
  parallaxLayer,
  useClipReveal,
  useParallax,
  useScrollFx,
  useSmoothScroll,
  useStagger,
} from './scroll'

/* ─── Shared type helpers ────────────────────────────────── */

/** Eyebrow: the only place small-caps tracking is allowed to get loud. */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-medium uppercase tracking-[0.42em] text-sage">
      {children}
    </span>
  )
}

/**
 * Editorial section header — numeral, hairline rule, eyebrow, then a display
 * heading. The rule is what makes the page read like a printed spread instead
 * of a stack of centred cards.
 */
function SectionHead({
  index,
  eyebrow,
  title,
  className = '',
}: {
  index: string
  eyebrow: string
  title: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-5">
        <span className="font-display text-base tabular-nums text-sage-soft">
          {index}
        </span>
        <span className="h-px flex-1 bg-ink/12" />
        <Label>{eyebrow}</Label>
      </div>
      <h2
        className="mt-7 max-w-[16ch] font-display font-normal leading-[1.04] text-ink"
        style={{ fontSize: 'clamp(2.1rem, 5.5vw, 3.8rem)' }}
      >
        {title}
      </h2>
    </div>
  )
}

/* ─── 1. Cover ───────────────────────────────────────────── */

function CoverSection({ opened }: { opened: boolean }) {
  const root = useRef<HTMLElement>(null)
  const photo = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)

  // Scrub: the photo settles as you leave, the copy lifts away faster.
  useScrollFx((mm) => {
    mm.add(MOTION, () => {
      gsap.fromTo(
        photo.current,
        { scale: 1.14, yPercent: -3 },
        {
          scale: 1,
          yPercent: 9,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
      gsap.to(copy.current, {
        yPercent: -22,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom 40%',
          scrub: true,
        },
      })
    })
  })

  // Entry timeline — fires the moment the intro gate is dismissed.
  useEffect(() => {
    if (!opened || !root.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Initial states are `set` up front, not implied by `.from()` at a later
      // timeline position — otherwise the element pops to its start value
      // mid-sequence, in full view.
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .set('[data-cover-line]', { yPercent: 115 })
        .set('[data-cover-frame]', { opacity: 0 })
        .set('[data-cover-meta]', { opacity: 0, y: 18 })
        .to('[data-cover-line]', {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.11,
        })
        .to('[data-cover-frame]', { opacity: 1, duration: 1 }, 0.3)
        .to(
          '[data-cover-meta]',
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          0.55,
        )
    }, root)

    return () => ctx.revert()
  }, [opened])

  return (
    <section
      ref={root}
      className="grain grain-dark relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink"
    >
      <div ref={photo} className={parallaxLayer}>
        <Image
          src={cover}
          alt="Arinda dan Bagas"
          fill
          className="object-cover object-[center_72%]"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/25 to-ink/45" />

      {/* hairline frame — the printed-card cue */}
      <div
        data-cover-frame
        className="pointer-events-none absolute inset-4 border border-ivory/25 sm:inset-7"
        aria-hidden
      />
      <CornerSpray
        className="pointer-events-none absolute -left-4 -top-4 h-36 w-36 text-ivory/20 sm:h-52 sm:w-52"
      />
      <CornerSpray
        className="pointer-events-none absolute -right-4 -top-4 h-36 w-36 -scale-x-100 text-ivory/20 sm:h-52 sm:w-52"
      />

      <div
        ref={copy}
        className="relative z-10 w-full px-8 pb-16 text-ivory sm:px-14 sm:pb-20"
      >
        <p
          data-cover-meta
          className="text-[10px] font-medium uppercase tracking-[0.5em] text-ivory/75"
        >
          Undangan Pernikahan
        </p>

        <h1
          className="mt-7 font-display font-normal leading-[0.86]"
          style={{ fontSize: 'clamp(3.4rem, 17vw, 10rem)' }}
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-cover-line className="block">
              Arinda
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em] pl-[0.18em]">
            <span
              data-cover-line
              className="block italic text-sage-soft"
              style={{ fontSize: '0.52em' }}
            >
              &amp;
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-cover-line className="block">
              Bagas
            </span>
          </span>
        </h1>

        <div
          data-cover-meta
          className="mt-10 flex flex-col gap-3 border-t border-ivory/20 pt-5 text-[11px] uppercase tracking-[0.28em] text-ivory/70 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>Sabtu · 14 Juni 2026</span>
          <span className="text-ivory/65">The Kana Bali · Canggu</span>
        </div>
      </div>

      <div
        data-cover-meta
        className="relative z-10 mx-auto mb-8 h-10 w-px overflow-hidden bg-ivory/20"
        aria-hidden
      >
        <span className="block h-4 w-px animate-bounce bg-ivory/70" />
      </div>
    </section>
  )
}

/* ─── 2. Quote — asymmetric, left-ragged ─────────────────── */

function QuoteSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { stagger: 0.16, y: 32 })

  return (
    <section
      ref={root}
      className="grain relative overflow-hidden bg-ivory px-6 py-28 sm:px-10 sm:py-40"
    >
      <Sprig className="animate-petal-sway pointer-events-none absolute -left-6 top-16 h-64 w-32 text-sage-soft/60 sm:left-4 sm:h-96 sm:w-48" />

      <div className="relative mx-auto grid max-w-5xl gap-8 md:grid-cols-[auto_1fr] md:gap-16">
        <p
          data-fx
          className="text-[10px] uppercase tracking-[0.42em] text-sage md:[writing-mode:vertical-rl]"
        >
          QS. Ar-Rum : 21
        </p>

        <div>
          <p
            data-fx
            className="font-display italic leading-[1.22] text-ink"
            style={{ fontSize: 'clamp(1.7rem, 4.6vw, 3.2rem)' }}
          >
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung
            dan merasa tenteram kepadanya.&rdquo;
          </p>
          <div data-fx className="mt-12 flex items-center gap-5">
            <FloralDivider className="h-6 w-32 text-sage-soft" />
            <span className="text-xs leading-relaxed text-ink-soft">
              Dan Dia menjadikan di antaramu rasa kasih dan sayang.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── 3. Couple — offset arches ──────────────────────────── */

function Portrait({
  src,
  alt,
  priority = false,
}: {
  src: string
  alt: string
  priority?: boolean
}) {
  const layer = useRef<HTMLDivElement>(null)
  useParallax(layer, 7)

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-full bg-cream">
      <div ref={layer} className={parallaxLayer}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 80vw, 24rem"
          priority={priority}
        />
      </div>
    </div>
  )
}

function CoupleSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { stagger: 0.18, y: 36 })

  const people = [
    {
      name: 'Arinda Pawestri',
      role: 'Putri Pertama',
      parents: 'Bapak Sutrisno & Ibu Lestari',
      image: gallery[0],
    },
    {
      name: 'Bagas Wicaksana',
      role: 'Putra Kedua',
      parents: 'Bapak Harjono & Ibu Mariana',
      image: gallery[1],
    },
  ]

  return (
    <section
      ref={root}
      className="grain relative overflow-hidden bg-cream px-6 py-24 sm:px-10 sm:py-32"
    >
      {/* oversized ampersand as a watermark, not a divider */}
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display italic leading-none text-sage-soft/25"
        style={{ fontSize: 'clamp(14rem, 42vw, 34rem)' }}
        aria-hidden
      >
        &amp;
      </span>

      <div className="relative mx-auto max-w-5xl">
        <SectionHead
          index="01"
          eyebrow="Mempelai"
          title={
            <>
              Dengan memohon
              <br />
              rahmat Tuhan
            </>
          }
          className="max-w-xl"
        />

        <div className="mt-20 grid gap-20 sm:grid-cols-2 sm:gap-12">
          {people.map((p, i) => (
            <div
              key={p.name}
              data-fx
              className={i === 1 ? 'sm:mt-28' : undefined}
            >
              <Portrait src={p.image} alt={p.name} priority={i === 0} />
              <div className="mt-7 border-t border-ink/12 pt-5">
                <Label>{p.role}</Label>
                <p
                  className="mt-3 font-display font-normal leading-none text-ink"
                  style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.6rem)' }}
                >
                  {p.name}
                </p>
                {/* role above already says "putri pertama" — no prefix here,
                    it only pushed the line past the edge on a 390px screen */}
                <p className="mt-4 max-w-[24ch] text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                  {p.parents}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 4. Love story ──────────────────────────────────────── */

const milestones = [
  {
    year: '2021',
    title: 'Pertama bertemu',
    text: 'Sebuah pameran kecil di Jakarta, obrolan tentang kopi yang keliru dipesan, lalu tak pernah benar-benar selesai.',
    image: story[0],
  },
  {
    year: '2022',
    title: 'Perjalanan pertama',
    text: 'Tiga hari di pesisir timur. Sejak itu setiap rencana selalu ditulis dengan dua nama.',
    image: story[1],
  },
  {
    year: '2025',
    title: 'Lamaran',
    text: 'Di beranda rumah keluarga, disaksikan orang-orang yang membesarkan kami berdua.',
    image: story[2],
  },
  {
    year: '2026',
    title: 'Hari yang dinanti',
    text: 'Dan hari itu akhirnya punya tanggal. Kami ingin Anda ada di sana.',
    image: story[3],
  },
]

function Milestone({ m }: { m: (typeof milestones)[number] }) {
  const layer = useRef<HTMLDivElement>(null)
  useParallax(layer, 6)

  return (
    <li data-fx className="grid gap-6 sm:grid-cols-[9rem_1fr] sm:gap-10">
      <div className="relative aspect-[4/5] w-28 overflow-hidden bg-cream sm:w-full">
        <div ref={layer} className={parallaxLayer}>
          <Image
            src={m.image}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 30vw, 9rem"
          />
        </div>
      </div>
      <div className="border-t border-ink/12 pt-5">
        <span className="font-display text-sm tabular-nums text-sage">
          {m.year}
        </span>
        <p
          className="mt-2 font-display font-normal leading-tight text-ink"
          style={{ fontSize: 'clamp(1.5rem, 3.6vw, 2.1rem)' }}
        >
          {m.title}
        </p>
        <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-ink-soft">
          {m.text}
        </p>
      </div>
    </li>
  )
}

function StorySection() {
  const root = useRef<HTMLElement>(null)
  const line = useRef<HTMLSpanElement>(null)
  const list = useRef<HTMLOListElement>(null)

  useStagger(list, '[data-fx]', { stagger: 0.14, y: 40, start: 'top 85%' })

  // The timeline rule draws itself as the list scrolls past.
  useScrollFx((mm) => {
    mm.add(MOTION, () => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: list.current,
            start: 'top 75%',
            end: 'bottom 75%',
            scrub: 0.6,
          },
        },
      )
    })
  })

  return (
    <section
      ref={root}
      className="grain relative bg-ivory px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-20">
        {/* sticky is the native version of a pinned column — no ScrollTrigger needed */}
        <div className="md:sticky md:top-24 md:self-start">
          <SectionHead
            index="02"
            eyebrow="Perjalanan"
            title={
              <>
                Lima tahun,
                <br />
                satu cerita
              </>
            }
          />
          <Bloom className="mt-10 h-8 w-8 text-sage-soft" />
        </div>

        <div className="relative">
          <span
            ref={line}
            className="pointer-events-none absolute -left-6 top-2 hidden h-[calc(100%-1rem)] w-px bg-sage-soft sm:block"
            aria-hidden
          />
          <ol ref={list} className="flex flex-col gap-16 sm:gap-20">
            {milestones.map((m) => (
              <Milestone key={m.year} m={m} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ─── 5. Events ──────────────────────────────────────────── */

const events = [
  {
    label: 'Akad Nikah',
    day: 'Sabtu',
    date: '14 Juni 2026',
    time: '08.00 — 10.00 WIB',
    place: 'Masjid Al-Ikhlas',
    address: 'Jl. Raya Kebayoran, Jakarta Selatan',
    maps: 'https://maps.google.com/?q=Masjid+Al-Ikhlas+Kebayoran+Jakarta+Selatan',
    image: detail1,
  },
  {
    label: 'Resepsi',
    day: 'Sabtu',
    date: '14 Juni 2026',
    time: '11.00 — 14.00 WIB',
    place: 'The Kana Bali',
    address: 'Jl. Pantai Berawa, Canggu, Bali',
    maps: 'https://maps.google.com/?q=The+Kana+Bali+Pantai+Berawa+Canggu',
    image: detail2,
  },
]

function EventRow({
  ev,
  index,
}: {
  ev: (typeof events)[number]
  index: number
}) {
  const frame = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)
  useClipReveal(frame)
  useParallax(layer, 8)

  const flipped = index % 2 === 1

  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div
        ref={frame}
        className={[
          'relative aspect-4/3 w-full overflow-hidden',
          flipped ? 'md:order-2' : 'md:order-1',
        ].join(' ')}
      >
        <div ref={layer} className={parallaxLayer}>
          <Image
            src={ev.image}
            alt={ev.place}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>
      </div>

      <div className={flipped ? 'md:order-1' : 'md:order-2'}>
        <div className="flex items-center gap-5">
          <span
            className="font-display leading-none text-sage-soft"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px flex-1 bg-ink/12" />
          <Label>{ev.label}</Label>
        </div>

        <p
          className="mt-7 font-display font-normal leading-none text-ink"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          {ev.place}
        </p>
        <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-ink-soft">
          {ev.address}
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-ink/12 bg-ink/12 text-center">
          <div className="bg-cream px-4 py-5">
            <dt className="text-[10px] uppercase tracking-[0.28em] text-ink-soft">
              Tanggal
            </dt>
            <dd className="mt-2 font-display text-lg text-ink">
              {ev.day}, {ev.date}
            </dd>
          </div>
          <div className="bg-cream px-4 py-5">
            <dt className="text-[10px] uppercase tracking-[0.28em] text-ink-soft">
              Waktu
            </dt>
            <dd className="mt-2 font-display text-lg tabular-nums text-ink">
              {ev.time}
            </dd>
          </div>
        </dl>

        <a
          href={ev.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-7 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-ink transition-colors hover:text-sage"
        >
          Buka di Maps
          <span className="h-px w-10 bg-current transition-all duration-500 group-hover:w-16" />
        </a>
      </div>
    </div>
  )
}

function EventSection() {
  const root = useRef<HTMLElement>(null)

  return (
    <section
      ref={root}
      className="grain relative bg-cream px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHead
          index="03"
          eyebrow="Detail Acara"
          title="Kami mengundang Anda hadir"
          className="max-w-xl"
        />
        <div className="mt-20 flex flex-col gap-24">
          {events.map((ev, i) => (
            <EventRow key={ev.label} ev={ev} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 6. Gallery — pinned horizontal pan on desktop ──────── */

const tiles = [
  { src: hero2, span: 'w-[78vw] md:w-[34rem]', ratio: 'aspect-4/3' },
  { src: gallery[2], span: 'w-[62vw] md:w-[22rem]', ratio: 'aspect-3/4' },
  { src: gallery[3], span: 'w-[62vw] md:w-[24rem]', ratio: 'aspect-square' },
  { src: gallery[4], span: 'w-[78vw] md:w-[30rem]', ratio: 'aspect-4/3' },
  { src: gallery[5], span: 'w-[62vw] md:w-[22rem]', ratio: 'aspect-3/4' },
  { src: gallery[6], span: 'w-[62vw] md:w-[26rem]', ratio: 'aspect-square' },
  { src: gallery[7], span: 'w-[78vw] md:w-[32rem]', ratio: 'aspect-4/3' },
]

function GallerySection() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useScrollFx((mm) => {
    mm.add(MOTION_DESKTOP, () => {
      const el = track.current
      const section = root.current
      if (!el || !section) return

      // Guard against a viewport wider than the track — a negative distance
      // would pin the section and then scroll it backwards.
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 80)

      gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    })
  })

  return (
    <section
      ref={root}
      className="grain relative flex min-h-[70vh] flex-col justify-center overflow-hidden bg-ivory py-24 md:min-h-screen md:py-0"
    >
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
        <SectionHead
          index="04"
          eyebrow="Momen Kami"
          title="Sekilas perjalanan kami"
          className="max-w-xl"
        />
      </div>

      {/* mobile: native swipe · desktop: GSAP-driven pan */}
      <div className="mt-14 overflow-x-auto pb-4 [scrollbar-width:none] md:overflow-x-hidden md:pb-0">
        <div
          ref={track}
          className="flex w-max snap-x snap-mandatory items-end gap-4 px-6 sm:px-10 md:snap-none md:gap-8"
        >
          {tiles.map((t, i) => (
            <figure
              key={t.src + i}
              className={`relative shrink-0 snap-center overflow-hidden bg-cream ${t.span} ${t.ratio}`}
            >
              <Image
                src={t.src}
                alt={`Galeri foto ${i + 1}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 78vw, 34rem"
              />
            </figure>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-8 w-full max-w-5xl px-6 text-[10px] uppercase tracking-[0.32em] text-ink-soft sm:px-10">
        <span className="md:hidden">Geser untuk melihat →</span>
        <span className="hidden md:inline">Gulir untuk melihat →</span>
      </p>
    </section>
  )
}

/* ─── 7. Countdown ───────────────────────────────────────── */

const TARGET = new Date('2026-06-14T08:00:00+07:00').getTime()

/**
 * The clock is an external source, so it is read through
 * `useSyncExternalStore` rather than an effect. The server snapshot is `null`,
 * which is what keeps the first paint identical on both sides.
 */
const subscribeToClock = (onChange: () => void) => {
  const id = setInterval(onChange, 1000)
  return () => clearInterval(id)
}
const getClientNow = () => Math.floor(Date.now() / 1000) * 1000
const getServerNow = () => null

function useCountdown(target: number) {
  const now = useSyncExternalStore(
    subscribeToClock,
    getClientNow,
    getServerNow,
  )

  return useMemo(() => {
    if (now === null) return null
    const diff = Math.max(0, target - now)
    const s = Math.floor(diff / 1000)
    return {
      reached: diff === 0,
      days: String(Math.floor(s / 86400)).padStart(2, '0'),
      hours: String(Math.floor((s % 86400) / 3600)).padStart(2, '0'),
      minutes: String(Math.floor((s % 3600) / 60)).padStart(2, '0'),
      seconds: String(s % 60).padStart(2, '0'),
    }
  }, [now, target])
}

function CountdownStrip() {
  const t = useCountdown(TARGET)
  const units = t
    ? [
        { value: t.days, label: 'Hari', roll: false },
        { value: t.hours, label: 'Jam', roll: false },
        { value: t.minutes, label: 'Menit', roll: false },
        { value: t.seconds, label: 'Detik', roll: true },
      ]
    : null

  return (
    <section className="grain grain-dark relative overflow-hidden bg-ink px-6 py-24 sm:px-10 sm:py-32">
      <CornerSpray className="pointer-events-none absolute -left-6 bottom-0 h-40 w-40 -scale-y-100 text-ivory/10 sm:h-56 sm:w-56" />
      <CornerSpray className="pointer-events-none absolute -right-6 bottom-0 h-40 w-40 -scale-100 text-ivory/10 sm:h-56 sm:w-56" />

      <div className="relative mx-auto max-w-5xl">
        <div className="flex items-center gap-5">
          <span className="font-display text-base tabular-nums text-sage">05</span>
          <span className="h-px flex-1 bg-ivory/15" />
          <Label>Menuju hari bahagia</Label>
        </div>

        {t?.reached ? (
          <p
            className="mt-14 font-display font-normal text-ivory"
            style={{ fontSize: 'clamp(2.4rem, 8vw, 5rem)' }}
          >
            Hari yang dinanti telah tiba
          </p>
        ) : (
          <div className="mt-14 grid grid-cols-4 gap-2 sm:gap-6">
            {units?.map((u) => (
              <div key={u.label}>
                <p
                  className="font-display font-normal leading-none tabular-nums text-ivory"
                  style={{ fontSize: 'clamp(2.6rem, 11vw, 7rem)' }}
                >
                  {u.roll ? (
                    // fixed width: popLayout takes the exiting digit out of
                    // flow, which would otherwise collapse the column each tick
                    <span className="relative inline-block w-[2ch] overflow-hidden align-bottom">
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.span
                          key={u.value}
                          className="inline-block"
                          initial={{ y: '-70%', opacity: 0 }}
                          animate={{ y: '0%', opacity: 1 }}
                          exit={{ y: '70%', opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {u.value}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  ) : (
                    u.value
                  )}
                </p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-ivory/45">
                  {u.label}
                </p>
              </div>
            ))}
          </div>
        )}
        {/* placeholder before hydration so the strip does not jump */}
        {!t && <div className="mt-14 h-32" aria-hidden />}
      </div>
    </section>
  )
}

/* ─── 8 + 9. RSVP and the wishes it feeds ────────────────── */

type RsvpStatus = 'idle' | 'submitting' | 'success'

type Wish = { name: string; when: string; message: string }

const seedWishes: Wish[] = [
  {
    name: 'Dimas & Sarah',
    when: '2 hari lalu',
    message:
      'Selamat Arinda & Bagas! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Sampai jumpa di Bali.',
  },
  {
    name: 'Ratna Kusuma',
    when: '3 hari lalu',
    message: 'Akhirnya! Bahagia banget lihat kalian sampai di titik ini. Doa terbaik selalu.',
  },
  {
    name: 'Keluarga Besar Harjono',
    when: '4 hari lalu',
    message:
      'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fi khair.',
  },
  {
    name: 'Aditya P.',
    when: '5 hari lalu',
    message: 'Dari teman satu kos sampai jadi pengantin. Selamat, Gas!',
  },
  {
    name: 'Nadia Rahmawati',
    when: '1 minggu lalu',
    message:
      'Semoga lancar sampai hari H dan seterusnya. Nggak sabar lihat gaunnya!',
  },
  {
    name: 'Tim Studio Sembilan',
    when: '1 minggu lalu',
    message: 'Turut berbahagia. Semoga langgeng sampai kakek nenek.',
  },
]

const fieldClass =
  'w-full border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-sage'

function RsvpAndWishes() {
  const [status, setStatus] = useState<RsvpStatus>('idle')
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [wishes, setWishes] = useState<Wish[]>(seedWishes)

  const wishesRoot = useRef<HTMLElement>(null)
  useStagger(wishesRoot, '[data-fx]', { stagger: 0.08, y: 24 })

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
    // Simulated submit — replace with real endpoint.
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
      <section className="grain relative bg-cream px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-20">
          <div className="md:sticky md:top-24 md:self-start">
            <SectionHead
              index="06"
              eyebrow="Konfirmasi Kehadiran"
              title={
                <>
                  Apakah Anda
                  <br />
                  hadir?
                </>
              }
            />
            <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-ink-soft">
              Mohon konfirmasi kehadiran Anda sebelum 1 Juni 2026 agar kami dapat
              menyiapkan tempat sebaik-baiknya.
            </p>
          </div>

          <div className="relative border border-ink/12 bg-ivory p-8 sm:p-10">
            <CornerSpray className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 -scale-x-100 text-sage-soft/50" />

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative py-8"
                >
                  <Bloom className="h-10 w-10 text-sage" />
                  <p
                    className="mt-6 font-display font-normal leading-tight text-ink"
                    style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)' }}
                  >
                    Terima kasih, {name.split(' ')[0]}
                  </p>
                  <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-ink-soft">
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
                  className="relative space-y-8"
                >
                  <div>
                    <label
                      className="text-[10px] uppercase tracking-[0.28em] text-ink-soft"
                      htmlFor="rsvp-name"
                    >
                      Nama lengkap
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label
                      className="text-[10px] uppercase tracking-[0.28em] text-ink-soft"
                      htmlFor="rsvp-guests"
                    >
                      Jumlah tamu
                    </label>
                    <input
                      id="rsvp-guests"
                      type="number"
                      min={1}
                      max={5}
                      placeholder="1"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-ink-soft">
                      Konfirmasi
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-px border border-ink/12 bg-ink/12">
                      {['Hadir', 'Tidak hadir', 'Belum pasti'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAttendance(opt)}
                          aria-pressed={attendance === opt}
                          className={[
                            'py-3 text-[11px] font-medium tracking-wide transition-colors',
                            attendance === opt
                              ? 'bg-ink text-ivory'
                              : 'bg-ivory text-ink-soft hover:bg-cream',
                          ].join(' ')}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      className="text-[10px] uppercase tracking-[0.28em] text-ink-soft"
                      htmlFor="rsvp-message"
                    >
                      Ucapan &amp; doa (opsional)
                    </label>
                    <textarea
                      id="rsvp-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tulis ucapan untuk pasangan..."
                      className={`${fieldClass} resize-none`}
                    />
                  </div>

                  <p
                    role="alert"
                    aria-live="polite"
                    className="min-h-4 text-xs font-medium text-rose-600"
                  >
                    {error}
                  </p>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="flex w-full items-center justify-center gap-3 bg-ink py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-ivory transition-colors hover:bg-sage disabled:opacity-70"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border border-ivory/40 border-t-ivory" />
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
        ref={wishesRoot}
        className="grain relative bg-ivory px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHead
            index="07"
            eyebrow="Ucapan & Doa"
            title="Dari mereka yang menyayangi kami"
            className="max-w-xl"
          />

          <div className="mt-16 gap-x-10 sm:columns-2">
            {wishes.map((w, i) => (
              <figure
                key={`${w.name}-${i}`}
                data-fx
                className="mb-10 break-inside-avoid border-t border-ink/12 pt-5"
              >
                <blockquote className="font-display italic leading-snug text-ink text-lg sm:text-xl">
                  {w.message}
                </blockquote>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-ink">
                    {w.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
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

/* ─── 10. Gift ───────────────────────────────────────────── */

function GiftSection() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState('')

  const accounts = [
    { bank: 'BCA', number: '288 471 9281', holder: 'Arinda Pawestri' },
    { bank: 'Mandiri', number: '137 008 472 1928', holder: 'Bagas Wicaksana' },
  ]

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
    <section className="grain relative bg-cream px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHead
          index="08"
          eyebrow="Tanda Kasih"
          title="Doa restu Anda adalah hadiah terindah"
          className="max-w-xl"
        />
        <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-ink-soft">
          Bila Anda ingin memberi tanda kasih, kami sediakan amplop digital
          berikut.
        </p>

        {!open ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group mt-10 inline-flex items-center gap-3 border border-ink/20 px-7 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-ink transition-colors hover:border-sage hover:text-sage"
          >
            Buka amplop digital
            <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid gap-px bg-ink/12 sm:grid-cols-2"
          >
            {accounts.map((a) => (
              <div key={a.bank} className="bg-ivory p-7">
                <Label>{a.bank}</Label>
                <p className="mt-4 font-display text-2xl tabular-nums tracking-wide text-ink sm:text-[1.7rem]">
                  {a.number}
                </p>
                <p className="mt-2 text-xs text-ink-soft">a.n. {a.holder}</p>
                <button
                  type="button"
                  onClick={() => copy(a.number, a.bank)}
                  className="mt-6 text-[10px] uppercase tracking-[0.28em] text-sage underline underline-offset-4 transition-colors hover:text-ink"
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

/* ─── 11. Footer ─────────────────────────────────────────── */

function InvitationFooter() {
  return (
    <footer className="grain grain-dark relative overflow-hidden bg-ink px-6 py-24 text-center sm:px-10 sm:py-32">
      <FloralDivider className="mx-auto h-8 w-48 text-ivory/25" />
      <p
        className="mt-10 font-display font-normal leading-[0.95] text-ivory"
        style={{ fontSize: 'clamp(2.6rem, 11vw, 6rem)' }}
      >
        Arinda <span className="italic text-sage-soft">&amp;</span> Bagas
      </p>
      <p className="mt-6 text-[11px] uppercase tracking-[0.42em] text-ivory/45">
        14 · 06 · 2026
      </p>
      <p className="mx-auto mt-12 max-w-md text-sm leading-relaxed text-ivory/60">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda
        berkenan hadir dan memberikan doa restu.
      </p>
      <p className="mt-14 text-[10px] uppercase tracking-[0.28em] text-ivory/30">
        Dibuat dengan{' '}
        <Link
          href="/"
          className="text-ivory/60 underline underline-offset-4 transition-colors hover:text-ivory"
        >
          Temukita
        </Link>{' '}
        · {new Date().getFullYear()}
      </p>
    </footer>
  )
}

/* ─── Page composition ───────────────────────────────────── */

export function Template1Page() {
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
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Template1Intro onOpen={() => setOpened(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* clip, not hidden — `overflow: hidden` here would break ScrollTrigger pinning */}
      <div className="overflow-x-clip bg-ivory">
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
        <Template1MusicPlayer shouldPlay={opened} />
      </div>
    </>
  )
}
