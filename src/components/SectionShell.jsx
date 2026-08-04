export function SectionShell({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={`wl-section-snap relative flex min-h-screen snap-start snap-always flex-col justify-center py-20 md:py-[120px] ${className}`}
    >
      <div className="mx-auto w-full max-w-[1100px] px-6">{children}</div>
    </section>
  )
}
