export const CASE_STUDY_SECTION_IDS = []

/**
 * True while any case-study scroll section occupies the viewport — used to pause heavy backdrop work.
 * Case studies now live on dedicated routes; homepage no longer embeds them.
 */
export function useCaseStudyMetaballSuppress() {
  return false
}
