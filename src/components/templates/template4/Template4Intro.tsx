'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { cover } from './assets'

const EASE = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

const ruleGrow = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: EASE } },
}

type Props = {
  /** Guest name shown in the intro, e.g. from a query param. */
  guestName?: string
  onOpen: () => void
}

export function Template4Intro({ guestName, onOpen }: Props) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-noir font-grotesk">
      <Image
        src={cover}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center grayscale contrast-[1.08]"
      />

      {/* Two layers: a flat scrim keeps the photo alive at the edges, the
          gradient darkens the middle where the type sits. */}
      <div className="absolute inset-0 bg-noir/55" aria-hidden />
      <div
        className="absolute inset-0 bg-linear-to-b from-noir/40 via-noir/70 to-noir/85"
        aria-hidden
      />

      {/* Hairline frame — the printed-card cue, squared off. */}
      <div
        className="pointer-events-none absolute inset-5 border border-white/20 sm:inset-8"
        aria-hidden
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center px-8 text-center text-white"
      >
        <motion.p
          variants={fadeUp}
          className="font-engraved text-[11px] uppercase tracking-[0.42em] text-white/70"
        >
          Undangan Pernikahan
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-7 font-engraved uppercase leading-[0.95] tracking-[0.14em]"
          style={{ fontSize: 'clamp(2.4rem, 11vw, 4.6rem)' }}
        >
          Kirana
          <span className="mx-3 font-serif font-normal italic tracking-normal">&amp;</span>
          Dimas
        </motion.h1>

        <motion.span
          variants={ruleGrow}
          className="mt-8 block h-px w-24 origin-center bg-white/40"
          aria-hidden
        />

        <motion.p
          variants={fadeUp}
          className="mt-8 font-engraved text-sm uppercase tracking-[0.3em] text-white/80"
        >
          07 · 11 · 2026
        </motion.p>

        {guestName && (
          <motion.div variants={fadeUp} className="mt-10">
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/50">
              Kepada Yth.
            </p>
            <p className="mt-2 font-grotesk text-xl tracking-wide text-white">
              {guestName}
            </p>
          </motion.div>
        )}

        <motion.div variants={fadeUp} className="mt-12">
          <button
            type="button"
            onClick={onOpen}
            className="border border-white/70 px-10 py-4 font-engraved text-[11px] uppercase tracking-[0.32em] text-white transition-colors hover:bg-white hover:text-noir focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Buka Undangan
          </button>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 text-[10px] uppercase tracking-[0.28em] text-white/40"
        >
          Musik akan diputar saat dibuka
        </motion.p>
      </motion.div>
    </div>
  )
}
