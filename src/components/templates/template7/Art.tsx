'use client'

import Image from 'next/image'

/**
 * Decorative artwork from the sheet.
 *
 * `fill` plus a ratio box, which is how all 29 other `<Image>` call sites in
 * this repo are written — but here the ratio comes from `SIZE` rather than an
 * `aspect-*` class, so a caller sets one dimension and the other follows.
 *
 * The caller MUST pass a position — `relative` for one in the flow, `absolute`
 * for a scattered one. This component deliberately does not default to
 * `relative`: `.relative` and `.absolute` sit in the same Tailwind layer, so a
 * caller's `absolute` would not reliably beat a built-in `relative` — the
 * winner is decided by order in the stylesheet, not order in the class list.
 * Either way the wrapper is positioned, which is what `fill` needs.
 *
 * `unoptimized` on purpose. These are transparent PNGs of 6–90KB, so the
 * optimizer saves nothing worth having, and Next's docs promise nothing about
 * alpha surviving the WebP re-encode that `formats` defaults to. `unoptimized`
 * is the documented "served as-is … instead of changing quality, size, or
 * format" guarantee. The baby is the one file big enough to be worth
 * optimising, so she is the one that does not use this.
 */
export function Art({
  src,
  size,
  className = '',
  ...rest
}: {
  src: string
  size: readonly [number, number]
  className?: string
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={`block ${className}`}
      style={{ aspectRatio: `${size[0]} / ${size[1]}` }}
    >
      <Image
        src={src}
        alt=""      /* always decoration — the baby is the one meaningful image
                        and she is rendered directly, not through Art */
        fill
        sizes="(min-width: 768px) 25vw, 45vw"
        unoptimized
        className="object-contain"
      />
    </span>
  )
}
