/** Skeleton states so the layout never looks broken on a weak connection. */

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="stagger grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton aspect-[4/5]" />
      ))}
    </div>
  );
}

export function RowSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex gap-3 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton h-20 w-64 shrink-0" />
      ))}
    </div>
  );
}

export function BlockSkeleton({ className = "h-40" }: { className?: string }) {
  return <div className={`skeleton w-full ${className}`} />;
}
