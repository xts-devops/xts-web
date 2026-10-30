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

## Shared working copy — user directive, 2026-10-30

Both agents work in **one checkout on one branch**:
- Repository folder: `D:\DEV WORKS\XTS PROJECT DEVS\XTS SHOP WEB`
- Shared branch: `codex/xts-mechatronics-ui`
- Shared local preview: `http://localhost:3001`
- Review PR: #5 into `main`. The user merges it.

This overrides the old per-agent/per-task branch workflow and stale worktree notes.
If opened in `xts-web-claude` or another worktree, stop editing there and use the
shared folder above. Do not create another branch or preview server for normal work.
Older branches/worktrees are retained as history, not parallel active working copies.

### Sync and ownership format (every task)
1. Read the coordination files, then run `git status --short`,
   `git branch --show-current`, and `git fetch origin` in the shared folder.
2. With a clean working tree, run `git pull --ff-only origin codex/xts-mechatronics-ui`.
   If peer changes are uncommitted, preserve them and coordinate through TASKS/PROGRESS;
   never stash, reset, clean, rebase, switch branches or overwrite them to force a sync.
3. Claim a small task before edits, using this format:
   `- [ ] **Task** — owner: codex|claude · status: in-progress · files: exact paths · base: short SHA · next: concrete step`
   An in-progress file claim is exclusive. Another agent must wait, work on other
   files, or receive the user's explicit reassignment before touching those files.
4. Keep Git mutations serial: do not stage/commit/pull/merge while the other agent is
   doing a Git operation. Stage only your named files; never commit peer work by accident.
5. Verify, commit, push this same branch, then record the SHA, files, checks, preview
   URL and next step in PROGRESS. Update the task to review/done and keep PR #5 current.
   If push is rejected, preserve work and integrate normally; never force-push.

Shared branch does not mean simultaneous edits to the same file. Layer ownership
below still applies unless the user explicitly assigns an exception.

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
   (`owner: <you> · status: in-progress`, exact files + base SHA) → sync the shared
   branch using the rules above; do not create a separate task branch.
2. **Work:** stay in your lane. Keep tasks small and file-scoped so branches merge cleanly.
3. **Verify** (below) before calling anything done.
4. **Commit:** small and atomic, `[<you>] <type>: <what>`, e.g. `[codex] fix: keep dotted emails in lastReadBy`.
5. **Hand off:** append a `PROGRESS.md` entry (append-only, newest on top) → set the
   task `review`/`done`/`blocked` → add a `DECISIONS.md` entry for any architectural
   choice → push the shared branch and update PR #5 into `main`.

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
