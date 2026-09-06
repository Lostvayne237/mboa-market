import { api } from "./api";
import type { Product } from "./types";
import { noHyphen } from "./noHyphen";

function digitsOnly(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

/** WhatsApp link with the conversation pre-filled so it opens with context. */
export function whatsappUrl(
  phone: string,
  product?: Product,
  storeName?: string,
): string {
  const base = `https://wa.me/${digitsOnly(phone)}`;
  if (product) {
    const text = `Hello! I saw "${noHyphen(product.title)}" (${formatPrice(product)}) on Mboa Market. Is it still available?`;
    return `${base}?text=${encodeURIComponent(text)}`;
  }
  if (storeName) {
    const text = `Hello! I saw your shop "${noHyphen(storeName)}" on Mboa Market.`;
    return `${base}?text=${encodeURIComponent(text)}`;
  }
  return base;
}

export function telUrl(phone: string): string {
  return `tel:+${digitsOnly(phone)}`;
}

export function formatPrice(p: { price: string; currency: string }): string {
  const n = Number(p.price);
  return `${new Intl.NumberFormat("fr-FR").format(n)} ${p.currency}`;
}

/** Count the tap (honest interest signal); never block the user on it. */
export function recordContactTap(productId: number) {
  api(`/api/products/${productId}/contact/`, { method: "POST" }).catch(() => {});
}

export function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const seconds = (Date.now() - new Date(iso).getTime()) / 1000;
  if (seconds < 3600) return "active just now";
  if (seconds < 86400) return `active ${Math.floor(seconds / 3600)}h ago`;
  const days = Math.floor(seconds / 86400);
  if (days === 1) return "active yesterday";
  if (days < 30) return `active ${days} days ago`;
  return `active ${Math.floor(days / 30)} month(s) ago`;
}

export function memberSince(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

/** Black or white text, whichever reads best on the given hex color. */
export function textOn(hex: string): string {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return "#ffffff";
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 150 ? "#1a2230" : "#ffffff";
}
