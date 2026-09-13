/**
 * Islamic geometric ornament for template 6.
 *
 * Same contract as `template1/Florals.tsx`: pure SVG, no dependencies, every
 * stroke drawn with `currentColor` so the colour comes from a `text-*` class on
 * the caller. Nothing here knows about the palette.
 *
 * Used sparingly on purpose. Dense geometric tiling is the most common mistake
 * in Islamic templates, and it works directly against a design brief that asked
 * for calm and tidy — so the tile below is meant to sit at very low opacity as
 * a texture, never as a motif competing with the text.
 */

type SvgProps = {
  className?: string
  style?: React.CSSProperties
}

/**
 * A seamless eight-point star (khatam) field, drawn as an SVG `<pattern>` so one
 * element can wash a whole section.
 *
 * `id` must be unique per instance: SVG pattern ids are global to the document,
 * and two tiles sharing one id would have the second silently reference the
 * first. That happens for real here — the intro overlay and the page body are
 * both mounted during the exit transition.
 */
export function StarTile({
  className = '',
  style,
  id = 't6-khatam',
}: SvgProps & { id?: string }) {
  return (
    <svg
      className={className}
      style={style}
      aria-hidden
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id={id}
          width="72"
          height="72"
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            strokeLinejoin="round"
          >
            {/* two squares at 45° to each other — the classic khatam */}
            <rect x="20" y="20" width="32" height="32" />
            <rect
              x="20"
              y="20"
              width="32"
              height="32"
              transform="rotate(45 36 36)"
            />
            {/* quarter stars at the corners so the tile joins seamlessly */}
            <rect x="-16" y="-16" width="32" height="32" />
            <rect
              x="-16"
              y="-16"
              width="32"
              height="32"
              transform="rotate(45 0 0)"
            />
            <rect x="56" y="56" width="32" height="32" />
            <rect
              x="56"
              y="56"
              width="32"
              height="32"
              transform="rotate(45 72 72)"
            />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/** A single eight-point star, for use as a standalone accent or separator. */
export function Khatam({ className = '', style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinejoin="round"
      aria-hidden
      className={className}
      style={style}
    >
      <rect x="8" y="8" width="24" height="24" />
      <rect x="8" y="8" width="24" height="24" transform="rotate(45 20 20)" />
      <circle cx="20" cy="20" r="3.2" />
    </svg>
  )
}

/**
 * The outline of a pointed (ogee) arch — a mihrab silhouette. Meant to frame a
 * block of calligraphy: give it `absolute inset-0` inside a `relative` parent
 * and let the content sit on top.
 */
export function ArchFrame({ className = '', style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 200 300"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      aria-hidden
      className={className}
      style={style}
    >
      {/* up both sides, then two curves meeting in a point at the top */}
      <path d="M4 296 L4 120 C4 70 40 26 100 4 C160 26 196 70 196 120 L196 296" />
    </svg>
  )
}

/** A hairline rule broken by a small star at its centre. */
export function StarDivider({ className = '', style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 220 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinejoin="round"
      aria-hidden
      className={className}
      style={style}
    >
      <path d="M0 12 H92" />
      <path d="M128 12 H220" />
      <rect x="104" y="6" width="12" height="12" />
      <rect x="104" y="6" width="12" height="12" transform="rotate(45 110 12)" />
    </svg>
  )
}
