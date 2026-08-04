import { useEffect, useId, useRef, useState } from 'react'

export function VerticalVideoPlayer({
  title,
  description,
  posterSrc,
  videoSrc,
  isActive,
  onActivate,
  featured = false,
  fillColumn = false,
}) {
  const videoRef = useRef(null)
  const titleId = useId()
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (!isActive) {
      video.pause()
      if (hasStarted) {
        video.currentTime = 0
        setHasStarted(false)
      }
    }
  }, [isActive, hasStarted])

  const play = () => {
    onActivate()
    setHasStarted(true)
    requestAnimationFrame(() => {
      const video = videoRef.current
      if (video) {
        void video.play()
      }
    })
  }

  const widthClass = fillColumn
    ? 'w-full'
    : featured
      ? 'mx-auto w-full max-w-[min(100%,22rem)] sm:max-w-xs md:max-w-sm'
      : 'mx-auto w-full max-w-[min(100%,18rem)] sm:max-w-[16rem]'

  const showPoster = !isActive || !hasStarted

  return (
    <figure className={widthClass}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-brand-text/12 bg-brand-text/5 shadow-[0_12px_36px_-20px_rgba(26,20,38,0.18)]">
        <video
          ref={videoRef}
          className={`h-full w-full object-contain ${showPoster ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
          src={videoSrc}
          controls={isActive && hasStarted}
          playsInline
          preload="metadata"
          aria-labelledby={titleId}
          onPlay={() => {
            onActivate()
            setHasStarted(true)
          }}
        />
        {showPoster ? (
          <>
            <img src={posterSrc} alt="" className="absolute inset-0 h-full w-full object-contain" aria-hidden />
            <button
              type="button"
              onClick={play}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-brand-text/20 transition-colors hover:bg-brand-text/28"
              aria-label={`Play video: ${title}`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-surface/40 bg-brand-surface/90 text-brand-accent-fg shadow-md">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          </>
        ) : null}
      </div>
      <figcaption className="mt-4">
        <p id={titleId} className="font-display text-lg font-medium text-brand-text md:text-xl">
          {title}
        </p>
        {description ? (
          <p className="mt-2 text-sm font-normal leading-[1.55] text-brand-text/88">{description}</p>
        ) : null}
      </figcaption>
    </figure>
  )
}
