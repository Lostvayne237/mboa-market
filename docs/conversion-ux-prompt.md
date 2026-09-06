# Conversion & Evaluative Ease Design System

Analysis and revised prompt for UI/UX conversion optimization — from "sales pitch" to "safety net."

---

## Original Prompt (Reference)

The "Top 0.01%" UI/UX & Conversion Mastermind Prompt covered seven areas:

1. **Layout** — Immersive transport over information; large hero imagery; 960px centered grid
2. **Easy Question Framework** — Process-over-pitch headlines; sensory ownership; light verbs
3. **Effort Killers & Trust Specificity** — "2 taps" rule; mental math savings
4. **Pricing** — One number rule; convenience reframing; strategic anchoring
5. **Decision Architecture & Badges** — Single-word badges; commitment consistency
6. **Transparency Bias & Anxiety Killers** — Safety net timeline; total on CTA; objection handling
7. **Visual & Motion Polish** — Opacity hierarchy; spring animations; depth micro-details

---

## Assessment

This is a strong conversion-design playbook with real psychological grounding. It reads like distilled patterns from high-performing consumer products (Airbnb, trial flows, booking CTAs).

### What Works Well

**Strong mental model.** "Sales pitch → safety net" and "evaluative ease" are useful north stars. They push you toward reducing anxiety instead of adding hype.

**Specific, actionable rules.** Things like "one number rule," "2 taps," "total on the CTA," and "reminder before trial ends" are implementable, not vague "make it cleaner" advice.

**Good copy psychology.** Process-over-pitch, light verbs, sensory ownership, and mental-math savings are well-established and usually lift conversion when applied correctly.

**Decision architecture.** Badges, anchoring, and commitment consistency help users who are already 80% decided—they need a nudge, not a lecture.

---

## Pros and Cons

| Pros | Cons |
|------|------|
| Clear principles with examples | **One-size-fits-all** — assumes consumer/mobile booking/trial flows |
| Reduces anxiety (trust, transparency) | **Over-prescriptive UI** — 960px, 2×2 grids, opacity %s can fight responsive design and brand systems |
| Actionable copy rules | **No context gates** — when *not* to use immersive heroes, anchoring, or badges |
| Strong CTA/pricing guidance | **Ethics gap** — fake anchor prices and urgency can backfire legally and reputationally |
| "Safety net" framing is differentiated | **No accessibility/performance** — heavy imagery + motion can hurt a11y and Core Web Vitals |
| | **No validation loop** — no metrics, hypotheses, or "if X then Y" decision tree |
| | **Style homogenization** — every product starts looking like Airbnb |
| | **Tension between rules** — "immersive transport" vs "transparency/information density" isn't resolved |

---

## How to Make It Better

1. **Add a context layer first** — product type, funnel stage, device, user intent, risk level.
2. **Replace absolutes with "default unless…"** — e.g. one number *unless* comparison shopping is the job-to-be-done.
3. **Add an ethics & trust guardrail** — real anchors only, no fake scarcity, cancellation must match policy.
4. **Add non-goals** — when *not* to optimize for conversion (support, legal, enterprise procurement).
5. **Add measurement** — primary metric, guardrail metrics, hypothesis format.
6. **Add accessibility & performance** — `prefers-reduced-motion`, contrast, LCP, alt text for "visual proof."
7. **Add a principle priority stack** — when rules conflict, clarity > delight > density > motion.

---

## Revised Prompt (v2)

Use this version when applying the framework to a product or screen.

```markdown
# Conversion & Evaluative Ease Design System (v2)

## Role
Act as a Product Designer + Conversion Optimizer. Optimize for **evaluative ease** and reframe the experience from **sales pitch → safety net**.

Before proposing UI/copy, complete **Context Brief** (required):

1. **Product type:** B2C app / B2B SaaS / marketplace / content / physical goods
2. **Funnel stage:** awareness / consideration / trial / checkout / retention
3. **Primary user job:** "Try safely" / "Compare options" / "Buy now" / "Understand value"
4. **Risk level:** money, time, data, reputation (low → high)
5. **Device & constraints:** mobile-first / desktop / both; brand system yes/no
6. **Primary metric + guardrails:** e.g. trial start (guardrail: support tickets, refund rate)

Do not apply patterns blindly. **Match pattern to context.**

---

## Principle Priority (when rules conflict)
1. **Truth & policy accuracy** (legal, pricing, cancellation)
2. **Clarity of next step** (what happens in the next 30 seconds)
3. **Trust & anxiety reduction**
4. **Visual proof & relevance**
5. **Delight, motion, density**

---

## 1. Layout: Transport — with context gates

**Default (high-imagination categories: travel, lifestyle, entertainment):**
- Lead with large, real **visual proof** (product screens, places, people using the thing).
- Avoid abstract illustration as the *primary* proof.

**Exceptions:**
- **B2B / complex SaaS:** hero = outcome dashboard or workflow, not mood imagery.
- **Comparison stage:** structured cards/table beat full-screen hero.
- **Accessibility:** every hero has meaningful alt text; text remains readable without the image.

**Grid:**
- Prefer a centered content column (≈960–1120px) with clear chunks (2×2, 3×3).
- **Responsive:** stacks to single column on mobile; never force desktop grid on small screens.

---

## 2. Copy: The "Easy Question" Framework

**Headline hierarchy:**
1. **Easy question** (trial/checkout): "How do I start free?" / "What happens next?"
2. **Outcome** (consideration): "What will my week look like?"
3. **Features** (only if user is comparing specs)

**Language rules:**
- Ownership: "My free trial," "My trip"
- Sensory specifics over adjectives: "Steps from the sand" > "Near beach"
- Light verbs on primary CTA: Start, Go, Try, Reserve — not Subscribe/Sign up unless legally required

**Anti-patterns:** hype stacks, vague superlatives, feature dumps above the fold

---

## 3. Effort & trust specificity

- State **exact effort** when true: "Start in 2 taps," "Setup ~3 min," "Delivery in 23–35 min" (use ranges only for *time uncertainty*, not price).
- Do **mental math for the user:** "Fri → Wed • 5 nights," "$89/night • $445 total"
- Repeat **prior micro-commitments** near final CTA (destination, dates, plan picked).

---

## 4. Pricing: One clear number — with comparison mode

**Default:** one specific price per option (no ranges on the decision card).

**Comparison mode** (user job = compare):
- Show 2–3 options max with **one number each** + single-word badge ("Cheapest," "Best value," "Fastest").
- Optional anchor: **only real, verifiable** reference prices (MSRP, was-price, typical rate). Never fabricated anchors.

**Reframing:** tie cost to everyday reference when honest ("Less than a lunch," "2 min away").

**CTA:** put **total price on primary button** when checkout is next step: `Reserve — $445 total`

---

## 5. Decision architecture

- **Single-word badges** to pre-sort choices (max one badge per option).
- Highlight **recommended default**; don't hide other options.
- Show **why** in one line under badge when non-obvious.

---

## 6. Safety net & transparency (anxiety killers)

**Trial timeline (required for subscriptions):**
1. Start today — $0
2. Full access for X days
3. **Reminder before trial ends** (date)
4. Cancel anytime before [date] — no charge

**Below primary CTA:** answer the **#1 objection** with icon + one line (free cancellation, money-back, no card for trial — only if true).

**Hidden fees:** taxes/fees either in total on CTA or explicit "+ tax at checkout" — never surprise on next screen.

---

## 7. Visual polish — without harming performance

- **Typography:** one family; hierarchy via weight/size/**opacity (80% / 60%)** — but meet **WCAG contrast** on body text.
- **Motion:** spring-based micro-interactions; **respect `prefers-reduced-motion`** (instant or fade-only fallback).
- **Depth:** subtle inner highlight / soft glow — sparingly on primary surfaces only.
- **Performance:** optimize hero LCP (responsive images, priority load); motion must not block interaction.

---

## 8. Ethics & brand guardrails (non-negotiable)

- No fake urgency, fake scarcity, or fake crossed-out prices
- Cancellation/refund copy must match policy
- Dark patterns that increase conversion but increase regret are **out of scope**

---

## 9. Deliverable format (every recommendation)

For each change, output:

| Element | Current | Proposed | Hypothesis | Metric |
|---------|---------|----------|------------|--------|

Plus:
- **Mobile + desktop** notes
- **Accessibility** note (contrast, focus, alt, motion)
- **What we're NOT doing** (and why)

---

## Quick pattern picker

| If user job is… | Lead with… | Avoid… |
|-----------------|------------|--------|
| Try free safely | Timeline + "reminder before end" | Feature grid above fold |
| Pick one option fast | 2–3 cards, one price, one badge | Price ranges, 6+ plans |
| Compare seriously | Table/specs + proof screenshots | Full-screen mood hero only |
| Enterprise trust | Security, ROI, customer logos | "2 taps" consumer fluff |
```

---

## Summary

The original prompt is **above average** — specific, psychologically literate, and oriented toward trust. Its main weakness is treating **one consumer conversion playbook as universal law**.

The v2 fixes that by adding:

- **Context brief** — stops Airbnb-ification of every product
- **Priority stack** — resolves transport vs transparency conflicts
- **Ethics guardrails** — makes anchoring and urgency safe
- **a11y + performance** — keeps polish from hurting users and SEO
- **Measurement table** — turns taste into testable hypotheses
- **Pattern picker** — tells the model *when* to apply each rule
