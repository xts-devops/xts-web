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

### D8 · Compact department branding and public UI · 2026-10-29 · codex
The user's latest direction supersedes the expanded lockup and decorative marketing
treatment: use a compact XTS mark with Mechatronics as a separate department label,
plain copy, and direct catalog/service navigation. Omit the department label from the
smallest header row; retain it in the mobile menu, homepage heading context and footer.
Remove signature slogans, decorative diagrams, ambient graphics and redundant sections.

### D9 · Useful welcome with bounded motion · 2026-10-30 · codex
The user requested a refreshed, minimal hero with smooth intro transitions. Keep the
compact branding from D8; add catalog search and concise service entry points rather
than restoring decorative panels. Intro motion is CSS-only, under half a second,
visible and usable immediately, and disabled for reduced-motion preferences. No splash
screen, autoplay, typewriter effect, new image assets or new dependencies.

### D9 · Keep the dotted page background · 2026-10-29 · claude
The user found the site too plain after D8 and asked for the polka-dot background
back, and only that. `body::before` in `app/globals.css` draws it (10px grid,
`--dot-grid-color`, light and dark). This narrows D8: the dot grid stays; the other
removed decorations (glows, orbits, tilt, slogans) stay removed.

### D10 · One shared working copy and branch · 2026-10-30 · codex
The user explicitly requested both agents work on the same branch and always use a
shared sync/handoff format. Canonical checkout: `D:\DEV WORKS\XTS PROJECT DEVS\XTS SHOP WEB`;
branch: `codex/xts-mechatronics-ui`; development preview: localhost:3001; review: PR #5.
This supersedes the old per-agent task-branch workflow. Integrate completed Claude
commits without dropping Codex work; keep older worktrees as snapshots, not active forks.
Before editing, fetch/pull fast-forward when clean, claim exact files in TASKS, and
preserve peer changes. Serialize Git mutations, push the shared branch after checks,
and log SHA/files/checks/preview/next in PROGRESS. Never force-push or push to main.
The two inherited D9 entries are distinct (author/date/title disambiguate them);
preserve both the bounded hero motion and the user-requested dotted background.

### D11 · Refine commerce completeness without redesign · 2026-10-30 · codex
The user requested the existing foundation be retained: compact brand, dark industrial
surfaces, dotted background, yellow accents and typography. Homepage order is hero/search,
featured products, categories, engineering services, factual support/trust links, footer.
Keep four desktop product columns, bounded microinteractions and reduced-motion handling.
Predictive suggestions reuse the existing catalog response; no search endpoint, added
dependency, external assets or backend contract change. Trust content describes actual
product information, dashboard updates and messaging, without invented guarantees.

### D12 · Bounded product gallery and catalog recommendations · 2026-10-30 · codex
Product details use a compact 4:3 image stage, scrollable thumbnail strip and native
modal image viewer; preserve every unique seller-uploaded image. Recommendations reuse
the catalog API, exclude the current item, prioritize stock/category/price proximity,
and make no claim of electrical compatibility or personalization. Alternate sample
views are illustrative, indexed by exact demo id/SKU and only synthesized in local
preview outside production. No DTO, API, dependency or purchase/chat contract changes.
