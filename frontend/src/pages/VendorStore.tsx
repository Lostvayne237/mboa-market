import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactButtons } from "../components/ContactButtons";
import { PlanBadge } from "../components/PlanBadge";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { BlockSkeleton, ProductGridSkeleton } from "../components/Skeletons";
import { api } from "../lib/api";
import { noHyphen } from "../lib/noHyphen";
import { textOn } from "../lib/contact";
import type { Storefront } from "../lib/types";

/**
 * The storefront — the heart of the product. A facade painted in the
 * seller's own color, their location, their story, their goods, and the
 * only action that matters: contact them.
 */
export function VendorStore() {
  const { id } = useParams();
  const [shop, setShop] = useState<Storefront | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setShop(null);
    setNotFound(false);
    api<Storefront>(`/api/vendors/${id}/`)
      .then(setShop)
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <div className="anim-pop max-w-lg mx-auto px-4 py-20 text-center">
        <p className="float-soft text-5xl mb-4">🏚️</p>
        <h1 className="font-extrabold text-xl">Store not found</h1>
        <Link
          to="/"
          className="btn-sheen inline-block mt-5 rounded-xl bg-market text-white font-bold px-5 py-2.5"
        >
          Back to the market
        </Link>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <BlockSkeleton className="h-56" />
        <ProductGridSkeleton count={4} />
      </div>
    );
  }

  const brand = shop.brand_color || "#12355b";
  const onBrand = textOn(brand);
  const location = noHyphen([shop.city, shop.neighborhood].filter(Boolean).join(" · "));

  return (
    <div className="max-w-3xl mx-auto px-4 pb-32">
      {/* ——— The facade, painted in the seller's color ——— */}
      <div className="anim-fade-up mt-5 rounded-3xl overflow-hidden border border-ink/10 bg-white shadow-[0_18px_40px_-24px_rgba(7,26,56,0.35)]">
        {/* Fascia board */}
        <div
          className="px-6 pt-8 pb-6"
          style={{ background: brand, color: onBrand }}
        >
          <div className="flex items-center gap-4">
            <div
              className="anim-pop w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-3xl shrink-0 shadow-lg"
              style={{ background: onBrand, color: brand }}
            >
              {shop.store_name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h1 className="anim-fade-up anim-delay-1 text-3xl font-extrabold tracking-tight leading-tight flex flex-wrap items-center gap-2">
                {noHyphen(shop.store_name)}
                <PlanBadge plan={shop.plan} />
              </h1>
              {location && (
                <p
                  className="anim-fade-up anim-delay-2 font-semibold mt-1"
                  style={{ color: onBrand, opacity: 0.85 }}
                >
                  📍 {location}
                </p>
              )}
            </div>
          </div>
        </div>

        {shop.cover_image_url && (
          <img
            src={shop.cover_image_url}
            alt=""
            className="h-48 w-full object-cover bg-clay"
            loading="lazy"
          />
        )}

        <div className="p-6">
          {/* Shop story */}
          {shop.about && (
            <div
              className="anim-fade-up anim-delay-2 border-l-4 pl-4"
              style={{ borderColor: brand }}
            >
              <p className="text-xs font-extrabold uppercase tracking-widest text-ink/40 mb-1">
                About this store
              </p>
              <p className="text-ink/80 whitespace-pre-line leading-relaxed">
                {noHyphen(shop.about)}
              </p>
            </div>
          )}

          {/* Voice intro */}
          {shop.voice_intro_url && (
            <div className="anim-fade-up anim-delay-3 mt-5">
              <p className="text-xs font-extrabold uppercase tracking-widest text-ink/40 mb-1.5">
                🎙️ Hear from the store owner
              </p>
              <audio controls preload="none" src={shop.voice_intro_url} className="w-full" />
            </div>
          )}

          {/* Contact info */}
          <div className="anim-fade-up anim-delay-3 mt-6 rounded-2xl bg-navy-deep text-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-white/50">
                  Contact the store
                </p>
                {shop.whatsapp_phone && (
                  <p className="text-xl font-extrabold tracking-wide mt-0.5">
                    {noHyphen(shop.whatsapp_phone)}
                  </p>
                )}
              </div>
              {location && (
                <p className="text-sm font-bold text-sun">📍 {location}</p>
              )}
            </div>
            <ContactButtons phone={shop.whatsapp_phone} size="sm" />
            <p className="text-[11px] text-white/50 mt-3">
              You deal directly with the store. Mboa takes no payment and no commission.
            </p>
          </div>
        </div>
      </div>

      {/* ——— Display window ——— */}
      <Reveal className="mt-10">
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-extrabold text-2xl">In the window</h2>
          <p className="text-sm text-ink/50 font-semibold">
            Tap an item for details
          </p>
        </div>
      </Reveal>
      {shop.products.length === 0 ? (
        <div className="bg-clay rounded-3xl p-8 text-center text-ink/60 text-sm">
          The window is empty right now. Check back soon.
        </div>
      ) : (
        <div className="shop-window-lg p-4 sm:p-5">
          <div className="stagger grid grid-cols-2 md:grid-cols-3 gap-3">
            {shop.products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Contact repeated at the bottom, per the brief. */}
      <div className="bar-enter fixed bottom-0 inset-x-0 bg-paper/95 backdrop-blur border-t border-ink/10 p-3 shadow-[0_-8px_24px_-16px_rgba(7,26,56,0.4)]">
        <div className="max-w-3xl mx-auto">
          <ContactButtons phone={noHyphen(shop.whatsapp_phone)} pulse />
        </div>
      </div>
    </div>
  );
}
