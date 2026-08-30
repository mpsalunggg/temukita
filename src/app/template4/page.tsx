import type { Metadata } from "next";
import { Template4Page } from "@/components/templates/template4/Template4Page";

export const metadata: Metadata = {
  title: "Kirana & Dimas — Undangan Pernikahan",
  description:
    "Kami mengundang Anda untuk hadir dan berbagi kebahagiaan di hari pernikahan kami. 7 November 2026 · Pendopo Kayu Manis, Yogyakarta.",
};

export default function Template4Route() {
  return <Template4Page />;
}
