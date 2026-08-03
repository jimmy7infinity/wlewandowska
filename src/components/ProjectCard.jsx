import { motion } from 'framer-motion'
import { easeOut, fadeUpItem, inViewOnce, introTextContainer, introTextItem } from '../lib/motion'
import SpotlightCard from './SpotlightCard'

export function ProjectCard({ title, description, category, skills, detailSectionId }) {
  const scrollToDetail = () => {
    if (detailSectionId) {
      document.getElementById(detailSectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.div variants={fadeUpItem} className="h-full">
      <SpotlightCard
        className="h-full rounded-2xl border border-brand-text/12 bg-brand-surface shadow-[0_12px_36px_-20px_rgba(26,20,38,0.12)]"
        spotlightColor="rgba(178, 207, 192, 0.42)"
      >
        <motion.article
          variants={introTextContainer}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
          className="flex h-full flex-col p-8 transition-[border-color,box-shadow] duration-300"
          whileHover={{ y: -3, boxShadow: '0 20px 50px -22px rgba(37,29,57,0.18)' }}
          transition={{ duration: 0.25, ease: easeOut }}
        >
          <motion.p
            variants={introTextItem}
            className="text-xs font-light uppercase tracking-wider text-brand-text/62"
          >
            {category}
          </motion.p>
          <motion.h3
            variants={introTextItem}
            className="font-display mt-3 text-xl font-medium text-brand-text md:text-2xl"
          >
            {title}
          </motion.h3>
          <motion.p
            variants={introTextItem}
            className="mt-4 flex-1 text-sm font-normal leading-[1.5] text-brand-text/92 md:text-base"
          >
            {description}
          </motion.p>
          <motion.ul variants={introTextItem} className="mt-8 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-brand-text/12 bg-brand-bg-muted/55 px-3 py-1 text-xs font-normal text-brand-text/88"
              >
                {skill}
              </li>
            ))}
          </motion.ul>
          {detailSectionId ? (
            <motion.div variants={introTextItem} className="mt-8">
              <button
                type="button"
                onClick={scrollToDetail}
                className="text-sm font-normal text-brand-accent-fg/90 underline-offset-4 transition-colors hover:text-brand-accent-fg hover:underline"
              >
                View case study
              </button>
            </motion.div>
          ) : null}
        </motion.article>
      </SpotlightCard>
    </motion.div>
  )
}
