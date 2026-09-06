# Product overview — Mboa Market

## Vision

Become a digital discovery marketplace where African SMEs (starting in Cameroon) get found online — beginning with a simple, mobile-first MVP.

## Problem

Small businesses often have no easy way to show what they sell online. Buyers struggle to find local vendors and then reach them by phone.

## How “stores” work on Mboa Market

Mboa Market is **not** an online shop with cart and checkout.

It is a **display / discovery** platform:

1. **Vendor** creates an account and publishes product listings (their public “storefront” on Mboa).  
2. **Buyer** browses or searches those listings.  
3. **Buyer contacts the vendor directly** using the vendor’s **phone number** (call or WhatsApp).  
4. **Sale happens off-platform** between buyer and vendor. Mboa does not take payment in the MVP.

Think: **digital shop window + phone contact** — not Amazon-style checkout.

```
Vendor lists products on Mboa
        ↓
Buyer finds a product
        ↓
Buyer taps Call / WhatsApp (vendor’s phone)
        ↓
They deal outside Mboa (price confirm, delivery, payment)
```

## Solution (MVP)

A web platform where:

1. **Vendors** register and list products (display catalog)  
2. **Buyers** browse / search products  
3. **Buyers** contact vendors by **phone** (WhatsApp and/or call)  

## Target users

| Role | Needs |
|------|--------|
| Buyer | Find products, see details, contact seller by phone |
| Vendor | Create account, publish product listings with contact phone |
| Platform admin | Moderate marketplace: verify vendors, manage listings/users (ops) |

**MVP registration roles:** `buyer` and `vendor` only.  
**Platform admin** is **not** a self-serve registration role. Admins are created by the team (Django `is_staff` / `is_superuser`, and/or a future `manager` role restricted to staff creation).

Later (not MVP): suppliers, RFQ workflows, richer verification flows.

## MVP in scope

- User registration / login (buyer or vendor role)  
- Vendor product create / list (display storefront)  
- Buyer browse, search, product detail  
- Contact vendor via **phone number** (WhatsApp link and/or `tel:` call)  

## Explicitly out of MVP

- Payments / cart / checkout  
- In-platform order management  
- Full in-app messaging (phone first)  
- Inventory management & alerts  
- RFQ  
- Reviews & verification badges  
- Public “manager” registration  
- Dedicated admin dashboard API (use Django admin first)  
- AI features  
- Multi-country expansion  

## Future backlog (post-MVP / later sprints)

Full list (what you asked for + suggestions + hard “don’t build yet” rules): **[future-implementations.md](./future-implementations.md)**.

| Item | Notes |
|------|--------|
| **Platform admin tooling** | Start with Django admin (`is_staff`). Later: optional `role=manager` + admin APIs. Never expose manager signup on `/api/auth/register/`. |
| Verification badges | Builds on platform admin workflows |
| **Jobs board** | Businesses post job openings; seekers search and contact the employer by phone/WhatsApp. Same display + phone-contact model — no in-app applications. See [sprint-12.md](./sprint-12.md). |
| **Shop events & announcements** | Shops post small events/announcements on their storefront (promo days, new arrivals, market days). Display-only; interested people contact the shop by phone. |
| **Traditional language UI** | Extend EN/FR toggle to regional languages (Ewondo, Duala, etc.). See [i18n.md](./i18n.md). |
| RFQ, inventory, in-app messaging, AI, payments | Separate epics — only if we choose to go beyond “display + phone” |

## Success criteria (MVP)

- A vendor can list at least one product with a contact phone  
- A buyer can find that product and reach the vendor by phone (WhatsApp and/or call)  
- Auth works with email + password and roles  
- Mobile-first UI is usable on a phone browser  

## Market

**Start:** Cameroon — Douala, Yaoundé  
**Later:** other African cities / countries
