# Mboa Market — Product and Design Brief

This is the source of truth for product direction and interaction design. Every screen and API decision should be checked against it.

## What this platform is

Mboa Market is a marketplace **discovery** platform. Local vendors get a real digital presence: a place where buyers can find them, understand what they sell, see where they are located, and reach them directly. **Every transaction happens outside the platform**, through WhatsApp or a phone call. The experience should feel closer to a living business directory crossed with a market you can browse, not an online store with the checkout removed.

## What this platform is not

Do not design a cart. Do not design a checkout flow. Do not design payment pages. Do not design order tracking or order history. Do not design internal messaging inside the app. Do not design delivery or shipping screens.

If any of these appear in a generated design, they are wrong no matter how well they are executed. This constraint should shape the layout decisions themselves, not just sit as a feature that got turned off.

## The one action that matters

**Contact Vendor is the only conversion action that exists.** Everything on a product page or vendor profile exists to build enough trust and clarity that a buyer feels comfortable reaching out. Treat this button the way a checkout button is treated on a normal store: the single most important element on the page. WhatsApp is the primary path, a phone call is the secondary path.

## Design principles

1. **Contact with intent, not a bare button.** WhatsApp taps pre-fill the message with the product name and price so the conversation opens with context. The call option gets equal visual weight.
2. **Trust signals that do not require order history.** No fake star ratings. Show what can honestly be measured: how recently a vendor was active, how many products they list, how long they have had a profile.
3. **A storefront that feels owned, not templated.** Vendor profiles carry personality: a cover image, an optional short voice note introduction, and copy that reads like a person talking about their shop.
4. **Discovery organized by proximity and category, not endless scroll.** City filters (Douala, Yaoundé) and categories that reflect real local commerce: provisions, food, fashion, electronics, hardware, spare parts — not a generic Western taxonomy.
5. **Built for real network conditions.** Skeleton states, lazy image loading, and a layout that never looks broken on a weak connection are design requirements, not backend afterthoughts.
6. **Share culture.** Buyers forward things to friends and group chats before deciding. A clean share action earns more than a wishlist ever would.
7. **Vendors and stalls over interchangeable tiles.** A buyer in a Douala market notices a stall and a vendor, then asks a question. Browsing is organized around vendors as first-class citizens, not just a product grid.

## Signature element

**The vendor storefront as a market stall**: cover/awning, a bold stall-front identity block, honest trust chips, an optional voice intro (native WhatsApp behavior), and contact actions repeated at the top and pinned to the bottom. This is the screen the design should be remembered for.

## Core flows

- **Vendor:** create an account → store profile → add products → listings go live publicly.
- **Buyer:** open the app → search or browse → view a vendor or a product → tap contact → negotiate the purchase outside the platform.

## Screens

- **Home and discovery** — category entry points, city chips, recently active vendors, fresh listings. Not a generic product grid as the hero.
- **Search results** — mixed results: matching products *and* the vendors that carry them.
- **Product detail** — photo, price (informational), description, vendor identity with as much visual weight as the product, leading into Contact Vendor (sticky).
- **Vendor storefront** — business name, location, about, optional voice intro, catalog, contact repeated top and bottom.
- **Vendor onboarding** — plain-language guided flow: account → first product → store profile.
- **Vendor dashboard** — manage listings, basic activity signals (views, contact taps). Nothing related to orders or payments.

## Visual direction

Warm and high contrast, legible in bright outdoor light on a phone. Palette: warm paper white (`#fffdf6`), deep market green (`#176b3f`), warm sun yellow (`#ffb62e`), clay neutrals — deliberately **not** the current AI-design defaults (cream + serif + terracotta, near-black + acid accent, or newspaper hairlines). Typeface: Plus Jakarta Sans for warmth and personality. Favor real photography of products and vendors over stock icons; category emoji only as placeholders until photos exist.

## Hard rules, repeated on purpose

No cart. No checkout. No payments. No order tracking. No messaging inside the app. No delivery flows. **Contact Vendor through WhatsApp or a phone call is the only conversion action that exists.**
