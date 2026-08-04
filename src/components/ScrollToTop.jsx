import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to top on route change; hash targets are handled on the home page by HashScrollSync. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
