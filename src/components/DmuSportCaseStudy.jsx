import { useCallback, useState } from 'react'
import { dmuSportCaseStudy as study } from '../data/dmuSport'
import { InfographicLightbox } from './caseStudyShared'
import SpotlightCard from './SpotlightCard'
import { VerticalVideoPlayer } from './VerticalVideoPlayer'

export function DmuSportCaseStudy() {
  const [activeVideoId, setActiveVideoId] = useState(null)
  const [recommendationLightbox, setRecommendationLightbox] = useState(null)

  const activateVideo = useCallback((id) => {
    setActiveVideoId(id)
  }, [])

  const closeRecommendation = useCallback(() => setRecommendationLightbox(null), [])

  const openRecommendation = () => {
    setRecommendationLightbox({
      src: study.recommendation.documentSrc,
      alt: study.recommendation.documentLabel,
      heading: study.recommendation.documentLabel,
    })
  }

  return (
    <>
      <section className="relative scroll-mt-0 px-6 py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1100px]">
        <header className="max-w-[720px]">
          <p className="text-xs font-light uppercase tracking-[0.35em] text-brand-text/62">{study.eyebrow}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 md:gap-5">
            <h1 className="font-display text-[32px] font-medium tracking-tight text-brand-text md:text-[40px]">
              {study.title}
            </h1>
            <img
              src={study.logo.src}
              alt={study.logo.alt}
              width={120}
              height={48}
              className="h-10 w-auto object-contain md:h-11"
            />
          </div>
          <p className="mt-3 text-sm font-light text-brand-text/72 md:text-base">{study.subtitle}</p>
        </header>

        <div className="mt-10 max-w-[720px] md:mt-12">
          {study.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/92 md:text-base first:mt-0">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-14 md:mt-16">
          <h2 className="font-display text-xl font-medium text-brand-text md:text-2xl">{study.contribution.heading}</h2>
          <p className="mt-3 text-sm font-medium tracking-wide text-brand-text/88">{study.contribution.credits}</p>
          <div className="mt-4 max-w-[720px]">
            <p className="text-sm font-normal leading-[1.55] text-brand-text/88">{study.contribution.body}</p>
            <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.contribution.bodyContinued}</p>
            <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.contribution.bodyClosing}</p>
          </div>
        </div>

        <div className="mt-14 max-w-[720px] md:mt-16">
          <h2 className="font-display text-xl font-medium text-brand-text md:text-2xl">{study.programmeManagement.heading}</h2>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.programmeManagement.body}</p>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.programmeManagement.bodyContinued}</p>
          <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.programmeManagement.bodyClosing}</p>

          <SpotlightCard
            interactive={false}
            className="mt-10 rounded-2xl border border-brand-text/12 bg-brand-surface px-6 py-7 shadow-[0_12px_36px_-20px_rgba(26,20,38,0.1)] md:px-8"
            spotlightColor="rgba(178, 207, 192, 0.38)"
          >
            <blockquote className="text-sm font-normal italic leading-[1.6] text-brand-text/92 md:text-base">
              “{study.recommendation.quote}”
            </blockquote>
            <p className="mt-4 text-sm font-medium text-brand-text">{study.recommendation.attribution}</p>
            <p className="mt-1 text-xs font-light text-brand-text/68">{study.recommendation.role}</p>
            <button
              type="button"
              onClick={openRecommendation}
              className="mt-6 inline-flex rounded-full border border-brand-text/14 bg-brand-bg-muted/55 px-4 py-2 text-sm font-normal text-brand-accent-fg/90 transition-colors hover:border-brand-accent-fg/35 hover:text-brand-accent-fg"
            >
              {study.recommendation.buttonLabel}
            </button>
          </SpotlightCard>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-3 md:gap-6 lg:gap-8">
          {[study.featuredVideo, ...study.supportingVideos].map((video) => (
            <li key={video.id} className="min-w-0">
              <VerticalVideoPlayer
                title={video.title}
                description={video.description}
                posterSrc={video.posterSrc}
                videoSrc={video.videoSrc}
                isActive={activeVideoId === video.id}
                onActivate={() => activateVideo(video.id)}
                fillColumn
              />
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-14 max-w-[720px] text-sm font-normal leading-[1.55] text-brand-text/88 md:mt-16">
          {study.widerSeries}
        </p>

        <ul className="mt-10 flex flex-wrap gap-2 md:mt-12">
          {study.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-brand-text/12 bg-brand-bg-muted/55 px-3 py-1 text-xs font-normal text-brand-text/88"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
      <InfographicLightbox image={recommendationLightbox} onClose={closeRecommendation} />
    </>
  )
}
