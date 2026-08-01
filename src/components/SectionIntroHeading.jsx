/**
 * Matches Education intro: small uppercase eyebrow, title, light summary.
 */
import { motion } from 'framer-motion'
import { inViewOnce, introTextContainer, introTextItem } from '../lib/motion'

export function SectionIntroHeading({ eyebrow, title, description, className = '' }) {
  return (
    <motion.div
      className={`flex w-full flex-col items-center text-center ${className}`}
      variants={introTextContainer}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
    >
      <motion.p
        variants={introTextItem}
        className="text-xs font-light uppercase tracking-[0.35em] text-brand-text/62"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={introTextItem}
        className="font-display mt-3 text-[32px] font-medium tracking-tight text-brand-text md:text-[40px]"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={introTextItem}
        className="mt-4 max-w-lg text-sm font-normal leading-relaxed text-brand-text/78 md:text-base"
      >
        {description}
      </motion.p>
    </motion.div>
  )
}
