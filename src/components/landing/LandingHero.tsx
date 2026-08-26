'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Button } from './ui'
import { Wave } from './Wave'

export function LandingHero() {
  const root = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [showVideo, setShowVideo] = useState(false)

  /**
   * The background video is 6.5 MB. Phones get the poster only — it is the same
   * frame, costs ~120 KB, and this is a market that browses on mobile data.
   * Deciding after mount (rather than with a CSS `hidden` class) is what keeps
   * the bytes from being fetched at all.
   */
  useEffect(() => {
    if (reduce) return
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setShowVideo(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [reduce])

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section
      ref={root}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div id="mulai" className="scroll-mt-28" aria-hidden tabIndex={-1} />

      {/* Backdrop: poster always, video only where it is worth its weight. */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y }}
        aria-hidden
      >
        <Image
          src="/images/landing/hero-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {showVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            src="/ring-720.mp4"
            poster="/images/landing/hero-poster.jpg"
            preload="metadata"
            autoPlay
            muted
            loop
            playsInline
            tabIndex={-1}
          />
        )}
      </motion.div>

      {/* overlay + soft accent glow */}
      <div className="absolute inset-0 z-10 bg-black/55" aria-hidden />
      <div
        className="absolute -bottom-32 left-1/2 z-10 h-72 w-[120%] -translate-x-1/2 rounded-[100%] bg-accent/25 blur-3xl"
        aria-hidden
      />

      {/* Content. Extra top padding so the copy clears the fixed navbar. */}
      <div className="relative z-20 mx-auto flex max-w-5xl flex-col items-center px-4 pb-24 pt-28 text-center sm:px-6">
        <p className="text-sm text-white/70">Temukita — undangan digital</p>

        <h1
          id="hero-heading"
          className="mt-4 text-4xl font-bold leading-snug tracking-tight text-white sm:text-5xl sm:leading-snug"
        >
          <span className="block">Undangan digital modern</span>
          <span className="block">
            langsung dari <span className="text-ring">satu tautan</span>
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80">
          Buat undangan digital sendiri, bagikan ke tamu lewat WhatsApp atau
          media sosial, dan pantau konfirmasi kehadiran — tanpa perlu kirim file
          atau cetak kertas.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="#harga" className="shadow-lg shadow-black/30">
            Buat undangan
          </Button>
          <Button href="/templates" variant="glass" className="font-medium">
            Lihat template
          </Button>
        </div>

        <p className="mt-8 text-sm text-white/60">
          Lihat contohnya dulu. Tidak perlu akun.
        </p>
      </div>

      {/* wave transition into the features section */}
      <Wave position="bottom" className="text-surface" layered />
    </section>
  )
}
