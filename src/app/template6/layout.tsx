import { Amiri_Quran, Marcellus } from "next/font/google";

/**
 * Template 6's two faces.
 *
 * Amiri Quran is a naskh design made specifically for fully vocalised Quranic
 * text — the harakat are drawn to sit correctly rather than collide. Note the
 * `arabic` subset: request `latin` here and the Arabic glyphs simply are not in
 * the file, so every verse silently falls back to a system serif.
 *
 * Marcellus carries the Latin headings. Cormorant is already spoken for by three
 * templates and Instrument Serif belongs to template 1; this one needs its own
 * voice.
 *
 * Body copy stays on Bricolage from the root layout.
 */
const amiriQuran = Amiri_Quran({
  variable: "--font-amiri-quran",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400"],
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export default function Template6Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${amiriQuran.variable} ${marcellus.variable}`}>
      {children}
    </div>
  );
}
