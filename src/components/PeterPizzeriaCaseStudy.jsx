import { useCallback, useState } from 'react'
import { peterPizzeriaCaseStudy as study } from '../data/peterPizzeria'
import {
  EvidenceFigure,
  InfographicLightbox,
  PdfLink,
  scrollToSection,
} from './caseStudyShared'
import SpotlightCard from './SpotlightCard'

export function PeterPizzeriaCaseStudy() {
  const [lightboxImage, setLightboxImage] = useState(null)
  const closeLightbox = useCallback(() => setLightboxImage(null), [])

  return (
    <>
      <section className="relative scroll-mt-0 px-6 py-20 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1100px]">
          <header className="max-w-[700px]">
            <p className="text-xs font-light uppercase tracking-[0.35em] text-brand-text/62">{study.eyebrow}</p>
          <h1 className="font-display mt-4 text-[32px] font-medium tracking-tight text-brand-text md:text-[40px]">
            {study.title}
          </h1>
            <p className="mt-3 text-sm font-light text-brand-text/72 md:text-base">{study.subtitle}</p>
            <p className="mt-6 text-sm font-normal leading-[1.55] text-brand-text/92 md:text-base">{study.summary}</p>
            <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/92 md:text-base">
              {study.summaryContinued}
            </p>
          </header>

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

          <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
            {study.highlights.map((item) => (
              <article key={item.title} className="min-w-0">
                <h3 className="font-display text-lg font-medium text-brand-text">{item.title}</h3>
                <p className="mt-3 text-sm font-normal leading-[1.55] text-brand-text/88">{item.body}</p>
              </article>
            ))}
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

          <div className="mt-16 md:mt-20">
            <h3 className="font-display text-center text-xl font-medium text-brand-text md:text-2xl">
              {study.evidenceHeading}
            </h3>
            <p className="mx-auto mt-4 max-w-[640px] text-center text-sm font-normal leading-[1.55] text-brand-text/88">
              {study.evidenceIntro}
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
              {study.infographics.map((img) => (
                <EvidenceFigure key={img.src} img={img} onOpen={setLightboxImage} />
              ))}
            </div>
          </div>

          <div className="mt-14 md:mt-16">
            <h3 className="font-display text-center text-xl font-medium text-brand-text md:text-2xl">
              {study.demonstrates.heading}
            </h3>
            <p className="mx-auto mt-6 max-w-[720px] text-center text-sm font-normal leading-[1.55] text-brand-text/88">
              {study.demonstrates.body}
            </p>
          </div>

          <div className="mt-14 md:mt-16">
            <h3 className="font-display text-center text-xl font-medium text-brand-text md:text-2xl">
              {study.supportingMaterials.heading}
            </h3>
            <p className="mx-auto mt-4 max-w-[640px] text-center text-sm font-normal leading-[1.55] text-brand-text/88">
              {study.supportingMaterials.intro}
            </p>
            <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {study.downloads.map((file) => (
                <PdfLink key={file.href} {...file} />
              ))}
            </div>
          </div>

          <aside className="mx-auto mt-10 max-w-[720px] rounded-2xl border border-brand-text/10 bg-brand-bg-muted/35 px-6 py-4 text-center md:mt-12">
            <p className="text-xs font-light leading-[1.55] text-brand-text/68">{study.projectDisclaimer}</p>
          </aside>

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

      <InfographicLightbox image={lightboxImage} onClose={closeLightbox} />
    </>
  )
}
