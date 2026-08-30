/**
 * Template 2 photography — sourced from Unsplash (free licence, attribution not
 * required) and downloaded into `public/images/template2/` at w=1600 q=80.
 *
 * Stored locally rather than hot-linked so the invitation does not break if a
 * photo is moved or removed upstream. Source IDs are in `CREDITS` below so the
 * set can be traced or re-fetched.
 *
 * Every frame here is deliberately dark and warm-lit. Before swapping one in,
 * compare it against the others — a single daylight shot breaks the midnight
 * palette no matter how much veil is laid over it.
 */

const BASE = '/images/template2'

export const cover = `${BASE}/cover.jpg`
export const garden = `${BASE}/garden.jpg`
export const ceremony = `${BASE}/ceremony.jpg`
export const table = `${BASE}/table.jpg`

/** The two portraits shown side by side in the Mempelai section. */
export const bride = `${BASE}/bride.jpg`
export const groom = `${BASE}/groom.jpg`

/** Love-story milestones, in narrative order. */
export const story = [
  `${BASE}/early.jpg`,
  `${BASE}/rings.jpg`,
  `${BASE}/proposal.jpg`,
  `${BASE}/celebration.jpg`,
] as const

/**
 * Bento tiles, in placement order — index maps to a fixed grid area in
 * `Template2Page`, so reordering changes the layout. `florals` sits in a small
 * square rather than a wide slot: it is nearly black, and stretched two columns
 * wide it read as a hole rather than a photograph.
 */
export const bento = [
  `${BASE}/lights.jpg`,
  `${BASE}/florals.jpg`,
  `${BASE}/roses.jpg`,
  `${BASE}/candles.jpg`,
  `${BASE}/cufflink.jpg`,
  `${BASE}/banner.jpg`,
  `${BASE}/venue.jpg`,
  `${BASE}/sparklers.jpg`,
  `${BASE}/fern.jpg`,
] as const

/**
 * Unsplash photo IDs keyed by local filename, for tracing or re-fetching:
 *   https://images.unsplash.com/<id>?auto=format&fit=crop&w=1600&q=80
 */
export const CREDITS: Record<string, string> = {
  cover: 'photo-1613256252940-8f76f3a1ec4b',
  garden: 'photo-1773916793372-d52e7294e6cf',
  ceremony: 'photo-1770217614322-0e3bd39ed212',
  table: 'photo-1754466511458-26a1d96d1c45',
  candles: 'photo-1744918712163-64993d95d6be',
  sparklers: 'photo-1637690087260-cb6a20d9e339',
  banner: 'photo-1783314863884-be035ed5ed5c',
  lights: 'photo-1547367862-cee27f307218',
  fern: 'photo-1616247279075-c38eb2837efa',
  roses: 'photo-1778861675433-a28590550789',
  rings: 'photo-1525978850950-a38f94a1f1a1',
  bride: 'photo-1492175742197-ed20dc5a6bed',
  celebration: 'photo-1768777273847-e5d8531b7fc5',
  cufflink: 'photo-1769628027250-d2a7a5a4eb64',
  venue: 'photo-1783137675814-c2170404a033',
  florals: 'photo-1580417862267-2a44d5187f5c',
  groom: 'photo-1785336872849-c91b24816fcf',
  early: 'photo-1549997965-dbf7d99eaca5',
  proposal: 'photo-1549997966-5dd46b8e2b06',
}
