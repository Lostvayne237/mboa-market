# MVP smoke checklist

Run through this before calling a build shippable. Takes ~10 minutes.

## Setup

```bash
# Backend (from backend/)
.venv/bin/python manage.py migrate
.venv/bin/python manage.py seed_demo
.venv/bin/python manage.py runserver

# Frontend (from frontend/)
npm run dev        # → http://localhost:5173
```

Demo accounts (password `demopass123`): `marie@demo.mboa`, `jean@demo.mboa`, `fatima@demo.mboa`, `paul@demo.mboa` (vendors), `buyer@demo.mboa` (buyer).

## Buyer loop

- [ ] Home loads with category chips, city chips, recently active vendors, fresh listings
- [ ] Skeleton states show while loading (throttle network in devtools to check)
- [ ] Search "palm" → mixed results (products + vendor if store name matches)
- [ ] City chip filters results (Douala / Yaoundé)
- [ ] Category chip from home opens filtered results
- [ ] Product detail shows photo/placeholder, price with "confirm with vendor" note, vendor identity card
- [ ] **WhatsApp button opens wa.me with pre-filled message containing product title + price**
- [ ] **Call button opens tel: link**
- [ ] Share button copies link (or opens native share on mobile)
- [ ] Vendor card → storefront: stall header, trust chips (city, activity, listings count, member since), about text, catalog
- [ ] Contact bar pinned at bottom of storefront and product detail
- [ ] Deleted/unknown product id shows friendly "listing is gone" state
- [ ] **No cart, checkout, payment, order, or in-app messaging UI anywhere**

## Vendor loop

- [ ] Register as vendor → lands on dashboard with welcome + open product form
- [ ] Create product → appears in "Fresh listings" on home (in a private window, logged out)
- [ ] Edit product (title/price) → changes visible publicly
- [ ] Hide product → disappears from public browse, still listed (dimmed) in dashboard
- [ ] Store profile save (name, about, city, phone) → shows on public storefront
- [ ] Dashboard stats: views increase after visiting own product detail page; contact taps increase after tapping WhatsApp/Call
- [ ] Buyer account cannot access /dashboard (redirected home)
- [ ] Logged-out user hitting /dashboard is sent to login

## API / security

- [ ] `POST /api/products/` without token → 401; with buyer token → 403
- [ ] PATCH another vendor's product → 404
- [ ] Backend tests green: `.venv/bin/python manage.py test`
- [ ] `DJANGO_DEBUG=False` boots without errors (set in `.env`, restart server)
- [ ] No secrets committed (`.env` is git-ignored; `.env.example` has placeholders only)
