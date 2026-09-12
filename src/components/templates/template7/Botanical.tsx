/**
 * Botanical ornament for template 7.
 *
 * Same contract as `template6/Geometry.tsx` and `template1/Florals.tsx`: pure
 * SVG, no dependencies, no colour ever written into a component — a caller
 * `text-*` class drives every shape.
 *
 * One deliberate difference. The other two modules draw hairline line-art and
 * so use `stroke="currentColor"`; the reference for this template is filled
 * illustration, soft shapes with no outline at all. So the leaves, blobs and
 * sparkles here are `fill="currentColor"` instead. The rule that matters — the
 * palette lives in the stylesheet, not in the drawing — is unchanged. Only the
 * four `Icon` glyphs stay stroked, because outline icons are what the reference
 * shows and what reads at 24px.
 *
 * Everything is `aria-hidden`; none of it carries meaning. The one drawing that
 * does is the baby, and that lives in its own file with a real title.
 */

/**
 * Every ornament takes the full set of SVG props so callers can pass `data-fx`
 * (the selector the stagger hook animates) without a bespoke prop per shape.
 * `aria-hidden` is written after the spread so it cannot be turned off.
 */
type SvgProps = React.SVGProps<SVGSVGElement>

/** One almond leaf, laid along +x from the origin. Placed by transform. */
const LEAF = 'M0 0 C 9 -10, 26 -9, 34 0 C 26 9, 9 10, 0 0 Z'

/**
 * A eucalyptus stem — the motif the whole template leans on.
 *
 * Leaves sit in opposite pairs, every other one dropped to 68% so the sprig
 * reads as having depth rather than as a flat stencil. Drawn growing upwards;
 * the caller rotates and flips it for the hero, the section edges and the two
 * bottom corners, which is why there is only one of these rather than six.
 */
export function Sprig({ className = '', ...rest }: SvgProps) {
  const pairs = [
    { x: 55, y: 136, s: 0.78 },
    { x: 52, y: 114, s: 0.94 },
    { x: 49, y: 92, s: 1.05 },
    { x: 47, y: 70, s: 0.98 },
    { x: 45.5, y: 48, s: 0.84 },
  ]

  return (
    <svg
      viewBox="0 0 120 160"
      fill="currentColor"
      {...rest}
      aria-hidden
      className={className}
    >
      <path
        d="M60 158 C 56 120, 50 76, 45 14"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {pairs.map((p, i) => (
        <g key={p.y} opacity={i % 2 === 0 ? 1 : 0.68}>
          <path
            d={LEAF}
            transform={`translate(${p.x} ${p.y}) rotate(-35) scale(${p.s})`}
          />
          <path
            d={LEAF}
            transform={`translate(${p.x} ${p.y}) rotate(215) scale(${p.s * 0.92})`}
          />
        </g>
      ))}
      {/* terminal leaf, straight up the stem */}
      <path d={LEAF} transform="translate(45 16) rotate(-82) scale(0.8)" />
    </svg>
  )
}

/** A two-leaf glyph, small enough to flank a heading. */
export function LeafMark({ className = '', ...rest }: SvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...rest}
      aria-hidden
      className={className}
    >
      <path
        d="M12 22 C 11 17, 10 12, 8 7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <path d={LEAF} transform="translate(10 14) rotate(-38) scale(0.32)" />
      <path
        d={LEAF}
        opacity={0.7}
        transform="translate(9.4 11) rotate(212) scale(0.28)"
      />
      <path d={LEAF} transform="translate(8 8) rotate(-70) scale(0.26)" />
    </svg>
  )
}

/** The four-point sparkle scattered around the hero. */
export function Sparkle({ className = '', ...rest }: SvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...rest}
      aria-hidden
      className={className}
    >
      <path d="M12 1.5 C 13.1 8, 16 10.9, 22.5 12 C 16 13.1, 13.1 16, 12 22.5 C 10.9 16, 8 13.1, 1.5 12 C 8 10.9, 10.9 8, 12 1.5 Z" />
    </svg>
  )
}

/** The small heart that punctuates every divider. */
export function HeartMark({ className = '', ...rest }: SvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...rest}
      aria-hidden
      className={className}
    >
      <path d="M12 20.6 C 4.8 15.7, 2 12.4, 2 9 C 2 6.3, 4.1 4.1, 6.8 4.1 C 8.6 4.1, 10.3 5.1, 12 7 C 13.7 5.1, 15.4 4.1, 17.2 4.1 C 19.9 4.1, 22 6.3, 22 9 C 22 12.4, 19.2 15.7, 12 20.6 Z" />
    </svg>
  )
}

/**
 * A hairline rule broken by a heart — the separator that appears three times.
 *
 * The rule fades out at both ends rather than stopping dead. On a cream ground
 * a hard-ended line draws more attention than the text it is supposed to be
 * spacing, which is the opposite of what a divider is for. `id` must be unique
 * per instance: SVG gradient ids are global to the document.
 */
export function RuleWithHeart({
  className = '',
  id = 't7-rule',
  ...rest
}: SvgProps) {
  return (
    <svg
      viewBox="0 0 260 16"
      fill="currentColor"
      {...rest}
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.5" stopColor="currentColor" stopOpacity="1" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="7.4" width="106" height="1.2" fill={`url(#${id})`} />
      <rect x="154" y="7.4" width="106" height="1.2" fill={`url(#${id})`} />
      <path
        d="M12 20.6 C 4.8 15.7, 2 12.4, 2 9 C 2 6.3, 4.1 4.1, 6.8 4.1 C 8.6 4.1, 10.3 5.1, 12 7 C 13.7 5.1, 15.4 4.1, 17.2 4.1 C 19.9 4.1, 22 6.3, 22 9 C 22 12.4, 19.2 15.7, 12 20.6 Z"
        transform="translate(123.2 2.2) scale(0.56)"
      />
    </svg>
  )
}

/**
 * The soft organic shape that bleeds off the edges of the hero.
 *
 * `preserveAspectRatio="none"` on purpose: it is stretched to whatever box the
 * caller gives it, and a blob has no correct proportion to preserve.
 */
export function Blob({ className = '', ...rest }: SvgProps) {
  return (
    <svg
      viewBox="0 0 600 600"
      preserveAspectRatio="none"
      fill="currentColor"
      {...rest}
      aria-hidden
      className={className}
    >
      <path d="M300 18 C 432 6, 562 92, 580 224 C 598 356, 518 502, 388 562 C 258 622, 96 568, 38 448 C -20 328, 22 158, 132 78 C 182 42, 240 24, 300 18 Z" />
    </svg>
  )
}

type IconName = 'calendar' | 'clock' | 'dome' | 'pin' | 'check'

const ICONS: Record<IconName, React.ReactNode> = {
  calendar: (
    <>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10.2 H20.5" />
      <path d="M8.2 3 V7" />
      <path d="M15.8 3 V7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2 V12.3 L15.6 14.4" />
    </>
  ),
  dome: (
    <>
      <path d="M2.8 18.6 H21.2" />
      <path d="M4.8 18.6 a7.2 7.2 0 0 1 14.4 0" />
      <path d="M12 6.6 V5" />
      <circle cx="12" cy="3.8" r="1.2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.6 C 12 21.6, 19 15.3, 19 10.4 A7 7 0 1 0 5 10.4 C 5 15.3, 12 21.6, 12 21.6 Z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </>
  ),
  check: <path d="M5 12.6 L9.6 17.2 L19 6.8" />,
}

/**
 * The outline glyphs in Detail Acara, plus the tick the copy button swaps to.
 * One component rather than five near-identical wrappers.
 */
export function Icon({
  name,
  className = '',
  ...rest
}: SvgProps & { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
      aria-hidden
      className={className}
    >
      {ICONS[name]}
    </svg>
  )
}
