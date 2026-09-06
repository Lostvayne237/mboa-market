# Sprint 1 — Foundations & auth

## Sprint goal

> **Have a runnable backend with PostgreSQL, a custom User model, and JWT auth APIs that pass automated tests — documented so anyone can install and run them.**

Frontend UI for auth can start at the end of this sprint or open Sprint 2. Prefer **backend solid first** so the UI has a real API to call.

**Suggested length:** 1–2 weeks  
**Status:** Complete — Stories 1–4 done

---

## Why this sprint first

Without accounts and a working API, products and browse screens have nothing to attach to. Sprint 1 builds the **foundation** every later feature needs.

---

## Sprint 1 backlog (ordered)

### Story 1 — Project scaffolding
**As a** developer,  
**I want** Django project layout under `backend/` with env-based settings,  
**so that** the API can run locally against PostgreSQL.

Acceptance:

- [x] Django project package named `config`  
- [x] Apps: `users` (registered), `products` (scaffold only, not registered)  
- [x] DRF + CORS for `http://localhost:5173`  
- [x] `.env` / `.env.example` via django-environ  
- [x] `requirements.txt` with pinned versions  
- [x] Backend README updated with install steps  

### Story 2 — Custom User
**As a** platform,  
**I want** users identified by email with a buyer/vendor role,  
**so that** we can distinguish buyers from vendors at registration.

Acceptance:

- [x] `AbstractUser` custom model: email = `USERNAME_FIELD`, username required, role with no default  
- [x] `AUTH_USER_MODEL` set before first migrate  
- [x] Initial migration created (`users/migrations/0001_initial.py`); applied successfully on SQLite verify — **Postgres apply still blocked** until `mboa` DB credentials work  
- [x] User registered in Django admin  

### Story 3 — JWT auth API
**As a** buyer or vendor,  
**I want** to register, log in, refresh tokens, and see my profile,  
**so that** I can use protected features later.

Acceptance:

- [x] `POST /api/auth/register/`  
- [x] `POST /api/auth/login/` → access + refresh + role  
- [x] `POST /api/auth/refresh/`  
- [x] `GET /api/auth/me/` (authenticated)  
- [x] Serializers validate all inputs  

### Story 4 — Auth tests + docs
**As a** team,  
**I want** tests and clear docs,  
**so that** we trust auth before building products.

Acceptance:

- [x] Tests: register buyer & vendor, duplicate email, invalid role, wrong password, `/me` requires auth  
- [x] Tests pass  
- [x] Backend README covers install, env vars, run server, run tests, architecture notes  

### Optional stretch (only if Stories 1–4 are Done)
- Scaffold Vite React app under `frontend/` with Tailwind and API base URL  
- Login/register pages calling the live API  

---

## Definition of Done (Sprint 1)

A story is Done when:

1. Code matches acceptance criteria  
2. Relevant tests pass  
3. No secrets committed  
4. README / docs updated if setup changed  
5. You can demo: register → login → call `/me` with the access token  

Sprint 1 itself is Done when Stories 1–4 are Done.

---

## How to proceed (step by step)

### Before coding

1. Confirm PostgreSQL works on your machine (create DB user + database).  
2. Read [architecture.md](./architecture.md) and [product-overview.md](./product-overview.md).  
3. Keep this sprint goal fixed — no products API yet.  

### During the sprint

1. Tell the agent: **“Start Sprint 1 — Story 1”** (or implement Story 1 yourself).  
2. Finish and verify Story 1 before Story 2.  
3. Same for 2 → 3 → 4.  
4. At the end: run all auth tests and demo register → login → `/me`.  

### After Sprint 1 (Sprint 2)

See **[sprint-2.md](./sprint-2.md)** — Product model + vendor create/list + buyer browse/search/detail APIs.

**Platform admin (later):** not in Sprint 1–2. Use `createsuperuser` / Django admin for now.

---

## Out of Sprint 1

- Product CRUD / marketplace browse UI  
- WhatsApp contact button  
- Payments, RFQ, messaging, AI  
- Production Docker / CI (unless you finish early and choose stretch infra)  

---

## Checklist to start

- [ ] Approve Sprint 1 goal and stories above  
- [ ] Postgres ready locally  
- [ ] Say when to **start building Story 1**
