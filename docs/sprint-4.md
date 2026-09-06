# Sprint 4 — MVP polish & release readiness

## Sprint goal

> **Harden the MVP so early users in Douala/Yaoundé can try a stable demo: vendors manage listings, city filtering works, seed data exists, and deploy/run instructions (or Compose) are clear.**

**Suggested length:** 1–2 weeks  
**Status:** ✅ Complete (local) — edit/hide listings, `image_url` images, city filter, `seed_demo` command, [smoke checklist](./smoke-checklist.md), Docker Compose stack, env-driven CORS/hosts/secrets. Remaining: cloud deploy + real-user demo.  
**Depends on:** Sprint 3 complete (frontend MVP)

---

## Why this sprint

Sprint 3 proves the loop; Sprint 4 makes it **demo-ready and operable** before calling MVP “launched.”

---

## Sprint 4 backlog (ordered)

### Story 1 — Vendor edit / deactivate products
**As a** vendor,  
**I want** to update or deactivate my listings,  
**so that** I can fix mistakes and hide unavailable items.

Acceptance:

- [ ] `PATCH /api/products/<id>/` — owner vendor only  
- [ ] `POST` or `PATCH` to set `is_active=false` (deactivate) **or** `DELETE` soft/hard — pick one and document  
- [ ] Frontend: edit form + deactivate control on “my products”  
- [ ] Non-owners get `403`/`404`  

### Story 2 — Product images (lightweight)
**As a** vendor,  
**I want** an image on my listing,  
**so that** buyers understand the product faster.

Acceptance:

- [ ] Either `image_url` field **or** simple file upload to media storage  
- [ ] Shown on list + detail in frontend  
- [ ] Document limits (size/type) if uploads  

### Story 3 — City filter (Douala / Yaoundé)
**As a** buyer,  
**I want** to filter by city,  
**so that** I find local sellers.

Acceptance:

- [ ] API `city` filter reliable (normalize casing if needed)  
- [ ] Frontend filter control for Douala / Yaoundé (+ “All”)  
- [ ] Empty state when no products in city  

### Story 4 — Seed / demo data
**As a** developer or demos owner,  
**I want** sample vendors and products,  
**so that** the browse page isn’t empty.

Acceptance:

- [ ] Management command or fixture: ≥1 vendor, ≥1 buyer, ≥5 products  
- [ ] Documented in README (`python manage.py …`)  

### Story 5 — Smoke checklist / light e2e
**As a** team,  
**I want** a repeatable check that MVP flows work,  
**so that** we don’t regress before demos.

Acceptance:

- [ ] Written smoke checklist (register, login, create, browse, WhatsApp) **or** minimal automated e2e  
- [ ] Auth + products unit/API tests still pass  

### Story 6 — Deploy / run package
**As a** developer,  
**I want** a simple way to run the stack,  
**so that** others can try Mboa Market.

Acceptance:

- [ ] Docker Compose (frontend + backend + Postgres) **or** clear production-ish deploy notes  
- [ ] Prod-safe settings path: `DEBUG=False`, secret from env, allowed hosts  
- [ ] CORS configured for real frontend origin when deployed  

### Story 7 — Security & docs pass
**As a** team,  
**I want** secrets and docs correct,  
**so that** MVP handoff is safe.

Acceptance:

- [ ] No `.env` in git; `.env.example` complete  
- [ ] Root + backend + frontend READMEs describe full local demo  
- [ ] MVP success criteria checked in [product-overview.md](./product-overview.md)  

### Optional stretch
- Basic analytics events (page views)  
- Favicon / simple branding  

---

## Definition of Done (Sprint 4)

1. Stories 1–7 acceptance met (Story 2 image approach agreed)  
2. Demo to at least one vendor + one buyer (or internal stand-ins)  
3. Feedback captured for Sprint 5+ prioritization  

**MVP LAUNCH** when Sprint 4 is Done.

---

## How to proceed

1. Say **“Start Sprint 4 — Story 1”** after Sprint 3  
2. Prefer Compose early if demos are blocked by “works on my machine”  

### After Sprint 4
See [sprint-5.md](./sprint-5.md) — Platform admin & moderation.  
Re-rank post-MVP using [sprints-roadmap.md](./sprints-roadmap.md).

---

## Out of Sprint 4

- Payments  
- RFQ / messaging / AI  
- Full custom admin SPA  

---

## Checklist to start

- [ ] Approve Sprint 4 goal and stories  
- [ ] Decide image approach (URL vs upload)  
- [ ] Say **“Start Sprint 4 — Story 1”** when ready  
