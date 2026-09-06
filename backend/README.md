# Backend — Mboa Market

Django REST Framework API + PostgreSQL for Mboa Market.

**Status:** Sprints 1–2 complete (auth + products/storefront API).

Mboa is a **discovery** marketplace: this API serves listings and vendor storefronts; buyers contact vendors by WhatsApp/phone and the deal happens off-platform. There are no cart/order/payment endpoints by design.

## Architecture notes

```
frontend (React)  --JSON/JWT-->  backend (Django/DRF)  --SQL-->  PostgreSQL
```

| Piece | Role |
|-------|------|
| `config/` | Project wiring: settings, root URLs, WSGI/ASGI |
| `users/` | Custom `User` (email login, buyer/vendor) + JWT auth API |
| `products/` | `Product` + `StoreProfile` models, catalog/search/storefront API, seed command |
| `.env` | Secrets and `DATABASE_URL` (never commit) |

**Auth flow:** register → login (access + refresh) → send `Authorization: Bearer <access>` → refresh when access expires.

**Roles:** public registration is `buyer` or `vendor` only. Platform ops use Django admin staff/superuser (see `docs/future-platform-admin.md`).

## Layout

```
backend/
├── config/
│   ├── settings/base.py
│   ├── urls.py              # /admin/, /api/auth/
│   ├── wsgi.py
│   └── asgi.py
├── users/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   ├── admin.py
│   └── tests.py
├── products/
│   ├── models.py            # Product, StoreProfile, Category
│   ├── serializers.py
│   ├── views.py             # browse/search/detail/storefront/dashboard APIs
│   ├── permissions.py       # IsVendor
│   ├── urls.py
│   ├── admin.py
│   ├── tests.py
│   └── management/commands/seed_demo.py
├── manage.py
├── requirements.txt
├── .env.example
└── .env
```

## Requirements

- Python 3.10+
- PostgreSQL 15+ (or SQLite temporarily via `DATABASE_URL`)

## Installation

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env` so `DATABASE_URL` matches your database.

### PostgreSQL (local)

```sql
CREATE USER mboa WITH PASSWORD 'mboa';
CREATE DATABASE mboa_market OWNER mboa;
```

If Postgres auth fails, temporarily use:

```env
DATABASE_URL=sqlite:///./db.sqlite3
```

Then migrate and run:

```bash
python manage.py migrate
python manage.py seed_demo    # optional: demo vendors + listings (password: demopass123)
python manage.py runserver
```

- API: `http://127.0.0.1:8000`
- Admin: `http://127.0.0.1:8000/admin/`

Create an ops admin (optional):

```bash
python manage.py createsuperuser
```

## Environment variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DJANGO_SECRET_KEY` | Django secret key | long random string |
| `DJANGO_DEBUG` | Debug mode | `True` |
| `DJANGO_ALLOWED_HOSTS` | Comma-separated hosts | `localhost,127.0.0.1` |
| `DATABASE_URL` | DB URL | `postgres://mboa:mboa@localhost:5432/mboa_market` |

## Running tests

Tests use an isolated in-memory SQLite DB (no Postgres required):

```bash
source .venv/bin/activate
python manage.py test
```

Covered cases: auth (register both roles, duplicate email, invalid role, wrong password, `/me` requires auth) and products (vendor-only create, ownership on edit, inactive hidden from public, search/city filters, view/contact counters, storefront trust signals, mixed search).

## Auth API (`/api/auth/`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/register/` | Public | Register (`email`, `username`, `password`, `role`) |
| `POST` | `/api/auth/login/` | Public | Login → `access`, `refresh`, `role` |
| `POST` | `/api/auth/refresh/` | Public | New access token from `refresh` |
| `GET` | `/api/auth/me/` | Bearer | Current user profile |

**Token lifetimes:** access 60 minutes · refresh 7 days

## Catalog & storefront API (`/api/`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/products/` | Public | Browse active listings (`?q=`, `?city=`, `?category=`, paginated) |
| `POST` | `/api/products/` | Vendor | Create a listing |
| `GET` | `/api/products/mine/` | Vendor | Own listings incl. hidden ones |
| `GET` | `/api/products/<id>/` | Public | Detail (increments `view_count`) |
| `PATCH` | `/api/products/<id>/edit/` | Owner | Edit or hide (`is_active`) |
| `POST` | `/api/products/<id>/contact/` | Public | Record a Call/WhatsApp tap (`contact_count`) |
| `GET` | `/api/products/categories/` | Public | Category list |
| `GET` | `/api/vendors/` | Public | Recently active vendors (discovery) |
| `GET` | `/api/vendors/<id>/` | Public | Storefront: profile, trust signals, catalog |
| `GET/PATCH` | `/api/vendors/me/store/` | Vendor | Own store profile |
| `GET` | `/api/search/?q=` | Public | Mixed search: products + vendors |

Trust signals are honest metrics only (member since, listing count, last activity, view/contact counts) — no rating system.

```bash
curl -s -X POST http://127.0.0.1:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"email":"buyer@example.com","username":"buyer1","password":"strongpass123","role":"buyer"}'

curl -s -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"buyer@example.com","password":"strongpass123"}'
```

## Verify install

```bash
python manage.py check
```

## Pinned dependencies

- Django `5.1.7`
- djangorestframework `3.15.2`
- django-environ `0.12.0`
- django-cors-headers `4.7.0`
- psycopg2-binary `2.9.10`
- djangorestframework-simplejwt `5.5.0`

CORS allows: `http://localhost:5173`

## Related docs

- [Architecture](../docs/architecture.md)
- [Design brief](../docs/design-brief.md)
- [Smoke checklist](../docs/smoke-checklist.md)
- [Sprint 1](../docs/sprint-1.md)
- [Platform admin (future)](../docs/future-platform-admin.md)
- [Root README](../README.md)
