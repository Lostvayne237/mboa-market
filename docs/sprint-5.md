# Sprint 5 — Platform admin & moderation

## Sprint goal

> **Platform ops can moderate users and products (verify vendors, deactivate bad actors/listings) without touching the database directly.**

See also [future-platform-admin.md](./future-platform-admin.md).

**Suggested length:** 1–2 weeks  
**Status:** Planned (not started)  
**Depends on:** Sprint 4 / MVP launch (products exist to moderate)

---

## Why this sprint

Trust and safety matter once real users join. Start with **ops tooling**, not a public manager signup.

---

## Sprint 5 backlog (ordered)

### Story 1 — Admin workflow & Django admin upgrades
**As a** platform admin,  
**I want** usable Django admin for users and products,  
**so that** I can moderate day-to-day.

Acceptance:

- [ ] Admin list filters: role, is_active, city, is_verified (once field exists)  
- [ ] Search by email, username, product title  
- [ ] Document how to create staff: `createsuperuser` / promote `is_staff`  
- [ ] Ops runbook short section in docs  

### Story 2 — Vendor verification field
**As a** platform,  
**I want** vendors marked verified,  
**so that** the UI can show a trust badge later (Sprint 6).

Acceptance:

- [ ] `is_verified` (boolean, default `False`) on User **or** vendor profile  
- [ ] Only staff can set it (admin and/or staff API)  
- [ ] Migration + admin editable  

### Story 3 — Moderation actions
**As a** platform admin,  
**I want** to deactivate products and users,  
**so that** I can remove harmful content/accounts.

Acceptance:

- [ ] Deactivate product (`is_active=False`) from admin (and optional staff API)  
- [ ] Deactivate user (`is_active=False`) from admin  
- [ ] Deactivated products disappear from public browse  
- [ ] Deactivated users cannot log in  

### Story 4 — Role decision: `manager` vs staff-only
**As a** team,  
**I want** a clear rule for who is an admin,  
**so that** we don’t invent unsafe registration paths.

Acceptance:

- [ ] Written decision: **A)** `is_staff` only, or **B)** add `role=manager` creatable only by superuser  
- [ ] If B: registration API still rejects `manager`  
- [ ] Docs updated (`future-platform-admin.md` + README)  

### Story 5 — Tests + docs
**As a** team,  
**I want** tests around verification/moderation rules,  
**so that** public APIs stay safe.

Acceptance:

- [ ] Tests: inactive products excluded from public list  
- [ ] Tests: inactive user cannot obtain tokens  
- [ ] Tests: public register cannot set staff/manager  
- [ ] Docs for ops workflow  

### Optional stretch
- Staff-only REST endpoints for mobile ops  
- Audit log of moderation actions  

---

## Definition of Done (Sprint 5)

1. Ops can verify vendor + deactivate product/user via admin  
2. Public catalog respects `is_active`  
3. No public manager registration  

---

## How to proceed

1. Say **“Start Sprint 5 — Story 1”** after MVP feedback  
2. Prefer enhancing Django admin before building a custom admin SPA  

### After Sprint 5
See [sprint-6.md](./sprint-6.md) — Verification badges & reviews.

---

## Out of Sprint 5

- Full custom admin React dashboard  
- Automated fraud ML  
- Reviews UI (Sprint 6)  

---

## Checklist to start

- [ ] Approve Sprint 5 goal and stories  
- [ ] Decide staff-only vs `manager` role early  
- [ ] Say **“Start Sprint 5 — Story 1”** when ready  
