import { useCallback, useState } from 'react'
import { posterVisualDesignCaseStudy as study } from '../data/posterVisualDesign'
import { InfographicLightbox } from './caseStudyShared'

export function PosterVisualDesignCaseStudy() {
  const [lightboxImage, setLightboxImage] = useState(null)
  const closeLightbox = useCallback(() => setLightboxImage(null), [])

  return (
    <>
      <section className="relative scroll-mt-0 px-6 py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1100px]">
          <header className="max-w-[720px]">
            <p className="text-xs font-light uppercase tracking-[0.35em] text-brand-text/62">{study.eyebrow}</p>
            <h1 className="font-display mt-4 text-[32px] font-medium tracking-tight text-brand-text md:text-[40px]">
              {study.title}
            </h1>
            <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88 md:text-base">
              {study.introduction}
            </p>
          </header>

          <div className="mt-16 space-y-20 md:mt-20 md:space-y-24">
            {study.projects.map((project, index) => (
              <article key={project.id} className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12">
                <div className={`md:col-span-6 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxImage({
                        src: project.poster.src,
                        alt: project.poster.alt,
                        heading: `${project.brand} — ${project.title}`,
                      })
                    }
                    className="group block w-full text-left"
                    aria-label={`View larger: ${project.brand} — ${project.title}`}
                  >
                    <figure className="overflow-hidden rounded-2xl border border-brand-text/12 bg-brand-text/5 shadow-[0_16px_44px_-22px_rgba(26,20,38,0.22)] transition-[box-shadow,transform] duration-300 group-hover:shadow-[0_22px_52px_-20px_rgba(26,20,38,0.28)] group-hover:-translate-y-0.5">
                      <img
                        src={project.poster.src}
                        alt={project.poster.alt}
                        width={723}
                        height={1024}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="h-auto w-full object-contain"
                      />
                    </figure>
                    <p className="mt-3 text-xs font-light tracking-wide text-brand-text/58">Click to enlarge</p>
                  </button>
                </div>

                <div className={`md:col-span-6 ${index % 2 === 1 ? 'md:order-1' : ''} md:pt-2`}>
                  <p className="text-xs font-light uppercase tracking-[0.3em] text-brand-text/62">
                    Project {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="font-display mt-3 text-2xl font-medium tracking-tight text-brand-text md:text-[28px]">
                    {project.brand}
                  </h2>
                  <p className="mt-2 text-sm font-medium tracking-wide text-brand-text/88">{project.title}</p>
                  <p className="mt-3 text-sm font-normal italic leading-[1.55] text-brand-text/78">{project.subtitle}</p>

                  <div className="mt-6 max-w-[36rem]">
                    {project.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88 first:mt-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {project.outcome ? (
                      <p className="mt-5 text-sm font-normal leading-[1.55] text-brand-text/88">{project.outcome}</p>
                    ) : null}
                  </div>

                  <div className="mt-8">
                    <p className="text-xs font-light uppercase tracking-[0.28em] text-brand-text/62">
                      {project.contribution.heading}
                    </p>
                    <p className="mt-2 text-sm font-medium tracking-wide text-brand-text/88">
                      {project.contribution.credits}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <ul className="mt-16 flex flex-wrap gap-2 md:mt-20">
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
      <InfographicLightbox image={lightboxImage} onClose={closeLightbox} />
    </>
  )
}
