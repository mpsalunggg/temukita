type WaveProps = {
  /** Which edge of the parent section the wave sits on. */
  position?: 'top' | 'bottom'
  /** Tailwind text-color class — drives the SVG fill via currentColor. */
  className?: string
  /** Render a softer, layered double wave instead of a single curve. */
  layered?: boolean
}

/**
 * Decorative SVG wave divider. Place inside a `relative` (and ideally
 * `overflow-hidden`) section; the fill color comes from the `text-*` class
 * so it can blend into the neighbouring section's background.
 */
export function Wave({
  position = 'bottom',
  className = 'text-surface',
  layered = false,
}: WaveProps) {
  return (
    <div
      aria-hidden
      className={[
        'pointer-events-none absolute inset-x-0 z-20 leading-[0]',
        position === 'bottom' ? 'bottom-0' : 'top-0',
        className,
      ].join(' ')}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={[
          'block h-[56px] w-full sm:h-[88px]',
          position === 'top' ? 'rotate-180' : '',
        ].join(' ')}
        fill="currentColor"
      >
        {layered && (
          <path
            className="opacity-40"
            d="M0,72 C220,24 420,112 660,80 C900,48 1080,8 1320,40 C1380,48 1410,56 1440,60 L1440,120 L0,120 Z"
          />
        )}
        <path d="M0,64 C180,112 360,16 540,32 C720,48 900,120 1080,104 C1260,88 1350,40 1440,56 L1440,120 L0,120 Z" />
      </svg>
    </div>
  )
}
