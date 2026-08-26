'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Fade-and-lift a block into view once.
 *
 * Two rules borrowed from the invitation templates' scroll module
 * (`templates/template1/scroll.ts`), because they are what keeps the page
 * correct when the animation never runs:
 *
 *  1. Reduced-motion visitors never get the effect at all — they get a plain
 *     div, not a faster animation.
 *  2. No starting `opacity: 0` comes from CSS. The initial state is set by the
 *     animation library, so if the script never executes the content is still
 *     on screen.
 *
 * Not using `useStagger` from that module: it pulls in GSAP, ScrollTrigger and
 * Lenis, none of which are otherwise on this route. ~70 KB gzip for a fade is
 * not a trade worth making; `motion` is already installed and far lighter here.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
