export type Role = "buyer" | "vendor";

export interface User {
  id: number;
  email: string;
  username: string;
  role: Role;
}

export interface ProductPreview {
  id: number;
  title: string;
  image_url: string;
  price: string;
  currency: string;
  category: string;
}

export interface VendorSummary {
  id: number;
  username: string;
  store_name: string;
  city: string;
  neighborhood: string;
  brand_color: string;
  plan: string;
  cover_image_url: string;
  about: string;
  whatsapp_phone: string;
  member_since: string;
  product_count: number;
  last_active: string | null;
  preview_products: ProductPreview[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  currency: string;
  whatsapp_phone: string;
  city: string;
  category: string;
  image_url: string;
  is_active: boolean;
  view_count: number;
  contact_count: number;
  created_at: string;
  updated_at: string;
  vendor: VendorSummary;
}

export interface Storefront {
  id: number;
  username: string;
  store_name: string;
  about: string;
  city: string;
  neighborhood: string;
  brand_color: string;
  plan: string;
  whatsapp_phone: string;
  cover_image_url: string;
  voice_intro_url: string;
  member_since: string;
  product_count: number;
  last_active: string | null;
  products: Product[];
}

export interface StoreProfile {
  store_name: string;
  about: string;
  city: string;
  neighborhood: string;
  brand_color: string;
  plan: string;
  whatsapp_phone: string;
  cover_image_url: string;
  voice_intro_url: string;
  created_at: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface SearchResults {
  products: Product[];
  vendors: VendorSummary[];
}

export const CATEGORIES: { value: string; label: string }[] = [
  { value: "provisions", label: "Provisions" },
  { value: "food", label: "Food" },
  { value: "fashion", label: "Fashion" },
  { value: "electronics", label: "Electronics" },
  { value: "hardware", label: "Hardware" },
  { value: "spare-parts", label: "Spare parts" },
  { value: "beauty", label: "Beauty" },
  { value: "home", label: "Home" },
  { value: "other", label: "Other" },
];

export const CITIES = ["Douala", "Yaoundé"];
