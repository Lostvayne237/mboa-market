import { recordContactTap, telUrl, whatsappUrl } from "../lib/contact";
import type { Product } from "../lib/types";

/**
 * The only conversion action on Mboa Market.
 * WhatsApp is primary (pre-filled with product context), call is secondary
 * with equal visual weight — no cart, no checkout.
 */
export function ContactButtons({
  phone,
  product,
  size = "lg",
  pulse = false,
}: {
  phone: string;
  product?: Product;
  size?: "lg" | "sm";
  pulse?: boolean;
}) {
  if (!phone) return null;
  const pad = size === "lg" ? "px-5 py-3.5 text-base" : "px-3 py-2 text-sm";

  const tap = () => {
    if (product) recordContactTap(product.id);
  };

  return (
    <div className="flex gap-3 w-full">
      <a
        href={whatsappUrl(phone, product)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={tap}
        className={`btn-sheen ${pulse ? "wa-pulse" : ""} flex-1 flex items-center justify-center gap-2 rounded-2xl bg-wa text-white font-bold shadow-sm hover:brightness-110 active:scale-[0.97] transition ${pad}`}
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
      <a
        href={telUrl(phone)}
        onClick={tap}
        className={`btn-sheen flex-1 flex items-center justify-center gap-2 rounded-2xl bg-market text-white font-bold shadow-sm hover:bg-market-dark active:scale-[0.97] transition ${pad}`}
      >
        <PhoneIcon />
        Call
      </a>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.3A10 10 0 1 0 12 2Zm5 13.9c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2 .2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3 0 .2 0 .7-.2 1.1Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
    </svg>
  );
}
