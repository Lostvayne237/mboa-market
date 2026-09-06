# Sprint 10 — AI assists

## Sprint goal

> **Add optional AI helpers that make listing and operating easier for vendors — without blocking core marketplace flows if AI fails.**

**Suggested length:** 1–2 weeks (or split into two sprints if taking multiple features)  
**Status:** Planned (not started)  
**Depends on:** Products (Sprint 2); inventory (Sprint 7) required for invoice→stock  

---

## Why this sprint

AI is a **growth layer**, not MVP. Use it to save vendor time (descriptions, advice, later scanning).

---

## Sprint 10 backlog (ordered)

Pick **one primary** feature for the sprint; treat others as stretch or a follow-up sprint.

### Story 1 — Feature flag + AI service boundary
**As a** developer,  
**I want** AI behind config/flags,  
**so that** the app works when AI is off or down.

Acceptance:

- [ ] Env flags e.g. `AI_ENABLED`, provider keys via `.env`  
- [ ] Single service module/client for AI calls  
- [ ] Graceful error responses (4xx/503 with clear message)  
- [ ] No API keys in frontend  

### Story 2 — Product description generator
**As a** vendor,  
**I want** AI to draft a product description,  
**so that** I can publish faster.

Acceptance:

- [ ] `POST /api/ai/product-description/` — vendor auth  
- [ ] Input: title + optional bullets/city  
- [ ] Output: suggested description text (vendor edits before save)  
- [ ] Frontend button on create/edit product form  

### Story 3 — Business assistant (Q&A)
**As a** vendor,  
**I want** simple advice on inventory/sales questions,  
**so that** I get quick guidance.

Acceptance:

- [ ] `POST /api/ai/assistant/` — vendor auth  
- [ ] Ground answers in general SME advice; don’t invent private user data  
- [ ] Simple chat UI panel for vendors  
- [ ] Rate limit / max tokens documented  

### Story 4 — Invoice scan → stock (optional; needs Sprint 7)
**As a** vendor,  
**I want** to upload an invoice image/PDF and update stock,  
**so that** inventory stays current with less typing.

Acceptance:

- [ ] Upload endpoint + async or sync parse  
- [ ] Returns suggested line items; vendor confirms before stock apply  
- [ ] Only applies to own products (match by name/sku if present)  
- [ ] Clear “AI may be wrong — confirm” UX  

### Story 5 — Demand hints (lightweight)
**As a** vendor,  
**I want** simple demand signals,  
**so that** I know what to stock.

Acceptance:

- [ ] Based on views/contacts/WhatsApp clicks if those counters exist  
- [ ] Vendor dashboard widget: top products by interest  
- [ ] Document that this is heuristic, not forecasting science  

### Story 6 — Tests + docs
Acceptance:

- [ ] Tests with AI mocked (no live network in CI)  
- [ ] README: enable flags, costs, privacy notes  
- [ ] Architecture note: AI is assist-only  

### Optional stretch
- Multilingual FR/EN prompts for Cameroon  
- Cache common generations  

---

## Definition of Done (Sprint 10)

1. At least Story 1 + one of Stories 2–5 shipped  
2. Marketplace works with `AI_ENABLED=False`  
3. Keys never exposed to client  

---

## How to proceed

1. Choose primary AI feature before coding  
2. Say **“Start Sprint 10 — Story 1”**  

### After Sprint 10
See [sprint-11.md](./sprint-11.md) — Payments & expansion.

---

## Out of Sprint 10

- Replacing human support entirely  
- Autonomous purchasing  
- Unreviewed auto-publish of AI content  

---

## Checklist to start

- [ ] Approve which AI story is primary  
- [ ] Provider/account ready (or mock-first)  
- [ ] Say **“Start Sprint 10 — Story 1”** when ready  
