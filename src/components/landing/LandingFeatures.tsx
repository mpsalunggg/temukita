import { Reveal } from './Reveal'
import { Icon, Section, SectionHeading } from './ui'
import { Wave } from './Wave'

const features = [
  {
    title: 'Desain tenang dan fleksibel',
    description:
      'Pilih gaya yang selaras dengan acara Anda. Tipografi dan warna diset agar nyaman dibaca tanpa terasa berlebihan.',
    icon: (
      <Icon>
        <path d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.077c0-.19-.01-.377-.027-.56a3 3 0 0 0-.073-1.18M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </Icon>
    ),
  },
  {
    title: 'RSVP tanpa ribet',
    description:
      'Tamu bisa mengonfirmasi kehadiran lewat undangan. Anda mendapat gambaran jumlah tamu secara terpusat.',
    icon: (
      <Icon>
        <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </Icon>
    ),
  },
  {
    title: 'Peta & arah lokasi',
    description:
      'Sematkan petunjuk menuju venue agar tamu tidak perlu mencari alamat di obrolan terpisah.',
    icon: (
      <Icon>
        <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </Icon>
    ),
  },
  {
    title: 'Satu tautan untuk dibagikan',
    description:
      'Bagikan undangan lewat pesan atau media sosial. Tampilan tetap rapi di ponsel maupun desktop.',
    icon: (
      <Icon>
        <path d="M13.19 8.688a4.5 4.5 0 0 1 6.364 6.364l-3 3a4.5 4.5 0 0 1-6.364-6.364l1.5-1.5Zm-6.364 6.364a4.5 4.5 0 0 1 6.364 0l3 3a4.5 4.5 0 0 1-6.364 6.364l-1.5-1.5a4.5 4.5 0 0 1 0-6.364Z" />
      </Icon>
    ),
  },
]

export function LandingFeatures() {
  return (
    <Section
      id="fitur"
      labelledBy="fitur-heading"
      tone="surface"
      bleed={<Wave position="bottom" className="text-background" />}
    >
      <Reveal>
        <SectionHeading
          id="fitur-heading"
          eyebrow="Fitur"
          title={
            <>
              Yang Anda butuhkan untuk{' '}
              <span className="text-accent">undangan digital</span>
            </>
          }
        >
          Fokus pada kejelasan dan kenyamanan tamu — bukan pada elemen yang
          mengalihkan perhatian dari momen Anda.
        </SectionHeading>
      </Reveal>

      <ul className="mt-14 grid gap-8 sm:grid-cols-2">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={(i % 2) * 0.08}>
            <li className="h-full rounded-2xl border border-border/80 bg-background/60 p-6 shadow-sm shadow-foreground/5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/15">
                {f.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-subtle">
                {f.description}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
