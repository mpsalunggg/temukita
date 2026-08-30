/**
 * Template 5 photography — sourced from Unsplash (free licence, attribution not
 * required) and downloaded into `public/images/template5/` at w=1600 q=80.
 *
 * Stored locally rather than hot-linked so the invitation does not break if a
 * photo is moved or removed upstream. Source IDs are in `CREDITS` below so the
 * set can be traced or re-fetched.
 *
 * Every frame is rendered through the `Photo` wrapper in `Template5Page`, which
 * forces a sepia grade. Warm monochrome is a treatment here, not a property of
 * the files — all of these are colour originals.
 *
 * Selection rule, and it is the OPPOSITE of template 4's: pick soft, bright,
 * low-contrast frames. Template 4 wanted hard contrast because grayscale eats
 * it; sepia does not. A punchy high-contrast shot turns muddy and dirty under
 * this grade rather than warm.
 */

const BASE = '/images/template5'

/** Cover: a pale lily against a dark field — the names sit over the empty half. */
export const cover = `${BASE}/cover.jpg`

/** Our Love: the portrait the split heading wraps around. */
export const story = `${BASE}/story.jpg`

/** Wide band between Our Love and the programme. */
export const corridor = `${BASE}/corridor.jpg`

/** Blurred hard as the gallery's backdrop — never shown sharp. */
export const bloomBg = `${BASE}/bloomBg.jpg`

/** The three framed portraits in the gallery band. */
export const gal1 = `${BASE}/gal1.jpg`
export const gal2 = `${BASE}/gal2.jpg`
export const gal3 = `${BASE}/gal3.jpg`

/** Gift section, beside the copy. */
export const flower = `${BASE}/flower.jpg`

/** Contact block, under the script heading. */
export const couple = `${BASE}/couple.jpg`

/**
 * Unsplash photo IDs keyed by local filename, for tracing or re-fetching:
 *   https://images.unsplash.com/<id>?auto=format&fit=crop&w=1600&q=80
 */
export const CREDITS: Record<string, string> = {
  cover: 'photo-1669240728309-1a0572a1c69b',
  story: 'photo-1606216794079-73f85bbd57d5',
  corridor: 'photo-1519379169146-d4b170447caa',
  bloomBg: 'photo-1650599749281-babd668df0c7',
  gal1: 'photo-1591604442449-ecc9943efabf',
  gal2: 'photo-1621621668101-d5c8329b3784',
  gal3: 'photo-1698802060978-84008afaeb72',
  flower: 'photo-1650596622577-922ee0f13dc9',
  couple: 'photo-1571753217087-980e556e16ea',
}
