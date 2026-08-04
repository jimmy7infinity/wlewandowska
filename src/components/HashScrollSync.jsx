import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSectionId } from '../lib/scrollToSection.js'

/** After navigating home with a hash (e.g. from a project page), scroll to that section. */
export function HashScrollSync() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (pathname !== '/' || !hash) return
    const id = hash.replace(/^#/, '')
    if (id) scrollToSectionId(id)
  }, [pathname, hash])

  return null
}
