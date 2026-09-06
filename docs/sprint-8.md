# Sprint 8 — Request for Quote (RFQ)

## Sprint goal

> **Buyers can post what they need; vendors can respond with offers — capturing demand even when catalog coverage is thin.**

**Suggested length:** 1–2 weeks  
**Status:** Planned (not started)  
**Depends on:** Auth (Sprint 1); stronger after MVP frontend exists

---

## Why this sprint

RFQ grows the marketplace when buyers can’t find an exact SKU — key for B2B-style needs in Cameroon.

---

## Sprint 8 backlog (ordered)

### Story 1 — RFQ app/models
**As a** developer,  
**I want** RFQ and Offer models,  
**so that** requests and responses persist.

Acceptance:

- [ ] `RFQ`: buyer FK, title, description, city, status (`open`/`closed`), timestamps  
- [ ] `Offer`: rfq FK, vendor FK, message, price (optional), whatsapp_phone (optional), timestamps  
- [ ] Migrations + admin  
- [ ] New app `rfqs/` **or** module under an existing app — document choice  

### Story 2 — Buyer RFQ APIs
**As a** buyer,  
**I want** to create and list my RFQs,  
**so that** vendors can find my need.

Acceptance:

- [ ] `POST /api/rfqs/` — buyer only  
- [ ] `GET /api/rfqs/mine/` — buyer’s RFQs  
- [ ] `PATCH` to close own RFQ  
- [ ] Vendors cannot create RFQs  

### Story 3 — Vendor browse RFQs + submit offers
**As a** vendor,  
**I want** to see open RFQs and send an offer,  
**so that** I can win business.

Acceptance:

- [ ] `GET /api/rfqs/` — open RFQs (vendors authenticated; decide if public — default: vendors only)  
- [ ] `POST /api/rfqs/<id>/offers/` — vendor only  
- [ ] Cannot offer on closed RFQs  
- [ ] One offer per vendor per RFQ (or allow updates — document)  

### Story 4 — Buyer view offers
**As a** buyer,  
**I want** to see offers on my RFQ,  
**so that** I can choose who to contact.

Acceptance:

- [ ] `GET /api/rfqs/<id>/offers/` — owner buyer only  
- [ ] Includes vendor safe fields + contact path (WhatsApp)  
- [ ] Frontend pages: create RFQ, my RFQs, offers list  

### Story 5 — Tests + docs
Acceptance:

- [ ] Tests for role rules, closed RFQ, offer uniqueness  
- [ ] README + architecture note for RFQ flow  

### Optional stretch
- Notify vendor of new RFQ in city (email)  
- Attach product link to an offer  

---

## Definition of Done (Sprint 8)

1. Buyer posts RFQ  
2. Vendor submits offer  
3. Buyer sees offers and can WhatsApp vendor  

---

## How to proceed

1. Say **“Start Sprint 8 — Story 1”**  
2. Keep contact via WhatsApp until Sprint 9 messaging  

### After Sprint 8
See [sprint-9.md](./sprint-9.md) — In-app messaging.

---

## Out of Sprint 8

- Escrow / payments on offers  
- Complex bidding auctions  
- Multi-round negotiation engine  

---

## Checklist to start

- [ ] Approve Sprint 8 goal and stories  
- [ ] Decide open RFQ visibility (vendors only vs public)  
- [ ] Say **“Start Sprint 8 — Story 1”** when ready  
