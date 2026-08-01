/**
 * React Bits–style 3D tilt: mouse-driven rotate + slight scale (content-agnostic).
 * Smoothed with an rAF lerp so the first hover eases in instead of snapping.
 */
import { useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

const SMOOTH = 0.062
const EPS_DEG = 0.04
const EPS_SCALE = 0.0025

export function TiltedCardShell({
  children,
  className = '',
  tiltAmplitude = 11,
  scaleHover = 1.028,
}) {
  const reduceMotion = useReducedMotion()
  const reduceRef = useRef(false)
  reduceRef.current = !!reduceMotion

  const ref = useRef(null)
  const targetRef = useRef({ rx: 0, ry: 0, s: 1 })
  const curRef = useRef({ rx: 0, ry: 0, s: 1 })
  const rafRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, s: 1 })

  const stopLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  useEffect(() => () => stopLoop(), [stopLoop])

  const runFrame = useCallback(() => {
    rafRef.current = null

    if (reduceRef.current) {
      const t = targetRef.current
      curRef.current = { rx: t.rx, ry: t.ry, s: t.s }
      setTilt({ ...curRef.current })
      return
    }

    const tgt = targetRef.current
    const cur = curRef.current
    const k = SMOOTH
    cur.rx += (tgt.rx - cur.rx) * k
    cur.ry += (tgt.ry - cur.ry) * k
    cur.s += (tgt.s - cur.s) * k

    const done =
      Math.abs(tgt.rx - cur.rx) < EPS_DEG &&
      Math.abs(tgt.ry - cur.ry) < EPS_DEG &&
      Math.abs(tgt.s - cur.s) < EPS_SCALE

    if (done) {
      cur.rx = tgt.rx
      cur.ry = tgt.ry
      cur.s = tgt.s
    }

    setTilt({ rx: cur.rx, ry: cur.ry, s: cur.s })

    if (!done) {
      rafRef.current = requestAnimationFrame(runFrame)
    }
  }, [])

  const ensureLoop = useCallback(() => {
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(runFrame)
    }
  }, [runFrame])

  const onMove = useCallback(
    (e) => {
      if (reduceRef.current) return
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      targetRef.current = {
        rx: -py * 2 * tiltAmplitude,
        ry: px * 2 * tiltAmplitude,
        s: scaleHover,
      }
      ensureLoop()
    },
    [tiltAmplitude, scaleHover, ensureLoop],
  )

  const onLeave = useCallback(() => {
    targetRef.current = { rx: 0, ry: 0, s: 1 }
    ensureLoop()
  }, [ensureLoop])

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: '1180px' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        className="h-full [transform-style:preserve-3d] will-change-transform"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(${tilt.s},${tilt.s},${tilt.s})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
