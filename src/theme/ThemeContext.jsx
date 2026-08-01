import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react'
import { THEME_LABELS, THEME_ORDER } from './themeOrder.js'
import { ThemeContext } from './themeContext.js'

function readStoredTheme() {
  if (typeof window === 'undefined') return THEME_ORDER[0]
  try {
    const v = window.localStorage.getItem('wl-theme')
    if (v && THEME_ORDER.includes(v)) return v
  } catch {
    /* ignore */
  }
  return THEME_ORDER[0]
}

function subscribeTheme(onStoreChange) {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('wl-theme', onStoreChange)
  return () => window.removeEventListener('wl-theme', onStoreChange)
}

function getThemeSnapshot() {
  if (typeof document === 'undefined') return THEME_ORDER[0]
  const t = document.documentElement.dataset.theme
  return t && THEME_ORDER.includes(t) ? t : THEME_ORDER[0]
}

export function ThemeProvider({ children }) {
  const themeId = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => THEME_ORDER[0])

  useEffect(() => {
    const stored = readStoredTheme()
    if (document.documentElement.dataset.theme !== stored) {
      document.documentElement.dataset.theme = stored
      window.dispatchEvent(new Event('wl-theme'))
    }
  }, [])

  const setTheme = useCallback((id) => {
    if (!THEME_ORDER.includes(id)) return
    document.documentElement.dataset.theme = id
    try {
      window.localStorage.setItem('wl-theme', id)
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event('wl-theme'))
  }, [])

  const cycleTheme = useCallback(() => {
    const i = THEME_ORDER.indexOf(getThemeSnapshot())
    const next = THEME_ORDER[(i + 1) % THEME_ORDER.length]
    setTheme(next)
  }, [setTheme])

  const value = useMemo(
    () => ({
      themeId,
      setTheme,
      cycleTheme,
      label: THEME_LABELS[themeId] ?? themeId,
    }),
    [cycleTheme, setTheme, themeId],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
