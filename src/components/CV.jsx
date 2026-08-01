import { motion } from 'framer-motion'
import { cvExperiences } from '../data/cvExperience'
import { cvUrl, sectionIntros } from '../data/content'
import { easeOut, fadeUpItem, inViewOnce, introTextContainer, introTextItem } from '../lib/motion'
import { IntroJumpCue } from './IntroJumpCue'
import { MultiVenueIcon } from './MultiVenueIcon'
import { RoadmapRail } from './RoadmapRail'
import { ScrollSectionCue } from './ScrollSectionCue'
import { SectionIntroHeading } from './SectionIntroHeading'
import SpotlightCard from './SpotlightCard'
import { TiltedCardShell } from './TiltedCardShell'

const EXPERIENCE_IDS = ['experience-think-pacific', 'experience-dmu', 'experience-hospitality']

function ExperienceIntroPage() {
  const intro = sectionIntros.experience

  return (
    <section
      id="experience-intro"
      className="relative flex min-h-screen snap-start snap-always flex-col px-6 py-16 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-[900px] flex-1 flex-col items-center justify-center text-center">
        <SectionIntroHeading
          eyebrow={intro.eyebrow}
          title="Experience and CV"
          description={intro.description}
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.45, delay: 0.12, ease: easeOut }}
          className="flex w-full flex-col items-center"
        >
          <motion.a
            href={cvUrl}
            download
            className="mt-6 inline-flex rounded-full border border-brand-text/15 bg-brand-surface px-8 py-3 text-sm font-medium text-brand-text transition-colors duration-300 hover:border-brand-accent-fg/45 hover:text-brand-accent-fg md:mt-8"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.25, ease: easeOut }}
          >
            Download CV
          </motion.a>
          <div className="mt-6 flex flex-col items-center gap-3 md:mt-7 md:gap-3.5">
            {cvExperiences.map((exp, index) => (
              <IntroJumpCue key={exp.id} label={exp.title} targetId={EXPERIENCE_IDS[index]} />
            ))}
          </div>
        </motion.div>
      </div>
      <div className="flex shrink-0 justify-center pb-4 pt-6 md:pb-6 md:pt-8">
        <ScrollSectionCue targetId="experience-think-pacific" variant="arrow" bounce />
      </div>
    </section>
  )
}

function ExperienceBlock({ item }) {
  const showLogo = item.logoSrc && !item.multiVenue
  const showMulti = item.multiVenue

  return (
    <SpotlightCard
      className="min-w-0 flex-1 rounded-2xl border border-brand-text/12 bg-brand-surface shadow-[0_16px_48px_-28px_rgba(26,20,38,0.16)]"
      spotlightColor="rgba(178, 207, 192, 0.38)"
    >
      <motion.article
        variants={introTextContainer}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        className="p-6 text-left transition-[border-color,box-shadow] duration-300 md:p-8"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25, ease: easeOut }}
      >
        <motion.div variants={introTextItem} className="flex items-start gap-3 md:gap-4">
          {showLogo ? (
            <img
              src={item.logoSrc}
              alt={item.logoAlt ?? 'Organisation logo'}
              width={80}
              height={80}
              className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20"
            />
          ) : null}
          {showMulti ? (
            <span role="img" aria-label="Experience across multiple companies and venues" className="shrink-0">
              <MultiVenueIcon className="h-16 w-16 md:h-20 md:w-20" />
            </span>
          ) : null}
          <div className="min-w-0 flex-1">
            {item.eyebrow ? (
              <p className="text-xs font-light uppercase tracking-[0.35em] text-brand-text/62">{item.eyebrow}</p>
            ) : null}
            <h3
              className={`font-display text-lg font-medium leading-snug tracking-tight text-brand-text md:text-xl ${item.eyebrow ? 'mt-3' : ''}`}
            >
              {item.title}
            </h3>
            <p className="mt-4 text-sm font-normal text-brand-text/92 md:text-base">
              <span className="font-medium text-brand-text">{item.org}</span>
              <span className="text-brand-text/55"> · </span>
              {item.type}
            </p>
            <p className="mt-1 text-xs font-normal tracking-wide text-brand-text/78 md:text-sm">
              {item.period}
              {item.location ? (
                <>
                  <span className="text-brand-text/55"> · </span>
                  {item.location}
                </>
              ) : null}
            </p>
            {item.roleSummary ? (
              <p className="mt-3 text-sm font-normal italic text-brand-text/85">{item.roleSummary}</p>
            ) : null}
          </div>
        </motion.div>

        <motion.ul variants={introTextItem} className="mt-6 space-y-3 text-sm font-normal leading-[1.55] text-brand-text/92 md:text-[15px]">
          {item.bullets.map((line, i) => (
            <li
              key={`${item.id}-${i}`}
              className="relative pl-4 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-brand-accent"
            >
              {line}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={introTextItem} className="mt-8 flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-brand-text/12 bg-brand-bg-muted/55 px-3 py-1 text-xs font-normal text-brand-text/88"
            >
              {skill}
            </span>
          ))}
        </motion.div>
        {item.skillsFootnote ? (
          <motion.p variants={introTextItem} className="mt-4 text-xs font-normal text-brand-text/78">
            {item.skillsFootnote}
          </motion.p>
        ) : null}
      </motion.article>
    </SpotlightCard>
  )
}

function ExperiencePage({ item, sectionId, step }) {
  return (
    <section id={sectionId} className="relative flex min-h-screen snap-start snap-always flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-10 md:py-14">
        <motion.div
          className="relative mx-auto w-full max-w-[900px]"
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
          variants={fadeUpItem}
        >
          {item.pageEyebrow ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.42, ease: easeOut }}
              className="mb-4 w-full text-center text-sm font-normal leading-snug tracking-wide text-brand-text/78 md:mb-5 md:text-[15px]"
            >
              {item.pageEyebrow}
            </motion.p>
          ) : null}
          <div className="flex w-full justify-center">
            <div className="flex w-max max-w-full items-stretch gap-6 md:gap-8">
              <RoadmapRail step={step} />
              <TiltedCardShell className="min-w-0 w-[min(820px,calc(100vw-3rem))]">
                <ExperienceBlock item={item} />
              </TiltedCardShell>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function CV() {
  return (
    <>
      <ExperienceIntroPage />
      {cvExperiences.map((item, index) => (
        <ExperiencePage
          key={item.id}
          item={item}
          sectionId={EXPERIENCE_IDS[index]}
          step={String(index + 1).padStart(2, '0')}
        />
      ))}
    </>
  )
}
