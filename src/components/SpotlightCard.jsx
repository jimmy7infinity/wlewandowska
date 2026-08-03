import { useEffect, useRef, useState } from 'react';

const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  spotlightPeak = 0.62,
  /** Set false on long pages / stat grids to avoid pointer-driven layout work while scrolling */
  interactive = true,
}) => {
  const divRef = useRef(null);
  const glowRef = useRef(null);
  const rafRef = useRef(null);
  const pendingEventRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const handleMouseMove = (e) => {
    if (!interactive || !divRef.current || isFocused) return;

    pendingEventRef.current = e;
    if (rafRef.current != null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const ev = pendingEventRef.current;
      const root = divRef.current;
      const glow = glowRef.current;
      if (!ev || !root || !glow) return;

      const rect = root.getBoundingClientRect();
      glow.style.setProperty('--spot-x', `${ev.clientX - rect.left}px`);
      glow.style.setProperty('--spot-y', `${ev.clientY - rect.top}px`);
    });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(spotlightPeak);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    if (!interactive) return;
    setOpacity(spotlightPeak);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
