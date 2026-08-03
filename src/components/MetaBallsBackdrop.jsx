import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useCaseStudyMetaballSuppress } from '../hooks/useCaseStudyMetaballSuppress.js'
import { useTheme } from '../theme/useTheme.js'
import { useMetaballColors } from '../theme/useThemeColors.js'

/**
 * Client-only: MetaBalls pulls in WebGL (ogl) and must not load during SSR/prerender.
 */
export function MetaBallsBackdrop() {
  const [MetaBalls, setMetaBalls] = useState(null)
  const reduceMotion = useReducedMotion()
  const suppressDuringCaseStudies = useCaseStudyMetaballSuppress()
  const { themeId } = useTheme()
  const { color, cursorBallColor } = useMetaballColors()

  useEffect(() => {
    let cancelled = false
    import('./MetaBalls.jsx').then((mod) => {
      if (!cancelled) setMetaBalls(() => mod.default)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (!MetaBalls) return null

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[1] overflow-hidden transition-opacity duration-700 ease-out ${
        suppressDuringCaseStudies ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden
    >
      <MetaBalls
        key={themeId}
        color={color}
        cursorBallColor={cursorBallColor}
        speed={0.22}
        animationSize={26}
        ballCount={12}
        clumpFactor={0.72}
        cursorBallSize={2.4}
        enableMouseInteraction={!suppressDuringCaseStudies}
        hoverSmoothness={0.1}
        enableTransparency
        useScrollAnchors
        scrollLerpWeight={reduceMotion ? 1 : 0.052}
        mouseProximityRadius={300}
        paused={suppressDuringCaseStudies}
      />
    </div>
  )
}
