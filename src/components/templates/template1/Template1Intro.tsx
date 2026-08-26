"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cover } from "./assets";
import { CornerSpray, FloralDivider } from "./Florals";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Names wipe up from behind a mask rather than fading in place. */
const wipeUp = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1.1, ease: EASE } },
};

const lineGrow = {
  hidden: { opacity: 0, scaleX: 0 },
  show: { opacity: 1, scaleX: 1, transition: { duration: 0.6, ease: EASE } },
};

interface Template1IntroProps {
  /** Guest name shown in the intro, e.g. from query param or hardcoded */
  guestName?: string;
  onOpen: () => void;
}

export function Template1Intro({ guestName, onOpen }: Template1IntroProps) {
  return (
    <div className="grain grain-dark relative flex h-full min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-ink">
      <Image
        src={cover}
        alt="Cover undangan"
        fill
        className="object-cover object-[center_60%]"
        priority
        sizes="100vw"
      />
      {/* Two-layer scrim: a light base keeps the photo alive at the edges, an
          elliptical vignette darkens exactly where the copy sits. A flat
          overlay had to choose between the two. */}
      <div className="absolute inset-0 bg-ink/50" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(35,33,29,0.86)_0%,rgba(35,33,29,0.8)_48%,rgba(35,33,29,0.18)_100%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-4 border border-ivory/25 sm:inset-7"
        aria-hidden
      />
      <CornerSpray className="pointer-events-none absolute -left-4 -top-4 h-32 w-32 text-ivory/25 sm:h-44 sm:w-44" />
      <CornerSpray className="pointer-events-none absolute -bottom-4 -right-4 h-32 w-32 -scale-100 text-ivory/25 sm:h-44 sm:w-44" />

      <motion.div
        className="relative z-10 flex flex-col items-center px-8 text-center text-ivory"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          className="text-[10px] font-medium uppercase tracking-[0.5em] text-ivory/80"
          variants={fadeUp}
        >
          Undangan Pernikahan
        </motion.p>

        <h1
          className="mt-8 font-display font-normal leading-[0.9]"
          style={{ fontSize: "clamp(2.8rem, 13vw, 6rem)" }}
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" variants={wipeUp}>
              Arinda
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block italic text-sage-soft"
              style={{ fontSize: "0.5em" }}
              variants={wipeUp}
            >
              &amp;
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" variants={wipeUp}>
              Bagas
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="mt-8 text-[11px] uppercase tracking-[0.42em] text-ivory/75"
          variants={fadeUp}
        >
          Sabtu · 14 Juni 2026
        </motion.p>

        {guestName && (
          <motion.div className="mt-8" variants={fadeUp}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">
              Kepada Yth.
            </p>
            <p className="mt-2 font-display text-2xl text-ivory">{guestName}</p>
          </motion.div>
        )}

        <motion.div
          variants={lineGrow}
          aria-hidden
          className="mt-10 origin-center"
        >
          <FloralDivider className="h-6 w-40 text-ivory/55" />
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10">
          <motion.button
            type="button"
            onClick={onOpen}
            className="group inline-flex items-center gap-4 border border-ivory/60 bg-ink/30 px-9 py-4 text-[11px] font-medium uppercase tracking-[0.32em] text-ivory backdrop-blur-[2px] transition-colors hover:bg-ivory hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Buka Undangan
            <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />
          </motion.button>
        </motion.div>

        <motion.p
          className="mt-8 text-[10px] uppercase tracking-[0.28em] text-ivory/55"
          variants={fadeUp}
        >
          ♪ Musik akan diputar saat dibuka
        </motion.p>
      </motion.div>
    </div>
  );
}
