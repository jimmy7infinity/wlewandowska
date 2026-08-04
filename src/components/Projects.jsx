import { motion } from 'framer-motion'
import { sectionIntros } from '../data/content'
import { staggerContainer, staggerList, fadeUpItem, inViewOnce } from '../lib/motion'
import { ProjectCard } from './ProjectCard'
import { SectionIntroHeading } from './SectionIntroHeading'
import { SectionShell } from './SectionShell'

const INTRO_KEY = {
  media: 'media',
  consultancy: 'consultancy',
}

export function Projects({ id, title, projects }) {
  const introKey = INTRO_KEY[id]
  const intro = introKey ? sectionIntros[introKey] : null

  return (
    <SectionShell id={id}>
      <motion.div
        className="mx-auto w-full max-w-[1100px]"
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        variants={staggerContainer}
      >
        {intro ? (
          <motion.div variants={fadeUpItem}>
            <SectionIntroHeading eyebrow={intro.eyebrow} title={title} description={intro.description} />
          </motion.div>
        ) : (
          <motion.h2
            variants={fadeUpItem}
            className="font-display text-center text-[32px] font-medium tracking-tight text-brand-text md:text-[40px]"
          >
            {title}
          </motion.h2>
        )}
        <motion.div
          variants={staggerList}
          className={`mt-12 grid grid-cols-1 gap-8 md:gap-10 ${
            projects.length > 1 ? 'md:grid-cols-2' : 'mx-auto max-w-xl'
          }`}
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </motion.div>
      </motion.div>
    </SectionShell>
  )
}
