import { Link } from "react-router-dom";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { textOn, whatsappUrl } from "../lib/contact";
import { isDemoStore } from "../lib/featuredShops";
import { noHyphen } from "../lib/noHyphen";
import { useI18n } from "../lib/i18n";
import type { VendorSummary } from "../lib/types";
import { PlanBadge } from "./PlanBadge";

/** Store directory card: image, name, location, WhatsApp contact. */
export function StoreCard({ store }: { store: VendorSummary }) {
  const { t } = useI18n();
  const brand = store.brand_color || "#12355b";
  const location = noHyphen(
    [store.city, store.neighborhood].filter(Boolean).join(" · "),
  );
  const name = noHyphen(store.store_name);
  const preview = store.preview_products?.[0];
  const imageUrl = preview?.image_url || store.cover_image_url;
  const phone = store.whatsapp_phone;
  const storeHref = isDemoStore(store)
    ? `/search?city=${encodeURIComponent(store.city)}`
    : `/stores/${store.id}`;

  return (
    <article className="surface-polish overflow-hidden rounded-3xl flex flex-col">
      <Link to={storeHref} className="group block min-w-0">
        {imageUrl ? (
          <div className="img-zoom aspect-[4/3] relative bg-clay">
            <img
              src={imageUrl}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute top-2 right-2">
              <PlanBadge plan={store.plan} />
            </span>
          </div>
        ) : (
          <div className="aspect-[4/3] relative" style={{ background: brand }}>
            <span
              className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold opacity-40"
              style={{ color: textOn(brand) }}
            >
              {name.charAt(0).toUpperCase()}
            </span>
            <span className="absolute top-2 right-2">
              <PlanBadge plan={store.plan} />
            </span>
          </div>
        )}

        <div className="px-4 pt-4 pb-2">
          <p className="text-heading font-extrabold text-body-md truncate group-hover:text-primary transition-colors">
            {name}
          </p>
          {location && (
            <p className="text-muted text-body-sm truncate flex items-center gap-1 mt-0.5">
              <MapPinIcon className="w-3.5 h-3.5 shrink-0" aria-hidden />
              {location}
            </p>
          )}
          {preview && (
            <p className="text-fine mt-2 truncate">
              {noHyphen(preview.title)}
              {preview.price
                ? ` · ${Number(preview.price).toLocaleString("fr-FR")} ${preview.currency}`
                : ""}
            </p>
          )}
        </div>
      </Link>

      <div className="px-4 pb-4 mt-auto">
        {phone ? (
          <a
            href={whatsappUrl(phone, undefined, name)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sheen flex w-full items-center justify-center gap-2 rounded-2xl bg-wa text-white font-bold text-sm py-3 hover:brightness-110 active:scale-[0.98] transition"
          >
            <WhatsAppIcon />
            {t("store.contactWa")}
          </a>
        ) : (
          <Link
            to={storeHref}
            className="btn-base btn-secondary w-full !py-3 text-sm"
          >
            {t("store.viewShop")}
          </Link>
        )}
      </div>
    </article>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.3A10 10 0 1 0 12 2Zm5 13.9c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2 .2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3 0 .2 0 .7-.2 1.1Z" />
    </svg>
  );
}
