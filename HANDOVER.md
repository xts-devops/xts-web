# HANDOVER — what xts-web is and how it's built

Reference for a cold start. Update a section when you change what it describes.

## 1. What it is
XTS shop: an electronics parts marketplace plus fabrication requests, paid expert
consultations, community posts, and buyer/seller/staff chat. Live on Vercel with real
users and orders (Firebase backend today; a move to Supabase is planned, see §8).

## 2. Stack
- Next.js 16.1.6 App Router (Turbopack), React 19, TypeScript, Tailwind CSS v4,
  Framer Motion, lucide-react.
- Auth: NextAuth v4, Google login, JWT sessions; role stored on the token
  (`lib/auth.ts`, `lib/roles.ts`). Adapter: `@auth/firebase-adapter`.
- Data: Firestore + Firebase Storage via the **Admin SDK, server-side only**
  (`lib/firebase/admin.ts`). `lib/firebase/config.ts` (client SDK) is unused.
  No live listeners; chat refreshes by polling.
- Payments: PayMongo GCash payment links + signed webhook (`lib/paymongo.ts`,
  `app/api/payments/`).
- Hosting: Vercel. `main` auto-deploys to production; PRs get preview deploys.
  The current Vercel project sits under franzsamilo's personal Vercel account.

## 3. Run, build, secrets
| Command | Notes |
|---------|-------|
| `npm ci` | install |
| `npm run dev` | http://localhost:3000 |
| `npx tsc --noEmit` | type check, clean baseline |
| `npm run lint` | ~220 old problems (mostly `no-explicit-any`, unused vars) |
| `npm run build` | needs real Firebase keys in `.env.local` (Admin SDK inits at build) |

- Secrets live in `.env.local` (git-ignored). Names are in `.env.example`.
  The code reads `NEXT_PUBLIC_FIREBASE_*`, `FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL`,
  `FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY` (fix for `.env.example` is PR #2).
- **Local preview mode** (PR #3, `dev/local-preview`): set `LOCAL_PREVIEW=true` and
  `NEXT_PUBLIC_LOCAL_PREVIEW=true` to run with sample data and dev login buttons, no
  keys needed. Data in `.local-preview/db.json` (delete to reset). Off in production builds.
  Files: `lib/local-preview.ts`, `lib/firebase/local-db.ts`, `lib/firebase/local-seed.ts`.

## 4. Layout
- `app/<page>/page.tsx` — shop, cart, chat, dashboard, admin, seller,
  apply/{seller,expert}, consultation, fabrication, community, login, services, privacy, terms.
- `app/api/<resource>/` — route handlers: applications, audit, auth, chats,
  consultations, fabrication, orders, payments, pickup-points, posts, products, upload, users.
- `lib/<resource>.ts` — Firestore access per resource. `lib/types.ts` — shared DTOs.
- `components/ui` — Button, Badge, Card, Input, Tabs, SectionHeading…;
  `components/auth`, `components/layout`, `components/providers`, `components/fabrication`.
- `middleware.ts` — login required for /dashboard, /admin, /apply, /seller, /chat;
  /admin needs a role containing `admin` or `expert`.
- `docs/superpowers/` — specs and plans.

## 5. Data model (Firestore collections)
users, products, orders, chats (+messages), consultations (+messages),
posts (+comments), fabrication_jobs, applications, audit_logs, pickupPoints.
- Checkout uses 3 `runTransaction` calls in `lib/orders.ts` plus `FieldValue.increment`/`arrayUnion`.
- Chat `participants` and product `sellerId` are **emails**, not user ids.
- `NEXT_PUBLIC_ADMIN_EMAIL` (default `admin@xts.com`) is the shared staff inbox and
  keys existing chat docs. Don't change without migrating data.
- Chats are soft-deleted via a `deletedBy` array.
- Admin Firestore uses `ignoreUndefinedProperties: true`.

## 6. Roles
`member` (default), `admin`, `expert`, `seller`. Checks use `includes()` on the role
string. `ADMIN_EMAIL` is auto-promoted to admin on first login. The JWT callback reads
the user doc on every refresh so role changes apply at once.

## 7. Known bugs and weak spots (not fixed yet — see TASKS.md)
- Unread markers: `` [`lastReadBy.${email}`] `` updates get split on the dots in the email.
- `app/api/users/terms` keys users by email; everything else keys by auth id → stray user docs.
- `middleware.ts` should be renamed `proxy.ts` (Next 16 warning).
- 36 npm audit vulnerabilities; no input validation (zod); no rate limiting.
- DB read on every JWT refresh; `includes()` role matching is loose.
- PayMongo webhook: confirm it can't process the same payment twice.
- No tests, no CI besides Vercel, `main` unprotected.

## 8. Roadmap
1. Merge PR #2 (env names) and PR #3 (local preview).
2. **Firebase → Supabase** (design not approved yet): rewrite the ~17 files that use
   Firebase, 11 collections → tables, the 3 transactions → Postgres transactions/RPC,
   keep NextAuth with a Supabase adapter (proposed), Storage → Supabase Storage and
   rewrite `storage.googleapis.com` URLs, data migration script that keeps ids, a
   practice run first, row-count checks. Needs the production Firebase service account
   from the owner.
3. **New Vercel project**: env vars, Google OAuth redirect URIs, `NEXTAUTH_URL`,
   PayMongo webhook URL, disconnect the old project from `main`, DNS.
4. Hardening from §7.

## 9. Branding and storefront branch
`codex/xts-mechatronics-ui` includes the pending local preview and coordination work
as dependencies. The latest user direction uses a compact XTS mark with a separate
Mechatronics department label, plain copy, and direct shop/service navigation.
The earlier enlarged lockup and decorative marketing layout were superseded.
The 2026-10-30 hero adds a minimal welcome, catalog quick search (`/shop?q=...`),
compact service entry points and bounded reduced-motion-aware CSS intro transitions.
The later commerce refinement retains that foundation and adds CatalogSearch suggestions
from the existing response, card/tooltips/image/skeleton refinements, categories,
four engineering-service links and factual support links. No backend behavior changed.
The new hero still needs visual/interactive review after CUA initialization is repaired;
type/lint and local HTTP checks pass. See the latest PROGRESS entry for this limit.
Shared UI: `components/layout/Brand.tsx`,
`components/ui/ProductCard.tsx`, `components/ui/ProductImage.tsx`. The asset index is
`lib/sample-assets.ts`; image provenance, evaluation, and verification scope are in
`docs/xts-mechatronics-ui.md`. Bundled samples are labeled and never overwrite seller
photos. No production product data was seeded. Review this branch before merging.

## 10. Shared development workflow (2026-10-30)
The user replaced separate active agent branches/worktrees with one shared checkout:
`D:\DEV WORKS\XTS PROJECT DEVS\XTS SHOP WEB`, branch `codex/xts-mechatronics-ui`.
Both agents must work there and preview `http://localhost:3001`. The former
`xts-web-claude` worktree is retired and no longer present; Git lists only the canonical
checkout. Both histories remain preserved in the integration commit and branch refs.
Claude's UI consistency commits through `803831e` and Codex's hero/search work through
`e33179c` are integrated, preserving both histories and all progress/decision entries.
Claude's dotted background and inner-page fixes remain. PR #5 is the shared review PR;
main is unchanged. Follow AGENTS.md's sync/file-claim format before every edit and
use the commit SHA/files/checks/preview/next handoff format. The user's existing sample
data and ignored environment files were not copied, reset or committed.


### Product detail continuation · 2026-10-30
Shared PR #5 now includes a compact ProductGallery and RelatedProducts beneath the
purchase area. productImages preserves unique seller images and supplies a second
illustrative view only to exact known local demo records outside production. New
seeds have both images; no local database reset needed. Recommendation ranking lives
in lib/product-recommendations.ts and reuses the catalog API; no compatibility claim.
Preview: http://localhost:3001/shop/p-esp32. Type/lint, helper/SSR and HTTP pass;
CUA missing-kernel-assets failure prevents new browser interaction/viewport signoff.
See newest PROGRESS and docs/xts-mechatronics-ui.md; keep existing policy-copy task.

### Mobile product follow-up · 2026-10-30
On phones, product galleries use a bounded image and a single thumbnail/control strip;
long descriptions/specifications expand on demand, recommendations scroll in one row.
Touch swiping is implemented; native image dialog locks/restores background scroll.
Third illustrative *-angle.webp views extend each local sample to original/top/angle,
including old one/two-image demo records without resetting the ignored local database.
Seller galleries remain intact. Preview and PR stay on port 3001 / shared PR #5.
See current PROGRESS for verification limits; CUA interaction/viewport QA is pending.
