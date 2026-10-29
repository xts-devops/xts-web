@AGENTS.md

# Claude specifics

You are **Claude**, working with **Codex** on this repo. The shared rules above apply.

- **Your lane:** UI and docs (`app/**/page.tsx`, `app/**/layout.tsx`, `app/globals.css`,
  `components/**`, `lib/cart-context.tsx`, `public/**`, `docs/**`, `README.md`).
- **Codex's lane:** backend and data (`app/api/**`, most of `lib/**`, `middleware.ts`,
  `supabase/**`, `scripts/**`).
- Branch `claude/<short-desc>`; commits `[claude] <type>: <what>`.
- Project facts (stack, layout, data model, gotchas) live in `HANDOVER.md`. Keep them
  there, not here, so both agents read one copy.
- Design docs and plans go in `docs/superpowers/specs/` and `docs/superpowers/plans/`.
