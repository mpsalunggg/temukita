/**
 * Template 6 photography — sourced from Unsplash (free licence, attribution not
 * required) and downloaded into `public/images/template6/` at w=1600 q=80.
 *
 * Stored locally rather than hot-linked so the invitation does not break if a
 * photo is moved or removed upstream. Source IDs are in `CREDITS` below.
 *
 * Two rules govern this set, and both differ from every other template:
 *
 * 1. NO HUMAN FACES. This invitation is built for couples who do not want their
 *    photographs displayed, which is why it has no portrait section at all. A
 *    face in any of these frames breaks the premise, not just the styling — so
 *    every replacement has to be opened and looked at, never trusted to a
 *    search term.
 * 2. BRIGHT, AIRY, LOW CONTRAST. The page is white-based. A dark frame does not
 *    read as moody here, it reads as a hole punched in the layout. One
 *    candidate — a navy Quran with magenta flowers — was rejected for exactly
 *    that reason on the first pass.
 *
 * Everything renders through the `Photo` wrapper in `Template6Page`, which
 * applies one shared light grade so five frames from five shoots read as one
 * invitation.
 */

const BASE = '/images/template6'

/**
 * Cover: baby's breath on white. The empty left half is where the Bismillah and
 * the names sit, so a busy replacement will not work here.
 */
export const cover = `${BASE}/cover.jpg`

/** Wide band: mosque colonnade, pointed arches, hanging lanterns. */
export const arch = `${BASE}/arch.jpg`

/** Gallery: white marble hall, gilded capitals, inlaid columns. */
export const carving = `${BASE}/carving.jpg`

/** Gallery: pale peonies, high key. */
export const decor = `${BASE}/decor.jpg`

/** Gallery: a green-and-gold mushaf on a light surface. */
export const mushaf = `${BASE}/mushaf.jpg`

/**
 * Unsplash photo IDs keyed by local filename, for tracing or re-fetching:
 *   https://images.unsplash.com/<id>?auto=format&fit=crop&w=1600&q=80
 */
export const CREDITS: Record<string, string> = {
  cover: 'photo-1608153917357-33666ba96cd5',
  arch: 'photo-1555300873-660313ab1518',
  carving: 'photo-1527246574940-ebf9c5ffd9a9',
  decor: 'photo-1651154872716-0f7a409a4dd0',
  mushaf: 'photo-1618554844984-d4ed47c7e0c0',
}
