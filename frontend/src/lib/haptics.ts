/** Light tap for frequent actions; heavy for major state changes (mobile only). */
export function haptic(kind: "light" | "heavy" = "light") {
  if (typeof navigator === "undefined") return;
  const nav = navigator as Navigator & {
    vibrate?: (pattern: number | number[]) => boolean;
  };
  if (!nav.vibrate) return;
  nav.vibrate(kind === "heavy" ? 18 : 6);
}
