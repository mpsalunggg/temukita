/**
 * What is left of template 7's hand-drawn work.
 *
 * Every leaf, heart, flower, divider and illustration now comes from the
 * client's artwork sheet as a cropped PNG — see `assets.ts`. Only two things
 * survive as SVG, and both for the same reason: there is no equivalent on the
 * sheet.
 *
 * `Blob` is the soft ground behind the hero. It has to stretch to whatever box
 * it is given and take its colour from the palette, which is exactly what a
 * raster shape cannot do.
 *
 * `Icon` is down to a single glyph, and it is not decoration. The pin sits
 * inside the "Lihat lokasi" button, where the sheet's own rose pin would
 * disappear against a rose fill — this one inherits the label's colour instead.
 *
 * Both still follow the old contract: `currentColor` only, no colour written
 * into the file, `aria-hidden` written after the spread so a caller cannot
 * unset it.
 */

type SvgProps = React.SVGProps<SVGSVGElement>

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

type IconName = 'pin'

const ICONS: Record<IconName, React.ReactNode> = {
  pin: (
    <>
      <path d="M12 21.6 C 12 21.6, 19 15.3, 19 10.4 A7 7 0 1 0 5 10.4 C 5 15.3, 12 21.6, 12 21.6 Z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </>
  ),
}

/** The one interface glyph. Decorative artwork lives in `assets.ts`. */
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
