# PROGRESS

Append-only. Newest at top. Never edit past entries. Format:

```
## YYYY-MM-DD · <agent> · <branch>
**Did:** ...
**Why:** ...
**Verify:** ...
**Next:** ...
```

---

## 2026-10-29 · codex · codex/xts-mechatronics-ui · header branding
**Did:** Enlarged the shared mark and wordmark, refined spacing, added a gold period
and baseline accent, and added a desktop brand signature. Aligned the header with
the content container, used the menu below 1280px to preserve navigation space, and
updated the standalone SVG. Added a dedicated `app/brand.css` after the general CSS;
the preview was initially retaining old general stylesheet rules, so applied sizing
was verified in the final browser rendering. Kept the footer signature separate.
**Why:** User requested a stronger, better-positioned brand specifically in the header.
**Verify:** TypeScript passed; changed-file ESLint has zero errors and two existing
profile-image warnings. Browser review: 320px, 375px and 1280px iframe layouts and
585px main preview; no brand/action overlap and narrow light/dark contrast checked.
No backend, authentication, order, payment or production-data changes.
**Next:** Review the header branding update in PR #5; user merges after review.

## 2026-10-29 · codex · codex/xts-mechatronics-ui · marketing refinement
**Did:** Refined the homepage with editorial type, warm lighting, technical grid/orbit
details, a component annotation and richer service cards. Added category discovery
links and URL-backed filters, a contrasting fabrication CTA with native SVG artwork,
subtle motion and clearer marketing metadata. Updated existing PR #5 on the same branch.
**Why:** User found the first version too plain and requested marketing finesse while
maintaining standards. Kept semantic structure, focus states, sample labels, and
reduced-motion support; added no dependencies, images or external requests.
**Verify:** `npx tsc --noEmit` passed. ESLint for the three changed TSX files passed
with zero warnings/errors. Local-preview browser checks: 585px main view plus 375px
and 1280px iframe layouts, phone light/dark contrast, desktop services/banner, Motion
discovery opens two motor products; All restores eight and clears the URL category.
No payments, orders, auth changes or production data accessed. No formal accessibility
audit or performance benchmark claimed; physical-device QA remains a review item.
**Next:** User reviews the updated PR #5 and marketing treatment before merging.

## 2026-10-29 · codex · codex/xts-mechatronics-ui
**Did:** Created the user-requested UI branch from main, including existing coordination
and local-preview commits as dependencies. Chose the first white reference mark,
implemented a scalable SVG + XTS Mechatronics lockup and matching favicons/metadata.
Reworked homepage and shop, shared product cards, search/filter/error states,
mobile navigation accessibility, theme contrast and responsive layouts. Generated
and indexed eight labeled sample product images (800px WebP, 360854 bytes total).
Updated local seed images; preserved seller uploads and existing local preview data.
Removed placeholder social tiles, fake homepage posts and non-persisting newsletter.
**Why:** User explicitly assigned Codex this UI work outside its normal lane.
The old storefront lacked sample photos and consistent branding; mobile type was
small and pale-card accent contrast was poor. No shared DTO or route JSON changed.
**Verify:** `npx tsc --noEmit` passed. Changed-file ESLint: zero errors, three existing
thumbnail/profile img warnings. `git diff --check` passed. Browser smoke check at
585px: home, eight sample images, ESP32 search (one result), Motors filter (two),
out-of-stock disabled action, ESP32 detail image, light/dark themes, mobile menu
and Escape dismissal. Added one ESP32 to local guest cart; badge and cart image
confirmed. No checkout, payment, real login or production-data operations performed.
Production build not attempted (requires real Firebase environment); desktop/physical
phone viewport review remains. Source/asset provenance and evaluation are in
`docs/xts-mechatronics-ui.md`. Existing `.claude/launch.json` left untracked.
**Next:** Review the UI PR, including its local-preview/coordination dependencies,
and verify desktop/phone layouts before the user merges. Do not push to main.

## 2026-10-29 · claude · claude/cowork-setup
**Did:** Added the Codex/Claude coordination files: `AGENTS.md` (shared rules, lanes,
verify gate), `CLAUDE.md` (imports AGENTS.md + Claude lane), `HANDOVER.md` (project
reference), `TASKS.md`, `DECISIONS.md`, this file.
**Why:** so Codex and Claude can work on the repo in parallel without file clashes,
and either can pick up cold.
**Verify:** docs only, no code changed.
**Next:** User merges PR #2 and PR #3, then this PR. Codex: start with a backend bug
task from `TASKS.md` (unread markers on dotted emails is small and self-contained).
Supabase work waits for the design doc, which waits on the user's downtime answer.
Open PRs at the time of writing: #2 (env names), #3 (local preview).
