import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { peterPizzeriaCaseStudy as study } from '../data/peterPizzeria'
import { easeOut, fadeUpItem, inViewOnce, introTextItem, staggerContainer, staggerList } from '../lib/motion'
import SpotlightCard from './SpotlightCard'

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function InfographicLightbox({ image, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!image) return undefined

    closeRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [image, onClose])

  if (!image) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-text/72 p-4 backdrop-blur-sm md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-brand-surface/30 bg-brand-surface/95 px-3 py-1.5 text-xs font-medium text-brand-text shadow-md md:right-8 md:top-8"
      >
        Close
      </button>
      <figure
        className="max-h-[90vh] max-w-[min(1100px,100%)] overflow-auto rounded-2xl border border-brand-surface/20 bg-brand-surface shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {image.heading ? (
          <p className="border-b border-brand-text/10 px-4 py-3 text-center text-xs font-light uppercase tracking-wider text-brand-text/72">
            {image.heading}
          </p>
        ) : null}
        <img src={image.src} alt={image.alt} className="h-auto w-full" />
        <figcaption className="px-4 py-3 text-center text-xs font-light text-brand-text/68">{image.caption}</figcaption>
      </figure>
    </div>
  )
}

function PdfLink({ label, href, description, linkText }) {
  return (
    <motion.a
      variants={fadeUpItem}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-brand-text/12 bg-brand-surface px-6 py-5 text-left shadow-[0_12px_36px_-20px_rgba(26,20,38,0.12)] transition-[border-color,box-shadow] duration-300 hover:border-brand-accent-fg/35 hover:shadow-[0_20px_50px_-22px_rgba(37,29,57,0.16)]"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: easeOut }}
    >
      <span className="font-display text-base font-medium text-brand-text md:text-lg">{label}</span>
      <span className="mt-1 text-xs font-light leading-snug text-brand-text/68">{description}</span>
      <span className="mt-3 text-xs font-normal text-brand-accent-fg/90 group-hover:text-brand-accent-fg">{linkText}</span>
    </motion.a>
  )
}

export function PeterPizzeriaCaseStudy() {
  const [lightboxImage, setLightboxImage] = useState(null)
  const closeLightbox = useCallback(() => setLightboxImage(null), [])

  return (
    <>
      <section
        id={study.id}
        className="relative snap-start snap-always scroll-mt-0 px-6 py-20 md:py-[120px]"
      >
        <motion.div
          className="mx-auto w-full max-w-[1100px]"
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
          variants={staggerContainer}
        >
          <motion.header variants={fadeUpItem} className="max-w-[700px]">
            <p className="text-xs font-light uppercase tracking-[0.35em] text-brand-text/62">{study.eyebrow}</p>
            <h2 className="font-display mt-4 text-[32px] font-medium tracking-tight text-brand-text md:text-[40px]">
              {study.title}
            </h2>
            <p className="mt-3 text-sm font-light text-brand-text/72 md:text-base">{study.subtitle}</p>
            <p className="mt-6 text-sm font-normal leading-[1.55] text-brand-text/92 md:text-base">{study.summary}</p>
            <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/92 md:text-base">
              {study.summaryContinued}
            </p>
          </motion.header>

          <motion.div
            variants={fadeUpItem}
            className="mt-10 grid grid-cols-1 gap-6 rounded-2xl border border-brand-text/12 bg-brand-surface/80 p-6 md:mt-12 md:grid-cols-2 md:gap-8 md:p-8"
          >
            <div>
              <p className="text-xs font-light uppercase tracking-wider text-brand-text/62">{study.role.label}</p>
              <p className="mt-2 text-sm font-normal leading-[1.55] text-brand-text/92">{study.role.value}</p>
            </div>
            <div>
              <p className="text-xs font-light uppercase tracking-wider text-brand-text/62">{study.deliverables.label}</p>
              <p className="mt-2 text-sm font-normal leading-[1.55] text-brand-text/92">{study.deliverables.value}</p>
            </div>
          </motion.div>

          <motion.ul
            variants={staggerList}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-12"
          >
            {study.stats.map((stat) => (
              <motion.li key={stat.label} variants={fadeUpItem}>
                <SpotlightCard
                  className="h-full rounded-2xl border border-brand-text/12 bg-brand-surface px-5 py-6 text-center shadow-[0_12px_36px_-20px_rgba(26,20,38,0.1)]"
                  spotlightColor="rgba(178, 207, 192, 0.38)"
                >
                  <p className="font-display text-3xl font-medium text-brand-text md:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-xs font-normal leading-snug text-brand-text/78">{stat.label}</p>
                </SpotlightCard>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={staggerList} className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
            {study.highlights.map((item) => (
              <motion.article key={item.title} variants={fadeUpItem} className="min-w-0">
                <h3 className="font-display text-lg font-medium text-brand-text">{item.title}</h3>
                <p className="mt-3 text-sm font-normal leading-[1.55] text-brand-text/88">{item.body}</p>
              </motion.article>
            ))}
          </motion.div>

          <motion.ul variants={introTextItem} className="mt-10 flex flex-wrap gap-2 md:mt-12">
            {study.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-brand-text/12 bg-brand-bg-muted/55 px-3 py-1 text-xs font-normal text-brand-text/88"
              >
                {skill}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUpItem} className="mt-16 md:mt-20">
            <h3 className="font-display text-center text-xl font-medium text-brand-text md:text-2xl">
              Evidence at a glance
            </h3>
            <p className="mx-auto mt-4 max-w-[640px] text-center text-sm font-normal leading-[1.55] text-brand-text/88">
              {study.evidenceIntro}
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
              {study.infographics.map((img) => (
                <figure key={img.src} className="min-w-0">
                  <button
                    type="button"
                    onClick={() => setLightboxImage(img)}
                    aria-label={`View full size: ${img.caption}`}
                    className="group w-full overflow-hidden rounded-2xl border border-brand-text/10 bg-brand-surface text-left shadow-[0_14px_44px_-26px_rgba(26,20,38,0.12)] transition-[border-color,box-shadow] duration-300 hover:border-brand-accent-fg/35 hover:shadow-[0_20px_50px_-22px_rgba(37,29,57,0.16)]"
                  >
                    {img.heading ? (
                      <p className="border-b border-brand-text/10 px-4 py-2 text-center text-xs font-light uppercase tracking-wider text-brand-text/72">
                        {img.heading}
                      </p>
                    ) : null}
                    <img src={img.src} alt="" className="h-auto w-full" loading="lazy" decoding="async" aria-hidden />
                    <span className="block px-4 py-2 text-center text-xs font-normal text-brand-accent-fg/90 group-hover:text-brand-accent-fg">
                      View full size
                    </span>
                  </button>
                  <figcaption className="mt-3 text-center text-xs font-light text-brand-text/68">{img.caption}</figcaption>
                </figure>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-[640px] text-center text-xs font-light text-brand-text/68">
              {study.kpiDisclaimer}
            </p>
          </motion.div>

          <motion.div variants={fadeUpItem} className="mt-14 md:mt-16">
            <h3 className="font-display text-center text-xl font-medium text-brand-text md:text-2xl">
              {study.demonstrates.heading}
            </h3>
            <p className="mx-auto mt-6 max-w-[720px] text-center text-sm font-normal leading-[1.55] text-brand-text/88">
              {study.demonstrates.body}
            </p>
          </motion.div>

          <motion.div variants={fadeUpItem} className="mt-14 md:mt-16">
            <h3 className="font-display text-center text-xl font-medium text-brand-text md:text-2xl">
              {study.supportingMaterials.heading}
            </h3>
            <p className="mx-auto mt-4 max-w-[640px] text-center text-sm font-normal leading-[1.55] text-brand-text/88">
              {study.supportingMaterials.intro}
            </p>
            <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {study.downloads.map((file) => (
                <PdfLink key={file.href} {...file} />
              ))}
            </div>
          </motion.div>

          <motion.aside
            variants={fadeUpItem}
            className="mx-auto mt-10 max-w-[720px] rounded-2xl border border-brand-text/10 bg-brand-bg-muted/35 px-6 py-4 text-center md:mt-12"
          >
            <p className="text-xs font-light leading-[1.55] text-brand-text/68">{study.projectDisclaimer}</p>
          </motion.aside>

          <motion.div variants={fadeUpItem} className="mx-auto mt-14 max-w-[640px] text-center md:mt-16">
            <h3 className="font-display text-xl font-medium text-brand-text md:text-2xl">{study.closing.heading}</h3>
            <p className="mt-4 text-sm font-normal leading-[1.55] text-brand-text/88">{study.closing.body}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="inline-flex rounded-full border border-brand-text/15 bg-brand-surface px-8 py-3 text-sm font-medium text-brand-text transition-colors duration-300 hover:border-brand-accent-fg/45 hover:text-brand-accent-fg"
              >
                Contact me
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('consultancy')}
                className="inline-flex rounded-full border border-transparent px-6 py-3 text-sm font-normal text-brand-text/78 underline-offset-4 transition-colors hover:text-brand-accent-fg hover:underline"
              >
                Back to projects
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <InfographicLightbox image={lightboxImage} onClose={closeLightbox} />
    </>
  )
}
