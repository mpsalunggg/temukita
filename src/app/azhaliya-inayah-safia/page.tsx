import type { Metadata, Viewport } from 'next'
import { Template7Page } from '@/components/templates/template7/Template7Page'
import { azhaliya } from '@/components/templates/template7/content'

/**
 * Built from the same record the page renders, so the invitation and its
 * WhatsApp preview cannot drift apart. They already had: this description
 * carried "14 Juni 2025" while the page said 20 Juni 2026.
 */
export const metadata: Metadata = {
  title: azhaliya.meta.title,
  description: azhaliya.meta.description,
}

/* Its own export, not `metadata.themeColor` — that key is deprecated. */
export const viewport: Viewport = { themeColor: '#fdf0eb' }

export default function Template7Route() {
  return <Template7Page />
}
