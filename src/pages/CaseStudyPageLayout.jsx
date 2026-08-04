import { Link } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { ThemeFlipButton } from '../components/ThemeFlipButton'

export function CaseStudyPageLayout({ backHref, backLabel, children }) {
  return (
    <div className="relative min-h-screen w-full">
      <div className="bg-page" aria-hidden />
      <SiteHeader />
      <main className="relative z-10 pb-20 pt-24 md:pb-24">
        <div className="mx-auto w-full max-w-[1100px] px-6">
          <Link
            to={backHref}
            className="inline-flex text-sm font-normal text-brand-text/78 underline-offset-4 transition-colors hover:text-brand-accent-fg hover:underline"
          >
            {backLabel}
          </Link>
        </div>
        {children}
      </main>
      <ThemeFlipButton />
    </div>
  )
}
