import { CheckIcon } from "@heroicons/react/24/solid";
import {
  STORE_PLANS,
  formatPlanPrice,
  type StorePlanId,
} from "../lib/plans";
import { useI18n } from "../lib/i18n";
import { haptic } from "../lib/haptics";
import type { MessageKey } from "../lib/translations";

const FEATURE_KEYS: Record<StorePlanId, MessageKey[]> = {
  free: [
    "pricing.plan.free.f1",
    "pricing.plan.free.f2",
    "pricing.plan.free.f3",
    "pricing.plan.free.f4",
  ],
  boost: [
    "pricing.plan.boost.f1",
    "pricing.plan.boost.f2",
    "pricing.plan.boost.f3",
    "pricing.plan.boost.f4",
  ],
  pro: [
    "pricing.plan.pro.f1",
    "pricing.plan.pro.f2",
    "pricing.plan.pro.f3",
    "pricing.plan.pro.f4",
  ],
};

/** Pick Free / Boost / Pro — always side by side. */
export function PlanPicker({
  value,
  onChange,
  compact = false,
}: {
  value: StorePlanId;
  onChange: (id: StorePlanId) => void;
  compact?: boolean;
}) {
  const { locale, t } = useI18n();

  return (
    <div
      className="grid grid-cols-3 gap-2 sm:gap-3"
      role="radiogroup"
      aria-label={t("pricing.plansLabel")}
    >
      {STORE_PLANS.map((plan) => {
        const selected = value === plan.id;
        return (
          <button
            key={plan.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => {
              haptic("heavy");
              onChange(plan.id);
            }}
            className={`relative text-left rounded-2xl border-2 transition min-w-0 ${
              compact ? "p-2.5 sm:p-3" : "p-3 sm:p-4"
            } ${
              selected
                ? "border-primary bg-primary/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                : "border-ink/10 bg-white hover:border-primary/30"
            }`}
          >
            <span
              className={`absolute -top-2 left-1.5 sm:left-3 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide rounded-md px-1.5 sm:px-2 py-0.5 ${
                plan.id === "boost"
                  ? "bg-cta text-[color:var(--color-cta-ink)]"
                  : plan.id === "pro"
                    ? "bg-primary text-white"
                    : "bg-clay text-heading"
              }`}
            >
              {t(
                plan.id === "boost"
                  ? "pricing.badge.boost"
                  : plan.id === "pro"
                    ? "pricing.badge.best"
                    : "pricing.badge.starter",
              )}
            </span>
            <p className="font-extrabold text-heading mt-2 text-sm sm:text-base truncate">
              {t(
                plan.id === "boost"
                  ? "pricing.plan.boost.name"
                  : plan.id === "pro"
                    ? "pricing.plan.pro.name"
                    : "pricing.plan.free.name",
              )}
            </p>
            <p className="mt-1">
              <span className="text-base sm:text-2xl font-extrabold text-primary leading-tight">
                {formatPlanPrice(plan.priceXaf, locale)}
              </span>
              {plan.priceXaf > 0 && (
                <span className="text-[10px] sm:text-fine ml-0.5 sm:ml-1 block sm:inline">
                  {t("pricing.perMonth")}
                </span>
              )}
            </p>
            <p className={`text-fine mt-1 leading-snug ${compact ? "hidden sm:block" : ""}`}>
              {t(
                plan.id === "boost"
                  ? "pricing.plan.boost.why"
                  : plan.id === "pro"
                    ? "pricing.plan.pro.why"
                    : "pricing.plan.free.why",
              )}
            </p>
            {!compact && (
              <ul className="mt-3 space-y-1.5 hidden sm:block">
                {FEATURE_KEYS[plan.id].map((key) => (
                  <li key={key} className="flex gap-1.5 text-body-sm text-muted">
                    <CheckIcon className="w-4 h-4 text-success shrink-0 mt-0.5" aria-hidden />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            )}
          </button>
        );
      })}
    </div>
  );
}
