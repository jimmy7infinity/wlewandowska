/**
 * Scroll to a section by id — pairs with `scroll-snap-type: y mandatory` on `html`.
 */
export function scrollToSectionId(id) {
  const target = document.getElementById(id)
  if (!target) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({
    behavior: reducedMotion ? 'instant' : 'smooth',
    block: 'start',
  })
}
