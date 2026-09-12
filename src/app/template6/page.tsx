import type { Metadata } from "next";
import { Template6Page } from "@/components/templates/template6/Template6Page";

export const metadata: Metadata = {
  title: "Fatimah & Fauzan — Undangan Pernikahan",
  description:
    "Bismillahirrahmanirrahim. Dengan memohon rahmat Allah, kami mengundang Anda pada akad nikah dan walimatul 'urs kami. 12 Juni 2027 · Masjid Al-Hikmah, Yogyakarta.",
};

export default function Template6Route() {
  return <Template6Page />;
}
