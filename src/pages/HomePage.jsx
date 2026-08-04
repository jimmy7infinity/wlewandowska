import ClickSpark from '../components/ClickSpark'
import { HashScrollSync } from '../components/HashScrollSync'
import { MetaBallsBackdrop } from '../components/MetaBallsBackdrop'
import { Navigation } from '../components/Navigation'
import { SiteHeader } from '../components/SiteHeader'
import { ThemeFlipButton } from '../components/ThemeFlipButton'
import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { CV } from '../components/CV'
import { Education } from '../components/Education'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { consultancyProjects, mediaProjects } from '../data/content'
import { useClickSparkColor } from '../theme/useThemeColors'

export function HomePage() {
  const sparkColor = useClickSparkColor()

  return (
    <ClickSpark
      sparkColor={sparkColor}
      sparkCount={9}
      sparkRadius={13}
      sparkSize={7}
      duration={360}
    >
      <div className="relative min-h-screen w-full">
        <div className="bg-page" aria-hidden />
        <MetaBallsBackdrop />
        <SiteHeader />
        <Navigation />
        <HashScrollSync />
        <main className="relative z-10 pb-24 md:pb-0">
          <Hero />
          <About />
          <Education />
          <Projects id="media" title="Featured media projects" projects={mediaProjects} />
          <Projects id="consultancy" title="Featured consultancy projects" projects={consultancyProjects} />
          <CV />
          <Contact />
        </main>
        <ThemeFlipButton />
      </div>
    </ClickSpark>
  )
}
