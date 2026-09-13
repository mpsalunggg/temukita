'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Khatam, StarDivider } from './Geometry'
import { cover } from './assets'

const EASE = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

const frameIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, ease: EASE } },
}

type Props = {
  /** Guest name shown in the intro, e.g. from a query param. */
  guestName?: string
  onOpen: () => void
}

/**
 * The gate. This is the front cover of the invitation, so it carries the same
 * backdrop and the same type scale as the cover section behind it — a visitor
 * should feel they opened a card, not that they moved to a different site.
 *
 * The star tile that used to sit here is gone: the veiled photograph already
 * supplies the texture, and two textures at once made the screen busy while
 * still reading as empty.
 */
export function Template6Intro({ guestName, onOpen }: Props) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-parchment">
      <Image
        src={cover}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover saturate-[0.7] brightness-[1.05] contrast-[0.97]"
      />
      <div className="absolute inset-0 bg-parchment/72" aria-hidden />

      {/* Hairline inset border — the printed-card cue. It is what makes this
          read as a cover rather than as a landing screen. */}
      <motion.div
        variants={frameIn}
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute inset-5 border border-brass/30 sm:inset-8"
        aria-hidden
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-xl flex-col items-center px-8 text-center"
      >
        <motion.p
          variants={fadeUp}
          dir="rtl"
          lang="ar"
          className="font-arabic leading-[2.1] text-olive"
          style={{ fontSize: 'clamp(1.4rem, 5vw, 1.9rem)' }}
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-10 text-[10px] uppercase tracking-[0.32em] text-olive-soft"
        >
          Walimatul &lsquo;Urs
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-roman leading-[1.15] text-ink-deep"
          style={{ fontSize: 'clamp(1.9rem, 7vw, 3rem)' }}
        >
          <span className="block">Fatimah Az-Zahra</span>
          <span className="my-1 block text-brass">&amp;</span>
          <span className="block">Ahmad Fauzan</span>
        </motion.h1>

        <motion.div variants={fadeUp} className="mt-8 w-full">
          <StarDivider className="mx-auto h-5 w-40 text-brass/70" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 text-[11px] uppercase tracking-[0.24em] text-olive"
        >
          Sabtu &middot; 12 Juni 2027
        </motion.p>

        {guestName && (
          <motion.div variants={fadeUp} className="mt-10">
            <p className="text-[10px] uppercase tracking-[0.32em] text-olive-soft/70">
              Kepada Yth.
            </p>
            <p className="mt-2 font-roman text-xl text-ink-deep">{guestName}</p>
          </motion.div>
        )}

        <motion.div variants={fadeUp} className="mt-12">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-3 border border-olive/40 px-9 py-3.5 text-[10px] uppercase tracking-[0.3em] text-olive transition-colors hover:bg-olive hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive"
          >
            <Khatam className="h-3.5 w-3.5" />
            Buka Undangan
          </button>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 text-[10px] uppercase tracking-[0.32em] text-olive-soft/60"
        >
          Musik akan diputar saat dibuka
        </motion.p>
      </motion.div>
    </div>
  )
}
