/**
 * SSR-safe stand-in for framer-motion: same DOM tags and props minus animation keys,
 * so renderToString yields visible copy for crawlers.
 */
import * as React from 'react'

const MOTION_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'variants',
  'transition',
  'whileHover',
  'whileInView',
  'whileTap',
  'whileFocus',
  'whileDrag',
  'viewport',
  'layout',
  'layoutId',
  'layoutRoot',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'onAnimationStart',
  'onAnimationComplete',
])

function createMotion(Tag) {
  return React.forwardRef(function MotionStub(props, ref) {
    const next = {}
    for (const key of Object.keys(props)) {
      if (!MOTION_PROPS.has(key)) next[key] = props[key]
    }
    return React.createElement(Tag, { ...next, ref })
  })
}

const motionCache = new Map()

/**
 * Mirror framer-motion’s `motion.*` proxy so SSR never sees `undefined` for a tag
 * we use in JSX (e.g. motion.p, motion.h3).
 */
export const motion = new Proxy(
  {},
  {
    get(_, tag) {
      if (tag === 'create') return (Component) => createMotion(Component)
      if (!motionCache.has(tag)) motionCache.set(tag, createMotion(tag))
      return motionCache.get(tag)
    },
  },
)

export function LazyMotion({ children }) {
  return children
}

export function MotionConfig({ children }) {
  return children
}

/** Match client: first paint assumes full motion; avoids hydration mismatch. */
export function useReducedMotion() {
  return false
}

/** LazyMotion `features` prop — real bundle is an object; empty on the server. */
export const domAnimation = {}
