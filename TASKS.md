# TASKS — board

Statuses: `todo` · `in-progress` · `review` (PR open) · `blocked` · `done`
Rule: set `owner` + `status: in-progress` **before** editing. Keep tasks small and file-scoped.
Lanes: **claude** = UI + docs · **codex** = backend + data · **shared** = coordinate first (see AGENTS.md).

## In flight
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
