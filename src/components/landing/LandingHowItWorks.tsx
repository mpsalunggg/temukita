import { Reveal } from './Reveal'
import { Section, SectionHeading } from './ui'

const steps = [
  {
    step: '01',
    title: 'Pilih gaya',
    text: 'Sesuaikan undangan dengan nuansa acara — dari formal hingga santai.',
  },
  {
    step: '02',
    title: 'Isi detail',
    text: 'Tambahkan waktu, lokasi, cerita singkat, dan informasi yang ingin disampaikan.',
  },
  {
    step: '03',
    title: 'Bagikan tautan',
    text: 'Undangan siap dibagikan. Tamu membuka satu halaman yang konsisten di semua perangkat.',
  },
]

export function LandingHowItWorks() {
  return (
    <Section id="cara-kerja" labelledBy="cara-kerja-heading">
      <Reveal>
        <SectionHeading
          id="cara-kerja-heading"
          eyebrow="Alur"
          title={
            <>
              Cara <span className="text-accent">kerja</span>
            </>
          }
        >
          Tiga langkah sederhana dari ide hingga undangan yang bisa dibagikan.
        </SectionHeading>
      </Reveal>

      <ol className="mt-14 grid gap-10 sm:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.08}>
            <li>
              <span className="inline-flex h-7 items-center rounded-full bg-accent/10 px-2.5 text-xs font-bold tabular-nums tracking-wider text-accent ring-1 ring-inset ring-accent/15">
                {s.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-subtle">
                {s.text}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
