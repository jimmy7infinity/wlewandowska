import { useEffect, useRef, useState } from 'react'

const CYCLE_MS = 4500
const FADE_MS = 650

export function DocumentaryStillsCarousel({ images, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [visible, setVisible] = useState(true)
  const fadeTimeoutRef = useRef(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!images?.length || paused || reduceMotion || images.length < 2) return undefined

    const id = window.setInterval(() => {
      setVisible(false)
      fadeTimeoutRef.current = window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % images.length)
        setVisible(true)
      }, FADE_MS)
    }, CYCLE_MS)

    return () => {
      window.clearInterval(id)
      if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current)
    }
  }, [images, paused, reduceMotion])

  if (!images?.length) return null

  const active = images[activeIndex]

  const selectIndex = (index) => {
    if (index === activeIndex) return
    setPaused(true)
    if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current)
    setVisible(false)
    fadeTimeoutRef.current = window.setTimeout(() => {
      setActiveIndex(index)
      setVisible(true)
    }, FADE_MS)
  }

  return (
    <div
      className={`mt-10 md:mt-12 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      <figure className="overflow-hidden rounded-xl border border-brand-text/12 bg-brand-text/5 shadow-[0_12px_36px_-20px_rgba(26,20,38,0.18)]">
        <div className="relative aspect-video w-full">
          <img
            src={active.src}
            alt={active.alt}
            width={1800}
            height={1012}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity ease-out ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          />
        </div>
      </figure>

      <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3 md:mt-4">
        {images.map((image, index) => {
          const isActive = index === activeIndex
          return (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => selectIndex(index)}
                aria-label={`Show still ${index + 1}`}
                aria-pressed={isActive}
                className={`block w-full overflow-hidden rounded-lg border transition-[border-color,opacity,box-shadow] duration-300 ${
                  isActive
                    ? 'border-brand-accent-fg/55 opacity-100 shadow-[0_0_0_1px_rgba(92,58,82,0.25)]'
                    : 'border-brand-text/12 opacity-75 hover:opacity-100'
                }`}
              >
                <span className="block aspect-video">
                  <img
                    src={image.src}
                    alt=""
                    width={360}
                    height={202}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
