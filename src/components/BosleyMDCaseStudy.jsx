import { bosleyMDCaseStudy as study } from '../data/bosleyMD'
import SpotlightCard from './SpotlightCard'

export function BosleyMDCaseStudy() {
  return (
    <section className="relative scroll-mt-0 px-6 py-20 md:py-[120px]">
      <div className="mx-auto w-full max-w-[1100px]">
        <header className="max-w-[700px]">
          <p className="text-xs font-light uppercase tracking-[0.35em] text-brand-text/62">{study.eyebrow}</p>
          <h2 className="font-display mt-4 text-[32px] font-medium tracking-tight text-brand-text md:text-[40px]">
            {study.title}
          </h2>
          <p className="mt-3 text-sm font-light text-brand-text/72 md:text-base">{study.subtitle}</p>
          <p className="mt-6 text-sm font-normal leading-[1.55] text-brand-text/92 md:text-base">{study.summary}</p>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/92 md:text-base">
            {study.summaryContinued}
          </p>
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-12">
          {study.stats.map((stat) => (
            <li key={stat.label}>
              <SpotlightCard
                interactive={false}
                className="h-full rounded-2xl border border-brand-text/12 bg-brand-surface px-5 py-6 text-center shadow-[0_12px_36px_-20px_rgba(26,20,38,0.1)]"
                spotlightColor="rgba(178, 207, 192, 0.38)"
              >
                <p className="font-display text-3xl font-medium text-brand-text md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-xs font-normal leading-snug text-brand-text/78">{stat.label}</p>
              </SpotlightCard>
            </li>
          ))}
        </ul>

        <div className="mt-16 max-w-[720px] md:mt-20">
          <h3 className="font-display text-xl font-medium text-brand-text md:text-2xl">
            {study.strategicOpportunity.heading}
          </h3>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.strategicOpportunity.body}</p>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">
            {study.strategicOpportunity.bodyContinued}
          </p>
        </div>

        <div className="mt-16 max-w-[720px] md:mt-20">
          <h3 className="font-display text-xl font-medium text-brand-text md:text-2xl">{study.contribution.heading}</h3>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.contribution.body}</p>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2 md:mt-12">
          {study.contributionSkills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-brand-text/12 bg-brand-bg-muted/55 px-3 py-1 text-xs font-normal text-brand-text/88"
            >
              {skill}
            </li>
          ))}
        </ul>

        <div className="mt-16 md:mt-20">
          <h3 className="font-display text-center text-xl font-medium text-brand-text md:text-2xl">
            {study.recommendations.heading}
          </h3>
          <p className="mx-auto mt-4 max-w-[640px] text-center text-xs font-normal text-brand-text/68">
            {study.recommendations.targetsNote}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {study.recommendations.items.map((rec, index) => (
              <SpotlightCard
                key={rec.title}
                interactive={false}
                className="flex h-full flex-col rounded-2xl border border-brand-text/12 bg-brand-surface p-6 shadow-[0_12px_36px_-20px_rgba(26,20,38,0.1)] md:p-7"
                spotlightColor="rgba(178, 207, 192, 0.38)"
              >
                <p className="text-xs font-light uppercase tracking-wider text-brand-text/62">
                  Recommendation {index + 1}
                </p>
                <h4 className="font-display mt-2 text-lg font-medium leading-snug text-brand-text">{rec.title}</h4>
                <p className="mt-4 flex-1 text-sm font-normal leading-[1.55] text-brand-text/88">{rec.body}</p>
                <div className="mt-6 rounded-xl border border-brand-accent-fg/25 bg-brand-bg-muted/50 px-4 py-4">
                  <p className="text-xs font-light uppercase tracking-wider text-brand-accent-fg/90">Proposed objective</p>
                  <p className="mt-2 text-sm font-medium leading-[1.55] text-brand-text">{rec.objective}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-[720px] md:mt-20">
          <h3 className="font-display text-xl font-medium text-brand-text md:text-2xl">{study.selection.heading}</h3>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.selection.body}</p>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.selection.bodyContinued}</p>
        </div>
      </div>
    </section>
  )
}
