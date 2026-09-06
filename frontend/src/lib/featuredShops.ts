import type { VendorSummary } from "./types";

/**
 * Curated demo shops for the landing page.
 * Shown immediately and kept when the API is empty or unreachable.
 * Negative IDs — profile links fall back to city search.
 */
export const FEATURED_SHOPS_DEMO: VendorSummary[] = [
  {
    id: -1001,
    username: "amina-fabrics",
    store_name: "Amina Fabrics",
    city: "Douala",
    neighborhood: "Akwa",
    brand_color: "#12355b",
    plan: "boost",
    cover_image_url: "",
    about: "Wax prints, lace and pagne. Message on WhatsApp for today's stock.",
    whatsapp_phone: "+237650100001",
    member_since: "2025-03-12T10:00:00+01:00",
    product_count: 24,
    last_active: "2026-07-16T14:30:00+01:00",
    preview_products: [
      {
        id: -1,
        title: "Wax print 6 yards",
        image_url: "https://picsum.photos/seed/amina-wax/400/300",
        price: "18000",
        currency: "XAF",
        category: "fashion",
      },
    ],
  },
  {
    id: -1002,
    username: "chez-marie",
    store_name: "Chez Marie Provisions",
    city: "Douala",
    neighborhood: "Akwa",
    brand_color: "#b45309",
    plan: "pro",
    cover_image_url: "",
    about: "Rice, oil, spices and kitchen essentials. Delivery in Douala.",
    whatsapp_phone: "+237650100002",
    member_since: "2024-06-01T10:00:00+01:00",
    product_count: 18,
    last_active: "2026-07-17T09:00:00+01:00",
    preview_products: [
      {
        id: -2,
        title: "Palm oil 5L",
        image_url: "https://picsum.photos/seed/marie-oil/400/300",
        price: "15000",
        currency: "XAF",
        category: "provisions",
      },
    ],
  },
  {
    id: -1003,
    username: "electro-jean",
    store_name: "Electro Jean",
    city: "Yaoundé",
    neighborhood: "Marché Central",
    brand_color: "#1d4ed8",
    plan: "boost",
    cover_image_url: "",
    about: "Phones and accessories. New and UK used. WhatsApp for prices.",
    whatsapp_phone: "+237670100003",
    member_since: "2025-01-20T10:00:00+01:00",
    product_count: 12,
    last_active: "2026-07-15T16:00:00+01:00",
    preview_products: [
      {
        id: -3,
        title: "Infinix Hot 40 (new)",
        image_url: "https://picsum.photos/seed/electro-phone/400/300",
        price: "115000",
        currency: "XAF",
        category: "electronics",
      },
    ],
  },
  {
    id: -1004,
    username: "fatima-styles",
    store_name: "Fatima Styles",
    city: "Douala",
    neighborhood: "Bonapriso",
    brand_color: "#be185d",
    plan: "free",
    cover_image_url: "",
    about: "Tailored wear and pagne. Custom sewing on request.",
    whatsapp_phone: "+237690100004",
    member_since: "2025-09-05T10:00:00+01:00",
    product_count: 8,
    last_active: "2026-07-14T11:00:00+01:00",
    preview_products: [
      {
        id: -4,
        title: "Kaba ngondo (custom)",
        image_url: "https://picsum.photos/seed/fatima-kaba/400/300",
        price: "25000",
        currency: "XAF",
        category: "fashion",
      },
    ],
  },
  {
    id: -1005,
    username: "quincaillerie-paul",
    store_name: "Quincaillerie Paul & Fils",
    city: "Yaoundé",
    neighborhood: "Mvog Mbi",
    brand_color: "#166534",
    plan: "free",
    cover_image_url: "",
    about: "Cement, iron rods, paint and plumbing since 2009.",
    whatsapp_phone: "+237655100005",
    member_since: "2024-11-10T10:00:00+01:00",
    product_count: 31,
    last_active: "2026-07-17T08:00:00+01:00",
    preview_products: [
      {
        id: -5,
        title: "Cement 50kg (CIMENCAM)",
        image_url: "https://picsum.photos/seed/paul-cement/400/300",
        price: "5200",
        currency: "XAF",
        category: "hardware",
      },
    ],
  },
  {
    id: -1006,
    username: "koki-kitchen",
    store_name: "Koki Kitchen",
    city: "Bafoussam",
    neighborhood: "Djeleng",
    brand_color: "#0d7a5f",
    plan: "free",
    cover_image_url: "",
    about: "Ready koki, beans and local dishes. Order before noon.",
    whatsapp_phone: "+237650100006",
    member_since: "2026-02-14T10:00:00+01:00",
    product_count: 6,
    last_active: "2026-07-16T12:00:00+01:00",
    preview_products: [
      {
        id: -6,
        title: "Koki bundle (5 wraps)",
        image_url: "https://picsum.photos/seed/koki-food/400/300",
        price: "3500",
        currency: "XAF",
        category: "food",
      },
    ],
  },
];

export function isDemoStore(store: VendorSummary): boolean {
  return store.id < 0;
}

/** Prefer live vendors; fall back to demo when API is empty or failed. */
export function resolveFeaturedShops(live: VendorSummary[] | null): VendorSummary[] {
  if (live && live.length > 0) return live.slice(0, 6);
  return FEATURED_SHOPS_DEMO;
}
