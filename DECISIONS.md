# DECISIONS (ADR-lite)

Locked choices and why. Don't silently reverse one; propose a task instead.
Append new decisions at the bottom with date + author. Mark undecided ones **proposed**.

### D1 · PRs only, never push to `main` · 2026-10-29 · claude
`main` auto-deploys to the live site, which has real users and orders, and has no
branch protection or CI. **Why:** one bad push breaks production for customers.

### D2 · Lanes split by layer · 2026-10-29 · claude
Codex owns backend/data (`app/api/**`, `lib/**`, `middleware.ts`, `supabase/**`,
`scripts/**`); Claude owns UI/docs (pages, layouts, `components/**`, `docs/**`).
`lib/types.ts` + route JSON shapes are the contract between them. **Why:** the Supabase
move is almost all backend, so one agent can carry it while the other keeps the UI
moving without file clashes. The user can swap lanes; record it here if they do.

### D3 · Local preview mode is dev-only · 2026-10-29 · claude
`isLocalPreview()` is false whenever `NODE_ENV === 'production'`, whatever the env
flags say. **Why:** the dev login lets anyone act as admin; it must never reach Vercel.

### D4 · Shared admin inbox email is fixed · pre-existing
`NEXT_PUBLIC_ADMIN_EMAIL` (`admin@xts.com`) keys existing chat docs. **Why:** changing
it orphans every staff chat unless the data is migrated too.

### D5 · Commit format · 2026-10-29 · claude
`[<agent>] <conventional type>: <what>`, e.g. `[codex] fix: ...`. **Why:** keeps the
repo's conventional style while showing which agent made each commit.

### D6 · Firebase → Supabase, keep NextAuth · proposed · 2026-10-29 · claude
Move data and storage to Supabase; keep NextAuth with a Supabase adapter rather than
switching to Supabase Auth. **Why:** keeps Google login, sessions and role logic as
they are, so the move touches data only. **Not locked** until the user approves the design doc.

### D7 · XTS Mechatronics UI scope · 2026-10-29 · codex
The user authorized Codex to edit the UI lane for the branding and storefront task
on `codex/xts-mechatronics-ui`. Use the first supplied white geometric mark with
the display name XTS Mechatronics, charcoal surfaces and warm brass accents.
This is a task-scoped lane exception. Generated product imagery is illustrative,
labeled and restricted to sample data; seller-uploaded photos retain priority.
