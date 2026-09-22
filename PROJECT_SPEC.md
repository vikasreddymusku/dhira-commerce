# Dhira Commerce — Master Project Specification

## Purpose
Build a production-grade premium D2C ecommerce platform for Dhira Industries. This file is the persistent source of truth for architecture, scope, design direction, business rules, and phased delivery. Phase-specific prompts may narrow scope but must not contradict this file.

## Brand
- Brand: Dhira Industries
- Tagline: Rich, Pure, Single-Origin
- Visual direction: premium, editorial, warm, natural, sophisticated, minimal
- Core palette: deep cocoa brown + warm cream
- Accents: restrained antique gold + restrained natural green
- Use the supplied Dhira logo unchanged
- Avoid generic Shopify/SaaS styling, repetitive cards, icon grids, excessive gradients, excessive rounded rectangles, cheap promotional styling, or unverified brand claims

## Verified public contact information
- Email: dhiraindustries1@gmail.com
- Phone / WhatsApp: +91 9032585205
- Instagram: @dhira_industries
- Public address: not yet supplied; keep editable and blank until confirmed

## Legal / business configuration
Customer-facing brand is Dhira Industries. Legal invoice/GST identity must remain separately configurable in admin/settings and must not be hardcoded into storefront components.

## Initial catalog
- Dark Couverture 55%
- Dark Couverture 70%
- Dark Couverture 90%
- Cocoa Mass
- Cocoa Butter
- Natural Cocoa Powder
- Cocoa Nibs
- Cocoa Beans

Development prices, inventory, descriptions, recipes, homepage copy, and media are demo data only until confirmed in Admin. Never present demo content as verified business fact.

## Storefront pages
Home, Shop, Collections, Search, Product Detail, Cart, Checkout, Login, Account, Wishlist, Order Tracking, Recipes, Journal/Blog, About/Our Story, Contact, Wholesale/B2B, Experiences, FAQ, Policies.

Only expose navigation links when the destination route is genuinely implemented. Homepage section-anchor links are allowed before standalone routes exist.

## Customer capabilities
Premium search/filtering, wishlist, product reviews, coupons, order tracking, reorder, invoice download, cancellation/refund requests, pincode availability, recommendations.

Browsing does not require login. Checkout must support Google sign-in or Guest Checkout.

## Payments and shipping
- Payment provider: Cashfree
- Shipping provider: Shiprocket
- India only initially
- Free shipping when eligible subtotal >= ₹1499
- Otherwise shipping = ₹49
- Shipping thresholds/fees must be editable in Admin
- Server-side payment creation/verification, verified webhooks, idempotency, and transactional order updates are mandatory

## B2B
Initial flow: validated enquiry form -> save enquiry to database -> open WhatsApp with prefilled message.
WhatsApp destination: +91 9032585205.
Never open WhatsApp before successfully retaining the lead.

## Admin
Custom commerce admin should feel comparable to a modern Shopify-style operational dashboard without copying Shopify exactly.

Primary areas:
Dashboard, Orders, Products, Collections, Inventory, Customers, Discounts, Content, Reviews, B2B Enquiries, Experiences, Marketing, Analytics, Reports, Integrations, Settings.

Architecture should support future roles even though one owner/admin is sufficient initially.

## Data ownership
Critical rule:
Admin -> application/service layer -> PostgreSQL -> storefront.

No important catalog, pricing, inventory, order, legal, shipping, or editable content data should be hardcoded in presentation components.

### Prisma / commerce source of truth
Prisma + PostgreSQL own transactional commerce data including products, variants, inventory, carts, customers, addresses, orders, payments, refunds, shipments, discounts, reviews, B2B enquiries, audit logs and related operational records.

### CMS
Payload CMS is planned for editable content/media using the completed TinitiateAI project only as an architectural reference. Do not copy TinitiateAI business data or visual design. Do not let Payload and Prisma both own the same database tables. Payload integration must be performed as a dedicated controlled phase because the current Dhira app is Next.js 14 / React 18 while the reference project uses newer Next/React/Payload versions.

## Current technical baseline
- Next.js 14 App Router
- React 18
- TypeScript strict
- Tailwind CSS
- PostgreSQL
- Prisma 6
- Redis via Docker Compose
- Zod / @t3-oss/env-nextjs
- Vitest / React Testing Library
- Modular monolith

Use clean interfaces for payments, shipping, storage, email and analytics. Avoid premature microservices.

## Security
Server-side validation/auth, secure cookies, rate limiting where relevant, verified/idempotent webhooks, DB transactions for money/inventory, upload validation, audit logs, secrets in environment variables, no raw card data, no secrets in browser or Git.

## Media
Premium photography is a first-class requirement. Storefront media components must accept real media URLs and use optimized Next.js images. Elegant fallback treatment is allowed for development, but gradient placeholders are never considered final visual output. Media should later be replaceable through CMS without rewriting presentation components.

## Homepage design standard
The homepage must feel like a premium international single-origin chocolate/cocoa brand: editorial composition, strong typography, sophisticated whitespace, image-led storytelling, tactile product presentation, subtle motion, excellent desktop/mobile hierarchy and conversion flow.

Recommended visual journey:
1. Announcement bar
2. Premium navigation
3. Cinematic image-led hero
4. Category/product discovery
5. Signature/featured products
6. Brand/single-origin story
7. Cocoa/craft education
8. Best sellers
9. Recipes/editorial content
10. Professional/B2B
11. Experiences
12. Testimonials/partners where appropriate
13. Social/Instagram storytelling
14. Newsletter
15. Premium footer

Do not force every section into a card grid. Use varied full-width, split, editorial and product-focused layouts.

## Homepage correctness rules
- Do not invent manufacturing, estate, origin, fermentation, facility or historical claims.
- Do not hardcode editable business copy in UI components.
- Best sellers must be explicitly configured or derived from actual order data; never infer them from `isFeatured=false`.
- Newsletter must never display false success when nothing was saved.
- Known B2B contact details must use verified contact settings, not invented addresses.
- Social/media sections must be media-ready, not permanently represented by decorative gradient tiles.

## Analytics roadmap
- PostgreSQL: operational/financial source of truth
- PostHog: product/behavior analytics
- GA4: web/marketing analytics
- Google Ads attribution
- Meta Pixel advertising events
- Funnel: Visit -> Product View -> Add Cart -> Checkout -> Payment -> Purchase

Admin analytics should later combine revenue/orders/AOV/conversion, product performance, inventory, retention, campaigns, abandoned carts/funnel drop-offs, location/device and related operational metrics.

## Inventory / order integrity
Track on-hand, reserved and available quantities. Reservations and order conversion must be transactional and prevent overselling. Payment, fulfillment, shipping and refund statuses must remain separate concerns.

## SEO / performance
Use server rendering / caching appropriately, optimized images, metadata, structured data where applicable, minimal client JS, accessible interactions and strong Core Web Vitals.

## Delivery phases
### Phase 1 — Foundation — COMPLETE
Architecture, design tokens, Prisma/Postgres schema, Docker Postgres/Redis, seed data, admin auth/shell, storefront shell, navigation status system, tests/build foundation.

### Phase 2 — Homepage / storefront visual foundation — IN PROGRESS
Database-backed homepage structure exists. Final acceptance requires correcting content/data semantics, real-media support and approved premium visual execution across desktop/tablet/mobile.

### Phase 2.5 — CMS integration — PENDING
Controlled Payload integration using TinitiateAI only as architecture reference. Resolve framework/version strategy deliberately; preserve Prisma commerce ownership.

### Phase 3 — Catalog / PDP / Search / Cart — PENDING
Shop, collections, search/filtering, product detail, reusable product media/cards, cart.

### Phase 4 — Admin catalog / CMS / inventory — PENDING
Commerce CRUD, inventory management, collections, media/content workflows.

### Phase 5 — Checkout / Cashfree / Orders — PENDING
Guest/Google checkout, addresses, shipping calculation, Cashfree, order creation, webhooks, idempotency.

### Phase 6 — Shiprocket / Tracking / Invoices — PENDING
Shipping integration, tracking, GST-capable invoices, concurrency-safe invoice numbering.

### Phase 7 — Customer accounts / Wishlist / Reviews — PENDING
Account area, order history, reorder, wishlist, reviews, cancellation/refund requests.

### Phase 8 — Recipes / Blog / B2B / Experiences — PENDING
Full content routes and B2B WhatsApp lead flow.

### Phase 9 — Analytics / Marketing — PENDING
PostHog, GA4, Ads/Meta events and admin reporting.

### Phase 10 — Production hardening — PENDING
Security review, rate limiting, performance, accessibility, E2E tests, monitoring, deployment and launch readiness.

## Change discipline
- Preserve verified working phases.
- Before substantial work, create a Git checkpoint.
- Do not use destructive DB/Git operations without explicit reason and backup.
- Do not refactor unrelated modules during a scoped phase.
- Do not introduce new dependencies without clear value.
- Run lint, typecheck, relevant tests and production build before phase acceptance.
- Visual phases require screenshot review before acceptance.
