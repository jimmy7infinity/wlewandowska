import { motion } from 'framer-motion'
import { contact, sectionIntros } from '../data/content'
import { easeOut, inViewOnce } from '../lib/motion'
import { LinkedInIcon } from './LinkedInIcon'
import { SectionIntroHeading } from './SectionIntroHeading'
import { SectionShell } from './SectionShell'

export function Contact() {
  const intro = sectionIntros.contact

  return (
    <SectionShell id="contact">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center">
        <SectionIntroHeading eyebrow={intro.eyebrow} title="Contact" description={intro.description} />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.45, delay: 0.1, ease: easeOut }}
          className="mt-12 inline-flex items-center gap-0.5 rounded-full border border-brand-text/12 bg-brand-surface/95 p-1.5 pl-2 shadow-md backdrop-blur-sm md:mt-14"
        >
          <motion.a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full p-2.5 text-brand-text/88 transition-[color,background-color] hover:bg-brand-text/5 hover:text-brand-accent-fg"
            aria-label="Wiktoria Lewandowska on LinkedIn"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2, ease: easeOut }}
          >
            <LinkedInIcon />
          </motion.a>
          <span className="mx-0.5 h-8 w-px bg-brand-text/12" aria-hidden />
          <motion.a
            href={`mailto:${contact.email}`}
            className="inline-flex max-w-[min(100vw-8rem,20rem)] items-center gap-2 rounded-full py-2 pl-2 pr-3 text-sm font-normal text-brand-text/95 transition-[color,background-color] hover:bg-brand-text/5 hover:text-brand-accent-fg"
            aria-label={`Email ${contact.email}`}
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2, ease: easeOut }}
          >
            <img
              src="/gmail-logo.png"
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px] shrink-0 object-contain opacity-95 contrast-[1.08]"
            />
            <span className="truncate">{contact.email}</span>
          </motion.a>
        </motion.div>
      </div>
    </SectionShell>
  )
}
