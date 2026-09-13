import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'

/**
 * Template 7's two faces.
 *
 * Fraunces carries every display line. It is the one face on Google Fonts with
 * a SOFT axis: raising it swells the strokes and rounds the terminals, which is
 * what a wet brush does to an edge — so the type and the watercolour artwork
 * are doing the same thing rather than merely sitting next to each other. The
 * axis is requested here and set once on the page shell; `opsz` is requested
 * too but left to `font-optical-sizing: auto`, so contrast tracks size on its
 * own. WONK stays at 0: its swashed alternates are lovely in a specimen and too
 * cute across a whole invitation.
 *
 * Plus Jakarta Sans carries everything that is information rather than voice.
 * Humanist, warm, drawn in Jakarta for the city's identity, and the best
 * Indonesian coverage of the shortlist. No italic cut: every italic on this
 * page is now Fraunces', so shipping Jakarta's would be dead weight.
 *
 * Neither is claimed elsewhere. Instrument Serif belongs to template 1, Cinzel
 * to two and four, Cormorant to three templates, Marcellus to six, and
 * Bricolage is the body face on every other route.
 *
 * `weight: 'variable'` rather than the explicit arrays the neighbouring layouts
 * use — both of these are variable fonts, so one file covers the whole range.
 */
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
})

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
})

export default function Template7Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${fraunces.variable} ${jakarta.variable}`}>{children}</div>
  )
}
