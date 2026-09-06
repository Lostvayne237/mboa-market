import { formatPrice, textOn } from "../lib/contact";
import { noHyphen } from "../lib/noHyphen";
import type { StoreDraft } from "../lib/onboardingDraft";

/** Partial storefront preview before sign up. Value first, account second. */
export function StorefrontPreview({ draft }: { draft: StoreDraft }) {
  const brand = draft.brand_color || "#12355b";
  const onBrand = textOn(brand);
  const location = noHyphen(
    [draft.city, draft.neighborhood].filter(Boolean).join(" · "),
  );
  const name = noHyphen(draft.store_name.trim() || "Your store name");

  return (
    <div className="rounded-3xl overflow-hidden border border-ink/10 bg-white shadow-lg">
      <div className="h-24" style={{ background: brand }} />
      <div className="px-5 pb-5 -mt-8">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-2xl border-4 border-white shadow"
          style={{ background: brand, color: onBrand }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <h3 className="text-xl font-extrabold mt-2">{name}</h3>
        {location && <p className="text-sm text-ink/60 mt-0.5">📍 {location}</p>}
        {draft.about && (
          <p className="text-sm text-ink/75 mt-3 line-clamp-3 border-l-4 border-sun pl-3">
            {noHyphen(draft.about)}
          </p>
        )}
        <div className="shop-window mt-4 p-2 grid grid-cols-1 gap-2">
          <div className="rounded-xl bg-sun-soft p-3 flex justify-between items-center">
            <span className="font-bold text-sm truncate">
              {noHyphen(draft.sample_product_title || "Sample listing")}
            </span>
            <span className="text-market font-extrabold text-sm shrink-0 ml-2">
              {formatPrice({
                price: draft.sample_product_price || "0",
                currency: "XAF",
              })}
            </span>
          </div>
        </div>
        <p className="text-[11px] text-ink/45 mt-3 text-center">
          Preview only. Publish when you create your account
        </p>
      </div>
    </div>
  );
}
