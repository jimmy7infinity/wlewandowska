import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { easeOut, fadeUpItem } from '../lib/motion'
import { scrollToSectionId } from '../lib/scrollToSection.js'

export function scrollToSection(id) {
  scrollToSectionId(id)
}

export function InfographicLightbox({ image, onClose }) {
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
        {image.caption ? (
          <figcaption className="px-4 py-3 text-center text-xs font-light text-brand-text/68">{image.caption}</figcaption>
        ) : null}
      </figure>
    </div>
  )
}

export function PdfLink({ label, href, description, linkText, external = true }) {
  const className =
    'group flex flex-col rounded-2xl border border-brand-text/12 bg-brand-surface px-6 py-5 text-left shadow-[0_12px_36px_-20px_rgba(26,20,38,0.12)] transition-[border-color,box-shadow] duration-300 hover:border-brand-accent-fg/35 hover:shadow-[0_20px_50px_-22px_rgba(37,29,57,0.16)]'

  if (href.startsWith('mailto:')) {
    return (
      <motion.a
        variants={fadeUpItem}
        href={href}
        className={className}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.25, ease: easeOut }}
      >
        <span className="font-display text-base font-medium text-brand-text md:text-lg">{label}</span>
        <span className="mt-1 text-xs font-light leading-snug text-brand-text/68">{description}</span>
        <span className="mt-3 text-xs font-normal text-brand-accent-fg/90 group-hover:text-brand-accent-fg">{linkText}</span>
      </motion.a>
    )
  }

  return (
    <motion.a
      variants={fadeUpItem}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={className}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: easeOut }}
    >
      <span className="font-display text-base font-medium text-brand-text md:text-lg">{label}</span>
      <span className="mt-1 text-xs font-light leading-snug text-brand-text/68">{description}</span>
      <span className="mt-3 text-xs font-normal text-brand-accent-fg/90 group-hover:text-brand-accent-fg">{linkText}</span>
    </motion.a>
  )
}

export function EvidenceFigure({ img, onOpen }) {
  return (
    <figure className="min-w-0">
      <button
        type="button"
        onClick={() => onOpen(img)}
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
  )
}
