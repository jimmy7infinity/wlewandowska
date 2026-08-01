/**
 * Timeline rail beside cards — tracks + dot use card surface (brand-surface).
 */
export function RoadmapRail({ step }) {
  const track =
    'w-px flex-1 bg-gradient-to-b from-transparent via-brand-surface to-brand-surface ring-1 ring-inset ring-brand-text/[0.12]'

  return (
    <div className="flex w-5 shrink-0 flex-col items-center self-stretch md:w-6" aria-hidden>
      <div className={`${track} via-35%`} />
      <span className="my-2 flex h-6 min-w-[1.5rem] shrink-0 items-center justify-center rounded-full border border-brand-text/12 bg-brand-surface px-1.5 font-mono text-[11px] font-medium tabular-nums text-brand-text/78">
        {step}
      </span>
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-brand-text/12 bg-brand-surface shadow-[0_0_0_2px_var(--color-brand-rail-halo)]"
      />
      <div className="bg-gradient-to-b from-brand-surface to-transparent from-40% w-px flex-1 ring-1 ring-inset ring-brand-text/[0.12]" />
    </div>
  )
}
