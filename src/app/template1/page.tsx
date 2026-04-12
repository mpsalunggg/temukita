import type { Metadata } from "next";
import { Template1Page } from "@/components/templates/template1/Template1Page";

export const metadata: Metadata = {
  title: "Arinda & Bagas — Undangan Pernikahan",
  description:
    "Kami mengundang Anda untuk hadir dan berbagi kebahagiaan di hari pernikahan kami. 14 Juni 2026 · The Kana Bali, Canggu.",
};

export default function Template1Route() {
  return <Template1Page />;
}
