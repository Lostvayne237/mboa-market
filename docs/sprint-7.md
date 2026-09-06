# Sprint 7 — Inventory basics

## Sprint goal

> **Vendors can track stock on listings; buyers see whether products are available.**

**Suggested length:** 1–2 weeks  
**Status:** Planned (not started)  
**Depends on:** Sprint 2+ products; ideally after MVP (Sprint 4)

---

## Why this sprint

Prevents buyers contacting vendors for empty stock and helps vendors manage what they sell — without full ERP.

---

## Sprint 7 backlog (ordered)

### Story 1 — Stock fields on Product
**As a** vendor,  
**I want** stock quantity on my product,  
**so that** availability is explicit.

Acceptance:

- [ ] `stock_quantity` (integer ≥ 0)  
- [ ] Derived or stored `is_in_stock` (document rule: quantity > 0)  
- [ ] Migration + admin  
- [ ] Default sensible for existing rows (e.g. 0 or 1 — decide and document)  

### Story 2 — Vendor stock update API + UI
**As a** vendor,  
**I want** to update stock,  
**so that** listings stay accurate.

Acceptance:

- [ ] Vendor can PATCH stock on own products  
- [ ] Frontend control on edit / my products  
- [ ] Validation errors for negative stock  

### Story 3 — Low-stock signal
**As a** vendor,  
**I want** a low-stock indicator,  
**so that** I know what to restock.

Acceptance:

- [ ] Threshold (env or constant, e.g. ≤ 5)  
- [ ] `is_low_stock` in API for vendor “mine” list  
- [ ] Visual cue in vendor UI  

### Story 4 — Buyer availability display
**As a** buyer,  
**I want** to see out-of-stock state,  
**so that** I don’t waste time on WhatsApp.

Acceptance:

- [ ] Badge or label on list/detail when out of stock  
- [ ] Optional: filter `in_stock=true` on browse  
- [ ] WhatsApp CTA policy documented (disable vs allow “ask anyway”)  

### Story 5 — Tests + docs
Acceptance:

- [ ] Tests for stock validation, low-stock flag, public in-stock filter  
- [ ] README updated  

### Optional stretch
- Stock history log  
- Bulk stock update  

---

## Definition of Done (Sprint 7)

1. Vendors update stock  
2. Buyers see availability  
3. Low-stock visible to vendors  

---

## How to proceed

1. Say **“Start Sprint 7 — Story 1”**  
2. Do **not** build invoice OCR here (Sprint 10)  

### After Sprint 7
See [sprint-8.md](./sprint-8.md) — RFQ, or [sprint-10.md](./sprint-10.md) if AI stock tools are prioritized after inventory exists.

---

## Out of Sprint 7

- Multi-warehouse  
- Purchase orders  
- AI invoice scanning  

---

## Checklist to start

- [ ] Approve Sprint 7 goal and stories  
- [ ] Decide default stock for existing products  
- [ ] Say **“Start Sprint 7 — Story 1”** when ready  
