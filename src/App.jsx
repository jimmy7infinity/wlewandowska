import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { About } from './components/About'
import ClickSpark from './components/ClickSpark'
import { Contact } from './components/Contact'
import { CV } from './components/CV'
import { Education } from './components/Education'
import { HashScrollSync } from './components/HashScrollSync'
import { Hero } from './components/Hero'
import { MetaBallsBackdrop } from './components/MetaBallsBackdrop'
import { Navigation } from './components/Navigation'
import { PageLoadTransition } from './components/PageLoadTransition'
import { SiteHeader } from './components/SiteHeader'
import { BeyondTheDumpCaseStudy } from './components/BeyondTheDumpCaseStudy'
import { BosleyMDCaseStudy } from './components/BosleyMDCaseStudy'
import { LazyCaseStudyMount } from './components/LazyCaseStudyMount'
import { PeterPizzeriaCaseStudy } from './components/PeterPizzeriaCaseStudy'
import { Projects } from './components/Projects'
import { ThemeFlipButton } from './components/ThemeFlipButton'
import { consultancyProjects, mediaProjects } from './data/content'
import { useClickSparkColor } from './theme/useThemeColors'

function App() {
  const sparkColor = useClickSparkColor()

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig initial={false}>
        <PageLoadTransition>
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
                <LazyCaseStudyMount sectionId="media-beyond-the-dump" prefetchSectionId="media">
                  <BeyondTheDumpCaseStudy />
                </LazyCaseStudyMount>
                <Projects id="consultancy" title="Featured consultancy projects" projects={consultancyProjects} />
                <LazyCaseStudyMount sectionId="consultancy-peter-pizzeria">
                  <PeterPizzeriaCaseStudy />
                </LazyCaseStudyMount>
                <LazyCaseStudyMount sectionId="consultancy-bosleymd">
                  <BosleyMDCaseStudy />
                </LazyCaseStudyMount>
                <CV />
                <Contact />
              </main>
              <ThemeFlipButton />
            </div>
          </ClickSpark>
        </PageLoadTransition>
      </MotionConfig>
    </LazyMotion>
  )
}

export default App
