# CLAUDE.md

> **Read [AGENTS.md](AGENTS.md) first** — it is the canonical operating guide for building Ciel (read order, stack-currency register, guardrails). This file is a thin pointer.

Claude-Code-only notes:
- The build subagents live in `.claude/agents/` (materialized from [docs/sad-ciel.md](docs/sad-ciel.md)). Spawn per the SAD orchestration. Edit the SAD and re-materialize — never hand-edit `.claude/agents/` as the source of truth.
- The FMD documentation suite is in [docs/](docs/). Start at [docs/index.md](docs/index.md).
- Honor the **Stack Currency** register in [AGENTS.md](AGENTS.md): `await` Next.js 16 request APIs, use `proxy.ts` not `middleware.ts`, Tailwind v4 is CSS-first, "Microsoft Foundry" (not "Azure AI Foundry"). Verify framework APIs against current docs before writing.
- The frontend-scoped [client/AGENTS.md](client/AGENTS.md) (the Next.js-16 warning) is intentionally separate — keep it.
