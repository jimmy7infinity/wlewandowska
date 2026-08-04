import { useEffect, useState } from 'react'
import { scrollToSectionId } from '../lib/scrollToSection.js'

const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'education-intro', label: 'Edu' },
  { id: 'education-undergrad', label: 'UG' },
  { id: 'education-postgrad', label: 'PG' },
  { id: 'media', label: 'Media' },
  { id: 'media-beyond-the-dump', label: 'Dump' },
  { id: 'consultancy', label: 'Consult' },
  { id: 'consultancy-peter-pizzeria', label: 'Peter P.' },
  { id: 'consultancy-bosleymd', label: 'Bosley' },
  { id: 'experience-intro', label: 'CV' },
  { id: 'experience-think-pacific', label: 'Pacific' },
  { id: 'experience-dmu', label: 'DMU' },
  { id: 'experience-hospitality', label: 'Hospit.' },
  { id: 'contact', label: 'Contact' },
]

export function Navigation() {
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    let observer

    const attach = () => {
      observer?.disconnect()
      const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
      if (nodes.length === 0) return

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          if (visible[0]?.target?.id) {
            setActiveId(visible[0].target.id)
          }
        },
        {
          root: null,
          rootMargin: '-38% 0px -42% 0px',
          threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
        },
      )

      nodes.forEach((el) => observer.observe(el))
    }

    attach()
    window.addEventListener('wl-layout-change', attach)
    return () => {
      observer?.disconnect()
      window.removeEventListener('wl-layout-change', attach)
    }
  }, [])

  const scrollTo = (id) => {
    scrollToSectionId(id)
  }

  return (
    <>
      <nav
        className="pointer-events-none fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4 md:hidden"
        aria-label="Section navigation"
      >
        <ul className="pointer-events-auto flex max-w-full gap-2 overflow-x-auto rounded-full border border-brand-accent-fg/20 bg-brand-surface px-3 py-2.5 shadow-md backdrop-blur-sm">
          {SECTIONS.map((s) => {
            const active = activeId === s.id
            return (
              <li key={s.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => scrollTo(s.id)}
                  className={`h-2 w-2 rounded-full border transition-[transform,background-color,border-color] duration-300 ${
                    active
                      ? 'scale-110 border-brand-accent-fg bg-brand-accent-fg'
                      : 'border-brand-text/40 bg-transparent hover:border-brand-accent-fg/55'
                  }`}
                  aria-label={`Go to ${s.label}`}
                  aria-current={active ? 'true' : undefined}
                />
              </li>
            )
          })}
        </ul>
      </nav>

      <nav
        className="pointer-events-none fixed right-4 top-1/2 z-50 hidden max-h-[85vh] -translate-y-1/2 overflow-y-auto md:block lg:right-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        aria-label="Section navigation"
      >
        <ul className="pointer-events-auto flex flex-col gap-2.5 pr-1">
          {SECTIONS.map((s) => {
            const active = activeId === s.id
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(s.id)}
                  className="group flex items-center gap-3 rounded-full py-1 pl-1 pr-2 text-left"
                  aria-current={active ? 'true' : undefined}
                  aria-label={`Go to ${s.label}`}
                >
                  <span
                    className={`block h-2 w-2 shrink-0 rounded-full border transition-[transform,background-color,border-color] duration-300 ${
                      active
                        ? 'scale-100 border-brand-accent-fg bg-brand-accent-fg'
                        : 'scale-90 border-brand-text/40 bg-transparent group-hover:border-brand-accent-fg/55'
                    }`}
                  />
                  <span
                    className={`max-w-[5.5rem] text-[11px] font-light tracking-wide transition-opacity duration-300 ${
                      active ? 'text-brand-text opacity-100' : 'text-brand-text/72 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
