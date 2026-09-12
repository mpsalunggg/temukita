/**
 * The sleeping baby, drawn rather than photographed.
 *
 * This is the one drawing on the page that carries meaning, so unlike
 * everything in `Botanical.tsx` it is not `aria-hidden` — it gets a role and a
 * label. It is also the only polychrome piece here, which is why it does not
 * follow the `currentColor` contract the ornaments do.
 *
 * Where a fill exists in the palette it is taken from the CSS variable, so the
 * blanket and pillow shift with the template's tokens. Skin, hair and blush are
 * literal values: they are illustration-local, and promoting them to tokens in
 * `globals.css` would advertise a reuse that does not exist.
 *
 * The baby reads as a girl through the headband and bow, not through pink. The
 * reference's palette is sage and cream throughout, and a pink blanket would be
 * the one loud thing on an otherwise very quiet page.
 *
 * Everything is cream-on-cream, so separation comes from a single hairline in
 * `--fern-mist` around each cream shape plus an offset shadow under the pillow.
 * Without them the baby dissolves into the background.
 */

const SKIN = '#f6ddcd'
const SKIN_SHADE = '#eec4b0'
const HAIR = '#b98c64'
const LINE = '#6b4b3a'
const BLUSH = '#f0aca4'

/** The pillow outline, drawn twice — once offset as its own shadow. */
const PILLOW =
  'M136 46 C 200 39, 322 39, 386 47 C 442 54, 480 88, 476 142 C 472 212, 481 300, 474 353 C 467 407, 434 443, 380 440 C 308 436, 200 445, 136 440 C 82 435, 43 401, 47 347 C 51 279, 40 171, 47 137 C 56 86, 82 51, 136 46 Z'

/** The swaddle: a cocoon that tucks under the chin and narrows at the feet. */
const SWADDLE =
  'M184 240 C 154 266, 140 308, 146 346 C 154 394, 198 416, 256 416 C 316 416, 362 392, 368 344 C 373 304, 354 266, 326 240 C 308 266, 282 278, 252 278 C 220 278, 202 262, 184 240 Z'

type Props = {
  className?: string
  /** Overrides the default label when the name is known to the caller. */
  label?: string
}

export function BabyGirl({
  className = '',
  label = 'Ilustrasi bayi perempuan yang sedang tidur, terbungkus selimut',
}: Props) {
  return (
    <svg
      viewBox="0 0 520 470"
      role="img"
      aria-label={label}
      className={className}
    >
      {/* ---- pillow. Shadow first and offset, so what shows is a crescent down
              the lower-right edge; painting it after would cover the pillow. */}
      <path d={PILLOW} fill="var(--fern-mist)" transform="translate(10 18)" />
      <path
        d={PILLOW}
        fill="var(--milk-pure)"
        stroke="var(--fern-mist)"
        strokeWidth="2.5"
      />
      <path
        d="M104 316 C 168 352, 348 356, 424 302"
        fill="none"
        stroke="var(--fern-mist)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* ---- head */}
      <ellipse cx="172" cy="180" rx="13" ry="17" fill={SKIN} />
      <path
        d="M167 174 C 173 178, 174 186, 170 190"
        fill="none"
        stroke={SKIN_SHADE}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="248" cy="170" r="78" fill={SKIN} />

      {/* ---- hair: a cap with one curl, kept small so the face stays open */}
      <path
        d="M170 152 C 172 96, 214 66, 262 68 C 312 70, 332 102, 328 150 C 314 120, 292 104, 258 106 C 214 108, 188 126, 170 152 Z"
        fill={HAIR}
      />
      <path
        d="M254 68 C 274 49, 304 55, 310 79"
        fill="none"
        stroke={HAIR}
        strokeWidth="13"
        strokeLinecap="round"
      />

      {/* ---- headband and bow: the whole of the girl signal, and no pink */}
      <path
        d="M172 158 C 204 134, 248 126, 292 134 C 310 138, 322 144, 330 152"
        fill="none"
        stroke="var(--fern-blob)"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <g fill="var(--gold)">
        <path d="M306 128 C 294 112, 275 111, 273 123 C 271 135, 291 139, 306 128 Z" />
        <path d="M306 128 C 318 112, 337 113, 338 125 C 339 137, 321 139, 306 128 Z" />
        <circle cx="306" cy="128" r="6" />
      </g>

      {/* ---- face. Closed, downward-curved eyes with a lash tick each: the
              whole expression rides on four strokes, so they are the only lines
              in the drawing given real weight. */}
      <path
        d="M196 172 C 204 186, 222 186, 230 172"
        fill="none"
        stroke={LINE}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M266 172 C 274 186, 292 186, 300 172"
        fill="none"
        stroke={LINE}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M196 172 L 188 178"
        fill="none"
        stroke={LINE}
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <path
        d="M300 172 L 308 178"
        fill="none"
        stroke={LINE}
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <ellipse cx="197" cy="202" rx="19" ry="11" fill={BLUSH} opacity="0.5" />
      <ellipse cx="299" cy="202" rx="19" ry="11" fill={BLUSH} opacity="0.5" />
      <path
        d="M242 198 C 247 204, 253 204, 257 198"
        fill="none"
        stroke={SKIN_SHADE}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M234 214 C 243 226, 257 226, 266 214"
        fill="none"
        stroke="#cd8977"
        strokeWidth="3.6"
        strokeLinecap="round"
      />

      {/* ---- swaddle. Drawn after the head so the blanket edge tucks under the
              chin the way a real swaddle does. */}
      <path
        d={SWADDLE}
        fill="var(--milk-pure)"
        stroke="var(--fern-mist)"
        strokeWidth="2.5"
      />
      <path
        d="M184 240 C 154 266, 140 308, 146 346 C 152 386, 182 408, 220 416 C 184 392, 168 352, 172 312 C 176 280, 184 254, 198 242 Z"
        fill="var(--fern-mist)"
        opacity="0.45"
      />
      <path
        d="M326 242 C 298 296, 240 324, 174 322"
        fill="none"
        stroke="var(--fern-blob)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M180 358 C 234 384, 308 380, 362 346"
        fill="none"
        stroke="var(--fern-blob)"
        strokeWidth="3.4"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* ---- one hand up by the chin, the way infants sleep */}
      <path
        d="M288 252 C 298 238, 318 240, 323 253 C 328 246, 340 249, 340 259 C 340 272, 325 283, 308 280 C 293 277, 284 265, 288 252 Z"
        fill={SKIN}
      />
      <path
        d="M310 255 C 316 257, 320 262, 320 268"
        fill="none"
        stroke={SKIN_SHADE}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M301 260 C 307 262, 311 267, 311 273"
        fill="none"
        stroke={SKIN_SHADE}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
