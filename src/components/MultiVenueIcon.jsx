/**
 * Abstract mark suggesting several venues / employers — layered façades, not a single brand logo.
 */
export function MultiVenueIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="6"
        y="14"
        width="26"
        height="34"
        rx="3"
        fill="rgba(26, 20, 38, 0.08)"
        stroke="rgba(26, 20, 38, 0.18)"
        strokeWidth="1"
      />
      <rect
        x="14"
        y="10"
        width="26"
        height="38"
        rx="3"
        fill="rgba(26, 20, 38, 0.1)"
        stroke="rgba(26, 20, 38, 0.22)"
        strokeWidth="1"
      />
      <rect
        x="22"
        y="6"
        width="28"
        height="42"
        rx="3"
        fill="rgba(26, 20, 38, 0.12)"
        stroke="rgba(26, 20, 38, 0.26)"
        strokeWidth="1"
      />
      <rect x="28" y="36" width="6" height="8" rx="0.5" fill="rgba(26, 20, 38, 0.35)" />
      <rect x="38" y="22" width="5" height="5" rx="0.5" fill="rgba(26, 20, 38, 0.28)" />
      <rect x="30" y="22" width="5" height="5" rx="0.5" fill="rgba(26, 20, 38, 0.28)" />
    </svg>
  )
}
