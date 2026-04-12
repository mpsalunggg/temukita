'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { cover, detail1, detail2, gallery, hero2 } from './assets'
import { Template1Intro } from './Template1Intro'
import { Template1MusicPlayer } from './Template1MusicPlayer'

const sectionReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
}

/* ─── Typography helpers ─────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
      {children}
    </p>
  )
}

function Divider() {
  return <div className="mx-auto my-10 h-px w-16 bg-stone-200" />
}

/* ─── 1. Cover ───────────────────────────────────────────── */

function CoverSection() {
  return (
    <motion.section
      className="relative flex min-h-screen flex-col items-center justify-end overflow-hidden bg-stone-900"
      {...sectionReveal}
    >
      <Image
        src={cover}
        alt="Arinda dan Bagas"
        fill
        className="object-cover object-[center_75%]"
        priority
        sizes="100vw"
      />
      {/* gradient overlay — dark at bottom for legibility */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      {/* text */}
      <div className="relative z-10 w-full px-6 pb-20 text-center text-white">
        <Label>Undangan pernikahan</Label>
        <h1
          className="mt-4 font-light"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 1.1 }}
        >
          Arinda
          <span className="mx-4 text-white/50">&</span>
          Bagas
        </h1>
        <p className="mt-4 text-sm tracking-widest text-white/60">
          14 · 06 · 2026
        </p>

        {/* scroll cue */}
        <div className="mt-12 flex justify-center">
          <svg
            className="h-6 w-6 animate-bounce text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </motion.section>
  )
}

/* ─── 2. Quote ───────────────────────────────────────────── */

function QuoteSection() {
  return (
    <motion.section
      className="bg-white px-6 py-24 text-center"
      {...sectionReveal}
    >
      <p
        className="mx-auto max-w-xl font-light leading-relaxed text-stone-500"
        style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
      >
        &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
        untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung
        dan merasa tenteram kepadanya.&rdquo;
      </p>
      <p className="mt-5 text-xs tracking-widest text-stone-300">
        QS. Ar-Rum: 21
      </p>
    </motion.section>
  )
}

/* ─── 3. Event detail ────────────────────────────────────── */

function EventSection() {
  const events = [
    {
      label: 'Akad Nikah',
      day: 'Sabtu',
      date: '14 Juni 2026',
      time: '08.00 — 10.00 WIB',
      place: 'Masjid Al-Ikhlas',
      address: 'Jl. Raya Kebayoran, Jakarta Selatan',
      image: detail1,
    },
    {
      label: 'Resepsi',
      day: 'Sabtu',
      date: '14 Juni 2026',
      time: '11.00 — 14.00 WIB',
      place: 'The Kana Bali',
      address: 'Jl. Pantai Berawa, Canggu, Bali',
      image: detail2,
    },
  ]

  return (
    <motion.section className="bg-stone-50 px-6 py-24" {...sectionReveal}>
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <Label>Detail acara</Label>
          <h2 className="mt-3 text-2xl font-light text-stone-700">
            Kami mengundang Anda hadir
          </h2>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {events.map((ev) => (
            <div
              key={ev.label}
              className="overflow-hidden rounded-3xl bg-white shadow-sm shadow-stone-100"
            >
              {/* event image */}
              <div className="relative h-56 w-full">
                <Image
                  src={ev.image}
                  alt={ev.label}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-widest text-white">
                  {ev.label}
                </span>
              </div>

              {/* event info */}
              <div className="px-6 py-7">
                <p className="text-xl font-medium text-stone-800">{ev.place}</p>
                <p className="mt-1 text-sm text-stone-400">{ev.address}</p>
                <div className="mt-5 space-y-1 text-sm text-stone-500">
                  <p>
                    {ev.day}, {ev.date}
                  </p>
                  <p>{ev.time}</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-9 items-center gap-1.5 rounded-full border border-stone-200 px-4 text-xs font-medium text-stone-500 transition-colors hover:border-stone-400 hover:text-stone-700"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  Buka di Maps
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

/* ─── 4. Bento gallery ───────────────────────────────────── */

function GallerySection() {
  // Assign bento grid roles: first image large, rest small
  const [feature, ...rest] = gallery

  return (
    <motion.section className="bg-white px-6 py-24" {...sectionReveal}>
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Label>Momen kami</Label>
          <h2 className="mt-3 text-2xl font-light text-stone-700">
            Sekilas perjalanan kami
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {/* large feature tile — spans 2 cols & 2 rows */}
          <div
            className="relative col-span-2 row-span-2 overflow-hidden rounded-3xl"
            style={{ aspectRatio: '1/1' }}
          >
            <Image
              src={feature}
              alt="Foto utama galeri"
              fill
              className="object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* side small tiles */}
          {rest.map((src, i) => (
            <div
              key={src}
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '1/1' }}
            >
              <Image
                src={src}
                alt={`Galeri foto ${i + 2}`}
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-[1.05]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        {/* hero2 as full-width accent strip below bento */}
        <div className="relative mt-3 h-64 w-full overflow-hidden rounded-3xl md:h-96">
          <Image
            src={hero2}
            alt="Foto pasangan"
            fill
            className="object-cover object-[50%_30%] transition-transform duration-500 hover:scale-[1.02]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
        </div>
      </div>
    </motion.section>
  )
}

/* ─── 5. Countdown strip ─────────────────────────────────── */

function CountdownStrip() {
  const units = [
    { value: '47', label: 'Hari' },
    { value: '12', label: 'Jam' },
    { value: '30', label: 'Menit' },
    { value: '00', label: 'Detik' },
  ]

  return (
    <motion.section
      className="bg-stone-900 px-6 py-16 text-center"
      {...sectionReveal}
    >
      <Label>
        <span className="text-stone-500">Menuju hari bahagia</span>
      </Label>
      <div className="mt-8 flex items-center justify-center gap-6 sm:gap-10">
        {units.map((u, i) => (
          <div key={u.label}>
            <p className="text-4xl font-light text-white sm:text-5xl">
              {u.value}
            </p>
            <p className="mt-1 text-xs tracking-widest text-stone-500">
              {u.label}
            </p>
            {i < units.length - 1 && <span className="sr-only">:</span>}
          </div>
        ))}
      </div>
    </motion.section>
  )
}

/* ─── 6. RSVP ────────────────────────────────────────────── */

function RsvpSection() {
  return (
    <motion.section className="bg-stone-50 px-6 py-24" {...sectionReveal}>
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <Label>Konfirmasi kehadiran</Label>
          <h2 className="mt-3 text-2xl font-light text-stone-700">
            Apakah Anda hadir?
          </h2>
          <p className="mt-2 text-sm text-stone-400">
            Mohon konfirmasi kehadiran Anda sebelum 1 Juni 2026.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-100 bg-white p-8 shadow-sm shadow-stone-100">
          <div className="space-y-5">
            <div>
              <label
                className="block text-xs font-medium tracking-wide text-stone-500"
                htmlFor="rsvp-name"
              >
                Nama lengkap
              </label>
              <input
                id="rsvp-name"
                type="text"
                placeholder="Masukkan nama Anda"
                className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700 outline-none placeholder:text-stone-300 focus:border-stone-400 focus:bg-white"
              />
            </div>

            <div>
              <label
                className="block text-xs font-medium tracking-wide text-stone-500"
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
                className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700 outline-none placeholder:text-stone-300 focus:border-stone-400 focus:bg-white"
              />
            </div>

            <div>
              <p className="text-xs font-medium tracking-wide text-stone-500">
                Konfirmasi
              </p>
              <div className="mt-3 flex gap-3">
                {['Hadir', 'Tidak hadir', 'Belum pasti'].map((opt) => (
                  <label
                    key={opt}
                    className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-stone-200 py-2.5 text-xs font-medium text-stone-500 transition-colors has-checked:border-stone-800 has-checked:bg-stone-800 has-checked:text-white"
                  >
                    <input
                      type="radio"
                      name="rsvp-confirm"
                      value={opt}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                className="block text-xs font-medium tracking-wide text-stone-500"
                htmlFor="rsvp-message"
              >
                Ucapan &amp; doa (opsional)
              </label>
              <textarea
                id="rsvp-message"
                rows={3}
                placeholder="Tulis ucapan untuk pasangan..."
                className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700 outline-none placeholder:text-stone-300 focus:border-stone-400 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-full bg-stone-800 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-900"
          >
            Kirim konfirmasi
          </button>
        </div>
      </div>
    </motion.section>
  )
}

/* ─── 7. Footer ──────────────────────────────────────────── */

function InvitationFooter() {
  return (
    <motion.footer
      className="bg-stone-900 px-6 py-16 text-center"
      {...sectionReveal}
    >
      <p
        className="font-light text-stone-200"
        style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
      >
        Arinda &amp; Bagas
      </p>
      <p className="mt-2 text-xs tracking-widest text-stone-500">
        14 · 06 · 2026
      </p>
      <Divider />
      <p className="text-xs text-stone-600">
        Dibuat dengan{' '}
        <Link
          href="/"
          className="text-stone-400 underline underline-offset-2 hover:text-stone-300"
        >
          Temukita
        </Link>{' '}
        · {new Date().getFullYear()}
      </p>
    </motion.footer>
  )
}

/* ─── Page composition ───────────────────────────────────── */

export function Template1Page() {
  const [opened, setOpened] = useState(false)

  // Lock / unlock body scroll while the intro overlay is visible
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  const handleOpen = () => setOpened(true)

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
            <Template1Intro onOpen={handleOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-hidden">
        <CoverSection />
        <QuoteSection />
        <EventSection />
        <GallerySection />
        <CountdownStrip />
        <RsvpSection />
        <InvitationFooter />
        <Template1MusicPlayer shouldPlay={opened} />
      </div>
    </>
  )
}
