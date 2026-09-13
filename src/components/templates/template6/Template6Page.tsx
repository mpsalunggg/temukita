'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import {
  parallaxLayer,
  useParallax,
  useSmoothScroll,
  useStagger,
} from '../template1/scroll'
import { MusicPlayer } from '../shared/MusicPlayer'
import { ArchFrame, Khatam, StarDivider, StarTile } from './Geometry'
import { Template6Intro } from './Template6Intro'
import { arch, carving, cover, decor, mushaf } from './assets'

/* ------------------------------------------------------------------ shared */

/**
 * Every photo goes through here. The grade is light rather than heavy — a wash
 * that pulls the five sources into one key without darkening them, because the
 * page is white and a dark frame reads as a hole rather than as atmosphere.
 */
function Photo({
  src,
  alt,
  sizes,
  priority = false,
  position = 'center',
  className = '',
}: {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  position?: string
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden bg-parchment-dim ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover saturate-[0.7] brightness-[1.05] contrast-[0.97]"
        style={{ objectPosition: position }}
      />
    </div>
  )
}

/** Arabic block. Always rtl + lang="ar", always given room for the harakat. */
function Arabic({
  children,
  className = '',
  ...rest
}: {
  children: ReactNode
  className?: string
} & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...rest}
      dir="rtl"
      lang="ar"
      className={`font-arabic leading-[2.1] text-olive ${className}`}
    >
      {children}
    </p>
  )
}

/** Small tracked label above a heading. */
function Label({
  children,
  ...rest
}: { children: ReactNode } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className="text-[10px] uppercase tracking-[0.32em] text-olive-soft"
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
      className={`font-roman leading-[1.25] text-ink-deep ${className}`}
      style={{ fontSize: 'clamp(1.4rem, 3.6vw, 2.1rem)' }}
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
    <p
      {...rest}
      className={`text-sm leading-[1.95] text-olive-soft ${className}`}
    >
      {children}
    </p>
  )
}

/* ------------------------------------------------------------------- cover */

function CoverSection() {
  const layer = useRef<HTMLDivElement>(null)
  useParallax(layer, 5)

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-parchment">
      {/* Full-bleed, then veiled back almost to paper. The flowers are texture
          here, not subject — the type is the subject. */}
      <div className="absolute inset-0">
        <div ref={layer} className={parallaxLayer}>
          <Image
            src={cover}
            alt="Rangkaian bunga baby&rsquo;s breath"
            fill
            priority
            sizes="100vw"
            className="object-cover saturate-[0.7] brightness-[1.05] contrast-[0.97]"
          />
        </div>
        <div className="absolute inset-0 bg-parchment/72" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto max-w-xl px-8 text-center">
        <Arabic style={{ fontSize: 'clamp(1.4rem, 5vw, 1.9rem)' }}>
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </Arabic>

        <p className="mt-10 text-[10px] uppercase tracking-[0.32em] text-olive-soft">
          Walimatul &lsquo;Urs
        </p>

        {/* One line per name — as flowing text these broke mid-word, which is a
            bad look on anyone's name, let alone on a wedding invitation. */}
        <h1
          className="mt-6 font-roman leading-[1.15] text-ink-deep"
          style={{ fontSize: 'clamp(1.9rem, 7vw, 3rem)' }}
        >
          <span className="block">Fatimah Az-Zahra</span>
          <span className="my-1 block text-brass">&amp;</span>
          <span className="block">Ahmad Fauzan</span>
        </h1>

        <StarDivider className="mx-auto mt-8 h-5 w-44 text-brass/70" />

        <p className="mt-8 text-[11px] uppercase tracking-[0.24em] text-olive">
          Sabtu &middot; 12 Juni 2027
        </p>
        <p className="mt-2.5 text-[13px] text-olive-soft">
          Masjid Al-Hikmah, Yogyakarta
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- salam ayat */

function SalamSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 16, stagger: 0.12 })

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-parchment px-6 py-24 text-center sm:px-10 sm:py-32"
    >
      <StarTile
        id="t6-khatam-salam"
        className="absolute inset-0 text-olive/[0.05]"
      />

      <div className="relative z-10 mx-auto max-w-xl">
        <Body data-fx>
          Assalamu&rsquo;alaikum warahmatullahi wabarakatuh
        </Body>

        {/* The verse sits inside an arch outline — a mihrab, drawn not tiled. */}
        <div data-fx className="relative mx-auto mt-12 max-w-md px-7 pb-10 pt-16">
          <ArchFrame className="absolute inset-0 h-full w-full text-brass/35" />
          <div className="relative">
            <Arabic className="text-xl leading-[2.4] sm:text-2xl">
              وَٱلَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَٰجِنَا وَذُرِّيَّـٰتِنَا قُرَّةَ
              أَعْيُنٍ وَٱجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا
            </Arabic>

            <Body className="mt-8">
              &ldquo;Dan orang-orang yang berkata, &lsquo;Ya Tuhan kami,
              anugerahkanlah kepada kami pasangan kami dan keturunan kami
              sebagai penyenang hati (kami), dan jadikanlah kami pemimpin bagi
              orang-orang yang bertakwa.&rsquo;&rdquo;
            </Body>

            <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-brass">
              QS. Al-Furqan : 74
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- mempelai */

const couple = [
  {
    role: 'Mempelai Wanita',
    name: 'Fatimah Az-Zahra',
    parents: 'Putri pertama dari Bapak H. Sulaiman Yusuf dan Ibu Hj. Aisyah Rahmawati',
  },
  {
    role: 'Mempelai Pria',
    name: 'Ahmad Fauzan',
    parents: 'Putra kedua dari Bapak H. Abdul Karim dan Ibu Hj. Maryam Salsabila',
  },
]

function MempelaiSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.12 })

  return (
    <section ref={root} className="bg-parchment-dim px-6 py-24 sm:px-10 sm:py-28">
      {/* No portraits anywhere in this template. The parents' names carry the
          weight the photographs carry in the other five. */}
      <div className="mx-auto grid max-w-4xl items-start gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-8">
        <div data-fx className="text-center">
          <Label>{couple[0].role}</Label>
          <Heading className="mt-4">{couple[0].name}</Heading>
          <Body className="mx-auto mt-4 max-w-xs text-[13px]">
            {couple[0].parents}
          </Body>
        </div>

        <div data-fx className="flex justify-center md:pt-12">
          <Khatam className="h-8 w-8 text-brass" />
        </div>

        <div data-fx className="text-center">
          <Label>{couple[1].role}</Label>
          <Heading className="mt-4">{couple[1].name}</Heading>
          <Body className="mx-auto mt-4 max-w-xs text-[13px]">
            {couple[1].parents}
          </Body>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- photo band */

function PhotoBand() {
  const layer = useRef<HTMLDivElement>(null)
  useParallax(layer, 8)

  return (
    <section className="relative aspect-4/3 w-full overflow-hidden sm:aspect-16/7">
      <div ref={layer} className={parallaxLayer}>
        <Image
          src={arch}
          alt="Koridor masjid dengan lengkung runcing"
          fill
          sizes="100vw"
          className="object-cover saturate-[0.7] brightness-[1.05] contrast-[0.97]"
          style={{ objectPosition: 'center 45%' }}
        />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- acara */

const acara = [
  {
    title: 'Akad Nikah',
    time: '08.00 — 10.00 WIB',
    place: 'Masjid Al-Hikmah',
    address: 'Jl. Kaliurang KM 5, Yogyakarta',
    maps: 'https://maps.google.com',
  },
  {
    title: "Walimatul 'Urs",
    time: '11.00 — 14.00 WIB',
    place: 'Aula Al-Hikmah',
    address: 'Jl. Kaliurang KM 5, Yogyakarta',
    maps: 'https://maps.google.com',
  },
]

function AcaraSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.12 })

  return (
    <section ref={root} className="bg-parchment px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Label data-fx>Rangkaian Acara</Label>
        <Heading data-fx className="mt-4">
          Waktu &amp; Tempat
        </Heading>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-8">
          {acara.map((a) => (
            <div key={a.title} data-fx className="border-t border-brass/40 pt-7">
              <h3 className="font-roman text-lg text-ink-deep">{a.title}</h3>
              <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-olive">
                {a.time}
              </p>
              <p className="mt-4 text-sm text-ink-deep">{a.place}</p>
              <Body className="mt-1 text-[13px]">{a.address}</Body>
              <a
                href={a.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block border-b border-brass/60 pb-0.5 text-[10px] uppercase tracking-[0.24em] text-brass transition-colors hover:border-olive hover:text-olive focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive"
              >
                Lihat Peta
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- countdown */

const TARGET = new Date('2027-06-12T08:00:00+07:00')

/**
 * The clock is an external store rather than state driven by an effect: React
 * gets a server snapshot to hydrate against, so the first paint matches the
 * HTML, and there is no setState inside an effect body.
 */
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000)
  return () => window.clearInterval(id)
}

/** Seconds, not milliseconds — the snapshot must be stable between ticks. */
const getSnapshot = () => Math.floor(Date.now() / 1000)
const getServerSnapshot = () => 0

function remaining(nowMs: number) {
  const ms = Math.max(0, TARGET.getTime() - nowMs)
  return {
    Hari: Math.floor(ms / 86_400_000),
    Jam: Math.floor(ms / 3_600_000) % 24,
    Menit: Math.floor(ms / 60_000) % 60,
    Detik: Math.floor(ms / 1000) % 60,
  }
}

function CountdownSection() {
  const nowSec = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const left = nowSec === 0 ? null : remaining(nowSec * 1000)
  const units = ['Hari', 'Jam', 'Menit', 'Detik'] as const

  return (
    <section className="bg-parchment-dim px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <Label>Menuju hari akad</Label>
        <dl className="mt-8 grid grid-cols-4 divide-x divide-brass/30">
          {units.map((u) => (
            <div key={u} className="px-2">
              <dd
                className="font-roman tabular-nums text-ink-deep"
                style={{ fontSize: 'clamp(1.6rem, 6vw, 2.5rem)' }}
              >
                {left === null ? '—' : String(left[u]).padStart(2, '0')}
              </dd>
              <dt className="mt-2.5 text-[10px] uppercase tracking-[0.32em] text-olive-soft">
                {u}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- gallery */

function GallerySection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 20, stagger: 0.1 })

  const frames = [
    { src: carving, alt: 'Serambi marmer putih dengan kapitel berlapis emas' },
    { src: decor, alt: 'Rangkaian bunga putih' },
    { src: mushaf, alt: 'Mushaf Al-Qur’an di atas permukaan terang' },
  ]

  return (
    <section ref={root} className="bg-parchment px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3 sm:gap-6">
        {frames.map((f) => (
          <div key={f.src} data-fx>
            <Photo
              src={f.src}
              alt={f.alt}
              sizes="(min-width: 640px) 20rem, 90vw"
              className="aspect-3/4 w-full"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ hadiah */

const accounts = [
  { bank: 'BSI', number: '7133 004 921', holder: 'Fatimah Az-Zahra' },
  { bank: 'Muamalat', number: '3410 0075 118', holder: 'Ahmad Fauzan' },
]

function HadiahSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.1 })

  return (
    <section ref={root} className="bg-parchment px-6 pb-24 sm:px-10">
      <div className="mx-auto max-w-md text-center">
        <StarDivider className="mx-auto h-5 w-40 text-brass/60" />
        <Heading data-fx className="mt-10">
          Hadiah
        </Heading>
        <Body data-fx className="mt-4">
          Kehadiran dan doa Anda sudah lebih dari cukup bagi kami. Bila ingin
          memberi lebih, kami menerimanya dengan penuh syukur.
        </Body>

        <dl data-fx className="mt-10 border-t border-brass/30 text-left">
          {accounts.map((a) => (
            <div
              key={a.bank}
              className="flex items-baseline justify-between gap-4 border-b border-brass/30 py-4"
            >
              <dt className="text-[10px] uppercase tracking-[0.32em] text-olive-soft">
                {a.bank}
              </dt>
              <dd className="text-right">
                <span className="block text-sm tabular-nums tracking-[0.08em] text-ink-deep">
                  {a.number}
                </span>
                <span className="mt-0.5 block text-[11px] text-olive-soft">
                  a.n. {a.holder}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- rsvp */

type RsvpStatus = 'idle' | 'submitting' | 'success'

function RsvpSection() {
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<RsvpStatus>('idle')
  const [error, setError] = useState('')

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
    window.setTimeout(() => setStatus('success'), 700)
  }

  const field =
    'w-full border-b border-olive/25 bg-transparent py-2.5 text-sm text-ink-deep outline-none transition-colors placeholder:text-olive-soft/60 focus:border-olive'
  const label = 'text-[10px] uppercase tracking-[0.32em] text-olive-soft'

  return (
    <section
      id="rsvp"
      className="scroll-mt-8 bg-parchment-dim px-6 py-24 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-md text-center">
        <Label>Konfirmasi kehadiran</Label>
        <Heading className="mt-4">RSVP</Heading>

        {status === 'success' ? (
          <Body className="mt-10 border-y border-brass/30 py-10">
            Terima kasih, konfirmasi Anda sudah kami terima.
            <br />
            Semoga Allah memudahkan langkah kita bertemu.
          </Body>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-7 text-left"
          >
            <div>
              <label htmlFor="rsvp6-name" className={label}>
                Nama
              </label>
              <input
                id="rsvp6-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap Anda"
                className={`mt-1 ${field}`}
              />
            </div>

            <div>
              <label htmlFor="rsvp6-guests" className={label}>
                Jumlah tamu
              </label>
              <input
                id="rsvp6-guests"
                type="number"
                min={1}
                max={5}
                defaultValue={1}
                className={`mt-1 ${field}`}
              />
            </div>

            <fieldset>
              <legend className={label}>Kehadiran</legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {['Hadir', 'Berhalangan'].map((option) => (
                  <label
                    key={option}
                    className="cursor-pointer border border-olive/25 py-2.5 text-center text-[10px] uppercase tracking-[0.2em] text-olive-soft transition-colors has-checked:border-olive has-checked:bg-olive has-checked:text-parchment"
                  >
                    <input
                      type="radio"
                      name="rsvp6-attendance"
                      value={option}
                      checked={attendance === option}
                      onChange={(e) => setAttendance(e.target.value)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="rsvp6-message" className={label}>
                Doa &amp; ucapan
              </label>
              <textarea
                id="rsvp6-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis doa untuk kedua mempelai"
                className={`mt-1 resize-none ${field}`}
              />
            </div>

            {error && <p className="text-[11px] text-olive">{error}</p>}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-2 bg-olive px-8 py-3.5 text-[10px] uppercase tracking-[0.3em] text-parchment transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive"
            >
              {status === 'submitting' ? 'Mengirim…' : 'Kirim konfirmasi'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------- doa */

function DoaSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 16, stagger: 0.12 })

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-olive px-6 py-24 text-center sm:px-10 sm:py-28"
    >
      <StarTile
        id="t6-khatam-doa"
        className="absolute inset-0 text-parchment/[0.08]"
      />

      <div className="relative z-10 mx-auto max-w-xl">
        <span
          data-fx
          className="text-[10px] uppercase tracking-[0.32em] text-parchment/60"
        >
          Doa
        </span>

        <p
          data-fx
          dir="rtl"
          lang="ar"
          className="mt-8 font-arabic text-xl leading-[2.3] text-parchment sm:text-2xl"
        >
          بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>

        <p
          data-fx
          className="mt-8 text-[11px] italic tracking-[0.06em] text-parchment/70"
        >
          Bārakallāhu lakumā wa bāraka ‘alaikumā wa jama‘a bainakumā fī khair
        </p>

        <p data-fx className="mt-5 text-sm leading-[1.95] text-parchment/80">
          &ldquo;Semoga Allah memberkahi kalian berdua, dan mengumpulkan kalian
          berdua dalam kebaikan.&rdquo;
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------- turut mengundang */

const turutMengundang = [
  'Bapak H. Sulaiman Yusuf & Ibu Hj. Aisyah Rahmawati',
  'Bapak H. Abdul Karim & Ibu Hj. Maryam Salsabila',
  'Keluarga Bapak H. Zainuddin Hasan',
  'Keluarga Ibu Hj. Siti Khadijah',
  'Keluarga Bapak Drs. Imron Rosyadi',
  'Keluarga Bapak H. Mustofa Kamal',
]

function TurutMengundangSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 14, stagger: 0.06 })

  return (
    <section ref={root} className="bg-parchment px-6 py-24 text-center sm:px-10">
      <div className="mx-auto max-w-2xl">
        <Label data-fx>Turut Mengundang</Label>
        <ul className="mt-10 flex flex-col gap-3">
          {turutMengundang.map((n) => (
            <li key={n} data-fx className="text-[13px] leading-relaxed text-olive-soft">
              {n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ footer */

function InvitationFooter() {
  return (
    <footer className="bg-olive px-6 py-20 text-center sm:px-10">
      <p className="text-sm leading-[1.95] text-parchment/80">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
        Bapak/Ibu/Saudara berkenan hadir untuk memberikan doa restu.
      </p>
      <p className="mt-8 text-[11px] tracking-[0.08em] text-parchment/70">
        Wassalamu&rsquo;alaikum warahmatullahi wabarakatuh
      </p>

      <Khatam className="mx-auto mt-12 h-7 w-7 text-parchment/40" />

      <p
        className="mt-8 font-roman leading-[1.3] text-parchment"
        style={{ fontSize: 'clamp(1.3rem, 5vw, 2rem)' }}
      >
        Fatimah &amp; Fauzan
      </p>
      <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-parchment/50">
        12 · 06 · 2027
      </p>

      <p className="mt-12 text-[11px] text-parchment/40">
        Dibuat dengan{' '}
        <Link
          href="/"
          className="underline underline-offset-4 hover:text-parchment/70"
        >
          Temukita
        </Link>
      </p>
    </footer>
  )
}

/* -------------------------------------------------------------------- page */

export function Template6Page() {
  const [opened, setOpened] = useState(false)

  useSmoothScroll(opened)

  // Lock body scroll while the intro overlay is up.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  return (
    <>
      <AnimatePresence mode="wait">
        {!opened && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-100"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Template6Intro onOpen={() => setOpened(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* clip, not hidden — `overflow: hidden` here would break ScrollTrigger */}
      <div className="overflow-x-clip bg-parchment">
        <CoverSection />
        <SalamSection />
        <MempelaiSection />
        <PhotoBand />
        <AcaraSection />
        <CountdownSection />
        <GallerySection />
        <HadiahSection />
        <RsvpSection />
        <DoaSection />
        <TurutMengundangSection />
        <InvitationFooter />
        <MusicPlayer
          shouldPlay={opened}
          buttonClassName="border border-olive/25 bg-parchment/95 text-olive backdrop-blur-sm hover:bg-olive hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
        />
      </div>
    </>
  )
}
