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
import { Bloom, FloralDivider, Sprig } from '../template1/Florals'
import {
  parallaxLayer,
  useClipReveal,
  useParallax,
  useSmoothScroll,
  useStagger,
} from '../template1/scroll'
import { MusicPlayer } from '../shared/MusicPlayer'
import { Template4Intro } from './Template4Intro'
import { bloom, closing, cover, detail, ring, story, table, walk } from './assets'

/* ------------------------------------------------------------------ shared */

/**
 * Every photo on this page goes through here. The forced `grayscale` is what
 * makes frames from eight different shoots read as one wedding — bypass it and
 * a single colour frame drags the whole page out of key.
 */
function Photo({
  src,
  alt,
  sizes,
  priority = false,
  position = 'center',
  className = '',
  children,
}: {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  position?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div className={`relative overflow-hidden bg-noir ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover grayscale contrast-[1.08]"
        style={{ objectPosition: position }}
      />
      {children}
    </div>
  )
}

/** Eyebrow. The one place wide letter-spacing is allowed to get loud. */
function Label({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <span
      className={`font-engraved text-[11px] uppercase tracking-[0.4em] ${
        tone === 'light' ? 'text-white/50' : 'text-noir/50'
      }`}
    >
      {children}
    </span>
  )
}

/**
 * Section heading. Wide serif capitals are the single decision that carries
 * this template — everything else is spacing and hairlines.
 */
function Heading({
  children,
  tone = 'dark',
  className = '',
  ...rest
}: {
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
} & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...rest}
      className={`font-engraved uppercase leading-[1.08] tracking-[0.16em] ${
        tone === 'light' ? 'text-white' : 'text-noir'
      } ${className}`}
      style={{ fontSize: 'clamp(1.7rem, 4.4vw, 2.9rem)' }}
    >
      {children}
    </h2>
  )
}

function Body({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p
      className={`text-sm leading-[1.9] ${
        tone === 'light' ? 'text-white/70' : 'text-noir/70'
      }`}
    >
      {children}
    </p>
  )
}

/* ------------------------------------------------------------------- cover */

function CoverSection() {
  const frame = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)

  useClipReveal(frame)
  useParallax(layer, 6)

  return (
    <section className="relative h-screen min-h-[36rem] w-full bg-noir">
      <div ref={frame} className="absolute inset-0 overflow-hidden">
        <div ref={layer} className={parallaxLayer}>
          <Image
            src={cover}
            alt="Kirana dan Dimas berjalan menyusuri jalan setapak"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center grayscale contrast-[1.08]"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-noir/45" aria-hidden />
      <div
        className="absolute inset-0 bg-linear-to-b from-noir/75 via-transparent to-noir/70"
        aria-hidden
      />

      {/* Names sit at the top, not the middle — that placement is the whole
          composition, and it needs the dark empty half of the photo below. */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-10 text-white sm:px-10 sm:py-14">
        <h1
          className="text-center font-engraved uppercase leading-[0.95] tracking-[0.12em]"
          style={{ fontSize: 'clamp(2.2rem, 9.5vw, 6.5rem)' }}
        >
          Kirana
          <span className="mx-2 font-serif font-normal italic tracking-normal sm:mx-4">
            &amp;
          </span>
          Dimas
        </h1>

        <div className="flex items-end justify-between gap-6 pr-16 text-[11px] uppercase tracking-[0.3em] text-white/80 sm:pr-20">
          <span className="font-engraved">07 November 2026</span>
          <span className="font-engraved">#KiranaDimasForever</span>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- story */

function StorySection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 20, stagger: 0.14 })

  return (
    <section ref={root} className="bg-paper px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-12 md:items-center md:gap-10">
        <Heading data-fx className="md:col-span-3">
          Our
          <br />
          Love
          <br />
          Story
        </Heading>

        <div data-fx className="md:col-span-4">
          <Photo
            src={story}
            alt="Kirana dan Dimas di balik kerudung pengantin"
            sizes="(min-width: 768px) 22rem, 90vw"
            className="aspect-4/5 w-full"
          />
        </div>

        <div data-fx className="flex flex-col gap-5 md:col-span-5">
          <Body>
            Kami bertemu di sebuah sore yang tidak direncanakan — antrean kopi
            yang terlalu panjang, dan percakapan yang ternyata jauh lebih
            panjang lagi. Tujuh tahun kemudian, percakapan itu belum selesai.
          </Body>
          <Body>
            Hari ini kami mengundang Anda untuk berdiri di dekat kami saat
            percakapan itu diberi nama baru. Kehadiran Anda adalah bagian dari
            cerita yang sedang kami tulis.
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
    <section className="grid md:grid-cols-5">
      <div className="relative aspect-4/3 overflow-hidden md:col-span-3 md:aspect-auto md:min-h-[32rem]">
        <div ref={layer} className={parallaxLayer}>
          <Image
            src={walk}
            alt="Detail gaun dan buket pengantin"
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover grayscale contrast-[1.08]"
          />
        </div>
      </div>

      <div className="bg-noir p-8 md:col-span-2 md:p-12">
        <Photo
          src={bloom}
          alt="Buket pengantin dengan cincin di atas mawar"
          sizes="(min-width: 768px) 40vw, 90vw"
          className="aspect-square w-full"
        />
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- ceremony */

const ceremony = [
  {
    title: 'Tempat Akad',
    text: 'Akad dilangsungkan sederhana bersama keluarga inti di Pendopo Kayu Manis, Yogyakarta.',
    Icon: Sprig,
    iconClass: 'h-14 w-8',
  },
  {
    title: 'Aturan Busana',
    text: 'Tidak perlu berlebihan. Smart casual dengan nuansa netral — hitam, putih, atau abu.',
    Icon: Bloom,
    iconClass: 'h-12 w-12',
  },
  {
    title: 'Setelah Acara',
    text: 'Ramah tamah dan makan siang dilanjutkan di restoran sebelah, tepat setelah akad.',
    Icon: Sprig,
    iconClass: 'h-14 w-8 -scale-x-100',
  },
]

function CeremonySection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 20, stagger: 0.12 })

  return (
    <section ref={root} className="bg-paper px-6 py-24 text-center sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Heading data-fx>The Ceremony</Heading>

        <div className="mt-16 grid gap-14 sm:grid-cols-3 sm:gap-8">
          {ceremony.map(({ title, text, Icon, iconClass }) => (
            <div key={title} data-fx className="flex flex-col items-center">
              <div className="flex h-14 items-end justify-center text-noir">
                <Icon className={iconClass} />
              </div>
              <h3 className="mt-7 font-engraved text-base uppercase tracking-[0.24em] text-noir">
                {title}
              </h3>
              <p className="mt-4 max-w-[16rem] text-sm leading-[1.9] text-noir/70">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- schedule */

const schedule = [
  ['10.00', 'Tamu tiba & ramah tamah'],
  ['10.30', 'Akad nikah'],
  ['11.30', 'Sesi foto bersama'],
  ['12.00', 'Makan siang'],
  ['14.00', 'Acara selesai'],
]

function ScheduleSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 22, stagger: 0.1 })

  return (
    <section ref={root} className="bg-noir px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <Heading data-fx tone="light">
            Schedule
            <br />
            of Events
          </Heading>

          {/* Hairlines, not a table with borders — the rule is the design. */}
          <dl data-fx className="mt-12 border-t border-white/15">
            {schedule.map(([time, what]) => (
              <div
                key={time}
                className="flex items-baseline gap-6 border-b border-white/15 py-4"
              >
                <dt className="w-20 shrink-0 font-engraved text-sm tabular-nums tracking-[0.14em] text-white">
                  {time}
                </dt>
                <dd className="text-sm text-white/70">{what}</dd>
              </div>
            ))}
          </dl>

          <p data-fx className="mt-8 text-xs leading-relaxed text-white/45">
            Pendopo Kayu Manis · Jl. Suryodiningratan 42, Yogyakarta
          </p>
        </div>

        <div data-fx>
          <Photo
            src={table}
            alt="Meja jamuan yang telah ditata"
            sizes="(min-width: 768px) 40rem, 90vw"
            className="aspect-4/3 w-full"
          />
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- countdown */

const TARGET = new Date('2026-11-07T10:00:00+07:00')

/**
 * The clock is an external store rather than state driven by an effect: it
 * gives React a server snapshot to hydrate against, so the first paint matches
 * the HTML instead of flashing, and there is no setState in an effect body.
 */
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000)
  return () => window.clearInterval(id)
}

/** Seconds, not milliseconds — the snapshot has to be stable between ticks. */
const getSnapshot = () => Math.floor(Date.now() / 1000)
const getServerSnapshot = () => 0

function remaining(nowMs: number) {
  const ms = Math.max(0, TARGET.getTime() - nowMs)
  return {
    hari: Math.floor(ms / 86_400_000),
    jam: Math.floor(ms / 3_600_000) % 24,
    menit: Math.floor(ms / 60_000) % 60,
    detik: Math.floor(ms / 1000) % 60,
  }
}

function CountdownSection() {
  const nowSec = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const left = nowSec === 0 ? null : remaining(nowSec * 1000)

  const units: [string, number | null][] = [
    ['Hari', left?.hari ?? null],
    ['Jam', left?.jam ?? null],
    ['Menit', left?.menit ?? null],
    ['Detik', left?.detik ?? null],
  ]

  return (
    <section className="border-t border-white/10 bg-noir px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <Label tone="light">Menuju hari bahagia</Label>

        <dl className="mt-10 grid grid-cols-4 divide-x divide-white/15">
          {units.map(([unit, value]) => (
            <div key={unit} className="px-2">
              <dd
                className="font-engraved tabular-nums text-white"
                style={{ fontSize: 'clamp(1.9rem, 7vw, 3.4rem)' }}
              >
                {value === null ? '—' : String(value).padStart(2, '0')}
              </dd>
              <dt className="mt-3 font-engraved text-[10px] uppercase tracking-[0.32em] text-white/50">
                {unit}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- gift */

const accounts = [
  { bank: 'BCA', number: '4820 117 993', holder: 'Kirana Maheswari' },
  { bank: 'Mandiri', number: '1370 0099 4415', holder: 'Dimas Prayoga' },
]

function GiftSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 20, stagger: 0.12 })

  return (
    <section ref={root} className="bg-noir px-6 pb-28 sm:px-10">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-12">
        <div data-fx className="hidden md:col-span-3 md:block">
          <Photo
            src={ring}
            alt="Cincin pernikahan"
            sizes="18rem"
            className="aspect-3/4 w-full"
          />
        </div>

        <div data-fx className="text-center md:col-span-6">
          <h3
            className="font-grotesk font-light leading-[1.35] text-white"
            style={{ fontSize: 'clamp(1.3rem, 3.4vw, 1.9rem)' }}
          >
            Kehadiran Anda sudah menjadi hadiah terbaik yang bisa kami minta.
          </h3>

          <p className="mx-auto mt-6 max-w-md text-sm leading-[1.9] text-white/60">
            Namun bila Anda ingin memberi lebih, kami menerimanya dengan tangan
            terbuka dan hati yang penuh terima kasih.
          </p>

          <dl className="mx-auto mt-10 max-w-sm border-t border-white/15">
            {accounts.map((a) => (
              <div
                key={a.bank}
                className="flex items-baseline justify-between gap-4 border-b border-white/15 py-4 text-left"
              >
                <dt className="font-engraved text-xs uppercase tracking-[0.24em] text-white/50">
                  {a.bank}
                </dt>
                <dd className="text-right">
                  <span className="block text-sm tabular-nums tracking-wider text-white">
                    {a.number}
                  </span>
                  <span className="mt-0.5 block text-xs text-white/45">
                    a.n. {a.holder}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-fx className="hidden md:col-span-3 md:block">
          <Photo
            src={detail}
            alt="Potret pengantin perempuan"
            sizes="18rem"
            className="aspect-3/4 w-full"
          />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ closing band */

function ClosingBand() {
  const layer = useRef<HTMLDivElement>(null)
  useParallax(layer, 8)

  return (
    <section className="relative aspect-4/3 w-full overflow-hidden sm:aspect-16/7">
      <div ref={layer} className={parallaxLayer}>
        <Image
          src={closing}
          alt="Kirana dan Dimas tertawa bersama"
          fill
          sizes="100vw"
          className="object-cover grayscale contrast-[1.08]"
          style={{ objectPosition: 'center 20%' }}
        />
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- contact */

const contacts = [
  { name: 'Kirana Maheswari', phone: '0812 3456 7890', email: 'kirana@temukita.id' },
  { name: 'Dimas Prayoga', phone: '0812 3456 7891', email: 'dimas@temukita.id' },
]

function PhoneIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  )
}

function ContactSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 20, stagger: 0.1 })

  return (
    <section ref={root} className="bg-noir px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-12 md:items-center">
        <Heading data-fx tone="light" className="md:col-span-3">
          Get in
          <br />
          Touch
        </Heading>

        <div data-fx className="grid gap-8 sm:grid-cols-2 md:col-span-6">
          {contacts.map((c) => (
            <div key={c.name}>
              <p className="font-engraved text-sm uppercase tracking-[0.18em] text-white">
                {c.name}
              </p>
              <p className="mt-3 flex items-center gap-2.5 text-xs text-white/60">
                <PhoneIcon />
                {c.phone}
              </p>
              <p className="mt-2 flex items-center gap-2.5 text-xs text-white/60">
                <MailIcon />
                {c.email}
              </p>
            </div>
          ))}
        </div>

        <div data-fx className="md:col-span-3 md:text-right">
          <a
            href="#rsvp"
            className="inline-block bg-white px-12 py-4 font-engraved text-[11px] uppercase tracking-[0.32em] text-noir transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            RSVP
          </a>
        </div>
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
    'w-full border border-noir/20 bg-transparent px-4 py-3 text-sm text-noir outline-none transition-colors placeholder:text-noir/35 focus:border-noir'

  return (
    <section id="rsvp" className="scroll-mt-8 bg-paper px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-xl text-center">
        <Label>Konfirmasi kehadiran</Label>
        <Heading className="mt-5">RSVP</Heading>

        {status === 'success' ? (
          <p className="mt-12 border-y border-noir/15 py-10 text-sm leading-[1.9] text-noir/70">
            Terima kasih, konfirmasi Anda sudah kami terima.
            <br />
            Sampai bertemu di hari bahagia kami.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-5 text-left">
            <div>
              <label htmlFor="rsvp4-name" className="font-engraved text-[11px] uppercase tracking-[0.24em] text-noir/60">
                Nama
              </label>
              <input
                id="rsvp4-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap Anda"
                className={`mt-2 ${field}`}
              />
            </div>

            <div>
              <label htmlFor="rsvp4-guests" className="font-engraved text-[11px] uppercase tracking-[0.24em] text-noir/60">
                Jumlah tamu
              </label>
              <input
                id="rsvp4-guests"
                type="number"
                min={1}
                max={5}
                defaultValue={1}
                className={`mt-2 ${field}`}
              />
            </div>

            <fieldset>
              <legend className="font-engraved text-[11px] uppercase tracking-[0.24em] text-noir/60">
                Kehadiran
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {['Hadir', 'Berhalangan'].map((option) => (
                  <label
                    key={option}
                    className="cursor-pointer border border-noir/20 px-4 py-3 text-center text-sm text-noir/70 transition-colors has-checked:border-noir has-checked:bg-noir has-checked:text-white"
                  >
                    <input
                      type="radio"
                      name="rsvp4-attendance"
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
              <label htmlFor="rsvp4-message" className="font-engraved text-[11px] uppercase tracking-[0.24em] text-noir/60">
                Ucapan
              </label>
              <textarea
                id="rsvp4-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan untuk kedua mempelai"
                className={`mt-2 resize-none ${field}`}
              />
            </div>

            {error && <p className="text-xs text-noir/70">{error}</p>}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-2 bg-noir px-8 py-4 font-engraved text-[11px] uppercase tracking-[0.32em] text-white transition-colors hover:bg-noir-soft disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-noir"
            >
              {status === 'submitting' ? 'Mengirim…' : 'Kirim konfirmasi'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------- faq */

const faq = [
  {
    q: 'Jam berapa sebaiknya saya tiba?',
    a: 'Kami menyarankan tiba pukul 10.00 agar sempat duduk tenang sebelum akad dimulai.',
  },
  {
    q: 'Boleh mengajak anak atau pasangan?',
    a: 'Karena acaranya kecil dan intim, kami hanya dapat menerima tamu yang namanya tercantum di undangan. Terima kasih atas pengertiannya.',
  },
  {
    q: 'Di mana saya bisa parkir?',
    a: 'Tersedia parkir berbayar tepat di sebelah venue, serta beberapa slot gratis di sepanjang jalan depan.',
  },
  {
    q: 'Apakah ada aturan busana?',
    a: 'Smart casual dengan nuansa netral. Tidak perlu formal — yang penting Anda nyaman.',
  },
]

function FaqSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.08 })

  return (
    <section ref={root} className="bg-paper px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-12 md:gap-16">
        <Heading data-fx className="md:col-span-5">
          Frequently
          <br />
          Asked
          <br />
          Questions
        </Heading>

        <dl data-fx className="border-t border-noir/15 md:col-span-7">
          {faq.map((item, i) => (
            <div key={item.q} className="flex gap-6 border-b border-noir/15 py-7">
              <span className="font-engraved text-sm tabular-nums tracking-[0.14em] text-noir/40">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <dt className="font-grotesk text-base font-medium tracking-wide text-noir">
                  {item.q}
                </dt>
                <dd className="mt-2.5 text-sm leading-[1.9] text-noir/65">
                  {item.a}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ footer */

function InvitationFooter() {
  return (
    <footer className="bg-noir px-6 py-20 text-center sm:px-10">
      <FloralDivider className="mx-auto h-7 w-44 text-white/25" />
      <p
        className="mt-8 font-engraved uppercase tracking-[0.16em] text-white"
        style={{ fontSize: 'clamp(1.4rem, 5vw, 2.2rem)' }}
      >
        Kirana
        <span className="mx-2 font-serif font-normal italic tracking-normal">&amp;</span>
        Dimas
      </p>
      <p className="mt-4 font-engraved text-[11px] uppercase tracking-[0.32em] text-white/50">
        07 · 11 · 2026
      </p>
      <p className="mt-12 text-[11px] text-white/30">
        Dibuat dengan{' '}
        <Link href="/" className="underline underline-offset-4 hover:text-white/60">
          Temukita
        </Link>
      </p>
    </footer>
  )
}

/* -------------------------------------------------------------------- page */

export function Template4Page() {
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
            <Template4Intro onOpen={() => setOpened(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* clip, not hidden — `overflow: hidden` here would break ScrollTrigger */}
      <div className="overflow-x-clip bg-paper font-grotesk">
        <CoverSection />
        <StorySection />
        <PhotoBand />
        <CeremonySection />
        <ScheduleSection />
        <CountdownSection />
        <GiftSection />
        <ClosingBand />
        <ContactSection />
        <RsvpSection />
        <FaqSection />
        <InvitationFooter />
        <MusicPlayer
          shouldPlay={opened}
          buttonClassName="border border-white/25 bg-noir/90 text-white backdrop-blur-sm hover:bg-white hover:text-noir focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        />
      </div>
    </>
  )
}
