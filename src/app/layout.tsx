import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

/**
 * Only the body face lives here.
 *
 * The invitation templates each want their own display faces, and for a while
 * all of them were loaded from this file — which meant the landing page paid
 * for six typefaces to render one. Each template now loads what it needs from
 * its own `layout.tsx`, so `/` and `/templates` download Bricolage and nothing
 * else. Adding a face here again puts it on every route; put it in the
 * template's layout instead.
 */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
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
    <html lang="id" className={`${bricolage.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
