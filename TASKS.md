# TASKS — board

Statuses: `todo` · `in-progress` · `review` (PR open) · `blocked` · `done`
Rule: set `owner` + `status: in-progress` **before** editing. Keep tasks small and file-scoped.
Lanes: **claude** = UI + docs · **codex** = backend + data · **shared** = coordinate first (see AGENTS.md).

## In flight
- [ ] **UI/UX consistency pass on top of PR #5** (`claude/ui-polish`: SectionHeading, Navbar, login, cart, product detail, dashboard, apply pages, skeletons; one-line locale fix in `lib/currency.ts`, flagged). Carry PR #5's plain style into the inner pages: plain copy, readable product names, one price format, no fake login options. ... owner: claude · status: review
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
- [ ] **Plain style for staff pages** (admin, seller) ... owner: claude · status: todo
- [ ] **Plain style for chat, consultation, community, fabrication pages + their components** ... owner: claude · status: todo
- [ ] **Badge component: stop forcing uppercase** (`components/ui/Badge.tsx`) ... owner: claude · status: todo
- [ ] **Confirm product-page promises (1-year warranty, fast shipping, 30-day returns)** ... owner: user · status: todo

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
