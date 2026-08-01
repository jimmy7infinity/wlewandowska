import { useLayoutEffect, useState } from 'react'
import { useTheme } from './useTheme.js'

export function useMetaballColors() {
  const { themeId } = useTheme()
  const [colors, setColors] = useState({ color: '#e6fbde', cursorBallColor: '#dff7d5' })

  useLayoutEffect(() => {
    const el = document.documentElement
    const read = () => {
      const color = getComputedStyle(el).getPropertyValue('--color-metaball-primary').trim() || '#ffffff'
      const cursorBallColor =
        getComputedStyle(el).getPropertyValue('--color-metaball-cursor').trim() || '#ffffff'
      setColors({ color, cursorBallColor })
    }
    read()
    window.addEventListener('wl-theme', read)
    return () => window.removeEventListener('wl-theme', read)
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
