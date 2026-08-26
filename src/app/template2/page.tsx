import type { Metadata } from "next";
import { Template2Page } from "@/components/templates/template2/Template2Page";

export const metadata: Metadata = {
  title: "Raisa & Daniel — Undangan Pernikahan",
  description:
    "Kami mengundang Anda untuk hadir dan berbagi kebahagiaan di hari pernikahan kami. 20 September 2026 · Grand Ballroom, Hotel Mulia, Jakarta.",
};

export default function Template2Route() {
  return <Template2Page />;
}
