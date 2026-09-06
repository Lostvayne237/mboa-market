import type { ReactNode } from "react";

/**
 * Starts aligned to the 960px grid, then bleeds off-screen for a "wave" break
 * in an otherwise rigid layout.
 */
export function BleedCarousel({
  children,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <div className="bleed-wrap">
      <div
        className={`bleed-track ${className}`.trim()}
        role={ariaLabel ? "region" : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </div>
  );
}
