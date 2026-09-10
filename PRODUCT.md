# PRODUCT.md — Torob Design System

## What this is
**Rahnamā** (راهنما, "the guide") — the Torob Design System. A public-facing documentation
website plus a set of installable packages that together are the single source of truth for
how Torob and Torob Nearby ("خرید از اطراف") products look, behave, and are built.

Reference peers: Material Design 3, Apple HIG, IBM Carbon, Atlassian Design System,
Shopify Polaris. This is that class of artifact, for Torob.

## Who it serves
1. **Frontend developers at Torob** — primary. Mixed stack. They need copy-ready code,
   installable tokens, and unambiguous component APIs.
2. **Designers at Torob** — need the canonical component inventory, naming, and the
   old→new migration map so Sketch and code stop drifting.
3. **AI coding agents** (Claude Code, Cursor, Copilot) — first-class consumers. The system
   must be machine-readable so a developer can say "build the store card" and get the
   real thing, with real tokens.

## Product truth (derived from the Sketch source, not invented)
- **Torob** is an Iranian price-comparison marketplace. **Torob Nearby** adds
  location-based discovery: nearby stores, nearby products, store profiles, maps.
- Core surfaces evidenced in the design source: map + POI view, nearby store list,
  nearby product grid, product detail (PDP) with seller list and variant picker,
  store profile with hours/address/contact, search with recent searches, filter sheets.
- Commerce concepts that are load-bearing: price (تومان, Persian numerals), "from X price"
  (از ... تومان), seller count (در ۷۹ فروشگاه), Torob Guarantee (ضمانت ترب),
  official dealer (نمایندگی رسمی), ads (آگهی), out of stock (ناموجود),
  open now (باز الان), installments (پرداخت قسطی), Kalabarg (کالابرگ), distance (۱ کیلومتر).
- **Language is Persian. Direction is RTL.** Every text style in the source is
  `align: right`. Numerals are Persian-Indic (۰۱۲۳۴۵۶۷۸۹). Latin product names appear
  inline inside Persian strings, so bidirectional text is the norm, not an edge case.

## Constraints
- **RTL-first, LTR supported.** Not retrofitted. Logical properties only.
- **Mobile-first.** All 29 example screens are 375×812 / 375×667. Desktop and tablet
  behaviour must be *designed*, because it does not exist yet.
- **Mixed consumer stack.** The canonical layer is framework-free CSS custom properties +
  CSS classes. React is a wrapper over that, never a fork of it.
- **Zero build step for the docs site.** It must open and run without a toolchain so that
  designers, PMs and engineers can all use it. Node scripts generate it; the output is
  plain HTML/CSS/JS.
- **Node 18.17 on the authoring machine.** No dependency on newer runtimes.
- **Mid-range Android is the performance target.** Glass effects carry a hard budget.

## Non-goals
- Not a marketing site for Torob.
- Not a replacement for product-specific application code.
- Does not redesign Torob's brand identity. Brand red `#D73948` is fixed.

## Success looks like
A developer opens one URL, finds the component, copies working RTL-correct code, and
ships. An AI agent queries the MCP server and produces code indistinguishable from what
that developer would have written.
