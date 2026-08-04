import { beyondTheDumpCaseStudy as study } from '../data/beyondTheDump'
import { DocumentaryStillsGrid } from './DocumentaryStillsGrid'
import SpotlightCard from './SpotlightCard'

function AwardLinks({ links }) {
  return (
    <ul className="mt-6 space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal text-brand-accent-fg/90 underline-offset-4 transition-colors hover:text-brand-accent-fg hover:underline"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function BeyondTheDumpCaseStudy() {
  return (
    <section className="relative scroll-mt-0 px-6 py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1100px]">
        <header className="max-w-[700px]">
          <p className="text-xs font-light uppercase tracking-[0.35em] text-brand-text/62">{study.eyebrow}</p>
          <h1 className="font-display mt-4 text-[32px] font-medium tracking-tight text-brand-text md:text-[40px]">
            {study.title}
          </h1>
          <p className="mt-3 text-sm font-light text-brand-text/72 md:text-base">{study.subtitle}</p>
        </header>

        <DocumentaryStillsGrid images={study.stillsSetA} />

        <SpotlightCard
          interactive={false}
          className="mt-10 rounded-2xl border border-brand-text/12 bg-brand-surface px-6 py-7 shadow-[0_12px_36px_-20px_rgba(26,20,38,0.1)] md:mt-12 md:px-8 md:py-8"
          spotlightColor="rgba(178, 207, 192, 0.38)"
        >
          <p className="text-xs font-light uppercase tracking-[0.3em] text-brand-text/62">Festival award</p>
          {study.award.lines.map((line) => (
            <p key={line} className="font-display mt-2 text-xl font-medium text-brand-text md:text-2xl">
              {line}
            </p>
          ))}
          <AwardLinks links={study.award.links} />
        </SpotlightCard>

        <div className="mt-12 max-w-[720px] md:mt-14">
          <p className="text-sm font-normal leading-[1.55] text-brand-text/92 md:text-base">{study.summary}</p>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/92 md:text-base">
            {study.summaryContinued}
          </p>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/92 md:text-base">{study.summaryClosing}</p>
        </div>

        <div className="mt-14 max-w-[720px] md:mt-16">
          <h2 className="font-display text-xl font-medium text-brand-text md:text-2xl">{study.role.heading}</h2>
          <p className="mt-3 text-sm font-medium tracking-wide text-brand-text/88">{study.role.credits}</p>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.role.body}</p>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.role.bodyContinued}</p>
        </div>

        <DocumentaryStillsGrid images={study.stillsSetB} />

        <div className="mt-14 max-w-[720px] md:mt-16">
          <h2 className="font-display text-xl font-medium text-brand-text md:text-2xl">{study.outcome.heading}</h2>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.outcome.body}</p>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2 md:mt-12">
          {study.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-brand-text/12 bg-brand-bg-muted/55 px-3 py-1 text-xs font-normal text-brand-text/88"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
