/**
 * Ordered to match DOM scroll flow. Values are 0–1 from left / top of the viewport.
 * groupOffset* are passed through to the shader (fractions of half-viewport × scale).
 */
export const METABALL_SCROLL_STOPS = [
  { id: 'hero', clusterAnchorX: 0.84, clusterAnchorY: 0.66, groupOffsetX: 0.52, groupOffsetY: -0.42 },
  { id: 'about', clusterAnchorX: 0.26, clusterAnchorY: 0.48, groupOffsetX: -0.44, groupOffsetY: 0.02 },
  { id: 'education-intro', clusterAnchorX: 0.5, clusterAnchorY: 0.5, groupOffsetX: 0, groupOffsetY: 0 },
  {
    id: 'education-undergrad',
    clusterAnchorX: 0.22,
    clusterAnchorY: 0.3,
    groupOffsetX: -0.52,
    groupOffsetY: -0.38,
  },
  {
    id: 'education-postgrad',
    clusterAnchorX: 0.78,
    clusterAnchorY: 0.5,
    groupOffsetX: 0.46,
    groupOffsetY: 0.02,
  },
  { id: 'media', clusterAnchorX: 0.5, clusterAnchorY: 0.5, groupOffsetX: 0, groupOffsetY: 0 },
  {
    id: 'consultancy',
    clusterAnchorX: 0.84,
    clusterAnchorY: 0.66,
    groupOffsetX: 0.52,
    groupOffsetY: -0.42,
  },
  {
    id: 'consultancy-peter-pizzeria',
    clusterAnchorX: 0.28,
    clusterAnchorY: 0.58,
    groupOffsetX: -0.4,
    groupOffsetY: 0.08,
  },
  {
    id: 'consultancy-bosleymd',
    clusterAnchorX: 0.72,
    clusterAnchorY: 0.52,
    groupOffsetX: 0.38,
    groupOffsetY: 0.04,
  },
  {
    id: 'experience-intro',
    clusterAnchorX: 0.5,
    clusterAnchorY: 0.76,
    groupOffsetX: 0.02,
    groupOffsetY: -0.48,
  },
  {
    id: 'experience-think-pacific',
    clusterAnchorX: 0.8,
    clusterAnchorY: 0.3,
    groupOffsetX: 0.48,
    groupOffsetY: -0.36,
  },
  {
    id: 'experience-dmu',
    clusterAnchorX: 0.22,
    clusterAnchorY: 0.72,
    groupOffsetX: -0.5,
    groupOffsetY: -0.46,
  },
  {
    id: 'experience-hospitality',
    clusterAnchorX: 0.5,
    clusterAnchorY: 0.28,
    groupOffsetX: 0.04,
    groupOffsetY: -0.42,
  },
  { id: 'contact', clusterAnchorX: 0.5, clusterAnchorY: 0.5, groupOffsetX: 0, groupOffsetY: 0 },
]

function pickTarget(s) {
  return {
    clusterAnchorX: s.clusterAnchorX,
    clusterAnchorY: s.clusterAnchorY,
    groupOffsetX: s.groupOffsetX,
    groupOffsetY: s.groupOffsetY,
  }
}

/** Interpolate metaball anchors from scroll position (viewport reference line). */
export function computeMetaballScrollTarget(stops, scrollY, viewportHeight, enrichedStops) {
  if (!stops?.length) return null
  const viewRef = scrollY + viewportHeight * 0.45

  const enriched =
    enrichedStops ??
    stops
      .map((s) => {
        const el = document.getElementById(s.id)
        if (!el) return null
        const r = el.getBoundingClientRect()
        const midY = scrollY + r.top + r.height * 0.5
        return { ...s, midY }
      })
      .filter(Boolean)

  if (!enriched.length) return null

  if (viewRef <= enriched[0].midY) return pickTarget(enriched[0])
  const last = enriched[enriched.length - 1]
  if (viewRef >= last.midY) return pickTarget(last)

  for (let i = 0; i < enriched.length - 1; i++) {
    const a = enriched[i]
    const b = enriched[i + 1]
    if (viewRef >= a.midY && viewRef <= b.midY) {
      const span = b.midY - a.midY
      const t = span > 0 ? (viewRef - a.midY) / span : 0
      const u = t * t * (3 - 2 * t)
      return {
        clusterAnchorX: a.clusterAnchorX + (b.clusterAnchorX - a.clusterAnchorX) * u,
        clusterAnchorY: a.clusterAnchorY + (b.clusterAnchorY - a.clusterAnchorY) * u,
        groupOffsetX: a.groupOffsetX + (b.groupOffsetX - a.groupOffsetX) * u,
        groupOffsetY: a.groupOffsetY + (b.groupOffsetY - a.groupOffsetY) * u,
      }
    }
  }

  return pickTarget(last)
}

/** Measure section midpoints once per scroll frame — not inside the WebGL rAF loop. */
export function measureMetaballScrollStops(stops, scrollY) {
  if (!stops?.length) return []
  return stops
    .map((s) => {
      const el = document.getElementById(s.id)
      if (!el) return null
      const r = el.getBoundingClientRect()
      const midY = scrollY + r.top + r.height * 0.5
      return { ...s, midY }
    })
    .filter(Boolean)
}
