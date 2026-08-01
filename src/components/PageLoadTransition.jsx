import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const DISPLAY_MS = 3000
const FADE_MS = 1100

/**
 * Full-viewport splash: theme background + centered logo, then fades to reveal the page.
 */
export function PageLoadTransition({ children }) {
  const [phase, setPhase] = useState('loading')
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      setPhase('done')
      return
    }
    const show = setTimeout(() => setPhase('fading'), DISPLAY_MS)
    return () => clearTimeout(show)
  }, [reduceMotion])

  useEffect(() => {
    if (phase !== 'fading') return
    const end = setTimeout(() => setPhase('done'), FADE_MS)
    return () => clearTimeout(end)
  }, [phase])

  return (
    <>
      {children}
      {phase !== 'done' ? (
        <div
          className={`fixed inset-0 z-[200] flex items-center justify-center bg-brand-bg transition-opacity ease-out ${
            phase === 'fading' ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
          style={{ transitionDuration: `${FADE_MS}ms` }}
          aria-hidden="true"
        >
          <img
            src="/wl-logo.png"
            alt=""
            width={112}
            height={112}
            className="h-20 w-20 object-contain md:h-28 md:w-28"
            decoding="async"
          />
        </div>
      ) : null}
    </>
  )
}
