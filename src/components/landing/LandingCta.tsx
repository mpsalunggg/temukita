import { Reveal } from './Reveal'
import { Button, Section, SectionHeading } from './ui'
import { Wave } from './Wave'

export function LandingCta() {
  return (
    <Section
      labelledBy="cta-heading"
      tone="none"
      className="bg-linear-to-br from-accent via-accent to-accent-hover py-24 sm:py-32"
      innerClassName="text-center"
      bleed={
        <>
          {/* wave coming down from the pricing section */}
          <Wave position="top" className="text-surface" layered />

          {/* soft drifting wave accents */}
          <div
            className="animate-wave-drift pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-[100%] bg-white/10 blur-3xl"
            aria-hidden
          />
          <div
            className="animate-wave-drift pointer-events-none absolute -right-16 bottom-4 h-56 w-72 rounded-[100%] bg-white/10 blur-3xl"
            aria-hidden
          />

          {/* wave flowing into the footer */}
          <Wave position="bottom" className="text-background" />
        </>
      }
    >
      <Reveal>
        <SectionHeading
          id="cta-heading"
          title={
            <>
              Siap membuat undangan digital{' '}
              <span className="text-ring">pertama Anda?</span>
            </>
          }
          tone="dark"
          align="center"
        >
          Mulai dari satu halaman yang tenang dan mudah dibagikan — lalu
          kembangkan sesuai kebutuhan acara Anda.
        </SectionHeading>

        <div className="mt-10">
          <Button href="#harga" variant="inverted" size="lg">
            Buat undangan
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
