/**
 * Template 7 artwork — cropped from a single illustrated sheet the client
 * supplied, `ChatGPT Image Sep 12, 2026, 06_18_20 PM.png` (1536×1024).
 *
 * The sheet arrived with a real alpha channel, so every element was already
 * cut out; each file below is a byte-exact RGBA rectangle lifted straight from
 * it — no resampling, no re-quantising. The only edit was zeroing alpha under 8,
 * which removed a sheet-wide haze that carried no visible colour.
 *
 * Two rules govern replacements here, and both differ from the photo templates:
 *
 * 1. TRANSPARENCY IS THE POINT. These sit directly on the page, not inside a
 *    frame. A replacement with a baked background reads as a sticker. Every one
 *    of them is served with `unoptimized` for the same reason — see the `Art`
 *    helper in `Template7Page`.
 * 2. ONE HAND. They all come from one sheet and share a palette, a line weight
 *    and a paper texture. Mixing in artwork from elsewhere is what makes a
 *    nursery page look assembled rather than drawn, so a replacement means
 *    redrawing the set, not swapping one file.
 *
 * `baby.png` is the only one with a meaningful `alt`; the rest are decoration
 * and are rendered `alt=""`.
 */

const BASE = '/images/template7'

/** The hero: a sleeping baby girl on a scalloped pillow, flowers at her side. */
export const baby = `${BASE}/baby.png`

/**
 * The foliage below is DELIBERATELY UNRENDERED as of the pinky-white theme.
 *
 * These six — the two sprigs, the two leaf stems and the two bouquets — are the
 * only olive artwork on the sheet, and they measure 15–38% of opaque pixels
 * below luminance 0.25, which made them the darkest mass on a page that is
 * meant to read pink. The files and exports stay because they are the client's
 * artwork and this is a theme decision, not a deletion: re-rendering them is a
 * one-line change per call site.
 */

/** Eucalyptus stem. Unrendered — see the note above. */
export const leafSprig = `${BASE}/leaf-sprig.png`

/** Pink berry stem — hero, paired against the eucalyptus. */
export const berrySprig = `${BASE}/berry-sprig.png`

/** A tied bow. Stands in for "Acara" in the Detail Acara row. */
export const bow = `${BASE}/bow.png`

/** Single daisy, above the salam. */
export const daisy = `${BASE}/daisy.png`

/** A second, slightly open daisy — hero scatter. */
export const daisySm = `${BASE}/daisy-sm.png`

/** Hearts, two sizes, both hero scatter. */
export const heart = `${BASE}/heart.png`
export const heartSm = `${BASE}/heart-sm.png`

/** Cloud and star — the two softest things on the sheet, both hero scatter. */
export const cloud = `${BASE}/cloud.png`
export const star = `${BASE}/star.png`

/** Flower bouquets, for the two bottom corners of the closing band. */
export const bloom = `${BASE}/bloom.png`
export const bloomLg = `${BASE}/bloom-lg.png`

/** Leaf stems that bleed in from the edges of the salam band. */
export const leafTall = `${BASE}/leaf-tall.png`
export const leafSmall = `${BASE}/leaf-small.png`

/** Dashed rule broken by a heart — the separator, used three times. */
export const divider = `${BASE}/divider.png`

/** Outline icons for the Detail Acara row, and the date line in the hero. */
export const calendar = `${BASE}/calendar.png`
export const clock = `${BASE}/clock.png`
export const pin = `${BASE}/pin.png`

/** Banner behind each section heading. */
export const ribbon = `${BASE}/ribbon.png`

/**
 * Native pixel size of each file. Every ornament renders through `Art`, which
 * uses `fill` — the repo's convention at all 29 other `<Image>` call sites — and
 * `fill` needs the wrapper to carry the aspect ratio. Reading it from here beats
 * hand-typing `aspect-[149/194]` at twenty call sites and getting one wrong.
 */
export const SIZE = {
  baby: [536, 545],
  leafSprig: [149, 194],
  berrySprig: [102, 171],
  bow: [237, 188],
  daisy: [85, 81],
  daisySm: [86, 83],
  heart: [101, 97],
  heartSm: [71, 64],
  cloud: [228, 143],
  star: [80, 79],
  bloom: [260, 187],
  bloomLg: [288, 200],
  leafTall: [161, 306],
  leafSmall: [96, 138],
  divider: [383, 40],
  calendar: [129, 135],
  clock: [131, 130],
  pin: [82, 129],
  ribbon: [507, 114],
} as const satisfies Record<string, readonly [number, number]>

/**
 * Where each file was cut from the sheet, as `[x, y, w, h]`. Kept so a crop can
 * be redone or widened without hunting for the box again — the same job the
 * `CREDITS` maps do for the Unsplash-sourced templates.
 *
 * One asset on the sheet is deliberately unused: the pink pill at [1189, 657,
 * 302, 96], drawn as a "Lihat Lokasi" button. It stays a real HTML button here
 * so it keeps a focus ring, selectable text and a width that follows its label;
 * only its colour was taken, as `--rose`.
 */
export const CROPS: Record<keyof typeof SIZE, readonly [number, number, number, number]> = {
  baby: [48, 66, 536, 545],
  leafSprig: [1196, 73, 149, 194],
  berrySprig: [1387, 89, 102, 171],
  bow: [602, 102, 237, 188],
  daisy: [1060, 105, 85, 81],
  daisySm: [1392, 845, 86, 83],
  heart: [897, 112, 101, 97],
  heartSm: [1387, 372, 71, 64],
  cloud: [632, 320, 228, 143],
  star: [893, 331, 80, 79],
  bloom: [1058, 310, 260, 187],
  bloomLg: [303, 761, 288, 200],
  leafTall: [61, 667, 161, 306],
  leafSmall: [1231, 839, 96, 138],
  divider: [647, 549, 383, 40],
  calendar: [571, 644, 129, 135],
  clock: [982, 652, 131, 130],
  pin: [798, 650, 82, 129],
  ribbon: [662, 847, 507, 114],
}
