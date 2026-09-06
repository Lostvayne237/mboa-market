# Mboa Market — Full sprint roadmap

Index of all sprint plans. Each sprint has its own detailed file (same format as Sprint 1 & 2).

| Phase | Sprints | Outcome |
|-------|---------|---------|
| **MVP** | 1–4 | Auth + products API + mobile web UI + WhatsApp contact |
| **Trust & ops** | 5–6 | Platform admin moderation, verification, reviews |
| **Grow operations** | 7–8 | Inventory, RFQ |
| **Engage & scale** | 9–11 | Messaging, AI assists, payments / multi-country |
| **New verticals** | 12 | Jobs board (posting + search, phone contact) |

**Cadence:** ~1–2 weeks per sprint · one goal · vertical slices · reorder post-MVP by real user feedback.

---

## Sprint files

| Sprint | File | Status |
|--------|------|--------|
| 1 — Foundations & auth | [sprint-1.md](./sprint-1.md) | **Complete** |
| 2 — Products API | [sprint-2.md](./sprint-2.md) | **Complete** |
| 3 — Frontend marketplace MVP | [sprint-3.md](./sprint-3.md) | **Complete** |
| 4 — MVP polish & release | [sprint-4.md](./sprint-4.md) | **Complete** (local; cloud deploy pending) |
| 5 — Platform admin & moderation | [sprint-5.md](./sprint-5.md) | Planned |
| 6 — Verification badges & reviews | [sprint-6.md](./sprint-6.md) | Planned |
| 7 — Inventory basics | [sprint-7.md](./sprint-7.md) | Planned |
| 8 — Request for Quote (RFQ) | [sprint-8.md](./sprint-8.md) | Planned |
| 9 — Messaging + WhatsApp deeper | [sprint-9.md](./sprint-9.md) | Planned |
| 10 — AI assists | [sprint-10.md](./sprint-10.md) | Planned |
| 11 — Payments & expansion | [sprint-11.md](./sprint-11.md) | Planned |
| 12 — Jobs board (posting + search) | [sprint-12.md](./sprint-12.md) | Planned (future) |

Related: [future-platform-admin.md](./future-platform-admin.md) · [product-overview.md](./product-overview.md) · [architecture.md](./architecture.md)

---

## MVP definition of done (whole product)

When Sprints 1–4 are complete:

- [x] Buyer/vendor register & login (JWT)  
- [x] Vendor creates products via API  
- [x] Buyer browses/searches products  
- [x] Buyer opens WhatsApp (pre-filled) or calls to contact vendor  
- [x] Mobile-first UI works on a phone browser  

Design direction is governed by [design-brief.md](./design-brief.md): discovery + trust + phone contact, **no cart/checkout/payments/orders/in-app messaging**.

---

## Dependency map

```
Sprint 1 Auth
    │
    ▼
Sprint 2 Products API
    │
    ▼
Sprint 3 Frontend MVP ──► Sprint 4 Polish ──► MVP LAUNCH
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
         Sprint 5         Sprint 7         Sprint 8
         Admin            Inventory        RFQ
              │               │
              ▼               ▼
         Sprint 6         Sprint 10 (AI)
         Reviews              │
                              ▼
                         Sprint 9 Messaging
                              │
                              ▼
                         Sprint 11 Payments / expand
```

Sprints 5–12 can be reordered; **5–6 (trust)** often unlock better conversion before RFQ/AI. **Sprint 12 (jobs)** only depends on the MVP and can be pulled earlier if user demand shows up — it reuses storefronts, discovery, and the phone-contact action as-is.

---

## How we work each sprint

1. Open the sprint’s `sprint-N.md` and confirm goal + stories  
2. Implement stories in order  
3. Demo + tests + README  
4. Retro: what to pull into next sprint / what to defer  

**Say to start building:**  
`Start Sprint N — Story M`

---

## Checklist

- [x] Sprint 1 planned & done  
- [x] Sprints 2–11 each have a detailed `sprint-N.md`  
- [x] Sprints 2–4 built (products API, frontend MVP, polish)  
- [ ] Run the [smoke checklist](./smoke-checklist.md) on a phone  
- [ ] Cloud deploy (Sprint 4 stretch) — then MVP launch  
