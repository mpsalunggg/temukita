'use client'

import type { ReactNode } from 'react'
import { Art } from './Art'
import { SIZE, divider, ribbon } from './assets'

/**
 * The pieces both the cover and the page were each keeping their own copy of.
 *
 * Before this file there were five card recipes, four copies of the divider
 * block, two byte-identical button class strings and three different ways to
 * render one type role. The worst pair — the Salam and Doa panels — differed
 * only by 5px of shadow blur and one hundredth of alpha, which is not a
 * decision anyone made; it is a copy-paste that drifted.
 */

/**
 * One surface, three sizes. Exported as class strings rather than a component
 * because the callers are a `div`, a `p` and a `li`, and a polymorphic wrapper
 * would cost more in types than it saves in markup.
 *
 * One shadow hue for all three (the page previously mixed rgba(112,83,73) and
 * rgba(90,70,60)), and no `backdrop-blur` — the grounds behind these are flat,
 * so it bought nothing and was a third variable to keep in sync.
 */
export const panel = {
  sheet:
    'rounded-[2rem] border border-rose/25 bg-white/55 px-6 py-10 shadow-[0_18px_50px_rgba(112,83,73,0.06)] sm:px-10 sm:py-12',
  tile: 'rounded-3xl border border-rose/25 bg-white/55 p-5 shadow-[0_12px_35px_rgba(112,83,73,0.05)]',
  chip: 'rounded-full border border-rose/40 bg-white/65 px-4 py-2 shadow-[0_6px_18px_rgba(112,83,73,0.05)]',
} as const

/** The call-to-action, identical whether it navigates or opens the invitation. */
const pill =
  'inline-flex items-center gap-2.5 rounded-full bg-rose px-7 py-3 text-meta font-semibold text-plum shadow-[0_8px_24px_rgba(194,137,126,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-ink hover:text-petal-pale focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-ink'

export function PillLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={pill}>
      {children}
    </a>
  )
}

export function PillButton({
  onClick,
  children,
}: {
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button type="button" onClick={onClick} className={pill}>
      {children}
    </button>
  )
}

/** The painted rule that closes a block. Four copies of this used to exist. */
export function Divider({
  className = '',
  ...rest
}: { className?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <Art
      {...rest}
      src={divider}
      size={SIZE.divider}
      className={`relative mx-auto w-40 opacity-80 sm:w-48 ${className}`}
    />
  )
}

/** Small caption naming a value — a field, a bank, "Kepada Yth." */
export function Label({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span className={`text-fine text-rose-ink ${className}`}>{children}</span>
  )
}

/**
 * The one line that wants spaced capitals. It carries its tracking through the
 * `text-label` role rather than an inline `tracking-[0.16em]`, which is what
 * both files were doing.
 */
export function Eyebrow({
  children,
  className = '',
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...rest}
      className={`text-label font-medium uppercase text-rose-ink/80 ${className}`}
    >
      {children}
    </p>
  )
}

/** The baby's name, set the same way on the cover and in the hero. */
export function BabyName({
  children,
  className = '',
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...rest}
      className={`font-book text-name text-rose-ink italic ${className}`}
    >
      {children}
    </p>
  )
}

export function Body({
  children,
  className = '',
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...rest} className={`text-body text-bark ${className}`}>
      {children}
    </p>
  )
}

/**
 * A section heading on the painted banner. The banner is absolute and the
 * heading `relative`, so the heading paints over it without a z-index, and it
 * is wider than its label on purpose — a banner cropped to its own text reads
 * as a button.
 */
export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-fit">
      <Art
        src={ribbon}
        size={SIZE.ribbon}
        className="pointer-events-none absolute top-1/2 left-1/2 w-[128%] -translate-x-1/2 -translate-y-1/2"
      />
      <div className="relative px-10 py-7 sm:px-14">
        <h2
          data-fx
          className="font-book text-section font-semibold text-plum"
        >
          {children}
        </h2>
      </div>
    </div>
  )
}
