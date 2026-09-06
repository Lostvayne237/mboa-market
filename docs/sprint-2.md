# Sprint 2 — Products API (vendor list + buyer browse)

## Sprint goal

> **Vendors can create and list their products via the API (display catalog); buyers can browse, search, and open a product detail that includes the vendor contact phone for call/WhatsApp — no checkout.**

Builds on Sprint 1 auth. Prefer **backend products API first**; frontend browse UI can be stretch or Sprint 3.

**Suggested length:** 1–2 weeks  
**Status:** ✅ Complete — all stories delivered, plus storefront profiles, honest trust signals (view/contact counters), mixed search, and vendor discovery per the [design brief](./design-brief.md). 21 API tests green.  
**Depends on:** Sprint 1 complete (JWT + `users.User`)

---

## Why this sprint

Auth alone does not deliver marketplace value. Sprint 2 adds the **product display catalog** — so vendors can show what they sell and buyers can get a **phone number to contact them**. Mboa does not process the sale.

---

## Sprint 2 backlog (ordered)

### Story 1 — Activate `products` app + Product model
**As a** developer,  
**I want** a Product model owned by a vendor,  
**so that** listings can be stored and related to accounts.

Acceptance:

- [x] Register `products` in `INSTALLED_APPS`  
- [x] `Product` model with at least:  
  - `vendor` → FK to `users.User`  
  - `title` (required)  
  - `description` (text, can be blank)  
  - `price` (decimal, ≥ 0)  
  - `currency` (default `XAF`)  
  - `whatsapp_phone` (required contact number for call / WhatsApp — this is how buyers reach the vendor)  
  - `city` (optional, for Cameroon filter later)  
  - `is_active` (default `True`)  
  - `created_at` / `updated_at`  
- [x] Migration created and applied  
- [x] Product registered in Django admin  
- [x] Only users with `role=vendor` should own products (enforced in API in Story 2; admin can set freely)

### Story 2 — Vendor product APIs
**As a** vendor,  
**I want** to create and list my own products while authenticated,  
**so that** I can publish what I sell.

Acceptance:

- [x] `POST /api/products/` — authenticated **vendor** only; creates product with `vendor=request.user`  
- [x] Buyers (or anonymous) get `403` on create  
- [x] `GET /api/products/mine/` — authenticated vendor; lists **their** products only  
- [x] Serializers validate title, price, whatsapp_phone  
- [x] Password / sensitive user fields never appear in product payloads  

Suggested create body:

```json
{
  "title": "Palm oil 5L",
  "description": "Locally produced",
  "price": "15000.00",
  "currency": "XAF",
  "whatsapp_phone": "+2376XXXXXXXX",
  "city": "Douala"
}
```

### Story 3 — Public browse, search, detail
**As a** buyer,  
**I want** to browse and search active products and open a detail page payload,  
**so that** I can find something to buy and contact the seller.

Acceptance:

- [x] `GET /api/products/` — public list of **active** products (paginated)  
- [x] Support query `q` (search title/description) and optional `city`  
- [x] `GET /api/products/<id>/` — public detail for an active product; `404` if missing/inactive  
- [x] Detail includes vendor summary safe fields (e.g. `id`, `username`) + `whatsapp_phone` for contact  
- [x] Empty search returns empty list (not an error)  

### Story 4 — Product tests + docs
**As a** team,  
**I want** automated tests and updated docs,  
**so that** the catalog API is trustworthy before UI work.

Acceptance:

- [x] Tests: vendor can create; buyer cannot create; mine lists only own products  
- [x] Tests: public list only active; search by `q`; detail 404 for missing  
- [x] Tests pass (`python manage.py test products` and auth still green)  
- [x] `backend/README.md` documents product endpoints  
- [x] This sprint file / architecture notes updated if field names changed  

### Optional stretch (only if Stories 1–4 are Done)
- [x] Scaffold Vite React app under `frontend/` (delivered in Sprint 3)  
- [x] Buyer browse + product detail page calling public APIs (Sprint 3)  
- [x] Vendor “add product” form (JWT) (Sprint 3)  
- [x] WhatsApp button: `https://wa.me/<digits>` from `whatsapp_phone` (Sprint 3)  

---

## Definition of Done (Sprint 2)

A story is Done when:

1. Acceptance criteria met  
2. Relevant tests pass  
3. No secrets committed  
4. README updated for new endpoints  
5. You can demo: vendor registers/logs in → creates product → buyer (or curl) lists/searches and opens detail with WhatsApp phone  

Sprint 2 is Done when Stories 1–4 are Done. ✅

---

## API surface (target)

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| `POST` | `/api/products/` | Vendor JWT | Create listing |
| `GET` | `/api/products/mine/` | Vendor JWT | My listings |
| `GET` | `/api/products/` | Public | Browse / search active |
| `GET` | `/api/products/<id>/` | Public | Product detail |

Keep URLs under `/api/products/` (mirror `/api/auth/` style).

**Also delivered beyond the table:** `PATCH .../edit/`, `POST .../contact/`, categories, storefronts (`/api/vendors/…`), mixed `/api/search/`.

---

## How to proceed

### Before coding

1. Confirm Sprint 1 auth still works (`python manage.py test users`).  
2. Prefer fixing Postgres `migrate` if you still rely on SQLite only.  
3. Approve this sprint plan (or request changes to fields/endpoints).  

### During the sprint

1. Say **“Start Sprint 2 — Story 1”**  
2. Finish stories in order 1 → 2 → 3 → 4  
3. Demo with curl or a temporary frontend  

### After Sprint 2 (Sprint 3 preview)

See **[sprint-3.md](./sprint-3.md)** — Frontend marketplace MVP (auth UI, browse, WhatsApp, vendor form).  
Full index: [sprints-roadmap.md](./sprints-roadmap.md).

---

## Out of Sprint 2

- Payments  
- Image uploads (can add later; text-only listings first unless you request images)  
- Inventory / stock counts  
- RFQ, messaging inbox  
- Platform admin moderation APIs (`is_staff` + Django admin is enough)  
- Full product edit/delete UI (optional API update/delete can wait unless needed)  

---

## Open decisions (confirm if you care)

Resolved during build:

1. **Images:** `image_url` field added (lightweight URL, not file upload)  
2. **Edit/delete:** owner `PATCH /api/products/<id>/edit/` including `is_active`  
3. **Phone on product vs on user:** per product `whatsapp_phone`, plus store-level phone on `StoreProfile`  

---

## Checklist to start

- [x] Approve Sprint 2 goal and stories  
- [x] Confirm open decisions (or accept defaults)  
- [x] Say **“Start Sprint 2 — Story 1”** when ready to build  
