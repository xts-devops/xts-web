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

## 2026-10-30 · codex · codex/xts-mechatronics-ui · shared working format
**Did:** Integrated Claude's completed `claude/ui-polish` commits through `803831e`
with Codex's hero/search work. Resolved only coordination-file conflicts by retaining
both agents' entries, including Claude's UI backlog and both distinct D9 decisions.
Updated AGENTS/CLAUDE with one canonical folder/branch, port 3001, exact-file claims,
fast-forward sync checks, serial Git operations and SHA/files/checks/preview/next handoff.
Canonical folder: `D:\DEV WORKS\XTS PROJECT DEVS\XTS SHOP WEB`; branch:
`codex/xts-mechatronics-ui`. The prior Claude worktree is retained as a snapshot with
instructions to move active work into the canonical folder. Removed no code or history.
**Why:** User explicitly requested the same branch and a consistent sync work format,
superseding the old separate-agent/task-branch ritual (D10).
**Verify:** `npx tsc --noEmit` passed on combined code. ESLint on 24 imported TS/TSX
files: 52 existing errors/50 warnings; compared each file to its Claude branch baseline:
52 baseline errors, zero new errors. Port 3001 process is verified to run from the
canonical checkout; home, search URL and login return 200; home has the new welcome
and quick search. Remote refs fetched; no unseen branch commits before integration.
No production-data or main-branch changes. CUA visual-check limitation from the prior
hero entry still applies. Ignored/local files and `.claude/launch.json` left untouched.
**Next:** Both agents use the shared folder/branch and file claims. Review the combined
PR #5; user merges to main. New code handoffs must name the resulting commit SHA.

## 2026-10-30 · codex · codex/xts-mechatronics-ui · minimal welcome hero
**Did:** Refreshed the hero with a concise welcome, parts search, category shortcuts
and compact fabrication/expert/community entry points. Moved the service links into
the intro instead of repeating them below. Added CSS-only 380–460ms intro transitions
and restrained hover/focus changes; reduced-motion users get no intro animation.
Catalog search now initializes from `q` and keeps search/category URL parameters
consistent when edited, cleared or reset. Compact header and product grid retained.
**Why:** User requested a welcoming marketing intro with useful UI and smooth,
minimal transitions; recorded the bounded motion direction as D9.
**Verify:** `npx tsc --noEmit` passed. ESLint for the two changed TSX pages passed with
zero warnings/errors. Dev preview was started with both LOCAL_PREVIEW flags true;
home, `/shop?q=ESP32` and the combined search/category URL return HTTP 200. The
homepage response includes the welcome, labeled search and guidance links.
Visual/interactive browser QA remains pending: CUA failed to initialize with a missing
kernel-assets path, including after reset/retry. No screenshot or new viewport/motion
verification is claimed. Preview open was queued in Codex. No production data, real
orders/payments, auth changes or new dependencies. Existing untracked `.claude/launch.json`
left untouched.
**Next:** Review the welcome/search and reduced-motion behavior in PR #5 after the
browser preview tool is restored; user merges after review.

## 2026-10-29 · claude · claude/ui-polish · remaining pages + dotted background
**Did:**
- **Dotted page background is back** (`body::before` in `app/globals.css`, as it was
  before PR #5's last cleanup). The user found the site too plain and asked for
  only this. Recorded as D9, which narrows D8.
- Same wording/sentence-case pass on admin, seller, chat, consultation, community,
  fabrication pages and `components/fabrication/*`, ConfirmModal, DateTimePicker.
  Kept colors, cards and bold weights (user: "too plain"). Admin: "Command Terminal /
  L-5 Clearance / Transaction Registry / Clearance Registry / Comm Link /
  Synchronizing Neural Link…" → "Admin / Orders / User roles / Email / Loading…", etc.
- `Badge` no longer forces caps; it turns plain status words into sentence case
  ("PENDING"/"in-progress" → "Pending"/"In progress"), leaving names and ids alone.
  `Button` size `lg` no longer uppercases.
- Admin order totals use `formatMoney`.
- **Codex-lane flag:** `lib/firebase/local-seed.ts` sample posts stored an image data
  URI as `avatar`, which rendered as raw text; the real API stores one letter. Seed
  now uses the first letter. Existing local `db.json` files in both checkouts were
  patched (3 posts each), so no reset is needed.
**Why:** finish the consistency pass the user approved; dots per the user's request.
**Verify:** `npx tsc --noEmit` passes; ESLint counts unchanged on every edited file.
Local preview 1280px: admin, seller, chat, consultation, community, fabrication, home
(dots visible). Fresh tab shows no console errors. Note: Turbopack served stale CSS
after the edit until `.next` was deleted. If a CSS change doesn't show, clear `.next`.
**Next:** User reviews PR #6. Owner should decide on the community "Hackathon #4" box
(March event, its "Register Now" button does nothing) and the consultation
"Guarantees" (NDA coverage, 24-hour response). Both were left as-is. Seller page
product cards still show SVG placeholders instead of the sample photos (seller page
doesn't use `productImage`). That's a small follow-up.

## 2026-10-29 · claude · claude/ui-polish (built on codex/xts-mechatronics-ui)
**Did:** UI/UX review of PR #5, then carried its plain style into the inner pages.
- `SectionHeading` (used by ~14 pages): sentence case, plain weight, small label
  instead of the all-caps title + handwriting note.
- Navbar: "Terminal/Portal" → "Admin/Expert", dropped the "Authenticated" label,
  placeholder while the session loads (no "Sign in" flash), readable mobile menu, aria-labels.
- Login: only real options (Google + dev sample users); removed the disabled email
  form, the sign-up toggle that did nothing, and the made-up security quote.
  Signed-in users are sent to `/dashboard`.
- Cart, product page, dashboard, apply pages: plain wording (no "acquisition queue",
  "procurement", "transmitted", "Status: Operational"), readable product names, one
  price format `₱1,234.00` via `formatMoney`, aria-labels on quantity/remove buttons,
  confirm before clearing the cart, no empty tag badge, "XTS-PAY" claim replaced by
  the PayMongo fact.
- Product card skeleton now matches the real dark card (was a light paper card).
- **Shared-lane flag:** `lib/currency.ts` `formatMoney` locale `undefined` → `'en-PH'`
  so server and browser format prices the same. It had no other callers.
**Why:** PR #5 made home/shop plain, but the pages after them still used the old
all-caps jargon style, so the site felt like two products. Consistency with D8.
**Verify:** `npx tsc --noEmit` passes. ESLint per changed file vs. Codex's version:
no new problems (AuthForms 2 errors → 0). Local preview at 1280px and 375px: product page,
empty + filled cart, dashboard, login signed out and signed in (redirects), sample admin login.
**Next:** Review this PR, then merge it after #5. Still old style, not touched here:
admin, seller, chat, consultation, community and fabrication pages and their
components (e.g. "SYSTEM STATE: QUEUED" on fab job cards). The product page's
"1-year warranty / Fast shipping / 30-day returns" badges show on every product; the
owner should confirm those promises are true. Badge component still uppercases text.

## 2026-10-29 · codex · codex/xts-mechatronics-ui · compact public UI
**Did:** Replaced the expanded lockup with a compact XTS mark and separate Mechatronics
department label. Smallest headers show the department in the menu/home context
instead. Kept the header at 64px with no scroll listener or resizing. Simplified the
homepage to direct introduction, category links, featured products and services;
removed slogans, serif accents, orbit/glow/grid graphics, tilt, entrance/hover motion,
redundant hero product display and promotional panels. Consolidated storefront CSS,
simplified shop/footer/metadata text and matched the standalone SVG. Wrapped price/add
controls on 320px cards; product images and category filtering remain.
**Why:** User explicitly requested compact department branding and minimal, efficient
public UI, superseding earlier decorative iterations (recorded as D8).
**Verify:** TypeScript passed. ESLint on changed TSX files passed with zero errors
and two existing profile-image warnings. Browser checks: 320px/375px/1280px iframe
layouts and 585px main preview, phone light/dark themes, 320px card controls, Motors
shortcut returns two matching products, department menu label and Escape dismissal.
No auth, API contracts, payments, orders or production-data changes. No new dependencies.
**Next:** Review the simplified final design in PR #5; user merges after review.

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
