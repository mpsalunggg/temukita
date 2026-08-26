'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button, NAV_LINKS, linkClass, navHref } from './ui'

/**
 * `solid` forces the opaque treatment from the first paint. The transparent
 * state only works over the dark hero video; on a light page it would render
 * white text on a white background until the visitor scrolls.
 */
export function LandingHeader({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (solid) return
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [solid])

  const opaque = solid || scrolled

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 w-full transition-all duration-300',
        opaque
          ? 'border-b border-border/80 bg-background/90 backdrop-blur-md'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        {/*
          Two-tone logotype: "Temu" in the neutral, "Kita" in the accent, closed
          by a dot. The accent shifts to the lighter ring token over the dark
          hero — #2563eb on a dimmed video is too low-contrast to read.
        */}
        <Link
          href="/"
          className={[
            'group text-xl font-semibold tracking-tight duration-300',
            linkClass,
            opaque ? 'text-foreground' : 'text-white',
          ].join(' ')}
        >
          Temu
          <span
            className={[
              'font-bold transition-colors duration-300',
              opaque ? 'text-accent' : 'text-ring',
            ].join(' ')}
          >
            Kita
          </span>
          <span
            aria-hidden
            className={[
              'ml-1 inline-block h-1.5 w-1.5 rounded-full align-middle transition-transform duration-300 group-hover:scale-150',
              opaque ? 'bg-accent' : 'bg-ring',
            ].join(' ')}
          />
        </Link>

        <nav
          className={[
            'hidden items-center gap-8 text-sm sm:flex',
            opaque ? 'text-subtle' : 'text-white/80',
          ].join(' ')}
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={navHref(item.href, solid)}
              className={[
                linkClass,
                opaque ? 'hover:text-foreground' : 'hover:text-white',
              ].join(' ')}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button href={navHref('#harga', solid)} size="sm">
          Buat undangan
        </Button>
      </div>
    </header>
  )
}
