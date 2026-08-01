import { motion } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { heroAside } from '../data/content'
import { staggerContainer, fadeUpItem } from '../lib/motion'
import { ScrollSectionCue } from './ScrollSectionCue'

export function Hero() {
  const subtitleRef = useRef(null)
  const [subtitleWidth, setSubtitleWidth] = useState(undefined)

  useLayoutEffect(() => {
    const el = subtitleRef.current
    if (!el) return

    const update = () => {
      const w = el.getBoundingClientRect().width
      setSubtitleWidth(Number.isFinite(w) ? w : undefined)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] snap-start snap-always flex-col px-4 pt-24 pb-6 sm:px-6 md:pt-28 md:pb-8"
    >
      <div className="mx-auto flex w-full max-w-[56rem] flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col justify-center">
          <motion.div
            className="w-full"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={fadeUpItem}
              className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:items-stretch md:gap-x-5 md:gap-y-0 lg:gap-x-8"
            >
              <div className="flex min-h-0 shrink-0 justify-center md:h-full md:justify-end md:items-end">
                <img
                  src="/pfp.png"
                  alt="Wiktoria Lewandowska, marketing and media specialist"
                  width={420}
                  height={420}
                  fetchPriority="high"
                  decoding="async"
                  className="block h-auto w-full max-w-[20.25rem] object-contain object-center sm:max-w-[22.5rem] md:max-w-96 lg:max-w-[26.25rem]"
                />
              </div>

              <div className="flex h-auto min-h-0 w-full min-w-0 flex-col items-center gap-3 text-center md:h-full md:items-start md:text-left">
                <p className="w-full shrink-0 text-xs font-light uppercase tracking-[0.35em] text-brand-text/62">
                  {heroAside.eyebrow}
                </p>
                <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center md:items-start">
                  <h1 className="w-full text-balance font-display text-[clamp(2.125rem,6vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-brand-text md:leading-[1.05]">
                    wiktoria lewandowska
                  </h1>
                  <p
                    ref={subtitleRef}
                    className="mt-4 w-fit max-w-md text-base font-normal leading-relaxed text-brand-text/92 sm:mt-5 sm:text-lg md:mt-4 md:max-w-lg md:text-xl"
                  >
                    Marketing & Media Specialist
                  </p>
                </div>
                <p
                  className={`mx-auto shrink-0 text-xs font-normal leading-relaxed text-brand-text/78 sm:text-sm md:mx-0 md:text-[0.8125rem] md:leading-relaxed ${subtitleWidth == null ? 'max-w-md md:max-w-lg' : ''}`}
                  style={
                    subtitleWidth != null ? { width: subtitleWidth, maxWidth: '100%' } : undefined
                  }
                >
                  {heroAside.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="flex shrink-0 justify-center pt-6 md:pt-8"
          variants={fadeUpItem}
          initial="hidden"
          animate="show"
        >
          <ScrollSectionCue targetId="about" bounce />
        </motion.div>
      </div>
    </section>
  )
}
