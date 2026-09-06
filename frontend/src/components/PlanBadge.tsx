/** Small plan badge for store cards and storefronts. */
export function PlanBadge({ plan }: { plan?: string | null }) {
  if (!plan || plan === "free") return null;
  const label = plan === "pro" ? "Pro" : "Boost";
  const cls =
    plan === "pro"
      ? "bg-primary text-white"
      : "bg-cta text-[color:var(--color-cta-ink)]";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${cls}`}
    >
      {label}
    </span>
  );
}
