# Sprint 11 — Payments & expansion

## Sprint goal

> **Prepare monetization and/or geographic expansion only after MVP demand is proven — with a clear payment approach and multi-market data readiness.**

**Suggested length:** 1–2 weeks for research + thin slice (or longer if integrating a PSP)  
**Status:** Planned (not started)  
**Depends on:** Stable MVP (Sprint 4+); ideally messaging/trust in place

---

## Why this sprint

Payments were **out of first MVP** on purpose. This sprint adds money movement or expansion scaffolding when the marketplace loop already works.

---

## Sprint 11 backlog (ordered)

### Story 1 — Payments research & decision record
**As a** product owner,  
**I want** a written choice of payment approach for Cameroon,  
**so that** engineering builds the right thin slice.

Acceptance:

- [ ] Compare options: MTN MoMo, Orange Money, card PSP, or “pay outside app + mark paid”  
- [ ] ADR/doc: chosen approach, fees, KYC, timeline  
- [ ] Explicit non-goals for this sprint  

### Story 2 — Order model (thin)
**As a** buyer,  
**I want** an order/request record tied to a product,  
**so that** payment status can be tracked.

Acceptance:

- [ ] `Order`: buyer, product/vendor, amount, currency, status (`pending`/`paid`/`cancelled`/…)  
- [ ] Create order from product detail (authenticated buyer)  
- [ ] Vendor can list orders for their products  

### Story 3 — Payment thin slice
**As a** buyer,  
**I want** to initiate payment (or mark external payment),  
**so that** the vendor knows intent.

Acceptance:

- [ ] Implement **one** path from Story 1 decision  
- [ ] Webhook or manual confirm flow documented  
- [ ] Never store raw card data on our servers  
- [ ] Frontend status page for buyer + vendor  

### Story 4 — Multi-country / multi-currency readiness
**As a** platform,  
**I want** country/currency fields ready,  
**so that** expansion past Cameroon is not a rewrite.

Acceptance:

- [ ] `country` (default `CM`) on user and/or product  
- [ ] Currency already on product; validate allowed list  
- [ ] Docs for adding a new country checklist  

### Story 5 — Legal / compliance checklist
**As a** team,  
**I want** a launch compliance checklist,  
**so that** we don’t miss basics.

Acceptance:

- [ ] Checklist doc: terms, privacy, KYC if required, data retention  
- [ ] Link from root README  
- [ ] No false “PCI compliant” claims without evidence  

### Story 6 — Tests + docs
Acceptance:

- [ ] Tests for order creation permissions and status transitions  
- [ ] Payment provider calls mocked in tests  
- [ ] Runbooks for failed payments / refunds (even if manual)  

### Optional stretch
- Invoices/PDF  
- Commission / platform fee calculation  

---

## Definition of Done (Sprint 11)

1. Payment approach decided and documented  
2. At least a thin order + payment (or external pay) path works in staging/local  
3. Expansion fields/checklist exist  

---

## How to proceed

1. Complete Story 1 **before** coding payment integration  
2. Say **“Start Sprint 11 — Story 1”**  

### After Sprint 11
Re-plan next epics from feedback (new roadmap revision).

---

## Out of Sprint 11

- Full banking license concerns  
- Multi-PSP abstraction for every African market at once  
- Crypto payments  

---

## Checklist to start

- [ ] Approve Sprint 11 goal and stories  
- [ ] Confirm payment research priority vs delay  
- [ ] Say **“Start Sprint 11 — Story 1”** when ready  
