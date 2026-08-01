/**
 * Theme order for the flip control. Visual tokens live in `src/index.css`
 * (`html[data-theme="…"]`) so the first paint can match localStorage (see index.html).
 *
 * Rationale (design-system practice + accessibility norms cited in industry guidance):
 * - SeedFlip-style “seeds” bundle color, type, and atmosphere—not isolated hex picks.
 * - WCAG 2.2 AA: ~4.5:1 contrast for normal text; large/bold text may use ~3:1.
 * - Each theme uses distinct display + body families for clear hierarchy.
 */
export const THEME_ORDER = [
  'mint-grove',
  'nordic-clay',
  'dusk-rose',
  'inland-indigo',
  'editorial-cream',
  'forest-canopy',
]

export const THEME_LABELS = {
  'mint-grove': 'Mint Grove',
  'nordic-clay': 'Nordic Clay',
  'dusk-rose': 'Dusk Rose',
  'inland-indigo': 'Inland Indigo',
  'editorial-cream': 'Editorial Cream',
  'forest-canopy': 'Forest Canopy',
}
