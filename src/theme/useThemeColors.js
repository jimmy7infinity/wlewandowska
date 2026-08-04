import { useLayoutEffect, useState } from 'react'
import { DEFAULT_METABALL_COLORS, THEME_METABALL_COLORS } from './themeMetaballColors.js'
import { useTheme } from './useTheme.js'

export function useMetaballColors() {
  const { themeId } = useTheme()
  const [colors, setColors] = useState(
    () => THEME_METABALL_COLORS[themeId] ?? DEFAULT_METABALL_COLORS,
  )

  useLayoutEffect(() => {
    setColors(THEME_METABALL_COLORS[themeId] ?? DEFAULT_METABALL_COLORS)
  }, [themeId])

  return colors
}

export function useClickSparkColor() {
  const { themeId } = useTheme()
  const [sparkColor, setSparkColor] = useState('rgba(92, 58, 82, 0.38)')

  useLayoutEffect(() => {
    const el = document.documentElement
    const read = () => {
      const v = getComputedStyle(el).getPropertyValue('--color-click-spark').trim()
      setSparkColor(v || 'rgba(92, 58, 82, 0.38)')
    }
    read()
    window.addEventListener('wl-theme', read)
    return () => window.removeEventListener('wl-theme', read)
  }, [themeId])

  return sparkColor
}
