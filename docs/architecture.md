# Product architecture — Mboa Market

This describes **how the system is designed**. Folders exist; application code is added during sprints.

## Product model (important)

Mboa Market is a **catalog / discovery** platform, not a checkout store.

- Vendors **display** products (their storefront on Mboa).  
- Buyers **discover** products.  
- Contact happens via the vendor’s **phone number** (WhatsApp and/or call).  
- **No cart, no payment, no order pipeline in MVP.**

## High-level diagram

```
┌─────────────────────┐
│  Frontend (React)   │  Browse + vendor listing UI
│  frontend/          │
└──────────┬──────────┘
           │ HTTPS / JSON (+ JWT for vendors)
           ▼
┌─────────────────────┐
│  Backend (Django)   │  Auth + product catalog API
│  backend/           │
└──────────┬──────────┘
           │ SQL
           ▼
┌─────────────────────┐
│  PostgreSQL         │  Users, product listings
└─────────────────────┘

Buyer taps Call / WhatsApp
           │
           ▼
   Vendor’s phone (off-platform deal)
```

Phone/WhatsApp are **not** hosted by us in MVP: the frontend opens `tel:` and/or `https://wa.me/<digits>` using the listing’s contact phone.

## Repository sections

| Path | Responsibility |
|------|----------------|
| `frontend/` | SPA: pages, forms, API client, mobile-first UI |
| `backend/` | REST API, models, auth, admin, tests |
| `docs/` | Product and architecture decisions |

## Backend shape (when built)

```
backend/
├── config/       # Django project: settings, root URLs
├── users/        # Custom User, JWT register/login/me
└── products/     # Product models & APIs (Sprint 2+)
```

- **Project (`config`)** = global wiring  
- **Apps (`users`, `products`)** = feature modules  

## Frontend shape (when built)

```
frontend/
├── src/
│   ├── api/          # Calls to backend
│   ├── pages/        # Routes / screens
│   ├── components/   # Shared UI pieces
│   └── ...
```

Talks only to the backend over HTTP. Does not talk to PostgreSQL directly.

## Auth flow (planned)

1. Register → create user (role: `buyer` or `vendor`)  
2. Login → receive **access** + **refresh** JWT  
3. Authenticated requests → `Authorization: Bearer <access>`  
4. Refresh when access expires  

## Data domains (MVP)

| Domain | Owned by | Notes |
|--------|----------|--------|
| User | `users` app | email login, username, role |
| Product | `products` app | display listing: title, price (info), description, vendor, **contact phone** |
| Contact | frontend | `tel:` / WhatsApp from phone — **no chat or payment server in MVP** |

## Principles

- **Display + phone contact** — not checkout commerce  
- **API-first:** frontend and future clients share one backend  
- **Simple MVP:** no payments, no ES search engine yet  
- **Mobile-first:** UI designed for phone screens first  
- **Secrets in env:** DB URL and keys never committed  

## Environments (later)

| Env | Purpose |
|-----|---------|
| Local | Developer machine + local Postgres |
| Staging | Shared test deploy (optional) |
| Production | Real users |

Deployment (Docker, CI/CD) is planned after the MVP works locally.
