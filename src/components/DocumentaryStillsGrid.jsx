export function DocumentaryStillsGrid({ images, className = '' }) {
  if (!images?.length) return null

  return (
    <ul
      className={`mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-4 ${className}`}
    >
      {images.map((image) => (
        <li
          key={image.src}
          className="aspect-video overflow-hidden rounded-xl border border-brand-text/12 bg-brand-text/5 shadow-[0_10px_28px_-18px_rgba(26,20,38,0.2)]"
        >
          <img
            src={image.src}
            alt={image.alt}
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </li>
      ))}
    </ul>
  )
}
