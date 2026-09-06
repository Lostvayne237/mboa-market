import {
  DEFAULT_BRAND_COLOR,
  DEFAULT_CITY,
  DEFAULT_NEIGHBORHOOD,
  STORE_ABOUT_TEMPLATE,
} from "./formDefaults";
import type { StorePlanId } from "./plans";

const KEY = "mboa_store_draft";

export interface StoreDraft {
  store_name: string;
  about: string;
  city: string;
  neighborhood: string;
  brand_color: string;
  plan: StorePlanId;
  whatsapp_phone: string;
  /** First listing sketch before account exists */
  sample_product_title: string;
  sample_product_price: string;
  started_at: string;
}

export function emptyDraft(): StoreDraft {
  return {
    store_name: "",
    about: STORE_ABOUT_TEMPLATE,
    city: DEFAULT_CITY,
    neighborhood: DEFAULT_NEIGHBORHOOD,
    brand_color: DEFAULT_BRAND_COLOR,
    plan: "free",
    whatsapp_phone: "",
    sample_product_title: "Palm oil 5L",
    sample_product_price: "15000",
    started_at: new Date().toISOString(),
  };
}

export function loadDraft(): StoreDraft {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyDraft();
    return { ...emptyDraft(), ...JSON.parse(raw) };
  } catch {
    return emptyDraft();
  }
}

export function saveDraft(draft: StoreDraft) {
  localStorage.setItem(KEY, JSON.stringify(draft));
}

export function clearDraft() {
  localStorage.removeItem(KEY);
}
