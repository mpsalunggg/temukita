import { Lora, Nunito } from 'next/font/google'

/**
 * Template 7's two faces.
 *
 * Both are loaded with italics, and that is the point. In the reference the
 * baby's name and the closing signature look like a script face, but they are
 * the same rounded sans as the body copy, simply set in italic at display size.
 * Dropping a real script in there makes the page louder than the design is.
 *
 * Lora carries the headings — warm and bookish rather than formal. The other
 * serifs here are already spoken for: Instrument by template 1, Cinzel by two
 * and four, Cormorant by three templates, Marcellus by six.
 *
 * Nunito replaces Bricolage for body copy on this route only. An akikah
 * invitation wants soft, and Bricolage's straight-sided terminals do not give
 * that; Nunito's rounded ones do.
 *
 * `weight: 'variable'` rather than the explicit arrays the neighbouring layouts
 * use. Those templates run on static faces, where the array is required; Lora
 * and Nunito are both variable, so one file covers the whole range and asking
 * for named instances would fetch more and interpolate less.
 */
const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  style: ['normal', 'italic'],
})

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  style: ['normal', 'italic'],
})

export default function Template7Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${lora.variable} ${nunito.variable}`}>{children}</div>
  )
}
