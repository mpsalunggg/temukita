/**
 * Botanical line-art ornaments for the invitation.
 *
 * Everything is drawn with `stroke="currentColor"` so the colour is driven by
 * a `text-*` class on the wrapper — keeping the floral motif minimalist and
 * tintable per section (sage on light, ivory on dark).
 */

type SvgProps = {
  className?: string
  style?: React.CSSProperties
}

/** A single slender sprig — five leaves rising along a gentle stem. */
export function Sprig({ className = '', style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 60 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      aria-hidden
      className={className}
      style={style}
    >
      <path d="M30 118 C30 90 30 60 30 6" />
      <path d="M30 96 C18 92 12 80 14 70 C24 74 30 84 30 96 Z" />
      <path d="M30 78 C42 74 48 62 46 52 C36 56 30 66 30 78 Z" />
      <path d="M30 58 C18 54 12 42 14 32 C24 36 30 46 30 58 Z" />
      <path d="M30 40 C42 36 48 24 46 14 C36 18 30 28 30 40 Z" />
      <circle cx="30" cy="8" r="3" />
    </svg>
  )
}

/**
 * A horizontal divider: a thin rule that meets a small open bloom in the
 * centre. Sits naturally between sections of text.
 */
export function FloralDivider({ className = '', style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 220 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      aria-hidden
      className={className}
      style={style}
    >
      <path d="M0 20 H86" />
      <path d="M134 20 H220" />
      {/* leaves flanking the bloom */}
      <path d="M86 20 C96 14 104 14 110 20 C104 26 96 26 86 20 Z" />
      <path d="M134 20 C124 14 116 14 110 20 C116 26 124 26 134 20 Z" />
      {/* five-petal bloom */}
      <g>
        <circle cx="110" cy="20" r="2.4" />
        <path d="M110 17.6 C108 13 112 13 110 17.6 Z" />
        <path d="M112.4 20 C117 18 117 22 112.4 20 Z" />
        <path d="M110 22.4 C112 27 108 27 110 22.4 Z" />
        <path d="M107.6 20 C103 22 103 18 107.6 20 Z" />
        <path d="M111.7 18.3 C115 15 116 19 111.7 18.3 Z" />
      </g>
    </svg>
  )
}

/**
 * A corner spray of branching leaves. Mirror it across corners by flipping
 * with a `-scale-x-100` / `-scale-y-100` utility on the wrapper.
 */
export function CornerSpray({ className = '', style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      aria-hidden
      className={className}
      style={style}
    >
      <path d="M4 4 C40 24 70 54 96 96 C108 116 116 128 124 136" />
      <path d="M30 18 C26 30 18 36 8 36 C10 26 18 20 30 18 Z" />
      <path d="M52 36 C50 48 42 56 32 56 C32 44 40 38 52 36 Z" />
      <path d="M74 60 C74 72 66 80 56 82 C54 70 62 62 74 60 Z" />
      <path d="M94 88 C96 100 90 110 80 114 C76 102 82 92 94 88 Z" />
      <path d="M28 14 C36 8 46 8 54 12 C46 18 36 18 28 14 Z" />
      <path d="M50 32 C58 26 68 26 76 30 C68 36 58 36 50 32 Z" />
    </svg>
  )
}

/** A small open bloom used as a standalone accent / bullet. */
export function Bloom({ className = '', style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      aria-hidden
      className={className}
      style={style}
    >
      <circle cx="20" cy="20" r="3.4" />
      <path d="M20 16.6 C16 8 24 8 20 16.6 Z" />
      <path d="M23.4 20 C32 16 32 24 23.4 20 Z" />
      <path d="M20 23.4 C24 32 16 32 20 23.4 Z" />
      <path d="M16.6 20 C8 24 8 16 16.6 20 Z" />
      <path d="M22.4 17.6 C30 11 31 19 22.4 17.6 Z" />
      <path d="M17.6 22.4 C10 29 9 21 17.6 22.4 Z" />
    </svg>
  )
}
