import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { bosleyMDCaseStudy as study } from '../data/bosleyMD'
import {
  EvidenceFigure,
  InfographicLightbox,
  PdfLink,
  scrollToSection,
} from './caseStudyShared'
import { easeOut, fadeUpItem, inViewOnce, introTextItem, staggerContainer, staggerList } from '../lib/motion'
import SpotlightCard from './SpotlightCard'

function SectionTitle({ children, className = 'text-center' }) {
  return (
    <h3 className={`font-display text-xl font-medium text-brand-text md:text-2xl ${className}`}>{children}</h3>
  )
}

export function BosleyMDCaseStudy() {
  const [lightboxImage, setLightboxImage] = useState(null)
  const closeLightbox = useCallback(() => setLightboxImage(null), [])

  const openEvidence = (img) => setLightboxImage(img)

  return (
    <>
      <section className="relative snap-start snap-always scroll-mt-0 px-6 py-20 md:py-[120px]">
        <motion.div
          className="mx-auto w-full max-w-[1100px]"
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
          variants={staggerContainer}
        >
          <motion.header variants={fadeUpItem} className="max-w-[720px]">
            <p className="text-xs font-light uppercase tracking-[0.35em] text-brand-text/62">{study.eyebrow}</p>
            <h2 className="font-display mt-4 text-[32px] font-medium tracking-tight text-brand-text md:text-[40px]">
              {study.title}
            </h2>
            <p className="mt-3 text-sm font-light leading-[1.55] text-brand-text/72 md:text-base">{study.subtitle}</p>
            <p className="mt-6 text-sm font-normal leading-[1.55] text-brand-text/92 md:text-base">{study.summary}</p>
            <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/92 md:text-base">{study.summaryContinued}</p>
          </motion.header>

          <motion.div
            variants={fadeUpItem}
            className="mt-10 overflow-hidden rounded-2xl border border-[#1e3a5f]/20 bg-[#0f2744] px-6 py-8 text-white shadow-[0_14px_44px_-26px_rgba(15,39,68,0.45)] md:mt-12 md:px-10 md:py-10"
          >
            <p className="text-xs font-light uppercase tracking-[0.3em] text-white/72">Case study overview</p>
            <p className="font-display mt-3 text-2xl font-medium md:text-3xl">{study.heroVisual.title}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {study.heroVisual.badges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-normal text-white/92"
                >
                  {badge}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUpItem}
            className="mt-10 grid grid-cols-1 gap-6 rounded-2xl border border-brand-text/12 bg-brand-surface/80 p-6 md:mt-12 md:grid-cols-2 md:gap-8 md:p-8"
          >
            <div>
              <p className="text-xs font-light uppercase tracking-wider text-brand-text/62">{study.role.label}</p>
              <p className="mt-2 text-sm font-normal leading-[1.55] text-brand-text/92">{study.role.value}</p>
            </div>
            <div>
              <p className="text-xs font-light uppercase tracking-wider text-brand-text/62">{study.module.label}</p>
              <p className="mt-2 text-sm font-normal leading-[1.55] text-brand-text/92">{study.module.value}</p>
            </div>
          </motion.div>

          <motion.ul
            variants={staggerList}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-12"
          >
            {study.stats.map((stat) => (
              <motion.li key={stat.label} variants={fadeUpItem}>
                <SpotlightCard
                  className="h-full rounded-2xl border border-brand-text/12 bg-brand-surface px-5 py-6 text-center shadow-[0_12px_36px_-20px_rgba(26,20,38,0.1)]"
                  spotlightColor="rgba(178, 207, 192, 0.38)"
                >
                  <p className="font-display text-3xl font-medium text-brand-text md:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-xs font-normal leading-snug text-brand-text/78">{stat.label}</p>
                </SpotlightCard>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUpItem} className="mt-16 max-w-[720px] md:mt-20">
            <SectionTitle className="text-left">{study.challenge.heading}</SectionTitle>
            <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.challenge.body}</p>
            <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.challenge.bodyContinued}</p>
          </motion.div>

          <motion.div variants={fadeUpItem} className="mt-12 md:mt-16">
            <SectionTitle className="text-left">{study.contribution.heading}</SectionTitle>
            <p className="mt-4 max-w-[720px] text-sm font-normal leading-[1.55] text-brand-text/88">{study.contribution.intro}</p>
            <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              {study.contribution.items.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-brand-text/10 bg-brand-bg-muted/40 px-4 py-3 text-sm font-normal leading-snug text-brand-text/88"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUpItem} className="mt-16 md:mt-20">
            <SectionTitle className="text-left">{study.research.heading}</SectionTitle>
            <p className="mt-2 text-sm font-light text-brand-text/72">{study.research.intro}</p>
            <p className="mt-4 max-w-[720px] text-sm font-normal leading-[1.55] text-brand-text/88">{study.research.body}</p>
            <div className="mt-8 space-y-4">
              {study.research.streams.map((stream) => (
                <div
                  key={stream.title}
                  className="rounded-2xl border border-brand-text/12 bg-brand-surface px-5 py-4 md:px-6 md:py-5"
                >
                  <p className="text-sm font-medium text-brand-text">{stream.title}</p>
                  <p className="mt-2 text-sm font-normal leading-[1.55] text-brand-text/82">{stream.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUpItem} className="mt-16 md:mt-20">
            <SectionTitle className="text-left">{study.findings.heading}</SectionTitle>
            <p className="mt-2 text-sm font-light text-brand-text/72">{study.findings.intro}</p>
            <ol className="mt-8 space-y-6">
              {study.findings.items.map((item, index) => (
                <li key={item.title} className="flex gap-4">
                  <span className="font-display mt-0.5 shrink-0 text-lg font-medium text-brand-accent-fg/90">
                    {index + 1}.
                  </span>
                  <div>
                    <h4 className="font-display text-base font-medium text-brand-text md:text-lg">{item.title}</h4>
                    <p className="mt-2 text-sm font-normal leading-[1.55] text-brand-text/88">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>

          <motion.div variants={fadeUpItem} className="mt-16 md:mt-20">
            <SectionTitle>{study.competitors.heading}</SectionTitle>
            <p className="mx-auto mt-2 max-w-[640px] text-center text-sm font-light text-brand-text/72">{study.competitors.intro}</p>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {study.competitors.brands.map((brand) => (
                <SpotlightCard
                  key={brand.name}
                  className="h-full rounded-2xl border border-brand-text/12 bg-brand-surface p-6 shadow-[0_12px_36px_-20px_rgba(26,20,38,0.1)]"
                  spotlightColor="rgba(178, 207, 192, 0.38)"
                >
                  <h4 className="font-display text-lg font-medium text-brand-text">{brand.name}</h4>
                  <p className="mt-4 text-xs font-light uppercase tracking-wider text-brand-text/62">Strength</p>
                  <p className="mt-2 text-sm font-normal leading-[1.55] text-brand-text/88">{brand.strength}</p>
                  <p className="mt-4 text-xs font-light uppercase tracking-wider text-brand-text/62">Gap / opportunity</p>
                  <p className="mt-2 text-sm font-normal leading-[1.55] text-brand-text/82">{brand.opportunity}</p>
                </SpotlightCard>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUpItem} className="mt-16 md:mt-20">
            <SectionTitle>{study.recommendations.heading}</SectionTitle>
            <p className="mx-auto mt-2 max-w-[640px] text-center text-sm font-light text-brand-text/72">{study.recommendations.intro}</p>
            <p className="mx-auto mt-4 max-w-[640px] text-center text-xs font-normal text-brand-text/68">
              {study.recommendations.targetsNote}
            </p>
            <div className="mt-10 space-y-8">
              {study.recommendations.items.map((rec, index) => (
                <article
                  key={rec.title}
                  className="rounded-2xl border border-brand-text/12 bg-brand-surface p-6 md:p-8"
                >
                  <p className="text-xs font-light uppercase tracking-wider text-brand-text/62">Recommendation {index + 1}</p>
                  <h4 className="font-display mt-2 text-lg font-medium leading-snug text-brand-text md:text-xl">{rec.title}</h4>
                  <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{rec.body}</p>
                  <div className="mt-6 rounded-xl border border-brand-accent-fg/20 bg-brand-bg-muted/45 px-4 py-4 md:px-5">
                    <p className="text-xs font-light uppercase tracking-wider text-brand-text/62">{rec.smartLabel}</p>
                    <p className="mt-2 text-sm font-normal leading-[1.55] text-brand-text/92">{rec.smart}</p>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUpItem} className="mt-16 md:mt-20">
            <SectionTitle>{study.selection.heading}</SectionTitle>
            <p className="mx-auto mt-6 max-w-[720px] text-center text-sm font-normal leading-[1.55] text-brand-text/88">
              {study.selection.body}
            </p>
            <p className="mx-auto mt-4 max-w-[720px] text-center text-sm font-normal leading-[1.55] text-brand-text/82">
              {study.selection.short}
            </p>
            <div className="mx-auto mt-10 max-w-3xl">
              <EvidenceFigure img={study.selection.evidence} onOpen={openEvidence} />
            </div>
          </motion.div>

          <motion.div variants={fadeUpItem} className="mt-16 md:mt-20">
            <SectionTitle>{study.collaborative.heading}</SectionTitle>
            <p className="mx-auto mt-2 max-w-[640px] text-center text-sm font-light text-brand-text/72">{study.collaborative.intro}</p>
            <p className="mx-auto mt-6 max-w-[720px] text-center text-sm font-normal leading-[1.55] text-brand-text/88">
              {study.collaborative.body}
            </p>
            <p className="mx-auto mt-4 max-w-[720px] text-center text-sm font-normal leading-[1.55] text-brand-text/88">
              {study.collaborative.distinction}
            </p>
            <p className="mx-auto mt-4 max-w-[720px] text-center text-sm font-normal leading-[1.55] text-brand-text/78">
              {study.collaborative.publicNote}
            </p>
          </motion.div>

          <motion.div variants={fadeUpItem} className="mt-16 md:mt-20">
            <SectionTitle>{study.demonstrates.heading}</SectionTitle>
            <p className="mx-auto mt-6 max-w-[720px] text-center text-sm font-normal leading-[1.55] text-brand-text/88">
              {study.demonstrates.body}
            </p>
            <p className="mx-auto mt-4 max-w-[720px] text-center text-sm font-normal leading-[1.55] text-brand-text/88">
              {study.demonstrates.bodyContinued}
            </p>
            <motion.ul variants={introTextItem} className="mt-10 flex flex-wrap justify-center gap-2">
              {study.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-brand-text/12 bg-brand-bg-muted/55 px-3 py-1 text-xs font-normal text-brand-text/88"
                >
                  {skill}
                </li>
              ))}
            </motion.ul>
            <p className="mx-auto mt-8 max-w-[720px] text-center text-sm font-normal leading-[1.55] text-brand-text/88">
              {study.demonstrates.closingStatement}
            </p>
          </motion.div>

          <motion.div variants={fadeUpItem} className="mt-14 md:mt-16">
            <SectionTitle>{study.supportingMaterials.heading}</SectionTitle>
            <p className="mx-auto mt-4 max-w-[640px] text-center text-sm font-normal leading-[1.55] text-brand-text/88">
              {study.supportingMaterials.intro}
            </p>
            <div className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-4">
              <PdfLink
                label="Collaborative consultancy report"
                description="Group-authored report prepared for BosleyMD (48 pages, September 2025)"
                href={study.supportingMaterials.collaborativeMailto}
                linkText="Collaborative report available on request"
              />
            </div>
          </motion.div>

          <motion.aside
            variants={fadeUpItem}
            className="mx-auto mt-10 max-w-[720px] rounded-2xl border border-brand-text/10 bg-brand-bg-muted/35 px-6 py-4 text-center md:mt-12"
          >
            <p className="text-xs font-light leading-[1.55] text-brand-text/68">{study.projectDisclaimer}</p>
          </motion.aside>

          <motion.div variants={fadeUpItem} className="mx-auto mt-14 max-w-[640px] text-center md:mt-16">
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
          </motion.div>
        </motion.div>
      </section>

      <InfographicLightbox image={lightboxImage} onClose={closeLightbox} />
    </>
  )
}
