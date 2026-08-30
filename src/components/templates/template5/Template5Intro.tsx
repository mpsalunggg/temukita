'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { cover } from './assets'

const EASE = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

type Props = {
  /** Guest name shown in the intro, e.g. from a query param. */
  guestName?: string
  onOpen: () => void
}

export function Template5Intro({ guestName, onOpen }: Props) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-umber font-mono">
      <Image
        src={cover}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center sepia saturate-[1.1] contrast-[1.03]"
      />

      <div className="absolute inset-0 bg-umber/60" aria-hidden />
      <div
        className="absolute inset-0 bg-linear-to-b from-umber/45 via-umber/25 to-umber/75"
        aria-hidden
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center px-8 text-center text-sand"
      >
        <motion.p
          variants={fadeUp}
          className="text-[10px] uppercase tracking-[0.4em] text-sand/60"
        >
          Undangan Pernikahan
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-script leading-[1.15] text-sand"
          style={{ fontSize: 'clamp(2.6rem, 12vw, 5rem)' }}
        >
          Anindya &amp; Rafi
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-[11px] uppercase tracking-[0.34em] text-sand/75"
        >
          25 · 04 · 2027
        </motion.p>

        {guestName && (
          <motion.div variants={fadeUp} className="mt-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-sand/50">
              Kepada Yth.
            </p>
            <p className="mt-2 font-serif text-2xl tracking-wide text-sand">
              {guestName}
            </p>
          </motion.div>
        )}

        <motion.div variants={fadeUp} className="mt-12">
          <button
            type="button"
            onClick={onOpen}
            className="rounded-full border border-sand/60 px-10 py-3.5 text-[10px] uppercase tracking-[0.3em] text-sand transition-colors hover:bg-sand hover:text-umber focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
          >
            Buka Undangan
          </button>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 text-[9px] uppercase tracking-[0.26em] text-sand/40"
        >
          Musik akan diputar saat dibuka
        </motion.p>
      </motion.div>
    </div>
  )
}
