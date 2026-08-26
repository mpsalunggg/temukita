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

interface Template3IntroProps {
  /** Guest name shown in the intro, e.g. from query param or hardcoded */
  guestName?: string;
  onOpen: () => void;
}

export function Template3Intro({ guestName, onOpen }: Template3IntroProps) {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#fdf2f0]">
      {/* organic blurred blobs */}
      <div
        className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#f6d2c6] blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-[#cfd9c2] blur-3xl"
        aria-hidden
      />

      {/* framed photo */}
      <motion.div
        className="relative z-10 h-56 w-44 overflow-hidden rounded-[2.5rem] border-4 border-white shadow-xl shadow-[#c4674e]/20 sm:h-64 sm:w-52"
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={cover}
          alt="Cover undangan"
          fill
          className="object-cover object-[center_60%]"
          priority
          sizes="(max-width: 640px) 50vw, 13rem"
        />
      </motion.div>

      {/* content */}
      <motion.div
        className="relative z-10 mt-8 flex flex-col items-center gap-5 px-8 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4674e]"
          variants={fadeUp}
        >
          Undangan Pernikahan
        </motion.p>

        <motion.h1
          className="font-light text-[#7a4a3c]"
          style={{ fontSize: "clamp(2rem, 7vw, 3.5rem)", lineHeight: 1.1 }}
          variants={title}
        >
          Mawar
          <span className="mx-3 text-[#c4674e]/60">&</span>
          Bima
        </motion.h1>

        <motion.p
          className="text-sm tracking-[0.3em] text-[#9c8478]"
          variants={fadeUp}
        >
          12 · 10 · 2026
        </motion.p>

        {guestName && (
          <motion.div className="mt-2" variants={fadeUp}>
            <p className="text-xs text-[#a78c7e]">Kepada Yth.</p>
            <p className="mt-1 text-base font-medium text-[#7a4a3c]">
              {guestName}
            </p>
          </motion.div>
        )}

        <motion.div
          className="mt-2 h-px w-12 origin-center bg-[#c4674e]/30"
          variants={lineGrow}
          aria-hidden
        />

        <motion.div variants={fadeUp}>
          <motion.button
            type="button"
            onClick={onOpen}
            className="mt-1 rounded-full bg-[#c4674e] px-9 py-3 text-sm font-medium tracking-wide text-white shadow-lg shadow-[#c4674e]/30 transition hover:bg-[#b8543f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4674e]"
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

        <motion.p className="mt-1 text-[11px] text-[#a78c7e]" variants={fadeUp}>
          ♪ Musik akan diputar saat dibuka
        </motion.p>
      </motion.div>
    </div>
  );
}
