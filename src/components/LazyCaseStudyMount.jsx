import { useEffect, useRef, useState } from 'react'

function shouldMountForHash(sectionId) {
  if (typeof window === 'undefined') return false
  return window.location.hash === `#${sectionId}`
}

export function LazyCaseStudyMount({ sectionId, children }) {
  const [mounted, setMounted] = useState(() => shouldMountForHash(sectionId))
  const placeholderRef = useRef(null)

  useEffect(() => {
    if (mounted) return undefined

    if (shouldMountForHash(sectionId)) {
      setMounted(true)
      return undefined
    }

    const onHashChange = () => {
      if (shouldMountForHash(sectionId)) setMounted(true)
    }
    window.addEventListener('hashchange', onHashChange)

    const el = placeholderRef.current
    if (!el) {
      return () => window.removeEventListener('hashchange', onHashChange)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true)
          observer.disconnect()
        }
      },
      { rootMargin: '520px 0px' },
    )
    observer.observe(el)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
      observer.disconnect()
    }
  }, [mounted, sectionId])

  useEffect(() => {
    if (!mounted) return undefined
    window.dispatchEvent(new Event('wl-layout-change'))
    return undefined
  }, [mounted])

  return (
    <div
      ref={placeholderRef}
      id={sectionId}
      className={mounted ? undefined : 'relative min-h-[60vh] snap-start snap-always'}
    >
      {mounted ? children : null}
    </div>
  )
}
