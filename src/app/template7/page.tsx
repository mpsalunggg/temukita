import type { Metadata, Viewport } from 'next'
import { Template7Page } from '@/components/templates/template7/Template7Page'

export const metadata: Metadata = {
  title: 'Khanza Almahyra — Undangan Tasyakuran Akikah',
  description:
    'Dengan penuh rasa syukur kepada Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara tasyakuran akikah putri kami. Sabtu, 14 Juni 2025 · Palu, Sulawesi Tengah.',
}

/* Its own export, not `metadata.themeColor` — that key is deprecated. */
export const viewport: Viewport = { themeColor: '#faf5ed' }

export default function Template7Route() {
  return <Template7Page />
}
