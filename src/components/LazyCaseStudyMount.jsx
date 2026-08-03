import { useEffect, useRef, useState } from 'react'

const CONSULTANCY_SECTION_ID = 'consultancy'

function shouldMountForHash(sectionId) {
  if (typeof window === 'undefined') return false
  return window.location.hash === `#${sectionId}`
}

/**
 * Mount case studies before the user scrolls into them so document height and snap
 * points stay stable (avoids jumping from consultancy to CV).
 */
export function LazyCaseStudyMount({ sectionId, children }) {
  const [mounted, setMounted] = useState(() => shouldMountForHash(sectionId))
  const placeholderRef = useRef(null)

  useEffect(() => {
    if (mounted) return undefined

    const mount = () => setMounted(true)

    if (shouldMountForHash(sectionId)) {
      mount()
      return undefined
    }

    const onHashChange = () => {
      if (shouldMountForHash(sectionId)) mount()
    }
    window.addEventListener('hashchange', onHashChange)

    const consultEl = document.getElementById(CONSULTANCY_SECTION_ID)
    let consultObserver
    if (consultEl) {
      consultObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) mount()
        },
        { threshold: 0.05 },
      )
      consultObserver.observe(consultEl)
    }

    const el = placeholderRef.current
    let nearObserver
    if (el) {
      nearObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) mount()
        },
        { rootMargin: '1200px 0px 1200px 0px' },
      )
      nearObserver.observe(el)
    }

    const idleId =
      typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback(mount, { timeout: 3000 })
        : window.setTimeout(mount, 1800)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
      consultObserver?.disconnect()
      nearObserver?.disconnect()
      if (typeof requestIdleCallback !== 'undefined' && typeof idleId === 'number') {
        cancelIdleCallback(idleId)
      } else {
        window.clearTimeout(idleId)
      }
    }
  }, [mounted, sectionId])

  useEffect(() => {
    if (!mounted) return undefined
    window.dispatchEvent(new Event('wl-layout-change'))
    return undefined
  }, [mounted])

  return (
    <div ref={placeholderRef} id={sectionId} className="wl-case-study-snap relative scroll-mt-0">
      {mounted ? children : <div className="min-h-[100vh]" aria-hidden />}
    </div>
  )
}
