import { motion } from 'framer-motion'
import { education, sectionIntros } from '../data/content'
import { easeOut, fadeUpItem, inViewOnce, introTextContainer, introTextItem } from '../lib/motion'
import { IntroJumpCue } from './IntroJumpCue'
import { RoadmapRail } from './RoadmapRail'
import { ScrollSectionCue } from './ScrollSectionCue'
import { SectionIntroHeading } from './SectionIntroHeading'
import SpotlightCard from './SpotlightCard'
import { TiltedCardShell } from './TiltedCardShell'

const EDU_IDS = ['education-undergrad', 'education-postgrad']

function EducationIntroPage() {
  const intro = sectionIntros.education

  return (
    <section
      id="education-intro"
      className="wl-section-snap relative flex min-h-screen flex-col px-6 py-20 md:py-[120px]"
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center justify-center text-center">
        <SectionIntroHeading
          eyebrow={intro.eyebrow}
          title="Education"
          description={intro.description}
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.45, delay: 0.14, ease: easeOut }}
          className="mt-10 flex w-full flex-col items-center md:mt-12"
        >
          <div className="flex flex-col items-center gap-6 md:gap-7">
            <IntroJumpCue label="BA Media and Communication" targetId="education-undergrad" />
            <IntroJumpCue label="Master in Marketing" targetId="education-postgrad" />
          </div>
        </motion.div>
      </div>
      <div className="flex shrink-0 justify-center pb-4 pt-6 md:pb-6 md:pt-8">
        <ScrollSectionCue targetId="education-undergrad" variant="arrow" bounce />
      </div>
    </section>
  )
}

function EducationCard({ item }) {
  return (
    <SpotlightCard
      className="h-full min-w-0 w-full rounded-2xl border border-brand-text/12 bg-brand-surface shadow-[0_14px_44px_-26px_rgba(26,20,38,0.14)]"
      spotlightColor="rgba(178, 207, 192, 0.48)"
      spotlightPeak={0.78}
    >
      <motion.div
        variants={introTextContainer}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        className="p-7 text-left md:p-8"
      >
        <motion.p
          variants={introTextItem}
          className="text-xs font-light uppercase tracking-[0.35em] text-brand-text/62"
        >
          {item.eyebrow}
        </motion.p>
        <motion.div variants={introTextItem} className="mt-3 flex items-start gap-3 md:mt-4 md:gap-4">
          <img
            src="/dmu-logo.png"
            alt="De Montfort University"
            width={48}
            height={48}
            className="h-11 w-11 shrink-0 object-contain md:h-12 md:w-12"
          />
          <h3 className="font-display min-w-0 flex-1 text-lg font-medium leading-snug text-brand-text md:text-xl">
            {item.degree}
          </h3>
        </motion.div>
        <motion.p variants={introTextItem} className="mt-4 text-sm font-normal text-brand-text/92">
          {item.result}
        </motion.p>
        <motion.p variants={introTextItem} className="mt-3 text-xs font-normal tracking-wide text-brand-text/72 md:text-sm">
          {item.school}
        </motion.p>
        <motion.p
          variants={introTextItem}
          className="mt-5 border-t border-brand-text/12 pt-5 text-sm font-normal leading-relaxed text-brand-text/85"
        >
          {item.note}
        </motion.p>
      </motion.div>
    </SpotlightCard>
  )
}

function EducationPage({ item, sectionId }) {
  return (
    <section id={sectionId} className="wl-section-snap relative flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-10 md:py-14">
        <motion.div
          className="relative mx-auto w-full max-w-[640px] md:max-w-[680px]"
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
              <RoadmapRail step={item.step} />
              <TiltedCardShell className="min-w-0 w-[min(540px,calc(100vw-3rem))]">
                <EducationCard item={item} />
              </TiltedCardShell>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Education() {
  return (
    <>
      <EducationIntroPage />
      {education.map((item, index) => (
        <EducationPage key={item.degree} item={item} sectionId={EDU_IDS[index]} />
      ))}
    </>
  )
}
