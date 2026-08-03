import { motion, useReducedMotion } from 'framer-motion'
import { scrollToSectionId } from '../lib/scrollToSection.js'
import { easeOut } from '../lib/motion'

function ChevronDown({ className = '' }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ScrollSectionCue({ targetId, className = '', variant = 'line', bounce = false }) {
  const reducedMotion = useReducedMotion()
  const scrollTo = () => {
    scrollToSectionId(targetId)
  }

  const inner = (
    <>
      {variant === 'arrow' ? (
        <span className="flex flex-col items-center text-brand-accent-fg">
          <ChevronDown className="h-7 w-7 md:h-8 md:w-8" />
        </span>
      ) : (
        <>
          <span className="tracking-wide">Scroll</span>
          <span className="block h-8 w-px bg-gradient-to-b from-brand-text/55 to-transparent" />
        </>
      )}
    </>
  )

  return (
    <motion.button
      type="button"
      aria-label="Scroll to next section"
      onClick={scrollTo}
      className={`flex flex-col items-center gap-2 text-xs font-normal text-brand-text/82 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: easeOut }}
    >
      {bounce && !reducedMotion ? (
        <motion.span
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.85, repeat: Infinity, ease: 'easeInOut' }}
        >
          {inner}
        </motion.span>
      ) : (
        inner
      )}
    </motion.button>
  )
}
