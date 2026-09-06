# Future implementations — Mboa Market

Single place for everything discussed as **later**, plus suggestions that still fit the product model.

**Product rule (never forget):** Mboa is a **discovery / display** platform. Buyers find stores, then contact them by **WhatsApp or phone**. Deals happen off-platform. **No cart, no checkout, no payments, no in-app messaging, no order tracking** unless we deliberately choose to go beyond this model later.

**MVP today (Sprints 1–4):** Auth, storefronts with brand color/neighborhood, product display catalog, store-first discovery, EN/FR toggle, Call/WhatsApp contact, seed data, local Docker. Still pending for launch: cloud deploy + real-user smoke.

Related plans: [sprints-roadmap.md](./sprints-roadmap.md) · [design-brief.md](./design-brief.md) · [i18n.md](./i18n.md) · [sprint-12.md](./sprint-12.md)

---

## 1. Things you asked for (you said these)

### 1.1 Jobs board (posting + search)
**Status:** Planned — [sprint-12.md](./sprint-12.md)

Stores post job openings (assistant, driver, tailor, technician, etc.). Seekers browse/search by keyword, city, job type, then **contact the employer by phone/WhatsApp** (message pre-filled with the job title).

- No in-app applications, no CV upload, no hiring pipeline
- Jobs can appear on the storefront (“We’re hiring”) and in a Jobs section
- Reuses storefronts, discovery, and the Contact action

### 1.2 Store events & small announcements
**Status:** Noted, no sprint file yet

Stores post short **events / announcements** on their storefront (promo day, new arrivals, market day, “open until 8pm”). Display-only. Interested people contact the store by phone — same conversion action.

Can share UI patterns with Jobs (post from dashboard → show on storefront → optional contact tap).

### 1.3 Traditional / regional languages
**Status:** Documented — [i18n.md](./i18n.md)

Today: **English / French** toggle in the header.
Later: expand to traditional languages (e.g. **Ewondo, Duala, Bamileke, Fulfulde**). Toggle becomes a language picker. UI chrome only — sellers still write store/product copy in the language they choose.

### 1.4 Platform admin (ops / moderation)
**Status:** Planned — [sprint-5.md](./sprint-5.md) · [future-platform-admin.md](./future-platform-admin.md)

You asked for a **platform admin / manager** path (not open self-registration). Moderators verify stores, hide bad listings, manage users. Start with Django admin (`is_staff`); later optional `manager` role + admin APIs. Never expose admin signup on `/api/auth/register/`.

### 1.5 Native apps (Google Play + App Store)
**Status:** Footer badges show “SOON” only

Native Android/iOS when the web MVP proves demand. Same discovery + phone-contact model. Update the footer store links when apps are published.

### 1.6 Real media on storefronts (beyond URLs)
**Status:** Stretch from polish work

Today sellers paste **image / voice intro URLs**. Later: direct photo/audio upload (compressed, size limits), so storefront banners, logos, and WhatsApp-style voice intros are easy without hosting elsewhere.

### 1.7 Map / neighborhood discovery
**Status:** In design brief; not built

Map or nearby view next to search. Location decides whether a buyer can realistically visit the store. Categories stay local: provisions, food, fashion, electronics, hardware, spare parts, etc.

### 1.8 Cloud deploy / public demo
**Status:** Sprint 4 stretch still open

Ship the stack (frontend + backend + Postgres) to a real host so people outside localhost can try Mboa. Required before calling MVP “launched.”

---

## 2. Already on the sprint roadmap (product vision / earlier planning)

These came from the original product vision and Agile roadmap. Keep them, but **reorder after real users** — trust and jobs often matter more than RFQ/AI first.

| Idea | Sprint | One-line intent |
|------|--------|-----------------|
| Platform admin & moderation | [5](./sprint-5.md) | Ops can moderate stores and listings |
| Verification badges & reviews | [6](./sprint-6.md) | Honest trust without fake “stars from fake orders” |
| Inventory basics | [7](./sprint-7.md) | Optional stock / low-stock for vendors |
| Request for Quote (RFQ) | [8](./sprint-8.md) | Buyers post needs; suppliers respond (big model shift — validate demand first) |
| Deeper messaging / WhatsApp | [9](./sprint-9.md) | Richer WhatsApp flows; still avoid becoming a chat app unless intentional |
| AI assists | [10](./sprint-10.md) | e.g. product description helper, inventory tips |
| Payments & multi-country | [11](./sprint-11.md) | Only after discovery works; MTN MoMo / Orange Money research |

---

## 3. Suggestions (fit “display + phone” — recommended next)

These strengthen what Mboa already is (storefront + trust + reachability), without instantly becoming Jumia/Amazon.

1. **Store hours + “open now”** — Opening/closing times on the storefront. Buyers call when the shop is open; honest signal, Google Business–style.
2. **WhatsApp Business–style templates** — Prefill variants: “Is this still available?”, “Do you deliver to …?”, “What size / color?”. Still opens WhatsApp.
3. **Better store identity media** — Logo upload, banner crop, optional voice intro **recorded in-app** (not only a URL). Makes each storefront unique.
4. **Favorites / saved stores** — Save stores to call later; sharing already exists — favorites help returning buyers without building a cart.
5. **Category landing pages + “new this week”** — Better discovery for provisions, fashion, hardware… without an endless product tile feed as the hero.
6. **Contact intent analytics for sellers** — Dashboard already has views / contact taps — deepen with simple charts and “which listing got the most WhatsApp taps.” No order data needed.
7. **Share cards for stores (not only products)** — Storefront link preview (name, city, brand color, first products) for WhatsApp groups.
8. **Report / block** — Public “report this store/listing” for moderation pipeline (pairs with Sprint 5).
9. **Offline-friendly PWA** — Installable web app, cached storefront shells, compressed images — useful before native apps.
10. **Seller onboarding checklist** — Phone, city, neighborhood, color, first product, first photo — raises storefront quality fast.
11. **Multi-city expansion (Cameroon first)** — Bamenda, Bafoussam, Garoua… then other countries only after the Douala/Yaoundé loop works.
12. **Store-level QR codes** — Printable QR for the shop front that opens the Mboa storefront (physical → digital).

### Stretch / validate carefully (bigger model changes)

- **RFQ** and **in-app chat** change UX from “shop window” to “deal desk” — only if phone contact is not enough.
- **Payments** only with a clear Cameroon PSP decision (MoMo / Orange Money) and a thin order record — never cart-first UI glued onto the storefront.
- **AI** as *assist* (write a product blurb, suggest category), never as fake ratings or fake verification.

---

## 4. Explicitly out of scope until we decide otherwise

Do not build these by accident (from the product & design brief):

- Cart / wishlist-as-cart
- Checkout / payment pages
- Order tracking / order history
- Delivery or shipping screens
- In-app messaging as the primary conversion
- In-app job applications / CV storage (for Jobs)
- Fake star ratings with no real transaction data

---

## 5. Suggested priority after launch

Rough order that matches demand and keeps the brand coherent:

1. **Cloud deploy** — get the MVP in people’s hands  
2. **Real photo (and voice) uploads** — storefront quality  
3. **Platform admin + verification** — trust  
4. **Jobs board** — high local demand, reuses storefronts  
5. **Store events / announcements** — cheap, storefront-native  
6. **Map / neighborhood view** — proximity discovery  
7. **Traditional languages** — after EN/FR coverage feels complete  
8. **Native apps** — when web retention is proven  
9. Only then: inventory → RFQ → payments / AI, if users ask for them  

---

## 6. How to start building one of these

Open the matching sprint file (or create one for items that only live here), then say:

`Start Sprint N — Story 1`

or

`Plan Sprint 13 — Store events`

so implementation stays story-sized and does not expand the MVP mid-build.
