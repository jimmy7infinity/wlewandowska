import { useTheme } from '../theme/useTheme.js'
import { THEME_LABELS, THEME_ORDER } from '../theme/themeOrder.js'

export function ThemeFlipButton() {
  const { themeId, cycleTheme, label } = useTheme()
  const i = THEME_ORDER.indexOf(themeId)
  const nextId = THEME_ORDER[(i + 1) % THEME_ORDER.length]
  const nextLabel = THEME_LABELS[nextId] ?? nextId

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="pointer-events-auto fixed bottom-5 right-4 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-brand-text/15 bg-brand-surface/95 text-brand-accent-fg shadow-md backdrop-blur-sm transition-[transform,box-shadow,border-color] hover:border-brand-accent-fg/35 hover:shadow-lg md:bottom-8 md:right-8 md:h-auto md:w-auto md:max-w-[min(calc(100vw-3rem),14rem)] md:gap-2 md:px-4 md:py-2.5 md:text-left md:text-xs md:font-medium md:text-brand-text"
      title={`Theme: ${label}. Next: ${nextLabel}`}
      aria-label={`Current theme ${label}. Activate to switch to ${nextLabel}.`}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-accent/35 text-sm text-brand-accent-fg"
        aria-hidden
      >
        ◐
      </span>
      <span className="hidden min-w-0 flex-1 leading-snug md:block">
        <span className="block text-[10px] font-normal uppercase tracking-wider text-brand-text/55">Theme</span>
        <span className="block truncate font-medium text-brand-text">{label}</span>
      </span>
    </button>
  )
}
