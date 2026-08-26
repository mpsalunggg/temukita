'use client'

import { useState } from 'react'
import { Button, CheckIcon } from './ui'

export type Plan = {
  slug: string
  name: string
  subtitle: string
  /** `null` = tidak dipajang, arahkan ke percakapan. */
  price: number | null
  /** Qualifier under the price. Bespoke work has no fixed scope to quote. */
  priceNote?: string
  activeMonths: number
  /** Jumlah undangan yang bisa dikirim. `null` = tanpa batas. */
  inviteQuota: number | null
  waQuota: number
  ctaHref: string
  ctaLabel: string
}

/** One top-up block: how many extra undangan, and what it costs. */
const STEP_INVITES = 100
const STEP_PRICE = 25_000
/** Past this, Custom is cheaper than stacking top-ups — say so instead of selling. */
const MAX_STEPS = 9

const rupiah = (n: number) => `Rp ${n.toLocaleString('id-ID')}`

export function PricingCard({
  plan,
  features,
}: {
  plan: Plan
  features: string[]
}) {
  const [steps, setSteps] = useState(0)

  const invites =
    plan.inviteQuota === null ? null : plan.inviteQuota + steps * STEP_INVITES
  const total = plan.price === null ? null : plan.price + steps * STEP_PRICE

  const specs: [string, string, boolean][] = [
    ['Masa aktif', `${plan.activeMonths} bulan`, false],
    ['Undangan', invites === null ? 'Tanpa batas' : `${invites}`, false],
    ['WA blast', `${plan.waQuota} pesan`, true],
  ]

  return (
    <div className="flex w-full flex-col rounded-2xl border border-border bg-background shadow-sm shadow-foreground/5">
      {/* Name + event scope */}
      <div className="px-6 pt-6">
        <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
        <p className="pt-1 text-xs text-subtle">{plan.subtitle}</p>
      </div>

      {/* Price. Fixed two-line block — a wrapping qualifier would push this
          card's spec strip out of line with its neighbours. */}
      <div className="px-6 pt-4">
        <p className="text-2xl font-bold text-accent tabular-nums">
          {total === null ? 'Hubungi kami' : rupiah(total)}
        </p>
        <p className="mt-0.5 text-xs font-medium text-subtle">
          {steps > 0
            ? `termasuk +${steps * STEP_INVITES} undangan`
            : (plan.priceNote ?? 'sekali bayar')}
        </p>
      </div>

      {/* Quotas — spec sheet, deliberately not bullets */}
      <dl className="mx-6 mt-5 divide-y divide-border rounded-xl border border-border bg-surface px-4">
        {specs.map(([label, value, soon]) => (
          <div
            key={label}
            className="flex items-baseline justify-between py-2.5 text-sm"
          >
            <dt className="text-subtle">{label}</dt>
            <dd className="font-semibold tabular-nums text-foreground">
              {value}
              {soon && (
                <span className="ml-1.5 rounded bg-accent/10 px-1 py-0.5 align-middle text-[9px] font-medium uppercase tracking-wide text-accent">
                  Segera
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      {/* One list, identical in every plan. What differs is in the specs above. */}
      <ul className="mt-5 flex flex-col gap-2.5 px-6">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground">
            <CheckIcon />
            {f}
          </li>
        ))}
      </ul>

      {/* Pinned to the bottom. The top-up control lives here rather than up by
          the quotas on purpose: only two of the three plans have one, and any
          height difference has to land in this flexible zone — otherwise it
          pushes the shared feature list out of line across the cards. */}
      <div className="mt-auto px-6 pb-6 pt-8">
        {invites !== null && (
          <div className="mb-4">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-border px-3 py-2">
              <span className="text-xs text-subtle">
                Tambah undangan
                <span className="block text-[11px] text-subtle/80">
                  +{STEP_INVITES} · {rupiah(STEP_PRICE)}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <StepButton
                  label={`Kurangi ${STEP_INVITES} undangan`}
                  onClick={() => setSteps((s) => Math.max(0, s - 1))}
                  disabled={steps === 0}
                >
                  −
                </StepButton>
                <span className="w-8 text-center text-sm font-semibold tabular-nums text-foreground">
                  {steps}
                </span>
                <StepButton
                  label={`Tambah ${STEP_INVITES} undangan`}
                  onClick={() => setSteps((s) => Math.min(MAX_STEPS, s + 1))}
                  disabled={steps === MAX_STEPS}
                >
                  +
                </StepButton>
              </span>
            </div>
            {steps === MAX_STEPS && (
              <p className="mt-2 text-[11px] leading-relaxed text-subtle">
                Butuh lebih banyak? Paket Custom sudah tanpa batas undangan.
              </p>
            )}
          </div>
        )}
        <Button href={plan.ctaHref} full>
          {plan.ctaLabel}
        </Button>
      </div>
    </div>
  )
}

function StepButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:text-subtle/40 disabled:hover:border-border disabled:hover:bg-transparent"
    >
      {children}
    </button>
  )
}
