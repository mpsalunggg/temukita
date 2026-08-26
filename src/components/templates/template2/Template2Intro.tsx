"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cover } from "./assets";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.35 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Letters part outward from the centre — nothing like template 1's mask wipe. */
const spread = {
  hidden: { opacity: 0, letterSpacing: "0.6em" },
  show: {
    opacity: 1,
    letterSpacing: "0.16em",
    transition: { duration: 1.3, ease: EASE },
  },
};

const frameIn = {
  hidden: { opacity: 0, scale: 1.06 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE } },
};

interface Template2IntroProps {
  /** Guest name shown in the intro, e.g. from query param or hardcoded */
  guestName?: string;
  onOpen: () => void;
}

export function Template2Intro({ guestName, onOpen }: Template2IntroProps) {
  return (
    <div className="relative flex h-full min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-forest-deep">
      <Image
        src={cover}
        alt="Cover undangan"
        fill
        className="object-cover object-[center_40%] saturate-[0.8] brightness-[0.75] contrast-[1.05]"
        priority
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_72%_82%_at_50%_50%,rgb(9_18_16/0.88)_0%,rgb(9_18_16/0.82)_46%,rgb(15_28_23/0.35)_100%)]"
        aria-hidden
      />

      {/* single thin gold frame — the old double art-deco frame read as busy */}
      <motion.div
        className="pointer-events-none absolute inset-5 border border-gilt/35 sm:inset-9"
        variants={frameIn}
        initial="hidden"
        animate="show"
        aria-hidden
      />

      <motion.div
        className="relative z-10 flex w-full max-w-md flex-col items-center px-8 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          className="font-smallcaps text-[15px] tracking-[0.1em] text-gilt"
          variants={fadeUp}
        >
          Undangan Pernikahan
        </motion.p>

        <motion.h1
          className="mt-10 font-engraved font-normal uppercase leading-[1.25] text-pearl"
          style={{ fontSize: "clamp(1.7rem, 8vw, 3rem)" }}
          variants={spread}
        >
          Raisa
          {/* wider than it looks — the letterSpacing tween eats inline margin */}
          <span className="mx-5 text-blush">&amp;</span>
          Daniel
        </motion.h1>

        <motion.div
          className="mt-10 h-px w-full max-w-[14rem] bg-gilt/40"
          variants={fadeUp}
          aria-hidden
        />

        <motion.p
          className="mt-8 font-smallcaps text-[15px] tracking-[0.06em] text-pearl/75"
          variants={fadeUp}
        >
          Minggu · 20 September 2026
        </motion.p>

        {guestName && (
          <motion.div className="mt-10" variants={fadeUp}>
            <p className="font-smallcaps text-[14px] tracking-[0.08em] text-gilt/70">
              Kepada Yth.
            </p>
            <p className="mt-3 font-engraved uppercase tracking-[0.08em] text-pearl text-lg">
              {guestName}
            </p>
          </motion.div>
        )}

        <motion.div variants={fadeUp} className="mt-12 w-full">
          <motion.button
            type="button"
            onClick={onOpen}
            className="w-full border border-gilt/60 bg-forest-deep/40 py-4 font-smallcaps text-[15px] tracking-[0.08em] text-gilt backdrop-blur-[2px] transition-colors hover:bg-gilt hover:text-forest-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gilt"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
          >
            Buka Undangan
          </motion.button>
        </motion.div>

        <motion.p
          className="mt-8 font-smallcaps text-[14px] tracking-[0.08em] text-pearl-soft/60"
          variants={fadeUp}
        >
          ♪ Musik akan diputar saat dibuka
        </motion.p>
      </motion.div>
    </div>
  );
}
