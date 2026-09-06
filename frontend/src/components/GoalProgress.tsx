/**
 * Goal Gradient Effect: progress never starts at 0%.
 * `completedBeforeStart` marks steps the user already took (e.g. landing, choosing vendor).
 */
export function GoalProgress({
  steps,
  currentIndex,
  completedBeforeStart = 1,
}: {
  steps: string[];
  currentIndex: number;
  completedBeforeStart?: number;
}) {
  const total = steps.length;
  const done = Math.min(completedBeforeStart + currentIndex, total);
  const pct = Math.max(12, Math.round((done / total) * 100));

  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs font-bold text-ink/50 mb-2">
        <span>
          Step {done} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-clay overflow-hidden">
        <div
          className="h-full rounded-full bg-market transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {steps.map((label, i) => {
          const isDone = i < done;
          const isCurrent = i === currentIndex;
          return (
            <span
              key={label}
              className={`text-[11px] font-bold rounded-full px-2.5 py-1 ${
                isDone
                  ? "bg-market/15 text-market"
                  : isCurrent
                    ? "bg-sun-soft text-market-dark ring-1 ring-sun"
                    : "bg-white border border-ink/10 text-ink/40"
              }`}
            >
              {isDone && i < currentIndex + completedBeforeStart ? "✓ " : ""}
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
