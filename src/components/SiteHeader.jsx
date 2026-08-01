import { contact } from '../data/content'
import { LinkedInIcon } from './LinkedInIcon'

export function SiteHeader() {
  const scrollHome = (e) => {
    e.preventDefault()
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="pointer-events-none fixed left-0 top-0 z-40 w-full px-6 pt-6 md:px-8 md:pt-8">
      <div className="pointer-events-auto inline-flex items-center gap-0.5 rounded-full border border-brand-text/12 bg-brand-bg/90 p-1.5 pl-2 backdrop-blur-sm">
        <a
          href="#hero"
          className="shrink-0 rounded-full p-0.5 transition-opacity hover:opacity-85"
          onClick={scrollHome}
        >
          <img
            src="/wl-logo.png"
            alt="Home"
            width={44}
            height={44}
            className="h-10 w-10 rounded-full object-cover md:h-11 md:w-11"
          />
        </a>
        <span className="mx-0.5 h-8 w-px bg-brand-text/12" aria-hidden />
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full p-2.5 text-brand-text/88 transition-[color,background-color] hover:bg-brand-text/5 hover:text-brand-accent-fg"
          aria-label="Wiktoria Lewandowska on LinkedIn"
        >
          <LinkedInIcon />
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="rounded-full p-2 transition-[background-color,opacity] hover:bg-brand-text/5"
          aria-label={`Email ${contact.email}`}
        >
          <img
            src="/gmail-logo.png"
            alt=""
            width={22}
            height={22}
            className="h-[22px] w-[22px] object-contain opacity-95 contrast-[1.08]"
          />
        </a>
      </div>
    </header>
  )
}
