import { motion } from 'framer-motion'
import { aboutText, sectionIntros } from '../data/content'
import { easeOut, inViewOnce } from '../lib/motion'
import { SectionIntroHeading } from './SectionIntroHeading'
import { SectionShell } from './SectionShell'

export function About() {
  const intro = sectionIntros.about

  return (
    <SectionShell id="about">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center">
        <SectionIntroHeading eyebrow={intro.eyebrow} title="About" description={intro.description} />
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.48, delay: 0.12, ease: easeOut }}
          className="mt-10 max-w-[650px] text-center text-base font-normal leading-[1.5] text-brand-text md:mt-12 md:text-lg"
        >
          {aboutText}
        </motion.p>
      </div>
    </SectionShell>
  )
}
