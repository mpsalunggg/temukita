import { Instrument_Serif } from "next/font/google";

/**
 * High-contrast display serif — template 1's face, and only template 1's.
 * Loaded here rather than in the root layout so routes that never render this
 * invitation do not download it.
 */
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

export default function Template1Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={instrument.variable}>{children}</div>;
}
