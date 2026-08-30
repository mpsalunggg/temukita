import { Cinzel, Cormorant_Garamond, Cormorant_SC } from "next/font/google";

/**
 * Template 2's three faces. Cinzel carries the engraved capitals, Cormorant SC
 * every eyebrow and field label, Cormorant the body copy and pull quotes.
 *
 * Cinzel is shared with template 4; the two still do not read alike, because
 * template 2 pairs it with Cormorant SC over midnight green and gold while
 * template 4 pairs it with Space Grotesk over flat black and white.
 */
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

/**
 * Real small caps, not `text-transform: uppercase`. Used for eyebrows and field
 * labels in place of the 10px / all-caps / 0.5em-tracking treatment, which is
 * the single most recognisable tell of a generated page.
 */
const cormorantSC = Cormorant_SC({
  variable: "--font-cormorant-sc",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export default function Template2Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${cinzel.variable} ${cormorant.variable} ${cormorantSC.variable}`}
    >
      {children}
    </div>
  );
}
