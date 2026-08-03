const UNLOCK_FALLBACK_MS = 900

/**
 * Scroll to a section id without fighting scroll-snap or smooth-scroll on `html`.
 * Uses smooth motion only while snap is temporarily disabled.
 */
export function scrollToSectionId(id) {
  const target = document.getElementById(id)
  if (!target) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const root = document.documentElement
  root.classList.add('wl-scroll-locked')

  target.scrollIntoView({
    behavior: reducedMotion ? 'instant' : 'smooth',
    block: 'start',
  })

  let unlocked = false
  const unlock = () => {
    if (unlocked) return
    unlocked = true
    root.classList.remove('wl-scroll-locked')
  }

  if ('onscrollend' in window) {
    window.addEventListener('scrollend', unlock, { once: true })
  }
  window.setTimeout(unlock, UNLOCK_FALLBACK_MS)
}
