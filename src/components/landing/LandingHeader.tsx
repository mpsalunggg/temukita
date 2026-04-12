'use client'

import { useEffect, useState } from 'react'

const nav = [
  { href: '#fitur', label: 'Fitur' },
  { href: '#cara-kerja', label: 'Cara kerja' },
  { href: '#harga', label: 'Harga' },
]

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/80 bg-background/90 backdrop-blur-md'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a
          href="#"
          className={[
            'text-xl font-semibold tracking-tight transition-colors duration-300',
            scrolled ? 'text-foreground' : 'text-white',
          ].join(' ')}
        >
          TemuKita
        </a>

        <nav
          className={[
            'hidden items-center gap-8 text-sm sm:flex',
            scrolled ? 'text-subtle' : 'text-white/80',
          ].join(' ')}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={[
                'transition-colors',
                scrolled ? 'hover:text-foreground' : 'hover:text-white',
              ].join(' ')}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#mulai"
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-md shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-accent/30"
        >
          Buat undangan
        </a>
      </div>
    </header>
  )
}
