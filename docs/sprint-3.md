# Sprint 3 — Frontend marketplace MVP

## Sprint goal

> **Ship a mobile-first React app where buyers browse/search displayed products and contact vendors by phone (call / WhatsApp), and vendors log in to publish listings — no cart or checkout.**

**Suggested length:** 1–2 weeks  
**Status:** ✅ Complete — home/discovery, mixed search, product detail with sticky pre-filled WhatsApp + Call actions, vendor storefront ("stall") with trust chips and optional voice intro, auth pages, vendor dashboard with activity signals. Built per the [design brief](./design-brief.md).  
**Depends on:** Sprint 2 complete (products API)

---

## Why this sprint

APIs alone are not the product. Sprint 3 delivers the **user-facing MVP** that proves the marketplace loop end-to-end in a browser.

---

## Sprint 3 backlog (ordered)

### Story 1 — Frontend scaffolding
**As a** developer,  
**I want** a Vite + React + TypeScript + Tailwind app under `frontend/`,  
**so that** we can build UI against the backend.

Acceptance:

- [ ] Vite React TS project in `frontend/`  
- [ ] Tailwind configured  
- [ ] Env-based API base URL (e.g. `VITE_API_BASE_URL`)  
- [ ] Typed API client for auth + products  
- [ ] React Router with basic layout (mobile-first)  
- [ ] `frontend/README.md` with install / run steps  

### Story 2 — Auth screens
**As a** buyer or vendor,  
**I want** to register and log in from the UI,  
**so that** I can use role-specific features.

Acceptance:

- [ ] Register form: email, username, password, role (`buyer` | `vendor`)  
- [ ] Login form: email + password  
- [ ] Store access (and refresh) securely enough for MVP (e.g. memory + localStorage — document choice)  
- [ ] Attach `Authorization: Bearer` on authenticated requests  
- [ ] After login, load `/api/auth/me/` and show identity/role  
- [ ] Logout clears tokens  

### Story 3 — Buyer browse & search
**As a** buyer,  
**I want** to see and search products,  
**so that** I can find what I need.

Acceptance:

- [ ] Product list page calling `GET /api/products/`  
- [ ] Search input wired to `q`  
- [ ] Optional city filter if API supports it  
- [ ] Loading, empty, and error states  
- [ ] Tap/click opens product detail  

### Story 4 — Product detail + phone contact
**As a** buyer,  
**I want** product details and a way to reach the vendor by phone,  
**so that** we can deal off-platform.

Acceptance:

- [ ] Detail page from `GET /api/products/<id>/`  
- [ ] Shows title, price (informational), description, city, vendor username  
- [ ] **Call** action (`tel:`) and/or **WhatsApp** (`https://wa.me/<digits>`) from `whatsapp_phone`  
- [ ] 404-friendly state for missing products  
- [ ] No “Add to cart” / checkout UI  

### Story 5 — Vendor my products + create
**As a** vendor,  
**I want** to list my products and add a new one,  
**so that** I can sell on the platform.

Acceptance:

- [ ] Route guarded for `role=vendor` (redirect or message otherwise)  
- [ ] “My products” from `GET /api/products/mine/`  
- [ ] Create form posting to `POST /api/products/`  
- [ ] Validation errors from API shown in the form  
- [ ] After create, product appears in my list / public browse  

### Story 6 — UX polish + docs
**As a** team,  
**I want** usable empty/error states and clear frontend docs,  
**so that** demos don’t break awkwardly.

Acceptance:

- [ ] Consistent loading/empty/error patterns on main pages  
- [ ] Mobile layout usable at ~375px width  
- [ ] `frontend/README.md` updated with env vars and scripts  
- [ ] Root or architecture docs note how to run FE + BE together  

### Optional stretch
- Refresh-token silent renew  
- Simple vendor profile display  
- Skeleton loaders  

---

## Definition of Done (Sprint 3)

1. Acceptance criteria met  
2. Demo: register vendor → create product → (other browser/session) browse → WhatsApp link works  
3. No secrets committed (`.env` git-ignored)  
4. READMEs updated  

Sprint 3 is Done when Stories 1–6 are Done.

---

## How to proceed

### Before coding
1. Sprint 2 APIs working (`python manage.py test products`).  
2. Backend running on `:8000`, CORS allows `:5173`.  

### During the sprint
1. Say **“Start Sprint 3 — Story 1”**  
2. Finish stories in order  

### After Sprint 3
See [sprint-4.md](./sprint-4.md) — MVP polish & release readiness.

---

## Out of Sprint 3

- Design system overhaul / brand campaign site  
- PWA / offline  
- Image upload UI (unless Sprint 2 already has image URL field)  
- Payments  

---

## Checklist to start

- [ ] Approve Sprint 3 goal and stories  
- [ ] Sprint 2 Done  
- [ ] Say **“Start Sprint 3 — Story 1”** when ready  
