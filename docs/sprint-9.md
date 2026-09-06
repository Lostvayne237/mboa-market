# Sprint 9 — Messaging (in-app) + WhatsApp deeper

## Sprint goal

> **Buyers and vendors can message in-app from a product context, while WhatsApp remains a fast external contact option.**

**Suggested length:** 1–2 weeks  
**Status:** Planned (not started)  
**Depends on:** Products + auth; stronger after frontend MVP

---

## Why this sprint

WhatsApp is great for MVP; in-app threads help when users want history on-platform and when WhatsApp isn’t preferred.

---

## Sprint 9 backlog (ordered)

### Story 1 — Conversation & Message models
**As a** developer,  
**I want** conversation/message data models,  
**so that** chats persist.

Acceptance:

- [ ] `Conversation`: product (optional FK), buyer, vendor, timestamps  
- [ ] `Message`: conversation FK, sender FK, body, `created_at`, `is_read`  
- [ ] Prevent duplicate open conversations for same buyer+vendor+product (unique constraint or get-or-create rule)  
- [ ] Admin readable  

### Story 2 — Start conversation from product
**As a** buyer,  
**I want** to message a vendor about a product,  
**so that** I can ask questions on-platform.

Acceptance:

- [ ] `POST /api/conversations/` — buyer authenticated; body includes `product_id` + optional first message  
- [ ] Creates or returns existing conversation  
- [ ] Vendor is taken from product.vendor  

### Story 3 — List threads + send/receive
**As a** user,  
**I want** an inbox and thread view,  
**so that** I can continue chats.

Acceptance:

- [ ] `GET /api/conversations/` — my threads (as buyer or vendor)  
- [ ] `GET /api/conversations/<id>/messages/` — participants only  
- [ ] `POST` message to a conversation — participants only  
- [ ] Mark read endpoint or auto-mark on fetch (document)  

### Story 4 — Messaging UI
**As a** user,  
**I want** inbox + thread screens,  
**so that** messaging is usable on mobile.

Acceptance:

- [ ] Inbox list with last message preview  
- [ ] Thread view with send box  
- [ ] Entry point from product detail (“Message vendor”)  
- [ ] WhatsApp button still available alongside  

### Story 5 — WhatsApp deeper (light)
**As a** product,  
**I want** better WhatsApp handoff,  
**so that** external chat stays effective.

Acceptance:

- [ ] Prefilled WhatsApp text including product title + link/id  
- [ ] Optional click tracking counter on product (simple)  
- [ ] Docs: when to use in-app vs WhatsApp  

### Story 6 — Tests + docs
Acceptance:

- [ ] Tests: only participants access thread; non-participant 403  
- [ ] Tests: get-or-create conversation behavior  
- [ ] README updated  

### Optional stretch
- WebSockets / polling for live updates  
- Unread badge in nav  

---

## Definition of Done (Sprint 9)

1. Buyer can start chat from product  
2. Both sides can read/send messages  
3. WhatsApp CTA still works with better prefills  

---

## How to proceed

1. Say **“Start Sprint 9 — Story 1”**  
2. REST-first; add websockets only as stretch  

### After Sprint 9
See [sprint-10.md](./sprint-10.md) — AI assists, or [sprint-11.md](./sprint-11.md) if monetization is prioritized.

---

## Out of Sprint 9

- Voice/video  
- Full WhatsApp Business API automation  
- Group chats  

---

## Checklist to start

- [ ] Approve Sprint 9 goal and stories  
- [ ] Say **“Start Sprint 9 — Story 1”** when ready  
