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
  useClipReveal,
  useParallax,
  useSmoothScroll,
  useStagger,
} from '../template1/scroll'
import { MusicPlayer } from '../shared/MusicPlayer'
import { Template5Intro } from './Template5Intro'
import {
  bloomBg,
  corridor,
  couple,
  cover,
  flower,
  gal1,
  gal2,
  gal3,
  story,
} from './assets'

/* ------------------------------------------------------------------ shared */

/**
 * Every photo on this page goes through here. The forced sepia grade is what
 * makes nine frames from nine different shoots read as one wedding — bypass it
 * and a single full-colour frame pulls the whole page out of key.
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
    <div className={`relative overflow-hidden bg-sand-deep ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover sepia saturate-[1.1] contrast-[1.03]"
        style={{ objectPosition: position }}
      />
    </div>
  )
}

/** Section heading: widely tracked serif capitals. */
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
      className={`font-serif font-light uppercase leading-[1.15] tracking-[0.18em] ${
        tone === 'light' ? 'text-sand' : 'text-umber'
      } ${className}`}
      style={{ fontSize: 'clamp(1.3rem, 3.2vw, 1.9rem)' }}
    >
      {children}
    </h2>
  )
}

/** Body copy. Monospace with loose tracking is this template's whole voice. */
function Body({
  children,
  tone = 'dark',
  className = '',
  ...rest
}: {
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
} & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...rest}
      className={`text-[11px] leading-[2.1] tracking-[0.06em] ${
        tone === 'light' ? 'text-sand/70' : 'text-umber-soft'
      } ${className}`}
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
    <section className="relative h-screen min-h-[34rem] w-full bg-umber">
      <div ref={frame} className="absolute inset-0 overflow-hidden">
        <div ref={layer} className={parallaxLayer}>
          <Image
            src={cover}
            alt="Bunga lily putih"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center sepia saturate-[1.1] contrast-[1.03]"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-umber/45" aria-hidden />
      <div
        className="absolute inset-0 bg-linear-to-b from-umber/40 via-transparent to-umber/70"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-sand sm:px-10">
        <h1
          className="font-script leading-[1.1]"
          style={{ fontSize: 'clamp(2.8rem, 10vw, 5.5rem)' }}
        >
          Anindya &amp; Rafi
        </h1>

        <p className="mt-4 font-serif text-sm uppercase tracking-[0.34em] text-sand/85 sm:text-base">
          Are Getting Married
        </p>

        {/* Outline, not a filled block — the reference's button is a hairline. */}
        <a
          href="#rsvp"
          className="mt-10 rounded-full border border-sand/60 px-9 py-3 text-[10px] uppercase tracking-[0.3em] transition-colors hover:bg-sand hover:text-umber focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
        >
          RSVP Here
        </a>

        <div className="absolute inset-x-6 bottom-8 flex items-end justify-between gap-6 pr-16 text-[9px] uppercase tracking-[0.24em] text-sand/70 sm:inset-x-10 sm:pr-20">
          <span>25 April 2027, 16.00 WIB</span>
          <span className="text-right">Pendopo Kembang Setaman</span>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- story */

function StorySection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.12 })

  return (
    <section ref={root} className="bg-sand px-6 py-24 sm:px-10 sm:py-32">
      {/* The heading is split so it wraps around the portrait — that pairing is
          the composition, and it collapses to a stack on small screens. */}
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
        <Heading data-fx className="md:w-40 md:text-right">
          Our Love
          <br />
          For Gardens
        </Heading>

        <div data-fx className="w-48 shrink-0 sm:w-56">
          <Photo
            src={story}
            alt="Anindya dan Rafi"
            sizes="14rem"
            className="aspect-3/4 w-full"
          />
        </div>

        <Heading data-fx className="md:w-40">
          (And Each
          <br />
          Other)
        </Heading>
      </div>

      <Body data-fx className="mx-auto mt-14 max-w-lg text-center">
        Kami bertemu di sebuah kebun yang tidak kami rencanakan untuk dikunjungi,
        di sore yang seharusnya kami habiskan di tempat lain. Tujuh tahun
        kemudian, kebun itu masih jadi tempat kami kembali setiap kali ada yang
        perlu dibicarakan. Hari ini kami mengundang Anda ke sana.
      </Body>
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
          src={corridor}
          alt="Anindya dan Rafi di halaman"
          fill
          sizes="100vw"
          className="object-cover sepia saturate-[1.1] contrast-[1.03]"
          style={{ objectPosition: 'center 32%' }}
        />
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- program */

const schedule = [
  ['16.00', 'Tamu tiba & sesi foto'],
  ['17.00', 'Akad nikah'],
  ['18.00', 'Ramah tamah'],
  ['19.00', 'Sambutan & doa'],
  ['20.00', 'Musik & tutup acara'],
]

const reception = [
  {
    title: 'Tempat Resepsi',
    text: 'Resepsi berlangsung di Pendopo Kembang Setaman — ruang terbuka dengan taman di sekelilingnya. Acara di luar ruangan, jadi siapkan diri untuk rumput dan udara sore.',
  },
  {
    title: 'Aturan Busana',
    text: 'Garden party. Bahan yang ringan dan alas kaki yang nyaman — hak tinggi tidak disarankan karena akan tenggelam di rumput. Warna pastel disukai, tapi tidak wajib.',
  },
  {
    title: 'Parkir & Arah',
    text: 'Parkir gratis tersedia di area venue, dengan tempat khusus untuk tamu sepuh. Kalau butuh bantuan atau ingin diantar sampai pintu taman, beri tahu kami.',
  },
]

function ProgramSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.1 })

  return (
    <section ref={root} className="bg-sand px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-4xl gap-14 md:grid-cols-2 md:gap-16">
        <div>
          <Heading data-fx>Program</Heading>
          <dl data-fx className="mt-10 border-t border-umber/20">
            {schedule.map(([time, what]) => (
              <div
                key={time}
                className="flex items-baseline gap-6 border-b border-umber/20 py-3.5"
              >
                <dt className="w-16 shrink-0 text-[11px] tabular-nums tracking-[0.08em] text-umber-soft">
                  {time}
                </dt>
                <dd className="text-[11px] tracking-[0.06em] text-umber">
                  {what}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <Heading data-fx>Reception</Heading>
          <div className="mt-10 flex flex-col gap-7">
            {reception.map((r) => (
              <div key={r.title} data-fx>
                <h3 className="text-[11px] font-medium uppercase tracking-[0.16em] text-umber">
                  {r.title}
                </h3>
                <Body className="mt-2">{r.text}</Body>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- countdown */

const TARGET = new Date('2027-04-25T16:00:00+07:00')

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
    <section className="bg-sand-deep px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[9px] uppercase tracking-[0.34em] text-umber-soft">
          Menuju hari bahagia
        </p>
        <dl className="mt-8 grid grid-cols-4 divide-x divide-umber/20">
          {units.map((u) => (
            <div key={u} className="px-2">
              <dd
                className="font-serif font-light tabular-nums text-umber"
                style={{ fontSize: 'clamp(1.6rem, 6vw, 2.6rem)' }}
              >
                {left === null ? '—' : String(left[u]).padStart(2, '0')}
              </dd>
              <dt className="mt-2 text-[9px] uppercase tracking-[0.28em] text-umber-soft">
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
  useStagger(root, '[data-fx]', { y: 22, stagger: 0.12 })

  return (
    <section ref={root} className="relative overflow-hidden px-6 py-20 sm:px-10 sm:py-28">
      {/* Blurred hard on purpose: the depth in this band comes from the soft
          backdrop behind sharp frames, not from shadows. */}
      <Image
        src={bloomBg}
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        className="object-cover blur-xl sepia saturate-[1.1] scale-110"
      />
      <div className="absolute inset-0 bg-umber/25" aria-hidden />

      <div className="relative z-10 mx-auto grid max-w-4xl grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-8">
        {[
          { src: gal1, alt: 'Anindya membawa buket' },
          { src: gal2, alt: 'Anindya dan Rafi' },
          { src: gal3, alt: 'Potret bersama' },
        ].map((g, i) => (
          <div
            key={g.src}
            data-fx
            className={`border-4 border-sand/85 ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}
          >
            <Photo
              src={g.src}
              alt={g.alt}
              sizes="(min-width: 640px) 18rem, 45vw"
              className="aspect-3/4 w-full"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- gift */

const accounts = [
  { bank: 'BCA', number: '7220 448 917', holder: 'Anindya Larasati' },
  { bank: 'Mandiri', number: '1370 0087 5523', holder: 'Rafi Nugroho' },
]

function GiftSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.12 })

  return (
    <section ref={root} className="bg-sand px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-4xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div data-fx>
          <Photo
            src={flower}
            alt="Setangkai bunga"
            sizes="(min-width: 768px) 24rem, 90vw"
            className="aspect-square w-full"
          />
        </div>

        <div data-fx>
          <h3
            className="font-serif font-light leading-[1.35] tracking-[0.02em] text-umber"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.7rem)' }}
          >
            Kehadiran Anda sudah menjadi hadiah terbaik yang bisa kami minta.
          </h3>

          <Body className="mt-6">
            Tapi kalau Anda merasa terdorong untuk memberi lebih, kami
            menerimanya dengan tangan terbuka dan rasa terima kasih yang tulus.
          </Body>

          <dl className="mt-8 border-t border-umber/20">
            {accounts.map((a) => (
              <div
                key={a.bank}
                className="flex items-baseline justify-between gap-4 border-b border-umber/20 py-3.5"
              >
                <dt className="text-[10px] uppercase tracking-[0.2em] text-umber-soft">
                  {a.bank}
                </dt>
                <dd className="text-right">
                  <span className="block text-[11px] tabular-nums tracking-[0.1em] text-umber">
                    {a.number}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-umber-soft">
                    a.n. {a.holder}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
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
    'w-full border-b border-umber/30 bg-transparent py-2.5 text-[11px] tracking-[0.06em] text-umber outline-none transition-colors placeholder:text-umber-soft/60 focus:border-umber'
  const label =
    'text-[9px] uppercase tracking-[0.26em] text-umber-soft'

  return (
    <section id="rsvp" className="scroll-mt-8 bg-sand px-6 pb-28 sm:px-10">
      <div className="mx-auto max-w-md text-center">
        <Heading>RSVP</Heading>

        {status === 'success' ? (
          <Body className="mt-10 border-y border-umber/20 py-10">
            Terima kasih, konfirmasi Anda sudah kami terima.
            <br />
            Sampai bertemu di taman.
          </Body>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-7 text-left">
            <div>
              <label htmlFor="rsvp5-name" className={label}>
                Nama
              </label>
              <input
                id="rsvp5-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap Anda"
                className={`mt-1 ${field}`}
              />
            </div>

            <div>
              <label htmlFor="rsvp5-guests" className={label}>
                Jumlah tamu
              </label>
              <input
                id="rsvp5-guests"
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
                    className="cursor-pointer rounded-full border border-umber/30 py-2.5 text-center text-[10px] uppercase tracking-[0.2em] text-umber-soft transition-colors has-checked:border-umber has-checked:bg-umber has-checked:text-sand"
                  >
                    <input
                      type="radio"
                      name="rsvp5-attendance"
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
              <label htmlFor="rsvp5-message" className={label}>
                Ucapan
              </label>
              <textarea
                id="rsvp5-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan untuk kedua mempelai"
                className={`mt-1 resize-none ${field}`}
              />
            </div>

            {error && (
              <p className="text-[10px] tracking-[0.06em] text-umber">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-2 rounded-full bg-umber px-8 py-3.5 text-[10px] uppercase tracking-[0.3em] text-sand transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-umber"
            >
              {status === 'submitting' ? 'Mengirim…' : 'Kirim konfirmasi'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- contact */

const contacts = [
  '(0812) 3456-7890',
  'halo@anindyarafi.id',
  '@anindyarafi',
]

function ContactSection() {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.1 })

  return (
    <section ref={root} className="bg-umber px-6 py-20 text-center sm:px-10 sm:py-24">
      <h2
        data-fx
        className="font-script leading-[1.15] text-sand"
        style={{ fontSize: 'clamp(2.2rem, 8vw, 3.6rem)' }}
      >
        Contact Us
      </h2>

      <div data-fx className="mx-auto mt-12 w-full max-w-sm">
        <Photo
          src={couple}
          alt="Anindya dan Rafi"
          sizes="24rem"
          className="aspect-4/3 w-full"
          position="center 30%"
        />
      </div>

      <ul
        data-fx
        className="mx-auto mt-12 flex max-w-2xl flex-col items-center justify-between gap-4 text-[10px] uppercase tracking-[0.22em] text-sand/70 sm:flex-row"
      >
        {contacts.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ footer */

function InvitationFooter() {
  return (
    <footer className="bg-umber px-6 pb-16 text-center">
      <p className="text-[9px] uppercase tracking-[0.3em] text-sand/40">
        25 · 04 · 2027
      </p>
      <p className="mt-8 text-[10px] text-sand/30">
        Dibuat dengan{' '}
        <Link href="/" className="underline underline-offset-4 hover:text-sand/60">
          Temukita
        </Link>
      </p>
    </footer>
  )
}

/* -------------------------------------------------------------------- page */

export function Template5Page() {
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
            <Template5Intro onOpen={() => setOpened(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* clip, not hidden — `overflow: hidden` here would break ScrollTrigger */}
      <div className="overflow-x-clip bg-sand font-mono">
        <CoverSection />
        <StorySection />
        <PhotoBand />
        <ProgramSection />
        <CountdownSection />
        <GallerySection />
        <GiftSection />
        <RsvpSection />
        <ContactSection />
        <InvitationFooter />
        <MusicPlayer
          shouldPlay={opened}
          buttonClassName="rounded-full border border-sand/30 bg-umber/90 text-sand backdrop-blur-sm hover:bg-sand hover:text-umber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
        />
      </div>
    </>
  )
}
