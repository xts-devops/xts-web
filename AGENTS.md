# AGENTS.md — shared rules for Codex and Claude

Two agents work on this repo: **Codex** and **Claude**. They never talk live. The only
shared channel is the repo: these files + git. Codex loads this file automatically;
Claude loads it through `CLAUDE.md`.

## Read first, every session (in this order)
1. `PROGRESS.md` — the newest 2–3 entries and their **Next**.
2. `TASKS.md` — what's in flight and who owns it.
3. `DECISIONS.md` — locked choices. Don't reverse them; propose a task instead.
4. `HANDOVER.md` — only the sections your task touches.

The user's current message always wins over a stale handoff note.

## Lanes (who edits what)

| Lane | Owner | Paths |
|------|-------|-------|
| Backend / data | **codex** | `app/api/**`, `lib/**` (except the shared files below and `lib/cart-context.tsx`), `lib/firebase/**`, `middleware.ts`, `supabase/**`, `scripts/**` |
| UI / docs | **claude** | `app/**/page.tsx`, `app/**/layout.tsx`, `app/globals.css`, `components/**`, `lib/cart-context.tsx`, `public/**`, `docs/**`, `README.md` |
| Shared — coordinate first | both | `lib/types.ts`, `lib/auth.ts`, `lib/roles.ts`, `package.json`, `package-lock.json`, `.env.example`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.github/**`, and these coordination files |

Need a file outside your lane, or a shared file? Add a task in `TASKS.md` describing the
change and call it out in your `PROGRESS.md` entry. Small, obvious fixes to a shared
file are fine if you flag them; anything that changes a type, API shape or dependency
needs its own task first.

The API contract between lanes is `lib/types.ts` (DTOs) plus the JSON each route in
`app/api/**` returns. Changing either is a shared change.

## Session ritual
1. **Start:** read the 4 files → claim a task in `TASKS.md`
   (`owner: <you> · status: in-progress`) → branch `<you>/<short-desc>` off `main`.
2. **Work:** stay in your lane. Keep tasks small and file-scoped so branches merge cleanly.
3. **Verify** (below) before calling anything done.
4. **Commit:** small and atomic, `[<you>] <type>: <what>`, e.g. `[codex] fix: keep dotted emails in lastReadBy`.
5. **Hand off:** append a `PROGRESS.md` entry (append-only, newest on top) → set the
   task `review`/`done`/`blocked` → add a `DECISIONS.md` entry for any architectural
   choice → push your branch and open a PR into `main`.

## Verify gate (same for both agents)
```bash
npx tsc --noEmit                 # must pass, clean baseline
npx eslint <files you changed>   # no NEW errors (repo has ~220 old ones; don't count those)
```
- UI changes: also check the page in local preview mode (`LOCAL_PREVIEW=true` and
  `NEXT_PUBLIC_LOCAL_PREVIEW=true` in `.env.local`, then `npm run dev`; dev login buttons on `/login`).
- `npm run build` needs real Firebase keys. A build failure from missing keys is an
  environment problem, not a code bug; say so instead of "fixing" code around it.
- Money / order / auth changes: describe how you tested the exact flow in `PROGRESS.md`.

## Hard rules
- **Never push to `main` directly.** Vercel deploys `main` to the live site, which has
  real users and orders. Everything goes through a PR.
- **Never commit secrets.** `.env*` is ignored (except `.env.example`). Check
  `git status` before every `git add`; add files by name, not `git add -A`.
  Don't commit `.local-preview/`, `public/local-uploads/`, `.claude/`, or `.codex/`.
- **`PROGRESS.md` is append-only.** Never edit or reorder past entries.
- **Don't reverse a `DECISIONS.md` entry** to unblock yourself; open a task.
- **Don't touch production data** (Firebase, Supabase, PayMongo live) without the
  user's explicit OK in that session.
- Don't merge the other agent's PR. Review it if asked; the user merges.
