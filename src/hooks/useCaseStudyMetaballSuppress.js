import { useEffect, useState } from 'react'

export const CASE_STUDY_SECTION_IDS = [
  'media-beyond-the-dump',
  'consultancy-peter-pizzeria',
  'consultancy-bosleymd',
]

/**
 * True while any case-study scroll section occupies the viewport — used to pause heavy backdrop work.
 */
export function useCaseStudyMetaballSuppress() {
  const [suppressed, setSuppressed] = useState(false)

  useEffect(() => {
    const visibility = new Map(CASE_STUDY_SECTION_IDS.map((id) => [id, false]))
    let observer

    const recompute = () => {
      const next = [...visibility.values()].some(Boolean)
      setSuppressed(next)
      document.documentElement.classList.toggle('wl-case-study-active', next)
    }

    const attach = () => {
      observer?.disconnect()
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibility.set(entry.target.id, entry.isIntersecting && entry.intersectionRatio > 0.06)
          })
          recompute()
        },
        {
          root: null,
          rootMargin: '-8% 0px -8% 0px',
          threshold: [0, 0.06, 0.2, 0.45],
        },
      )

      CASE_STUDY_SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }

    attach()
    window.addEventListener('wl-layout-change', attach)
    window.addEventListener('hashchange', attach)

    return () => {
      observer?.disconnect()
      document.documentElement.classList.remove('wl-case-study-active')
      window.removeEventListener('wl-layout-change', attach)
      window.removeEventListener('hashchange', attach)
    }
  }, [])

  return suppressed
}
