'use client'

/**
 * Scroll choreography for the invitation: Lenis for the smoothed scroll
 * position, GSAP ScrollTrigger for everything that reacts to it.
 *
 * Two rules hold everywhere in here:
 *  1. Every effect is registered through `gsap.matchMedia()`, so reduced-motion
 *     visitors and small screens simply never get the trigger — the layout has
 *     to read correctly with zero JS applied.
 *  2. Nothing sets a starting `opacity: 0` from CSS. Initial states are set by
 *     GSAP itself, so if the script never runs the content is still visible.
 */

import { useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

/** Effects that must not run when the visitor asked for less motion. */
export const MOTION = '(prefers-reduced-motion: no-preference)'
/** Pinning and horizontal panning — desktop only, motion-safe only. */
export const MOTION_DESKTOP =
  '(prefers-reduced-motion: no-preference) and (min-width: 768px)'

let registered = false

function ensureRegistered() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

/**
 * Smooth scroll, started only once the invitation is actually open (the intro
 * gate locks `body` overflow, so running Lenis behind it fights that lock).
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    ensureRegistered()

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Photos land after first paint; without this the pinned sections measure
    // against the wrong document height.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const settle = window.setTimeout(refresh, 600)

    return () => {
      window.removeEventListener('load', refresh)
      window.clearTimeout(settle)
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    }
  }, [enabled])
}

/**
 * Declare a section's scroll effects. `build` receives a matchMedia instance;
 * register every tween inside `mm.add(query, fn)` so it is torn down with the
 * component and never applies outside its breakpoint.
 */
export function useScrollFx(build: (mm: gsap.MatchMedia) => void) {
  // Captured once: effects are registered on mount only, and everything they
  // close over (element refs, static config) is stable for the section's life.
  const buildRef = useRef(build)

  useEffect(() => {
    ensureRegistered()
    const mm = gsap.matchMedia()
    buildRef.current(mm)
    return () => {
      mm.revert()
    }
  }, [])
}

/**
 * Vertical parallax on an image layer. The layer must be oversized relative to
 * its clipping parent (see `parallaxLayer` below) or the travel exposes an edge.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  amount = 10,
) {
  useScrollFx((mm) => {
    mm.add(MOTION, () => {
      const el = ref.current
      if (!el) return
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })
  })
}

/**
 * Oversized, centred image layer — the counterpart to `useParallax`. Bleeds
 * 14% past the clip on both edges so a ±10% travel never shows background.
 */
export const parallaxLayer = 'absolute -inset-y-[14%] inset-x-0 will-change-transform'

/** Reveal a block by wiping it open from the bottom. */
export function useClipReveal(
  ref: RefObject<HTMLElement | null>,
  start = 'top 82%',
) {
  useScrollFx((mm) => {
    mm.add(MOTION, () => {
      const el = ref.current
      if (!el) return
      gsap.fromTo(
        el,
        { clipPath: 'inset(0% 0% 100% 0%)', y: 28 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start, once: true },
        },
      )
    })
  })
}

/**
 * Staggered fade-up for the direct children matched by `selector` inside
 * `ref`. Replaces the old one-size-fits-all section fade.
 */
export function useStagger(
  ref: RefObject<HTMLElement | null>,
  selector: string,
  opts: { y?: number; stagger?: number; start?: string } = {},
) {
  const { y = 24, stagger = 0.12, start = 'top 80%' } = opts

  useScrollFx((mm) => {
    mm.add(MOTION, () => {
      const el = ref.current
      if (!el) return
      const targets = el.querySelectorAll(selector)
      if (!targets.length) return
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger,
          scrollTrigger: { trigger: el, start, once: true },
        },
      )
    })
  })
}
