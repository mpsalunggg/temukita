import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Cinzel,
  Cormorant_Garamond,
  Cormorant_SC,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

// Elegant editorial serif — used for invitation display headings (names, dates).
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

// High-contrast display serif — invitation names, section numerals, pull quotes.
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

// Engraved roman capitals — template 2's display face. Deliberately unlike
// Instrument Serif so the two invitations never read as the same design.
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
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

export const metadata: Metadata = {
  // Without this, og:image resolves against localhost and no link preview
  // renders in WhatsApp — which is how this product is actually shared.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://temukita.id",
  ),
  title: "Temukita — Undangan digital yang anggun dan mudah",
  description:
    "Buat undangan online untuk pernikahan dan ulang tahun. Desain rapi, RSVP terintegrasi, dan dibagikan lewat satu tautan.",
  openGraph: {
    title: "Temukita — Undangan digital",
    description:
      "Undangan online yang tenang dipandang, mudah dibagikan, dan siap untuk momen berarti Anda.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${bricolage.variable} ${cormorant.variable} ${instrument.variable} ${cinzel.variable} ${cormorantSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
