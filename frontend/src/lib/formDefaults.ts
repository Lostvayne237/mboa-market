/** Recommended defaults. Users scan and adjust instead of filling from scratch. */

export const DEFAULT_CITY = "Douala";
export const DEFAULT_NEIGHBORHOOD = "Akwa";
export const DEFAULT_BRAND_COLOR = "#12355b";
export const DEFAULT_PHONE_PREFIX = "+2376";
export const DEFAULT_CATEGORY = "provisions";

export const CITY_OPTIONS = ["Douala", "Yaoundé"] as const;

export const NEIGHBORHOOD_BY_CITY: Record<string, string[]> = {
  Douala: ["Akwa", "Bonapriso", "Deido", "Makepe"],
  Yaoundé: ["Bastos", "Mvog Mbi", "Marché Central", "Mokolo"],
};

export const PRODUCT_TEMPLATES = [
  {
    title: "Palm oil 5L",
    description: "Locally produced, fresh stock. Call for bulk price.",
    price: "15000",
    category: "provisions",
  },
  {
    title: "Rice 25kg",
    description: "Perfumed rice, wholesale available from 5 bags.",
    price: "22000",
    category: "provisions",
  },
  {
    title: "Phone accessory",
    description: "New or UK used. WhatsApp for today's price.",
    price: "12500",
    category: "electronics",
  },
] as const;

export const SEARCH_SUGGESTIONS = [
  { q: "palm oil", city: DEFAULT_CITY },
  { q: "rice", city: DEFAULT_CITY },
  { q: "phone", city: "Yaoundé" },
  { q: "cement", city: "Yaoundé" },
] as const;

export const STORE_ABOUT_TEMPLATE =
  "We sell quality goods at fair prices. Call or WhatsApp us. We deliver in the city.";
