import type { Metadata } from "next";
import { Template3Page } from "@/components/templates/template3/Template3Page";

export const metadata: Metadata = {
  title: "Mawar & Bima — Undangan Pernikahan",
  description:
    "Kami mengundang Anda untuk hadir dan berbagi kebahagiaan di hari pernikahan kami. 12 Oktober 2026 · Plataran Cilandak, Jakarta.",
};

export default function Template3Route() {
  return <Template3Page />;
}
