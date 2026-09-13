'use client'

import Image from 'next/image'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'motion/react'
import { Art } from './Art'
import { SIZE, baby, cloud, daisy, daisySm, heart, heartSm, star } from './assets'
import type { AkikahContent } from './content'
import { BabyName, Divider, Eyebrow, Label, PillButton } from './ui'

/**
 * The cover. Tapping it reveals the invitation.
 *
 * Three things here are answers to bugs, and all three are easy to undo by
 * accident:
 *
 * 1. The background is a wash, not a flat fill. `--petal-pale` is 4% off white,
 *    so a flat screen of it genuinely reads as "no background".
 * 2. The ornament layer is `fixed`, not `absolute`. The content column grows
 *    with a long guest name, and an `absolute inset-0` layer would grow with it
 *    — pushing the corner ornaments off-screen exactly when the screen is
 *    fullest.
 * 3. Scrolling belongs to the parent. `Template7Page` gives the overlay
 *    `overflow-y-auto`; this root only sets `min-h-full`. Putting both on one
 *    box does nothing: a box with `height: auto` grows to its content, the
 *    overflow condition never fires, and the button ends up rendered below the
 *    fold with no way to reach it.
 *
 *    Centring is `my-auto` on the column, NOT `items-center` on the flex row.
 *    `align-items: center` overflows a too-tall item equally in both
 *    directions, and the half that goes past the start edge cannot be scrolled
 *    back to — auto margins centre when there is room and collapse when there
 *    is not.
 *
 * No foliage. The eucalyptus and bouquet artwork is the only olive in a pink
 * palette, and this template is now pinky-white throughout.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

function GuestBlock({ name }: { name: string }) {
  return (
    <div className="mt-8">
      <Label>Kepada Yth.</Label>
      <p className="mt-2 font-book text-section text-plum">{name}</p>
    </div>
  )
}

/**
 * Reads `?to=` and nothing else.
 *
 * Separate so the `<Suspense>` boundary around it can be as small as possible.
 * `useSearchParams` forces everything up to the nearest boundary to be
 * client-rendered, and with no boundary a production build of a prerendered
 * route fails outright — so drawing the line here is what keeps `/template7`
 * static and keeps the cover in the prerendered HTML.
 *
 * The cleanup is about layout, not injection: React escapes the value already,
 * but a guest list will eventually hold a stray newline or a 200-character
 * paste, and neither should reshape the cover.
 */
function GuestFromUrl() {
  const raw = useSearchParams().get('to')
  const name = raw?.replace(/\s+/g, ' ').trim().slice(0, 60)
  if (!name) return null
  return <GuestBlock name={name} />
}

type Props = {
  content: AkikahContent
  /** Supplied directly, e.g. from a database. Falls back to `?to=`. */
  guestName?: string
  onOpen: () => void
}

export function Template7Intro({ content, guestName, onOpen }: Props) {
  return (
    <div className="relative flex min-h-full w-full justify-center px-5 py-12">
      {/* Viewport-anchored, so a tall guest name cannot drag any of it away. */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,var(--petal-white)_0%,var(--petal-pale)_45%,var(--petal-veil)_100%)]" />
        <Art
          src={daisy}
          size={SIZE.daisy}
          className="absolute top-5 left-4 h-10 opacity-70 sm:h-14"
        />
        <Art
          src={daisySm}
          size={SIZE.daisySm}
          className="absolute top-5 right-4 h-10 -scale-x-100 opacity-70 sm:h-14"
        />
        <Art
          src={heartSm}
          size={SIZE.heartSm}
          className="absolute bottom-6 left-5 h-6 opacity-60 sm:h-8"
        />
        <Art
          src={heart}
          size={SIZE.heart}
          className="absolute right-5 bottom-6 h-6 opacity-60 sm:h-8"
        />
        <Art
          src={cloud}
          size={SIZE.cloud}
          className="absolute top-[18%] left-[10%] hidden h-12 opacity-70 md:block"
        />
        <Art
          src={star}
          size={SIZE.star}
          className="absolute top-[24%] right-[12%] hidden h-6 opacity-80 md:block"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto my-auto w-full max-w-sm text-center"
      >
        <motion.div variants={fadeUp} className="mx-auto w-[min(52vw,12rem)]">
          <Image
            src={baby}
            alt={`Ilustrasi bayi perempuan yang sedang tidur — ${content.bayi}`}
            width={SIZE.baby[0]}
            height={SIZE.baby[1]}
            loading="eager"
            fetchPriority="high"
            className="h-auto w-full"
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <Eyebrow className="mt-5">{content.sebutan}</Eyebrow>
        </motion.div>

        <motion.div variants={fadeUp}>
          <BabyName className="mt-2">{content.bayi}</BabyName>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Divider className="mt-8" />
        </motion.div>

        <motion.p variants={fadeUp} className="mt-5 text-meta text-bark">
          {content.tanggal}
        </motion.p>

        <motion.div variants={fadeUp}>
          {guestName ? (
            <GuestBlock name={guestName} />
          ) : (
            <Suspense fallback={null}>
              <GuestFromUrl />
            </Suspense>
          )}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-12">
          <PillButton onClick={onOpen}>Buka Undangan</PillButton>
        </motion.div>
      </motion.div>
    </div>
  )
}
