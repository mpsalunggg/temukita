"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cover } from "./assets";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const title = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const lineGrow = {
  hidden: { opacity: 0, scaleX: 0 },
  show: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface Template1IntroProps {
  /** Guest name shown in the intro, e.g. from query param or hardcoded */
  guestName?: string;
  onOpen: () => void;
}

export function Template1Intro({ guestName, onOpen }: Template1IntroProps) {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* background photo */}
      <Image
        src={cover}
        alt="Cover undangan"
        fill
        className="object-cover object-[center_60%]"
        priority
        sizes="100vw"
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      {/* content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 px-8 text-center text-white"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60"
          variants={fadeUp}
        >
          Undangan Pernikahan
        </motion.p>

        <motion.h1
          className="font-light text-white"
          style={{ fontSize: "clamp(2rem, 7vw, 3.5rem)", lineHeight: 1.1 }}
          variants={title}
        >
          Arinda
          <span className="mx-3 text-white/40">&</span>
          Bagas
        </motion.h1>

        <motion.p className="text-sm tracking-widest text-white/50" variants={fadeUp}>
          14 · 06 · 2026
        </motion.p>

        {guestName && (
          <motion.div className="mt-2" variants={fadeUp}>
            <p className="text-xs text-white/40">Kepada Yth.</p>
            <p className="mt-1 text-base font-medium text-white/90">{guestName}</p>
          </motion.div>
        )}

        <motion.div
          className="mt-4 h-px w-12 origin-center bg-white/25"
          variants={lineGrow}
          aria-hidden
        />

        <motion.div variants={fadeUp}>
          <motion.button
            type="button"
            onClick={onOpen}
            className="mt-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-medium tracking-wide text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{
              scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
            }}
          >
            Buka Undangan
          </motion.button>
        </motion.div>

        <motion.p className="mt-2 text-[11px] text-white/30" variants={fadeUp}>
          ♪ Musik akan diputar saat dibuka
        </motion.p>
      </motion.div>
    </div>
  );
}
