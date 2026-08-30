import type { Metadata } from "next";
import { Template5Page } from "@/components/templates/template5/Template5Page";

export const metadata: Metadata = {
  title: "Anindya & Rafi — Undangan Pernikahan",
  description:
    "Kami mengundang Anda untuk hadir dan berbagi kebahagiaan di hari pernikahan kami. 25 April 2027 · Pendopo Kembang Setaman.",
};

export default function Template5Route() {
  return <Template5Page />;
}
