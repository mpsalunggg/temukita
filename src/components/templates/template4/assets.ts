/**
 * Template 4 photography — sourced from Unsplash (free licence, attribution not
 * required) and downloaded into `public/images/template4/` at w=1600 q=80.
 *
 * Stored locally rather than hot-linked so the invitation does not break if a
 * photo is moved or removed upstream. Source IDs are in `CREDITS` below so the
 * set can be traced or re-fetched.
 *
 * Every frame is rendered through the `Photo` wrapper in `Template4Page`, which
 * forces `grayscale`. Monochrome here is a treatment, not a property of the
 * files — several of these are colour originals. Bypass the wrapper and one
 * colour frame will break the whole page.
 *
 * When swapping a photo in, pick for contrast rather than for palette: a flat
 * midday shot turns into limp grey once desaturated, no matter how nice it
 * looks in colour.
 */

const BASE = '/images/template4'

/** Cover: the couple small in a dark frame — the empty top half is where the
 *  names sit, so a photo with a busy sky cannot replace this one. */
export const cover = `${BASE}/cover.jpg`

/** Our Love Story portrait. */
export const story = `${BASE}/story.jpg`

/** Wide band, first: dress and bouquet against grass. */
export const walk = `${BASE}/walk.jpg`

/** Fills the black panel beside the first band. */
export const bloom = `${BASE}/bloom.jpg`

/** Schedule of events, beside the timetable. */
export const table = `${BASE}/table.jpg`

/** Gift section, left. */
export const ring = `${BASE}/ring.jpg`

/** Gift section, right. */
export const detail = `${BASE}/detail.jpg`

/** Wide band, second — closing image before the contact block. */
export const closing = `${BASE}/closing.jpg`

/**
 * Unsplash photo IDs keyed by local filename, for tracing or re-fetching:
 *   https://images.unsplash.com/<id>?auto=format&fit=crop&w=1600&q=80
 */
export const CREDITS: Record<string, string> = {
  cover: 'photo-1504227986464-b07ae4f486f4',
  story: 'photo-1633638990410-c828b4f27f24',
  walk: 'photo-1631687688319-ffd10d7e530b',
  bloom: 'photo-1617872051806-e9e08b70d3af',
  table: 'photo-1677768061409-3d4fbd0250d1',
  ring: 'photo-1595662000432-f8cdba893fa4',
  detail: 'photo-1614750880774-6e5cb149607b',
  closing: 'photo-1634729108603-b3ea9ea28cc9',
}
