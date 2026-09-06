/** Storefront monthly plans. Fee is for visibility — never a deal commission. */

export type StorePlanId = "free" | "boost" | "pro";

export interface StorePlan {
  id: StorePlanId;
  priceXaf: number;
  /** Single word badge for decision architecture */
  badge: "Starter" | "Boost" | "Best";
  features: string[];
}

export const STORE_PLANS: StorePlan[] = [
  {
    id: "free",
    priceXaf: 0,
    badge: "Starter",
    features: [
      "Your storefront with color and neighborhood",
      "Appear in Douala and Yaoundé search",
      "Buyers contact you on WhatsApp or call",
      "No commission on deals you close",
    ],
  },
  {
    id: "boost",
    priceXaf: 2000,
    badge: "Boost",
    features: [
      "Everything in Free",
      "Boost badge on your store",
      "Higher place in search results",
      "Stand out while buyers scroll",
    ],
  },
  {
    id: "pro",
    priceXaf: 5000,
    badge: "Best",
    features: [
      "Everything in Boost",
      "Pro badge on your store",
      "Top of search when buyers look",
      "Maximum visibility in your city",
    ],
  },
];

export function planLabel(id: StorePlanId | string | undefined): string {
  if (id === "boost") return "Boost";
  if (id === "pro") return "Pro";
  return "Free";
}

export function formatPlanPrice(priceXaf: number, locale: "en" | "fr" = "en"): string {
  if (priceXaf === 0) return locale === "fr" ? "Gratuit" : "Free";
  const n = new Intl.NumberFormat("fr-FR").format(priceXaf);
  return `${n} XAF`;
}

export function isPaidPlan(id: StorePlanId | string | undefined): boolean {
  return id === "boost" || id === "pro";
}
