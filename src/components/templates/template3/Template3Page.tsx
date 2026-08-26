'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { cover, detail1, detail2, gallery, hero2 } from './assets'
import { Template3Intro } from './Template3Intro'
import { Template3MusicPlayer } from './Template3MusicPlayer'

const sectionReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
}

/* ─── Typography & decorative helpers ────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c4674e]">
      {children}
    </p>
  )
}

/* Hand-drawn-feel leaf / sprig line accent */
function Leaf({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M2 16h60" />
      <path d="M14 16c4-7 10-9 16-9-2 6-7 9-16 9Z" />
      <path d="M50 16c-4-7-10-9-16-9 2 6 7 9 16 9Z" />
      <path d="M14 16c4 7 10 9 16 9-2-6-7-9-16-9Z" />
      <path d="M50 16c-4 7-10 9-16 9 2-6 7-9 16-9Z" />
    </svg>
  )
}

/* Single small floral sprig */
function Sprig({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 46V8" />
      <path d="M20 30c-7 0-12-4-13-11 7 0 12 4 13 11Z" />
      <path d="M20 22c7 0 12-4 13-11-7 0-12 4-13 11Z" />
      <circle cx="20" cy="6" r="4" />
    </svg>
  )
}

/* ─── 1. Cover / Hero — asymmetric ───────────────────────── */

function CoverSection() {
  return (
    <motion.section
      className="relative flex min-h-screen items-center overflow-hidden bg-[#fbf7f1] px-6 py-20"
      {...sectionReveal}
    >
      {/* organic blobs */}
      <div
        className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#f6d2c6]/70 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#cfd9c2]/60 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-2">
        {/* text — left, off-center */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <Label>Undangan pernikahan</Label>
          <h1
            className="mt-5 font-light text-[#7a4a3c]"
            style={{ fontSize: 'clamp(2.75rem, 8vw, 5.5rem)', lineHeight: 1.05 }}
          >
            Mawar
            <span className="block text-[#c4674e]/50">&amp;</span>
            Bima
          </h1>
          <div className="mt-6 flex justify-center text-[#7a8b6f] md:justify-start">
            <Leaf className="h-6 w-20" />
          </div>
          <p className="mt-6 text-sm tracking-[0.3em] text-[#9c8478]">
            12 · 10 · 2026
          </p>
          <p className="mt-2 text-sm text-[#a78c7e]">
            Plataran Cilandak, Jakarta
          </p>
        </div>

        {/* photo — right, large rounded organic */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2.5rem] border-4 border-white shadow-xl shadow-[#c4674e]/20 md:rotate-2">
            <Image
              src={cover}
              alt="Mawar dan Bima"
              fill
              className="object-cover object-[center_70%]"
              priority
              sizes="(max-width: 768px) 100vw, 24rem"
            />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 justify-center">
        <svg
          className="h-6 w-6 animate-bounce text-[#c4674e]/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </motion.section>
  )
}

/* ─── 2. Quote ───────────────────────────────────────────── */

function QuoteSection() {
  return (
    <motion.section
      className="relative overflow-hidden bg-[#fbf7f1] px-6 py-28 text-center"
      {...sectionReveal}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <Leaf className="h-7 w-24 text-[#7a8b6f]" />
        <p
          className="mt-8 font-light leading-relaxed text-[#7a4a3c]"
          style={{ fontSize: 'clamp(1.05rem, 2.6vw, 1.4rem)' }}
        >
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
          untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung
          dan merasa tenteram kepadanya.&rdquo;
        </p>
        <p className="mt-6 text-xs tracking-[0.3em] text-[#c4674e]">
          QS. Ar-Rum: 21
        </p>
      </div>
    </motion.section>
  )
}

/* ─── 3. Event detail — overlapping warm cards ───────────── */

function EventSection() {
  const events = [
    {
      label: 'Akad Nikah',
      day: 'Senin',
      date: '12 Oktober 2026',
      time: '08.00 — 10.00 WIB',
      place: 'Plataran Cilandak',
      address: 'Jl. RA. Kartini, Cilandak, Jakarta Selatan',
      image: detail1,
    },
    {
      label: 'Resepsi',
      day: 'Senin',
      date: '12 Oktober 2026',
      time: '11.00 — 14.00 WIB',
      place: 'Plataran Cilandak',
      address: 'Jl. RA. Kartini, Cilandak, Jakarta Selatan',
      image: detail2,
    },
  ]

  return (
    <motion.section
      className="relative overflow-hidden bg-[#fdf2f0] px-6 py-28"
      {...sectionReveal}
    >
      <div
        className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#cfd9c2]/50 blur-3xl"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="text-center">
          <Label>Detail acara</Label>
          <h2 className="mt-3 text-3xl font-light text-[#7a4a3c]">
            Kami mengundang Anda hadir
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {events.map((ev, i) => (
            <div
              key={ev.label}
              className={`overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-[#c4674e]/10 ${
                i === 1 ? 'md:mt-12' : ''
              }`}
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
                <div className="absolute inset-0 bg-linear-to-t from-[#7a4a3c]/50 to-transparent" />
                <span className="absolute bottom-4 left-6 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#c4674e]">
                  {ev.label}
                </span>
              </div>

              {/* event info */}
              <div className="px-7 py-8">
                <div className="flex items-center gap-2 text-[#7a8b6f]">
                  <Sprig className="h-7 w-5" />
                  <p className="text-xl font-medium text-[#7a4a3c]">
                    {ev.place}
                  </p>
                </div>
                <p className="mt-1 pl-7 text-sm text-[#a78c7e]">{ev.address}</p>
                <div className="mt-5 space-y-1 text-sm text-[#9c8478]">
                  <p>
                    {ev.day}, {ev.date}
                  </p>
                  <p>{ev.time}</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-10 items-center gap-1.5 rounded-full bg-[#c4674e] px-5 text-xs font-medium text-white transition-colors hover:bg-[#b8543f]"
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

/* ─── 4. Staggered / masonry gallery ─────────────────────── */

function GallerySection() {
  // Varying tile heights for an organic masonry feel
  const heights = [
    'h-72',
    'h-56',
    'h-64',
    'h-56',
    'h-72',
    'h-60',
    'h-56',
    'h-72',
    'h-60',
  ]

  return (
    <motion.section
      className="relative overflow-hidden bg-[#fbf7f1] px-6 py-28"
      {...sectionReveal}
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Label>Momen kami</Label>
          <h2 className="mt-3 text-3xl font-light text-[#7a4a3c]">
            Sekilas perjalanan kami
          </h2>
          <div className="mt-5 flex justify-center text-[#7a8b6f]">
            <Leaf className="h-6 w-20" />
          </div>
        </div>

        {/* masonry via CSS columns — varying heights stagger naturally */}
        <div className="mt-14 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {gallery.map((src, i) => (
            <div
              key={src}
              className={`relative w-full overflow-hidden rounded-[1.75rem] ${heights[i % heights.length]}`}
            >
              <Image
                src={src}
                alt={`Galeri foto ${i + 1}`}
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-[1.05]"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* hero2 as full-width organic accent strip */}
        <div className="relative mt-4 h-72 w-full overflow-hidden rounded-[2.5rem] md:h-96">
          <Image
            src={hero2}
            alt="Foto pasangan"
            fill
            className="object-cover object-[50%_30%] transition-transform duration-500 hover:scale-[1.02]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#7a4a3c]/30 to-transparent" />
        </div>
      </div>
    </motion.section>
  )
}

/* ─── 5. Countdown strip ─────────────────────────────────── */

function CountdownStrip() {
  const units = [
    { value: '109', label: 'Hari' },
    { value: '08', label: 'Jam' },
    { value: '45', label: 'Menit' },
    { value: '10', label: 'Detik' },
  ]

  return (
    <motion.section
      className="relative overflow-hidden bg-[#c4674e] px-6 py-20 text-center"
      {...sectionReveal}
    >
      <div
        className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-16 -right-12 h-56 w-56 rounded-full bg-[#7a8b6f]/30 blur-2xl"
        aria-hidden
      />
      <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
        Menuju hari bahagia
      </p>
      <div className="relative z-10 mt-9 flex items-center justify-center gap-3 sm:gap-5">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-3 sm:gap-5">
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-[1.5rem] bg-[#fbf7f1] sm:h-24 sm:w-24">
              <p className="text-3xl font-light text-[#b8543f] sm:text-4xl">
                {u.value}
              </p>
              <p className="mt-0.5 text-[11px] tracking-widest text-[#9c8478]">
                {u.label}
              </p>
            </div>
            {i < units.length - 1 && (
              <span className="text-2xl font-light text-white/40" aria-hidden>
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  )
}

/* ─── 6. RSVP ────────────────────────────────────────────── */

function RsvpSection() {
  return (
    <motion.section
      className="relative overflow-hidden bg-[#fdf2f0] px-6 py-28"
      {...sectionReveal}
    >
      <div
        className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-[#cfd9c2]/50 blur-3xl"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-md">
        <div className="text-center">
          <Label>Konfirmasi kehadiran</Label>
          <h2 className="mt-3 text-3xl font-light text-[#7a4a3c]">
            Apakah Anda hadir?
          </h2>
          <p className="mt-2 text-sm text-[#a78c7e]">
            Mohon konfirmasi kehadiran Anda sebelum 1 Oktober 2026.
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-lg shadow-[#c4674e]/10">
          <div className="space-y-5">
            <div>
              <label
                className="block text-xs font-medium tracking-wide text-[#9c8478]"
                htmlFor="rsvp-name"
              >
                Nama lengkap
              </label>
              <input
                id="rsvp-name"
                type="text"
                placeholder="Masukkan nama Anda"
                className="mt-2 w-full rounded-2xl border border-[#eed8cf] bg-[#fbf7f1] px-4 py-3 text-sm text-[#7a4a3c] outline-none placeholder:text-[#c9b3a8] focus:border-[#c4674e] focus:bg-white"
              />
            </div>

            <div>
              <label
                className="block text-xs font-medium tracking-wide text-[#9c8478]"
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
                className="mt-2 w-full rounded-2xl border border-[#eed8cf] bg-[#fbf7f1] px-4 py-3 text-sm text-[#7a4a3c] outline-none placeholder:text-[#c9b3a8] focus:border-[#c4674e] focus:bg-white"
              />
            </div>

            <div>
              <p className="text-xs font-medium tracking-wide text-[#9c8478]">
                Konfirmasi
              </p>
              <div className="mt-3 flex gap-2">
                {['Hadir', 'Tidak hadir', 'Belum pasti'].map((opt) => (
                  <label
                    key={opt}
                    className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl border border-[#eed8cf] py-2.5 text-xs font-medium text-[#9c8478] transition-colors has-checked:border-[#c4674e] has-checked:bg-[#c4674e] has-checked:text-white"
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
                className="block text-xs font-medium tracking-wide text-[#9c8478]"
                htmlFor="rsvp-message"
              >
                Ucapan &amp; doa (opsional)
              </label>
              <textarea
                id="rsvp-message"
                rows={3}
                placeholder="Tulis ucapan untuk pasangan..."
                className="mt-2 w-full resize-none rounded-2xl border border-[#eed8cf] bg-[#fbf7f1] px-4 py-3 text-sm text-[#7a4a3c] outline-none placeholder:text-[#c9b3a8] focus:border-[#c4674e] focus:bg-white"
              />
            </div>
          </div>

          <button
            type="button"
            className="mt-7 w-full rounded-full bg-[#c4674e] py-3 text-sm font-semibold text-white shadow-lg shadow-[#c4674e]/30 transition-colors hover:bg-[#b8543f]"
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
      className="relative overflow-hidden bg-[#fbf7f1] px-6 py-20 text-center"
      {...sectionReveal}
    >
      <div className="flex justify-center text-[#7a8b6f]">
        <Sprig className="h-12 w-9" />
      </div>
      <p
        className="mt-4 font-light text-[#7a4a3c]"
        style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)' }}
      >
        Mawar &amp; Bima
      </p>
      <p className="mt-2 text-xs tracking-[0.3em] text-[#9c8478]">
        12 · 10 · 2026
      </p>
      <div className="mx-auto my-9 h-px w-16 bg-[#e8cfc6]" />
      <p className="text-xs text-[#a78c7e]">
        Dibuat dengan{' '}
        <Link
          href="/"
          className="text-[#c4674e] underline underline-offset-2 hover:text-[#b8543f]"
        >
          Temukita
        </Link>{' '}
        · {new Date().getFullYear()}
      </p>
    </motion.footer>
  )
}

/* ─── Page composition ───────────────────────────────────── */

export function Template3Page() {
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
            <Template3Intro onOpen={handleOpen} />
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
        <Template3MusicPlayer shouldPlay={opened} />
      </div>
    </>
  )
}
