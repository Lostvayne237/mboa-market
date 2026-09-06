import { memberSince, timeAgo } from "../lib/contact";

/**
 * Honest trust signals — things we can actually measure.
 * No fake star ratings: activity, catalog size, profile age.
 */
export function TrustChips({
  productCount,
  lastActive,
  since,
  city,
}: {
  productCount: number;
  lastActive: string | null;
  since?: string;
  city?: string;
}) {
  const chips: string[] = [];
  if (city) chips.push(`📍 ${city}`);
  const activity = timeAgo(lastActive);
  if (activity) chips.push(activity);
  chips.push(`${productCount} listing${productCount === 1 ? "" : "s"}`);
  if (since) chips.push(`on Mboa since ${memberSince(since)}`);

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <span
          key={chip}
          className="text-xs font-semibold bg-clay text-ink/80 rounded-full px-2.5 py-1"
        >
          {chip}
        </span>
      ))}
    </div>
  );
}
