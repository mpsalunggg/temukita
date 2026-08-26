import { ImageResponse } from 'next/og'

/**
 * Link preview image.
 *
 * This product is shared almost entirely through WhatsApp, and until now the
 * link previewed with no image at all. Generated from code rather than a
 * committed PNG so the copy stays editable and there is no asset to keep in
 * sync.
 *
 * ponytail: uses the built-in font rather than loading Instrument Serif. Satori
 * needs a real .ttf on disk and none is committed; add one to `assets/` and
 * pass it via `fonts` if the brand face matters here later.
 */
export const alt = 'Temukita — undangan digital untuk pernikahan dan ulang tahun'

export const size = { width: 1200, height: 630 }

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '96px',
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          Temukita
        </div>

        {/* Satori requires an explicit display on any element with more than
            one child, so the two lines are separate flex items — not a <br>. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 28,
            fontSize: 82,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          <div>Undangan digital</div>
          <div>langsung dari satu tautan</div>
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 32,
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          Wedding Rp 199.000 · Birthday Rp 99.000 · bayar sekali
        </div>
      </div>
    ),
    size,
  )
}
