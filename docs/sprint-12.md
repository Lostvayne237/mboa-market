# Sprint 12 — Jobs board (posting + search)

## Sprint goal

> **Businesses on Mboa post job openings; job seekers browse/search them and contact the employer directly by phone (call / WhatsApp) — same discovery + phone-contact model as products, no in-app applications or hiring pipeline.**

**Suggested length:** 1–2 weeks  
**Status:** Planned (future — post-MVP)  
**Depends on:** Stable MVP (Sprint 4+). Pairs well with verification (Sprint 6) so job posts feel trustworthy.

---

## Why this feature

Local SMEs don't just sell products — they hire (shop assistants, drivers, tailors, technicians). Job seekers in Douala/Yaoundé mostly find work by word of mouth and WhatsApp groups. A jobs board reuses everything Mboa already has: vendor storefronts become employer profiles, discovery/search already exists, and **contact by phone is already the conversion action**. It also gives buyers (job seekers) a reason to create accounts.

Same hard rules as the rest of the platform: **no in-app applications, no CV pipeline, no messaging** — a seeker sees a job and taps Call / WhatsApp (pre-filled with the job title).

---

## Sprint 12 backlog (ordered)

### Story 1 — Job model + employer posting API
**As a** vendor (business),  
**I want** to post job openings,  
**so that** local job seekers can find and contact me.

Acceptance:

- [ ] `Job` model: `employer` (FK to vendor user), `title`, `description`, `city`, `job_type` (full-time / part-time / gig / apprenticeship), `pay_info` (free text, optional — many local jobs negotiate by phone), `contact_phone`, `is_active`, `created_at`/`updated_at`, honest counters (`view_count`, `contact_count`)  
- [ ] Vendor-only create/edit/deactivate (same ownership rules as products)  
- [ ] Registered in Django admin  
- [ ] API tests for permissions and visibility

### Story 2 — Public browse + search
**As a** job seeker,  
**I want** to browse and search jobs by keyword, city, and type,  
**so that** I find work near me.

Acceptance:

- [ ] `GET /api/jobs/` with `?q=`, `?city=`, `?job_type=` filters (active only, paginated)  
- [ ] `GET /api/jobs/<id>/` detail (increments views)  
- [ ] Jobs included in mixed search **or** a dedicated jobs tab — decide at build time  
- [ ] Contact-tap counter endpoint (same as products)

### Story 3 — Frontend: jobs discovery + detail
**As a** job seeker,  
**I want** a mobile-first jobs section,  
**so that** I can find a job and call the employer.

Acceptance:

- [ ] Jobs entry point from home/header  
- [ ] List with city/type filters, skeleton states  
- [ ] Job detail: title, employer identity card (links to storefront), description, pay info, **Call / WhatsApp pre-filled with the job title**  
- [ ] No "apply" button, no CV upload, no in-app messaging

### Story 4 — Employer side on storefront + dashboard
**As a** vendor,  
**I want** my open jobs on my storefront and manageable from my dashboard,  
**so that** my stall shows I'm hiring.

Acceptance:

- [ ] "We're hiring" section on the public storefront (active jobs)  
- [ ] Dashboard tab: post/edit/close jobs, views + contact taps per job  
- [ ] Seed command extended with a couple of demo jobs

### Optional stretch
- Job categories aligned with product categories (commerce, hardware, fashion…)  
- "Recently posted" trust signal (jobs older than N weeks flagged or auto-expired)

---

## Definition of Done (Sprint 12)

1. Vendor posts a job → seeker finds it → taps Call/WhatsApp with pre-filled context  
2. Ownership/permission tests green  
3. Docs updated (README endpoint list, smoke checklist gains a jobs loop)

---

## Out of Sprint 12

- In-app applications, CV storage, chat  
- Job seeker profiles / matching / AI recommendations  
- Paid job promotion (possible monetization later — see Sprint 11)

---

## Checklist to start

- [ ] MVP launched and stable  
- [ ] Approve Sprint 12 goal and stories  
- [ ] Say **"Start Sprint 12 — Story 1"** when ready
