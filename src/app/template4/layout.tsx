import { Cinzel, Cormorant_Garamond, Space_Grotesk } from "next/font/google";

/**
 * Template 4's faces. Cinzel takes every capitalised label and numeral, Space
 * Grotesk every flowing sentence.
 *
 * Cormorant is here for exactly three glyphs: the decorative italic ampersands
 * in the cover, the intro and the footer. Neither Cinzel nor Space Grotesk has
 * a true italic, and a browser-synthesised oblique looks wrong at that size.
 *
 * Space Grotesk stands in for Agrandir, which Pangram Pangram licenses per
 * project and which cannot ship in a paid product without buying it. Swapping
 * the real thing in later means changing this import and one token in
 * globals.css — no component names a font.
 */
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["italic"],
});

export default function Template4Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${cinzel.variable} ${spaceGrotesk.variable} ${cormorant.variable}`}
    >
      {children}
    </div>
  );
}
