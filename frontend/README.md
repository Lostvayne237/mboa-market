# Mboa Market — Frontend

Mobile-first React app for the Mboa Market discovery marketplace. Buyers browse and search listings, then contact vendors **directly by WhatsApp or phone call** — there is no cart, checkout, or payment anywhere in this app, by design. See [`docs/design-brief.md`](../docs/design-brief.md).

## Stack

- React 19 + TypeScript, Vite 6
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- React Router 7
- No state library — a small auth context plus fetch helpers in `src/lib/`

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

The backend must be running (default `http://127.0.0.1:8000`). To point elsewhere, copy `.env.example` to `.env` and set `VITE_API_BASE_URL`.

```bash
npm run build      # type-check + production build
```

## Structure

```
src/
├── lib/
│   ├── api.ts          # fetch wrapper, JWT storage + refresh
│   ├── auth.tsx        # AuthProvider / useAuth
│   ├── contact.ts      # wa.me + tel: links, price/date formatting
│   └── types.ts        # API types, categories, cities
├── components/
│   ├── ContactButtons  # THE conversion action (WhatsApp + Call)
│   ├── TrustChips      # honest trust signals (activity, listings, age)
│   ├── ProductCard / VendorCard / SearchBar / Header / Skeletons
├── pages/
│   ├── Home            # categories, cities, active vendors, fresh listings
│   ├── Search          # mixed products + vendors results
│   ├── ProductDetail   # sticky contact bar, vendor identity card, share
│   ├── VendorStore     # the "stall" — signature screen
│   ├── Login / Register
│   └── Dashboard       # vendor: store profile, listings, views/contact taps
└── App.tsx             # routes
```

## Design notes

- WhatsApp links are pre-filled with the product title and price so conversations open with context.
- Trust chips only show measurable facts — never fake ratings.
- Skeleton loaders everywhere; images lazy-load — built for weak connections.
- Palette and typography defined in `src/index.css` (`@theme`): deep navy primary, warm gold accent, cool paper white, Plus Jakarta Sans.
- Animations are pure CSS + a tiny IntersectionObserver `Reveal` component (no animation library): route transitions, staggered card entrances, hover lift with image zoom, button sheen, slide-up contact bar, shimmer skeletons, count-up dashboard stats. All respect `prefers-reduced-motion`.
