import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Shared landing-page primitives.
 *
 * Only patterns with three or more call sites live here. Two-call-site patterns
 * (the bordered card, the grid wrapper) stay inline where they are used — an
 * abstraction with two consumers costs more to read than it saves.
 *
 * Server components on purpose: nothing here needs state. Scroll reveals live
 * in `./Reveal` so this file stays out of the client bundle.
 */

/**
 * Ordering runs through WhatsApp until there is a checkout. One number, one
 * helper — a phone number pasted into several files is a number that eventually
 * disagrees with itself.
 */
export const WA_NUMBER = '6281243530207'

export const waLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`

/** Single source for the nav list — header and footer both render it. */
export const NAV_LINKS = [
  { href: '#fitur', label: 'Fitur' },
  { href: '#cara-kerja', label: 'Cara kerja' },
  { href: '/templates', label: 'Template' },
  { href: '#harga', label: 'Harga' },
]

/* ------------------------------------------------------------------ Section */

type SectionProps = {
  id?: string
  labelledBy?: string
  /** `none` hands background control to the call site (the CTA gradient). */
  tone?: 'background' | 'surface' | 'none'
  className?: string
  innerClassName?: string
  /**
   * Full-bleed decoration rendered as a sibling of the container: waves, blobs.
   * These must escape `max-w-5xl px-4` or they stop reaching the section edges.
   */
  bleed?: ReactNode
  children: ReactNode
}

const TONE = {
  background: 'bg-background',
  surface: 'bg-surface',
  none: '',
}

/**
 * Section shell: the `<section>` plus its centred container.
 *
 * `relative overflow-hidden` is the default because every section that has a
 * Wave or a blurred blob bleeding past its box needs it.
 *
 * `<Wave>` is deliberately NOT rendered here — its four uses differ in position,
 * colour and layering, and the CTA needs two at once. It stays at the call site.
 */
export function Section({
  id,
  labelledBy,
  tone = 'background',
  className = '',
  innerClassName = '',
  bleed,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative overflow-hidden py-20 sm:py-28 ${TONE[tone]} ${className}`}
    >
      {bleed}
      <div
        className={`relative z-10 mx-auto max-w-5xl px-4 sm:px-6 ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- SectionHeading */

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  /** Target for the parent Section's `aria-labelledby`. */
  id?: string
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  children?: ReactNode
}

/** Eyebrow + heading + sub-copy, at one fixed scale, in the body typeface. */
export function SectionHeading({
  eyebrow,
  title,
  id,
  tone = 'light',
  align = 'left',
  children,
}: SectionHeadingProps) {
  const dark = tone === 'dark'
  const centered = align === 'center'

  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : ''}>
      {eyebrow && (
        <p
          className={`text-xs font-bold uppercase tracking-widest ${
            dark ? 'text-white/70' : 'text-accent'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`text-2xl font-semibold tracking-tight sm:text-3xl ${
          eyebrow ? 'mt-3' : ''
        } ${dark ? 'text-white' : 'text-foreground'}`}
      >
        {title}
      </h2>
      {children && (
        <p
          className={`mt-3 max-w-2xl ${centered ? 'mx-auto' : ''} ${
            dark ? 'text-white/80' : 'text-subtle'
          }`}
        >
          {children}
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------- Button */

type ButtonProps = {
  href: string
  variant?: 'primary' | 'glass' | 'inverted' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  full?: boolean
  className?: string
  children: ReactNode
}

/**
 * The page's only button.
 *
 * Its call-site styles were never byte-identical, which normally argues against
 * extracting. It is extracted anyway for one reason: there was no
 * `focus-visible` treatment anywhere on the page, so keyboard focus was
 * invisible on every button and link. One component fixes that once instead of
 * five times.
 */
const VARIANT = {
  primary:
    'bg-accent text-white shadow-md shadow-accent/25 hover:bg-accent-hover hover:shadow-accent/30 focus-visible:ring-offset-background',
  outline:
    'border border-border bg-background text-foreground hover:border-accent/40 hover:bg-surface focus-visible:ring-offset-background',
  glass:
    'border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:ring-offset-transparent',
  inverted:
    'bg-white text-accent shadow-lg shadow-black/15 hover:-translate-y-0.5 focus-visible:ring-offset-transparent',
}

const SIZE = {
  sm: 'h-9 px-4',
  md: 'h-11 px-7',
  lg: 'h-12 px-10',
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  full = false,
  className = '',
  children,
}: ButtonProps) {
  const cls = [
    'inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    VARIANT[variant],
    SIZE[size],
    full ? 'w-full' : '',
    className,
  ].join(' ')

  // Route changes go through Link; in-page anchors stay plain <a>.
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className={cls}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </a>
  )
}

/**
 * Nav entries are in-page anchors. Away from the landing page they have to be
 * rewritten to point back at it, or they resolve to nothing.
 */
export function navHref(href: string, offSite: boolean) {
  return offSite && href.startsWith('#') ? `/${href}` : href
}

/** Shared link style so nav and footer links get the same focus treatment. */
export const linkClass =
  'rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'

/* --------------------------------------------------------------------- Icons */

/**
 * Stroked-outline icon wrapper. Callers pass only the `<path>` elements — the
 * viewBox, stroke setup and line joins were repeated identically four times.
 */
export function Icon({
  children,
  className = 'h-6 w-6',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  )
}

/** The page's only check mark — previously drawn twice, in two styles. */
export function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
