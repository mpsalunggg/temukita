'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useParallax, useSmoothScroll, useStagger } from '../template1/scroll'
import { Art } from './Art'
import { Blob, Icon } from './Botanical'
import { Template7Intro } from './Template7Intro'
import { azhaliya, type AcaraIcon, type AkikahContent } from './content'
import {
  BabyName,
  Body,
  Divider,
  Eyebrow,
  Label,
  PillLink,
  SectionTitle,
  panel,
} from './ui'
import {
  SIZE,
  baby,
  bow,
  calendar,
  clock,
  cloud,
  daisy,
  daisySm,
  heart,
  heartSm,
  pin,
  star,
} from './assets'

/**
 * Template 7 — tasyakuran akikah.
 *
 * The only invitation here that is not a wedding. It opens behind a cover like
 * the others do — that is where the per-guest greeting from `?to=` lives — but
 * it still has no music player, no countdown and no RSVP, which is the design
 * rather than an omission: an akikah invitation is an announcement.
 *
 * Nothing in here holds its own copy. Everything comes from an `AkikahContent`
 * record, so a second family needs a new object rather than an edited
 * component.
 *
 * Every ornament and the baby herself are cropped from one illustrated sheet
 * the client supplied — see `assets.ts`. The foliage from that sheet is
 * deliberately unused: it is olive, and this template is pinky-white. Still no
 * photographs: a demo invitation has no business showing somebody's newborn.
 */

/* -------------------------------------------------------------------- hero */

function HeroSection({ content }: { content: AkikahContent }) {
  const copy = useRef<HTMLDivElement>(null)
  const blob = useRef<HTMLDivElement>(null)
  useStagger(copy, '[data-fx]', { y: 18, stagger: 0.1, start: 'top 92%' })
  useParallax(blob, 6)

  return (
    <section className="relative isolate overflow-hidden bg-petal-pale px-5 py-12 sm:px-8 sm:py-16 md:min-h-svh md:flex md:items-center md:py-20">
      {/* Soft ground. Two blush shapes bleeding off the left, one barely-there
          pale shape on the right — the only "background" this page has.

          The big one moves on small screens: in a single column it would sit
          under the name and the divider, and the divider's pink on it is
          1.2:1. Behind the illustration it is decoration; behind the type it is
          a bug. */}
      <div ref={blob} className="pointer-events-none absolute inset-0" aria-hidden>
        <Blob className="absolute -top-28 -left-32 h-[22rem] w-[22rem] text-petal-blob/80 md:top-auto md:-bottom-40 md:-left-44 md:h-[34rem] md:w-[34rem] motion-safe:animate-wave-drift" />
        <Blob className="absolute -top-56 -left-28 h-[30rem] w-[30rem] rotate-[28deg] text-petal-mist" />
        <Blob className="absolute -top-24 -right-52 hidden h-[34rem] w-[34rem] rotate-[140deg] text-petal-white sm:block" />
      </div>

      {/* Scatter. Hidden on the narrowest screens, where it lands on top of
          the illustration instead of around it. Pink only — the sheet's
          eucalyptus is the one olive thing in the palette. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Art
          src={daisy}
          size={SIZE.daisy}
          className="absolute top-6 right-6 hidden h-12 opacity-80 sm:block md:h-16 motion-safe:animate-petal-sway"
        />
        <Art
          src={cloud}
          size={SIZE.cloud}
          className="absolute top-[12%] left-[6%] hidden h-14 opacity-80 md:block"
        />
        <Art
          src={star}
          size={SIZE.star}
          className="absolute top-[26%] left-[18%] hidden h-6 sm:block"
        />
        <Art
          src={heart}
          size={SIZE.heart}
          className="absolute top-[9%] left-[44%] hidden h-5 md:block"
        />
        <Art
          src={heartSm}
          size={SIZE.heartSm}
          className="absolute bottom-[26%] left-[40%] hidden h-4 sm:block"
        />
        <Art
          src={daisySm}
          size={SIZE.daisySm}
          className="absolute top-[56%] left-[8%] hidden h-7 md:block"
        />
      </div>

      {/* Not a 50/50 grid on one baseline — that is the stiffest arrangement
          available. 1.1 : 1 with the illustration dropped, the same offset
          device template 1 uses on its second portrait. */}
      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
        <div className="mx-auto w-[min(78vw,20rem)] md:w-full md:max-w-[26rem] motion-safe:animate-petal-sway">
          {/* The one image on this page that means something, so it gets a real
              alt and a real width. Native is 536px; capped here so it is never
              blown up past its own resolution on a wide screen. */}
          <Image
            src={baby}
            alt={`Ilustrasi bayi perempuan yang sedang tidur — ${content.bayi}`}
            width={SIZE.baby[0]}
            height={SIZE.baby[1]}
            className="h-auto w-full"
          />
        </div>

        {/* No `fetchPriority` here: this sits behind an opaque cover at load,
            and the cover renders the same file. Two high-priority claims on one
            image only make them compete. */}
        <div ref={copy} className={`${panel.sheet} text-center`}>
          {/* No "Undangan" eyebrow. The line under it reads Tasyakuran Akikah
              at 3.5rem — a label announcing that an invitation is an invitation
              is the kind of chrome that makes a page look assembled. */}
          <h1 data-fx className="font-book text-hero font-semibold text-plum">
            {/* One span per line. Left to wrap on its own, "Tasyakuran" breaks
                mid-word at the widths this template is actually read on. */}
            <span className="block">Tasyakuran</span>
            <span className="block">Akikah</span>
          </h1>

          <Eyebrow data-fx className="mt-5">
            {content.sebutan}
          </Eyebrow>

          <Divider data-fx className="mt-8" />

          {/* The whole page builds to this. Fraunces italic is the display
              voice; Plus Jakarta Sans carries the information. */}
          <BabyName data-fx className="mt-2">
            {content.bayi}
          </BabyName>

          <Body data-fx className="mt-8 text-bark/85">
            {content.sebutanOrangTua}
            <span className="mt-2 block">{content.orangTua}</span>
          </Body>

          <p
            data-fx
            className={`${panel.chip} mt-8 inline-flex items-center gap-2.5 text-meta font-medium text-bark`}
          >
            <Art src={calendar} size={SIZE.calendar} className="relative h-5 shrink-0" />
            {content.tanggal}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- salam */

function SalamSection({ content }: { content: AkikahContent }) {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.1 })

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-petal-white px-5 py-16 sm:px-8 sm:py-20"
    >
      <Art
        src={heart}
        size={SIZE.heart}
        className="absolute top-1/2 -left-2 hidden h-10 -translate-y-1/2 opacity-50 lg:block"
      />
      <Art
        src={heartSm}
        size={SIZE.heartSm}
        className="absolute top-1/2 -right-1 hidden h-8 -translate-y-1/2 opacity-50 lg:block"
      />

      <div className={`relative mx-auto max-w-2xl ${panel.sheet} text-center`}>
        <Art data-fx src={daisy} size={SIZE.daisy} className="relative mx-auto h-8" />

        {/* Not a SectionTitle: this is a greeting spoken to the reader, not a
            label naming a block, so it takes no banner. */}
        <h2 data-fx className="mt-5 font-book text-greet font-semibold text-plum">
          {content.salam.pembuka}
        </h2>

        <Body data-fx className="mt-5">
          {content.salam.isi}
        </Body>

        <Divider data-fx className="mt-8" />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- acara */

/**
 * Icon name → artwork. The lookup lives here rather than in `content.ts` so a
 * record stays free of imports and could come straight from a database.
 */
const ACARA_ART: Record<AcaraIcon, { src: string; size: readonly [number, number] }> = {
  calendar: { src: calendar, size: SIZE.calendar },
  clock: { src: clock, size: SIZE.clock },
  bow: { src: bow, size: SIZE.bow },
  pin: { src: pin, size: SIZE.pin },
}

function AcaraSection({ content }: { content: AkikahContent }) {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.1 })

  return (
    <section
      ref={root}
      className="relative bg-petal-mist px-5 py-20 sm:px-8 sm:py-24"
    >
      {/* Filled with the colour of the band above, so the seam dissolves. */}
      <SoftSeam className="text-petal-white" />

      <div className="relative mx-auto max-w-4xl">
        {/* The page's one breakout. The banner is pulled up across the seam so
            it straddles the colour change instead of sitting politely below it
            — the cheapest way to stop a stack of bands reading as boxes, and it
            spends the client's own artwork doing it. Nothing else overlaps. */}
        <div className="relative z-10 -mt-8 sm:-mt-10">
          <SectionTitle>Detail Acara</SectionTitle>
        </div>

        {/* Ragged left. Four facts read faster down a shared left edge than
            across four centred columns. */}
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          {content.acara.map((item) => (
            <div
              key={item.label}
              data-fx
              className={`${panel.tile} flex items-start gap-4 transition-transform duration-300 hover:-translate-y-1`}
            >
              {/* Fixed-width well, because the four icons have four different
                  aspect ratios — the bow is half again as wide as the pin. Sized
                  by height alone they would each start the text at a different
                  x, and the column would lose the left edge it is built on. */}
              <span className="flex w-11 shrink-0 justify-center">
                <Art
                  src={ACARA_ART[item.icon].src}
                  size={ACARA_ART[item.icon].size}
                  className="relative h-9"
                />
              </span>
              <div>
                <dt><Label>{item.label}</Label></dt>
                <dd className="mt-2 text-body text-bark">
                  {item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <div data-fx className="mt-8 text-center">
          {/* The sheet has a painted pill for this, but a picture of a button
              is not a button: no focus ring, no selectable label, and a width
              locked to whatever text was drawn into it. Only its colour is
              borrowed. */}
          <PillLink href={content.maps}>
            <Icon name="pin" className="h-4 w-4" />
            Lihat lokasi
            <span className="sr-only">(buka di tab baru)</span>
          </PillLink>
        </div>
      </div>
    </section>
  )
}

/**
 * The organic seam at the top of a band. Lives with the band it shapes rather
 * than with the one above it, so moving a section moves its edge too.
 *
 * It sits *inside* the top of its own section and is filled with the colour of
 * the section above — the previous band spilling down with a soft edge. Placing
 * it above the section instead would paint blush on blush and vanish.
 */
function SoftSeam({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 leading-[0] ${className}`}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        fill="currentColor"
        className="block h-[38px] w-full rotate-180 sm:h-[64px]"
      >
        <path d="M0,42 C 260,84 520,10 760,34 C 1000,58 1220,86 1440,54 L1440,90 L0,90 Z" />
      </svg>
    </div>
  )
}

/* --------------------------------------------------------------------- doa */

function DoaSection({ content }: { content: AkikahContent }) {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.1 })

  return (
    <section
      ref={root}
      // The page's pacing outlier: the other bands sit at py-20, this one gets
      // py-24, because it is what the invitation is actually for.
      className="relative bg-petal-veil px-5 py-20 sm:px-8 sm:py-24"
    >
      <SoftSeam className="text-petal-mist" />

      <div className={`relative mx-auto max-w-2xl ${panel.sheet} text-center`}>
        <SectionTitle>Doa &amp; Harapan</SectionTitle>

        <blockquote
          data-fx
          className="mx-auto mt-8 font-book text-lead text-plum italic"
        >
          {content.doa.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </blockquote>

        <Divider data-fx className="mt-8" />
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- penutup */

function PenutupSection({ content }: { content: AkikahContent }) {
  const root = useRef<HTMLElement>(null)
  useStagger(root, '[data-fx]', { y: 18, stagger: 0.1 })

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-petal-veil px-5 pt-5 pb-20 text-center sm:px-8 sm:pb-24"
    >
      <Art
        src={daisy}
        size={SIZE.daisy}
        className="absolute -bottom-2 -left-5 h-20 opacity-70 sm:h-28 md:h-32 motion-safe:animate-petal-sway"
      />
      <Art
        src={daisySm}
        size={SIZE.daisySm}
        className="absolute -right-5 -bottom-2 h-20 -scale-x-100 opacity-70 sm:h-28 md:h-32 motion-safe:animate-petal-sway"
      />

      <div className="relative mx-auto max-w-2xl">
        <Body data-fx>{content.penutup.terimaKasih}</Body>

        <p data-fx className="mt-8 text-meta text-bark/80">
          {content.penutup.salam}
        </p>

        <p data-fx className="mt-2 font-book text-section text-rose-ink italic">
          {content.penutup.keluarga}
        </p>

        <p data-fx className="mt-16 text-fine text-rose-ink/80">
          Dibuat dengan{' '}
          <Link
            href="/"
            className="underline decoration-rose-ink/40 underline-offset-4 transition-colors hover:text-plum"
          >
            Temukita
          </Link>
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- page */

type PageProps = {
  /** The invitation to render. Defaults to the demo family. */
  content?: AkikahContent
  /** Supplied directly, e.g. from a database. Otherwise read from `?to=`. */
  guestName?: string
}

export function Template7Page({ content = azhaliya, guestName }: PageProps) {
  const [opened, setOpened] = useState(false)

  // Smooth scrolling only after the cover is gone — Lenis binding to a page
  // nobody can scroll yet just fights the overflow lock below.
  useSmoothScroll(opened)

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  return (
    <>
      <AnimatePresence mode="wait">
        {!opened && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-100 overflow-y-auto"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Template7Intro
              content={content}
              guestName={guestName}
              onOpen={() => setOpened(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* `font-text` is load-bearing: `body` in globals.css sets the Bricolage
          stack, so body copy only picks up Jakarta Sans if the template opts in.
          `overflow-x-clip`, not `hidden` — `hidden` breaks ScrollTrigger, and
          the hero blobs really do bleed past the left edge.

          The variation settings are Fraunces' SOFT axis, set once and
          inherited. Jakarta Sans has no such axis and simply ignores it, and
          naming neither `wght` nor `opsz` here leaves font-weight and optical
          sizing alone.

          SOFT is at its maximum. Checked against SOFT 0 side by side: at 0 the
          serifs come to sharp points, at 100 the terminals swell and round off.
          The second is what a loaded brush does to an edge, which is the whole
          reason this face was chosen over another bookish serif. */}
      <div
        className="overflow-x-clip overscroll-y-none bg-petal-pale font-text text-bark"
        style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 0" }}
      >
        <HeroSection content={content} />
        <SalamSection content={content} />
        <AcaraSection content={content} />
        <DoaSection content={content} />
        <PenutupSection content={content} />
      </div>
    </>
  )
}
