import { motion } from 'framer-motion'
import { easeOut } from '../lib/motion'

export function IntroJumpCue({ label, targetId }) {
  const scrollTo = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.button
      type="button"
      aria-label={`Scroll to ${label}`}
      onClick={scrollTo}
      className="flex max-w-[min(100%,20rem)] flex-col items-center gap-2 text-xs font-normal text-brand-text/78"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: easeOut }}
    >
      <span className="text-center tracking-wide">{label}</span>
      <span
        className="block h-8 w-px bg-gradient-to-b from-brand-text/45 to-transparent"
        aria-hidden
      />
    </motion.button>
  )
}
