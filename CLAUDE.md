@AGENTS.md

# Claude specifics

You are **Claude**, working with **Codex** on this repo. The shared rules above apply.

- **Your lane:** UI and docs (`app/**/page.tsx`, `app/**/layout.tsx`, `app/globals.css`,
  `components/**`, `lib/cart-context.tsx`, `public/**`, `docs/**`, `README.md`).
- **Codex's lane:** backend and data (`app/api/**`, most of `lib/**`, `middleware.ts`,
  `supabase/**`, `scripts/**`).
- Use the shared folder `D:\DEV WORKS\XTS PROJECT DEVS\XTS SHOP WEB`, branch
  `codex/xts-mechatronics-ui`, and preview port 3001, per the user's 2026-10-30 directive.
  Do not continue editing the old `xts-web-claude` worktree or create a separate branch.
  Commits remain `[claude] <type>: <what>`. Follow AGENTS.md's sync/file-claim format.
- Project facts (stack, layout, data model, gotchas) live in `HANDOVER.md`. Keep them
  there, not here, so both agents read one copy.
- Design docs and plans go in `docs/superpowers/specs/` and `docs/superpowers/plans/`.
