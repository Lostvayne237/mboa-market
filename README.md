# Mboa Market

B2B/B2C **discovery** marketplace helping Cameroonian SMEs show what they sell online so buyers can find them and **contact them by phone**.

**Status:** Sprints 1–4 built — MVP runs end-to-end locally · Next: run the [smoke checklist](./docs/smoke-checklist.md), then cloud deploy  
**Initial market:** Cameroon (Douala, Yaoundé)  
**MVP focus:** Vendors display products · Buyers browse · Contact by phone (WhatsApp / call) — **no checkout**

---

## Repository layout

```
MBOA/
├── README.md            ← you are here
├── docs/                ← product, design brief, architecture, sprint planning
├── frontend/            ← React + TypeScript + Tailwind (Vite)
├── backend/             ← Django + DRF (+ SQLite locally / PostgreSQL)
├── docker-compose.yml   ← full stack: db + api + frontend
└── .gitignore
```

| Folder | Purpose |
|--------|---------|
| [`docs/`](./docs/) | Product overview, [design brief](./docs/design-brief.md), architecture, sprint plans |
| [`frontend/`](./frontend/) | Web UI: discovery, storefronts, contact actions, vendor dashboard |
| [`backend/`](./backend/) | API: auth, product catalog, storefronts, trust signals |

## Run the MVP locally

```bash
# Option A — Docker (one command)
docker compose up --build          # → http://localhost:5173

# Option B — manual
cd backend && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt \
  && cp .env.example .env \
  && .venv/bin/python manage.py migrate && .venv/bin/python manage.py seed_demo \
  && .venv/bin/python manage.py runserver
cd frontend && npm install && npm run dev
```

Demo logins (password `demopass123`): vendors `marie@demo.mboa`, `jean@demo.mboa`, `fatima@demo.mboa`, `paul@demo.mboa` · buyer `buyer@demo.mboa`.

---

## Product in one paragraph

Mboa Market is a **shop window**, not a checkout store. Vendors list products for display. Buyers browse and search, then contact the vendor with the listed **phone number** (call or WhatsApp). The deal happens off-platform. Payments, cart, RFQ, and AI are **out of MVP scope**.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Frontend | React 19, TypeScript, Tailwind CSS 4, Vite |
| Backend | Django 5, Django REST Framework, Python |
| Database | PostgreSQL (SQLite for zero-setup local dev) |
| Auth | JWT (SimpleJWT) |
| Run/deploy | Docker Compose (local) · cloud deploy pending |

---

## How to navigate docs

1. [Product overview](./docs/product-overview.md) — who, what, why, MVP scope  
2. [Design brief](./docs/design-brief.md) — product direction: trust + reachability, hard rules  
3. [Future implementations](./docs/future-implementations.md) — jobs, events, languages, admin, suggestions  
4. [Architecture](./docs/architecture.md) — how systems connect  
5. [Sprint roadmap (all sprints)](./docs/sprints-roadmap.md) — MVP + growth plan  
6. [Smoke checklist](./docs/smoke-checklist.md) — verify the MVP before demos  

---

## Agile working style

- Short sprints with one clear goal  
- Prioritized backlog; ship vertical slices (end-to-end)  
- Definition of Done: works, tested, docs updated when needed  
- Do not expand MVP mid-sprint without swapping something out  

---

## Next step

Run the [smoke checklist](./docs/smoke-checklist.md) on a phone, capture feedback, then plan the cloud deploy and [Sprint 5](./docs/sprint-5.md) (platform admin & moderation).
