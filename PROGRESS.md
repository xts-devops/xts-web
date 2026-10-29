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
