# Sprint 6 — Trust: verification badges & reviews

## Sprint goal

> **Buyers see verified vendor badges and can leave ratings/reviews so trust grows with usage.**

**Suggested length:** 1–2 weeks  
**Status:** Planned (not started)  
**Depends on:** Sprint 5 (`is_verified` available)

---

## Why this sprint

Verification without display doesn’t help buyers. Reviews add social proof after moderation exists.

---

## Sprint 6 backlog (ordered)

### Story 1 — Show verification badge
**As a** buyer,  
**I want** to see if a vendor is verified,  
**so that** I feel safer contacting them.

Acceptance:

- [ ] Product detail / vendor summary exposes `is_verified`  
- [ ] Frontend badge when verified  
- [ ] Unverified has no false “trusted” styling  

### Story 2 — Review model
**As a** developer,  
**I want** a Review model,  
**so that** ratings persist.

Acceptance:

- [ ] Fields: `product` (FK), `author` (FK user), `rating` (1–5), `comment` (optional), `is_visible` (default True), timestamps  
- [ ] Unique constraint: one review per author per product  
- [ ] Migration + admin (hide/unhide)  

### Story 3 — Review APIs
**As a** buyer,  
**I want** to submit and read reviews,  
**so that** I can share and use feedback.

Acceptance:

- [ ] `POST /api/products/<id>/reviews/` — authenticated buyer  
- [ ] Vendors reviewing their own product rejected  
- [ ] `GET` reviews on product detail (visible only)  
- [ ] Average rating on product detail payload (optional but recommended)  

### Story 4 — Reviews UI
**As a** buyer,  
**I want** to see and leave reviews on the product page,  
**so that** trust is visible in the product.

Acceptance:

- [ ] List reviews on detail page  
- [ ] Form for logged-in buyers  
- [ ] Show validation / duplicate errors clearly  

### Story 5 — Tests + docs
Acceptance:

- [ ] Tests: create review, duplicate rejected, hidden reviews excluded  
- [ ] Tests: average rating calculation if implemented  
- [ ] README / API docs updated  

### Optional stretch
- Vendor replies to reviews  
- Report review button → admin flag  

---

## Definition of Done (Sprint 6)

1. Verified badge visible  
2. Buyers can create and read reviews  
3. Admin can hide abusive reviews  

---

## How to proceed

1. Say **“Start Sprint 6 — Story 1”**  
2. Keep review abuse tools simple (hide in admin)  

### After Sprint 6
See [sprint-7.md](./sprint-7.md) — Inventory basics.  
(Or reorder via roadmap if RFQ/messaging is higher priority.)

---

## Out of Sprint 6

- Paid “featured” listings  
- Complex reputation scores  
- Photo reviews  

---

## Checklist to start

- [ ] Approve Sprint 6 goal and stories  
- [ ] Sprint 5 verification field live  
- [ ] Say **“Start Sprint 6 — Story 1”** when ready  
