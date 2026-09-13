/**
 * Everything template 7 says, as data.
 *
 * The template used to carry its copy as constants scattered through the JSX,
 * which meant a second family could not use it without someone editing the
 * component. Now the component renders a record and nothing else, so a new
 * invitation is a new object — eventually a database row.
 *
 * Two rules keep it that way:
 *
 * 1. NO IMPORTS. This file names an icon; `Template7Page` maps the name to the
 *    artwork. A record that reached for `assets.ts` could not come from a CMS.
 * 2. WORDS THAT CHANGE WITH THE BABY LIVE HERE. `sebutan` is "Putri Kami" for a
 *    girl and "Putra Kami" for a boy, and the same swap runs through the salam.
 *    They read as boilerplate right up until the template is used for a son.
 *
 * Guest names are NOT part of this. Those arrive per-visitor through `?to=` —
 * see `Template7Intro`.
 */

/** The four artwork glyphs the event table can draw. */
export type AcaraIcon = 'calendar' | 'clock' | 'bow' | 'pin'

export type AcaraItem = {
  icon: AcaraIcon
  label: string
  /** One entry per rendered line; a long address should not rely on wrapping. */
  lines: string[]
}

export type AkikahContent = {
  /** The baby. The largest thing on the page, and the point of it. */
  bayi: string
  /** Sits above the name: "Putri Kami" / "Putra Kami". */
  sebutan: string
  /** Sits above the parents: "Putri dari" / "Putra dari". */
  sebutanOrangTua: string
  orangTua: string
  /** Display string, not a Date — it is typeset, never compared or sorted. */
  tanggal: string
  acara: AcaraItem[]
  /** Opens in a new tab from "Lihat lokasi". */
  maps: string
  salam: {
    pembuka: string
    isi: string
  }
  /** One entry per line. The line breaks are the author's, not the browser's. */
  doa: string[]
  penutup: {
    terimaKasih: string
    salam: string
    keluarga: string
  }
  /** Feeds `metadata` in the route, so the page and its preview cannot disagree. */
  meta: {
    title: string
    description: string
  }
}

/** The invitation served at `/template7`. */
export const azhaliya: AkikahContent = {
  bayi: 'Azhaliya Inayah Safia',
  sebutan: 'Putri Kami',
  sebutanOrangTua: 'Putri dari',
  orangTua: 'Andri Murfin & Nur Afrianti Rudtin',
  tanggal: 'Sabtu, 20 Juni 2026',

  acara: [
    { icon: 'calendar', label: 'Hari & Tanggal', lines: ['Sabtu, 20 Juni 2026'] },
    { icon: 'clock', label: 'Waktu', lines: ['10.00–13.00 WIB'] },
    { icon: 'bow', label: 'Acara', lines: ['Tasyakuran Akikah'] },
    {
      icon: 'pin',
      label: 'Lokasi',
      lines: ['Rumah Kami', 'Jl. Melati No. 12', 'Palu, Sulawesi Tengah'],
    },
  ],

  maps: 'https://www.google.com/maps/search/?api=1&query=Palu+Sulawesi+Tengah',

  salam: {
    pembuka: 'Assalamu’alaikum Warahmatullahi Wabarakatuh',
    isi: 'Dengan penuh rasa syukur kepada Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara tasyakuran akikah putri kami.',
  },

  doa: [
    '“Semoga Ananda tumbuh menjadi anak yang sehat,',
    'sholehah, berbakti kepada kedua orang tua,',
    'berguna bagi agama, bangsa, dan negara.”',
  ],

  penutup: {
    terimaKasih: 'Terima kasih atas doa dan kehadiran Bapak/Ibu/Saudara/i',
    salam: 'Kami yang berbahagia,',
    keluarga: 'Keluarga Besar',
  },

  meta: {
    title: 'Azhaliya Inayah Safia — Undangan Tasyakuran Akikah',
    description:
      'Dengan penuh rasa syukur kepada Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara tasyakuran akikah putri kami. Sabtu, 20 Juni 2026 · Palu, Sulawesi Tengah.',
  },
}
