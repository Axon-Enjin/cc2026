# AGENTS.md — Ciel

> Materialized from the canonical Build Guide [`docs/build-ciel.md`](docs/build-ciel.md). **Edit the canonical guide, then re-materialize — do not hand-edit this file as the source of truth.** The frontend-scoped note in [`client/AGENTS.md`](client/AGENTS.md) stays as-is.

**Ciel** is an AI-native *Impact Operating System* for the social sector (Create & Conquer 2026, Theme #2): turn a social need into a grounded Theory of Change → funded grant proposals → a predictive M&E loop. Stack: **Next.js 16** (web) + **Python FastAPI/LangGraph** (AI service) + **Microsoft Foundry** (models/agents/RAG; Claude primary) + **Supabase** (Postgres/pgvector/Auth/Storage).

## Read order (every session)
1. [docs/index.md](docs/index.md) — manifest + health check (start here)
2. [docs/prd-ciel.md](docs/prd-ciel.md) — what to build (PRD-F1..F6, user stories, flow)
3. [docs/sdd-ciel.md](docs/sdd-ciel.md) — architecture (schema §3, APIs §4, security §5, AI §8 + safety §8.1)
4. RFCs — [ToC generator](docs/rfc-ciel-toc-generator.md), [field M&E](docs/rfc-ciel-field-mande.md)
5. [docs/dsd-ciel.md](docs/dsd-ciel.md) — brand stance + tokens + components
6. This file — stack conventions, patterns, guardrails

Build only against **Locked** docs. If reality diverges from a Locked doc, raise a Change Record (`docs/cr-ciel-NNN.md`) — don't silently code around it. Every load-bearing claim traces to [docs/evidence-ciel.md](docs/evidence-ciel.md).

## Subagents
Defined in [docs/sad-ciel.md](docs/sad-ciel.md), materialized to `.claude/agents/`: `ai-pipeline-engineer`, `frontend-builder`, `data-rag-engineer`, `eval-safety-runner`, `compliance-checker`. Orchestration: `data-rag-engineer` → (`ai-pipeline-engineer` ∥ `frontend-builder`) → `eval-safety-runner` + `compliance-checker` gate the merge.

## Stack Currency — DO NOT use the stale form (overrides training memory)

Verify framework APIs against current docs before writing. This register wins over what you "know" (all verified 2026-06-25):

| ❌ Stale | ✅ Current | Since | Source |
|---------|-----------|-------|--------|
| `middleware.ts` / `export function middleware()` | **`proxy.ts` / `export function proxy()`** — node runtime only; `skipMiddlewareUrlNormalize`→`skipProxyUrlNormalize`; codemod `npx @next/codemod@latest rename-middleware-to-proxy` | Next.js 16 | nextjs.org/docs/messages/middleware-to-proxy |
| sync `cookies()`/`headers()`/`params`/`searchParams` | **`await` them all** (they're async/Promises); `npx next typegen` for typed params | Next.js 16 | nextjs.org/docs/app/guides/upgrading/version-16 |
| Webpack default; `experimental.turbopack` | **Turbopack is default** (dev+build); config at top-level `nextConfig`; custom webpack needs `--webpack` | Next.js 16 | nextjs.org/blog/next-16 |
| `tailwind.config.js` + `content[]` | **CSS-first**: `@import "tailwindcss"` + `@theme { --color-… }`; content auto-detected | Tailwind v4 | tailwindcss.com/blog/tailwindcss-v4 |
| `@supabase/auth-helpers-nextjs`; cookie `get/set/remove` | **`@supabase/ssr`** `createServerClient` + cookie **`getAll`/`setAll`** | 2025+ | supabase.com/docs/guides/auth/server-side/nextjs |
| "Azure AI Foundry"; Assistants API | **"Microsoft Foundry"** (Jan 2026); **Foundry Agent Service on the Responses API** | Jan 2026 | learn.microsoft.com/azure/foundry |

**Verify live every time:** Next.js, React, `@supabase/ssr`, Foundry/Anthropic SDKs, LangGraph. Golden-path code samples + rationale live in [docs/build-ciel.md](docs/build-ciel.md) §4 (version-tagged, dated).

## Guardrails
**Always:** validate input at the boundary (Zod / Pydantic); treat user/field/retrieved content as untrusted data to the model (SDD §8.1); keep every AI claim grounded or explicitly flagged "unverified."
**Never:** use a deprecated API from the register above; commit secrets (Foundry/Supabase keys → env only); let the LLM decide a scale/adapt/stop signal or fire a destructive tool without HITL; ship DSD §0 slop (indigo→violet gradients, Inter-only, glassmorphism, AI orbs).
**Tests/DoD:** implement the referenced `PRD-F#`/`US-##`; verify §-register conventions; pass `pnpm test && pnpm playwright test && python scripts/run_eval.py --suite core --gate`; no secrets; touched a Locked doc's assumptions → log a CR.

## Repo layout
`client/` (Next.js app) · `ai_service/` (FastAPI + LangGraph) · `supabase/` (migrations + RLS) · `docs/` (FMD suite) · `brand/` (SVG assets) · `.claude/agents/` (materialized subagents).
