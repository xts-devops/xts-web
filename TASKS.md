# TASKS — board

Statuses: `todo` · `in-progress` · `review` (PR open) · `blocked` · `done`
Rule: set `owner` + `status: in-progress` **before** editing. Keep tasks small and file-scoped.
Lanes: **claude** = UI + docs · **codex** = backend + data · **shared** = coordinate first (see AGENTS.md).

## In flight
- [ ] **Product image containment, PR #5** — owner: codex · status: review · files: components/ui/ProductImage.tsx, components/ui/ProductGallery.tsx, app/globals.css, docs/xts-mechatronics-ui.md, PROGRESS.md, TASKS.md · base: 4a16fe8 · next: review contained images in padded thumbnail/lightbox frames; original cards/grid retained, checks pass; browser visual QA pending.
- [ ] **Restore original recommendation cards, 4×4 capacity, PR #5** — owner: codex · status: review · files: components/ui/RelatedProducts.tsx, app/globals.css, docs/xts-mechatronics-ui.md, HANDOVER.md, TASKS.md, PROGRESS.md · base: cb1485e · next: original shared cards restored, up to 16 suggestions, four desktop/two mobile columns; seven other demo listings currently available. Checks pass; visual browser QA pending.
- [ ] **Correct recommendation columns, PR #5** — owner: codex · status: review · files: components/ui/RelatedProducts.tsx, app/globals.css, docs/xts-mechatronics-ui.md, HANDOVER.md, TASKS.md, PROGRESS.md · base: c903965 · next: review four-column desktop/two-column mobile grid; obsolete row styles removed, checks pass, browser visual QA pending.
- [ ] **Four recommendation rows, PR #5** — owner: codex · status: review · files: components/ui/RelatedProducts.tsx, app/globals.css, docs/xts-mechatronics-ui.md, HANDOVER.md, TASKS.md, PROGRESS.md · base: 4c48d3d · next: superseded by user clarification: see Correct recommendation columns; four products across desktop, two mobile columns.
- [ ] **Mobile product detail and third sample views, PR #5** — owner: codex · status: review · files: app/shop/[id]/page.tsx, app/globals.css, components/ui/ProductGallery.tsx, components/ui/RelatedProducts.tsx, lib/sample-assets.ts, lib/firebase/local-seed.ts, public/images/products/*-angle.webp, UI docs/coordination notes · base: d28356a · next: review compact phone gallery/expandable copy/specs and one-row recommendations; all eight demos have three illustrative views. Type/lint/SSR/HTTP pass; browser viewport/touch QA pending due CUA failure.
- [ ] **Brief product card descriptions, PR #5** — owner: codex · status: review · files: components/ui/ProductCard.tsx, components/ui/Skeleton.tsx, components/ui/RelatedProducts.tsx, app/globals.css, docs/xts-mechatronics-ui.md, PROGRESS.md, TASKS.md · base: 7eb8f5f · next: review two-line description previews on port 3001; shared cards/loading updated, data preserved, type/lint/SSR/HTTP checks pass; browser visual QA pending.
- [ ] **Product detail gallery, sizing and related products, PR #5** — owner: codex · status: review · files: app/shop/[id]/page.tsx, app/globals.css, components/ui/ProductGallery.tsx, RelatedProducts.tsx, lib/sample-assets.ts, lib/product-recommendations.ts, lib/firebase/local-seed.ts, public/images/products/*-top.webp, UI docs/coordination notes · base: 7da8f11 · next: review port-3001 product preview; typecheck/lint, SSR/helper assertions and HTTP/assets pass. Browser viewport/keyboard/touch/cart/chat QA pending due CUA initialization failure. Seller galleries and purchase/chat contracts preserved.
- [ ] **Landing-page commerce refinement, PR #5** — owner: codex · status: review · files: app/page.tsx, app/globals.css, components/ui/CatalogSearch.tsx, ProductCard.tsx, ProductImage.tsx, Skeleton.tsx, components/layout/Navbar.tsx, Footer.tsx, docs/xts-mechatronics-ui.md, coordination notes · base: 48a6ad5 · next: review shared port-3001 preview and perform pending viewport/keyboard/touch checks once CUA initializes. TypeScript/lint, SSR/contrast and HTTP checks pass; production visual signoff pending.
- [ ] **UI/UX consistency pass on top of PR #5** (`claude/ui-polish`: SectionHeading, Navbar, login, cart, product detail, dashboard, apply pages, skeletons; one-line locale fix in `lib/currency.ts`, flagged). Carry PR #5's plain style into the inner pages: plain copy, readable product names, one price format, no fake login options. ... owner: claude · status: review
- [ ] **Shared branch, checkout and preview workflow** — owner: codex · status: review · files: AGENTS.md, CLAUDE.md, DECISIONS.md, HANDOVER.md, PROGRESS.md, TASKS.md; integrated Claude UI commits · base: 7c572ec · next: both agents use `XTS SHOP WEB` / `codex/xts-mechatronics-ui` / port 3001 and review combined PR #5. User explicitly supersedes separate-task-branch workflow; histories retained, no main merge.
- [ ] **Minimal welcome hero and catalog quick search, PR #5** (`app/page.tsx`, `app/shop/page.tsx`, hero CSS and docs; user-authorized UI lane). Welcome, parts search, compact service links and reduced-motion-aware transitions; TypeScript/lint and HTTP preview checks pass. New visual/interactive QA pending because CUA initialization fails after reset/retry. ... owner: codex · status: review
- [ ] **Compact public storefront cleanup, PR #5** (layout/brand/product-image components, homepage/shop/metadata, storefront CSS, SVG and docs; user-authorized UI lane). Compact XTS identity with separate Mechatronics department label, plain copy and direct catalog/service functionality. Earlier decorative iterations superseded. TypeScript/lint and 320px/375px/1280px preview checks passed. ... owner: codex · status: review
- [ ] **Header brand presence follow-up to PR #5** (`components/layout/Brand.tsx`, `Navbar.tsx`, `app/brand.css`, layout CSS import, brand SVG and evaluation notes; user-authorized UI lane). Larger aligned lockup, desktop signature, mobile navigation space; TypeScript/lint and 320px/375px/1280px preview checked. ... owner: codex · status: review
- [ ] **Marketing finesse follow-up to PR #5** (`codex/xts-mechatronics-ui`; user-authorized UI lane: homepage, storefront CSS, category deep links, metadata and evaluation notes). Stronger visual hierarchy, engineering details, category discovery and project CTA; preserve accessibility and sample labeling. TypeScript/lint and 375px/1280px preview checks passed. ... owner: codex · status: review
- [ ] **XTS Mechatronics branding, sample product imagery, responsive storefront polish** (`codex/xts-mechatronics-ui`; user-authorized UI lane: `app/**`, `components/**`, `public/**`, plus sample asset index and local seed; no API shape changes). Includes coordination/local-preview commits as development dependencies; no production data edits. Asset index and evaluation: `docs/xts-mechatronics-ui.md`. ... owner: codex · status: review
- [ ] **Fix `.env.example` var names** (PR #2, `fix/env-example-var-names`) ... owner: claude · status: review
- [ ] **Local preview mode** (PR #3, `dev/local-preview`) ... owner: claude · status: review
- [ ] **Codex/Claude coordination files** (`claude/cowork-setup`) ... owner: claude · status: review

## Backlog — Supabase move (start after the design is approved)
- [ ] **Write the Supabase migration design doc** (`docs/superpowers/specs/`) ... owner: claude · status: blocked (waiting on user: can the site go down ~1 hour during the switch?)
- [ ] **Supabase schema + RLS for the 11 collections** (`supabase/**`) ... owner: codex · status: todo
- [ ] **Swap `lib/<resource>.ts` from Firestore to Supabase** ... owner: codex · status: todo
- [ ] **Port the 3 checkout transactions in `lib/orders.ts`** ... owner: codex · status: todo
- [ ] **Data migration script, ids kept, practice run + row counts** (`scripts/**`) ... owner: codex · status: todo
- [ ] **NextAuth adapter swap** (`lib/auth.ts`, shared) ... owner: codex · status: todo
- [ ] **Storage → Supabase Storage + URL rewrite** (`app/api/upload`, data) ... owner: codex · status: todo
- [ ] **Update UI for any changed API shapes** ... owner: claude · status: todo

## Backlog — UI consistency (after `claude/ui-polish`)
- [ ] **Plain style for admin, seller, chat, consultation, community, fabrication pages + their components (Badge, Tabs, modals)** (`claude/ui-polish`, PR #6) ... owner: claude · status: review
- [ ] **Confirm product-page promises (1-year warranty, fast shipping, 30-day returns) and consultation "Guarantees"** ... owner: user · status: todo
- [x] **Community "Hackathon #4" box: update or remove (old March event, dead button)** ... owner: user · status: done (2026-10-29: user said keep it as is for now; don't change it unless asked)
- [ ] **Seller page product cards: use sample photos via `productImage`** ... owner: claude · status: todo

## Backlog — bugs and hardening
- [ ] **Unread markers break on dotted emails** (`lib/chat.ts`, `lib/consultations.ts`) ... owner: codex · status: todo
- [ ] **Terms route keys users by email** (`app/api/users/terms`) ... owner: codex · status: todo
- [ ] **Rename `middleware.ts` → `proxy.ts`** ... owner: codex · status: todo
- [ ] **PayMongo webhook idempotency check** (`app/api/payments/`) ... owner: codex · status: todo
- [ ] **Input validation with zod on API routes** (adds dependency → shared) ... owner: codex · status: todo
- [ ] **Rate limiting on write routes** ... owner: codex · status: todo
- [ ] **Stop the DB read on every JWT refresh; exact role matching** (`lib/auth.ts`, `lib/roles.ts`, shared) ... owner: codex · status: todo
- [ ] **npm audit: 36 vulnerabilities** (`package.json`, shared) ... owner: — · status: todo
- [ ] **Lint cleanup, UI files** ... owner: claude · status: todo
- [ ] **Lint cleanup, backend files** ... owner: codex · status: todo
- [ ] **CI workflow: tsc + lint on PRs** (`.github/**`, shared) ... owner: — · status: todo
- [ ] **Protect `main` on GitHub** ... owner: user · status: todo

## Backlog — deployment (needs the user)
- [ ] **New Vercel project, env vars, OAuth redirects, webhook URL, DNS, disconnect old project** ... owner: user · status: todo

## Done (recent)
- [x] Clone repo, accept write access, delete fork, close PR #1 (claude)
