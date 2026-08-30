import { Cormorant_Garamond, IBM_Plex_Mono, Pinyon_Script } from "next/font/google";

/**
 * Template 5's three faces.
 *
 * Pinyon Script is deliberately confined to two places — the couple's names on
 * the cover and the "Contact Us" heading. Calligraphy used everywhere stops
 * feeling like an occasion and starts being hard to read.
 *
 * IBM Plex Mono carries every sentence, time and label. Wide-tracked monospace
 * body copy is the single decision that makes this template read the way the
 * reference does; swap it for a proportional sans and the whole thing collapses
 * into an ordinary invitation.
 */
const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

/** Section headings, set as widely tracked capitals. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

export default function Template5Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${pinyon.variable} ${plexMono.variable} ${cormorant.variable}`}
    >
      {children}
    </div>
  );
}
