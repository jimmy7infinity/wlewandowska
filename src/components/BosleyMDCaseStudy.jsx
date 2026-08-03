import { bosleyMDCaseStudy as study } from '../data/bosleyMD'
import { PdfLink, scrollToSection } from './caseStudyShared'
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

        <div className="mt-10 grid grid-cols-1 gap-6 rounded-2xl border border-brand-text/12 bg-brand-surface/80 p-6 md:mt-12 md:grid-cols-2 md:gap-8 md:p-8">
          <div>
            <p className="text-xs font-light uppercase tracking-wider text-brand-text/62">{study.role.label}</p>
            <p className="mt-2 text-sm font-normal leading-[1.55] text-brand-text/92">{study.role.value}</p>
          </div>
          <div>
            <p className="text-xs font-light uppercase tracking-wider text-brand-text/62">{study.deliverables.label}</p>
            <p className="mt-2 text-sm font-normal leading-[1.55] text-brand-text/92">{study.deliverables.value}</p>
          </div>
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
          <h3 className="font-display text-xl font-medium text-brand-text md:text-2xl">Key findings</h3>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {study.findings.map((item) => (
            <article key={item.title} className="min-w-0">
              <h3 className="font-display text-lg font-medium text-brand-text">{item.title}</h3>
              <p className="mt-3 text-sm font-normal leading-[1.55] text-brand-text/88">{item.body}</p>
            </article>
          ))}
          </div>
        </div>

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
          <h3 className="font-display text-xl font-medium text-brand-text md:text-2xl">{study.selectedContribution.heading}</h3>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.selectedContribution.body}</p>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">
            {study.selectedContribution.bodyContinued}
          </p>
        </div>

        <div className="mt-14 md:mt-16">
          <h3 className="font-display text-center text-xl font-medium text-brand-text md:text-2xl">
            {study.demonstrates.heading}
          </h3>
          <p className="mx-auto mt-6 max-w-[720px] text-center text-sm font-normal leading-[1.55] text-brand-text/88">
            {study.demonstrates.body}
          </p>
          <ul className="mt-10 flex flex-wrap justify-center gap-2">
            {study.demonstrateSkills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-brand-text/12 bg-brand-bg-muted/55 px-3 py-1 text-xs font-normal text-brand-text/88"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 md:mt-16">
          <h3 className="font-display text-center text-xl font-medium text-brand-text md:text-2xl">
            {study.supportingMaterials.heading}
          </h3>
          <div className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-4">
            <PdfLink
              label={study.supportingMaterials.label}
              description={study.supportingMaterials.description}
              href={study.supportingMaterials.collaborativeMailto}
              linkText={study.supportingMaterials.linkText}
            />
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-[640px] text-center md:mt-16">
          <h3 className="font-display text-xl font-medium text-brand-text md:text-2xl">{study.closing.heading}</h3>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.closing.body}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex rounded-full border border-brand-text/15 bg-brand-surface px-8 py-3 text-sm font-medium text-brand-text transition-colors duration-300 hover:border-brand-accent-fg/45 hover:text-brand-accent-fg"
            >
              Contact me
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('consultancy')}
              className="inline-flex rounded-full border border-transparent px-6 py-3 text-sm font-normal text-brand-text/78 underline-offset-4 transition-colors hover:text-brand-accent-fg hover:underline"
            >
              Back to projects
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
