import { Link } from "react-router-dom";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useI18n } from "../lib/i18n";
import { formatPlanPrice, STORE_PLANS, type StorePlanId } from "../lib/plans";
import { Section } from "./ui/Section";
import { PlanPicker } from "./PlanPicker";
import { useState } from "react";

/**
 * Comparison mode: three store plans, one clear price each.
 * Free goes live now. Boost / Pro reserve visibility; Mobile Money billing later.
 */
export function SellOnMboa() {
  const { t, locale } = useI18n();
  const [plan, setPlan] = useState<StorePlanId>("boost");
  const selected = STORE_PLANS.find((p) => p.id === plan)!;

  return (
    <Section centered>
      <div className="surface-polish overflow-hidden text-left">
        <div className="p-6 md:p-10">
          <p className="text-fine font-extrabold uppercase tracking-widest text-center">
            {t("pricing.eyebrow")}
          </p>
          <h2 className="text-heading text-2xl md:text-3xl font-extrabold mt-3 leading-tight text-center text-constrained mx-auto">
            {t("pricing.title")}
          </h2>
          <p className="text-muted text-body-sm mt-3 text-constrained mx-auto text-center">
            {t("pricing.subtitle")}
          </p>

          <div className="mt-10">
            <PlanPicker value={plan} onChange={setPlan} />
          </div>

          <div className="mt-10 text-center">
            <Link
              to={`/register?intent=vendor&plan=${plan}`}
              className="btn-base btn-cta btn-sheen inline-flex min-w-[16rem] justify-center"
            >
              {plan === "free"
                ? t("pricing.cta.free")
                : `${t("pricing.cta.paid")} · ${formatPlanPrice(selected.priceXaf, locale)}`}
            </Link>
            <p className="mt-5 inline-flex items-center justify-center gap-2 text-body-sm text-muted max-w-md mx-auto">
              <ShieldCheckIcon className="w-4 h-4 text-primary shrink-0" aria-hidden />
              {t("pricing.objection")}
            </p>
            <p className="text-fine mt-3 max-w-sm mx-auto">{t("pricing.billingNote")}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
