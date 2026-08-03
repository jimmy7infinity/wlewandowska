import { useEffect } from 'react'
import { scrollToSectionId } from '../lib/scrollToSection.js'

/** Re-align scroll after layout shifts (e.g. case studies mounting) when URL has a hash. */
export function HashScrollSync() {
  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.replace(/^#/, '')
      if (id) scrollToSectionId(id)
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    window.addEventListener('wl-layout-change', syncFromHash)
    return () => {
      window.removeEventListener('hashchange', syncFromHash)
      window.removeEventListener('wl-layout-change', syncFromHash)
    }
  }, [])

  return null
}
