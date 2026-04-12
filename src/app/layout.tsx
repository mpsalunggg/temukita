import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Temukita — Undangan digital yang anggun dan mudah",
  description:
    "Buat undangan online untuk pernikahan dan acara spesial. Desain rapi, RSVP terintegrasi, dan dibagikan lewat satu tautan.",
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
