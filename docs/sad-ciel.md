# Subagents Document (SAD)

**Project:** Ciel — AI-native Impact Operating System for the social sector
**Date:** 2026-06-25
**Version:** 1.0
**Owner:** Ciel Team — Create & Conquer 2026
**Status:** Locked
**Last reconciled:** 2026-06-25
**PRD:** [prd-ciel.md](prd-ciel.md) · **SDD:** [sdd-ciel.md](sdd-ciel.md) · **QAD:** [qad-ciel.md](qad-ciel.md)

---

## 1. Purpose & Scope

These subagents accelerate the **Ciel build** — scaffolding the Next.js app, building the LangGraph AI pipelines, managing the Supabase schema + evidence corpus, and enforcing the two non-negotiable guardrails for this product: **AI safety evals** and **compliance**. They are spawned by the main agent (or a developer) during M2–M4 of [prd-ciel.md §9](prd-ciel.md). Platform: **Claude Code** (`.claude/agents/`).

**Out of scope:** subagents don't make product/architecture decisions — those live in the PRD/SDD/RFC. They execute and enforce within set boundaries.

---

## 2. Roster Design Rationale

| Considered | Decision | Reason |
|------------|----------|--------|
| `ai-pipeline-engineer` | **Kept** | Spawned repeatedly across F1/F2/F3 AI work; context-heavy (LangGraph + Foundry). |
| `frontend-builder` | **Kept** | Repeated UI work on Next.js 16 (a stack that differs from training memory — see BUILD). |
| `data-rag-engineer` | **Kept** | Schema-safety guardrail + repeated migrations + corpus ingestion. |
| `eval-safety-runner` | **Kept** | Guardrail that must never be skipped (QAD §7 safety gate). |
| `compliance-checker` | **Kept** | Guardrail — RA 10173 / provenance / audit obligations block risky diffs. |
| `design-token-auditor` | Rejected | Folded into `frontend-builder` (it owns DSD tokens). |
| `migration-runner` (standalone) | Rejected | Folded into `data-rag-engineer`. |
| generic `test-runner` | Rejected | Covered by `eval-safety-runner` + CI; no separate slot earned. |

Roster size: **5** (within the 3–6 guidance).

---

## 3. The Roster

| Agent ID | Name | One-line job | Derived from | Spawn trigger | Model hint |
|----------|------|--------------|--------------|---------------|------------|
| SAD-A1 | ai-pipeline-engineer | Build/maintain LangGraph pipelines on Foundry | PRD-F1/F2/F3, SDD §8, RFC-001/002 | when AI graph/prompt/tool work is needed | deep |
| SAD-A2 | frontend-builder | Build Next.js 16 + Tailwind v4 UI per DSD | PRD §5, DSD, BUILD | when a screen/component/PWA flow is built | balanced |
| SAD-A3 | data-rag-engineer | Supabase schema/migrations + evidence corpus | SDD §3, RFC-001 | when schema or corpus changes | balanced |
| SAD-A4 | eval-safety-runner | Run QAD AI quality + safety gate; block on fail | QAD §7, SDD §8.1 | before merge / after AI change | balanced |
| SAD-A5 | compliance-checker | Flag changes that breach CLR obligations | CLR, SDD §5/§7 | on diffs touching data/PII/AI output | fast |

> **Model hint** → materialization: `deep`→opus, `balanced`→sonnet, `fast`→haiku.

---

### Agent Cards

#### SAD-A1 — ai-pipeline-engineer
- **Purpose:** owns the LangGraph reasoning pipelines (ToC graph, grant drafting, M&E rationale) over Microsoft Foundry. Earns its slot: spawned repeatedly + context-heavy.
- **Derived from:** PRD-F1/F2/F3; SDD §8; RFC-001 §2; RFC-002 §5.
- **Responsibilities:** implement graph nodes + structured-output schemas; wire Foundry IQ retrieval; enforce "grounded or labeled-unverified"; keep token budgets within SDD §8.
- **Inputs:** an RFC section / feature ID, current AI-service code, eval results.
- **Outputs:** a patch to the AI service + a note on token cost + which evals it affects.
- **Capabilities / tools:** Read, Edit, Bash (run service + pytest), Grep, WebFetch (verify Foundry SDK docs).
- **Spawn trigger:** any AI graph/prompt/tool change.
- **Guardrails (never):** never give a tool autonomous write/act power beyond SDD §8 scopes; never remove a grounding/citation check; never let the LLM decide a scale/adapt/stop signal.
- **Done when:** the pipeline passes its QAD evals (incl. safety) and stays within budget.
- **Model hint:** deep.

#### SAD-A2 — frontend-builder
- **Purpose:** builds the product UI on Next.js 16 + Tailwind v4 to the DSD, including the offline PWA. Earns its slot: repeated UI work on a stack that diverges from model memory.
- **Derived from:** PRD §5 (screens/flow); DSD (tokens/components); BUILD (stack rules).
- **Responsibilities:** implement screens with all states (empty/loading/error/success/generating); apply DSD tokens (no slop defaults); build the IndexedDB offline outbox + Background Sync; a11y (WCAG AA, 44px targets).
- **Inputs:** a screen/component spec or PRD §5 row.
- **Outputs:** the component/route + a note on which DSD tokens/states it implements.
- **Capabilities / tools:** Read, Edit, Bash (dev/build), Grep, WebFetch (verify Next.js 16 APIs per BUILD §3).
- **Spawn trigger:** any new/changed screen, component, or PWA flow.
- **Guardrails (never):** never emit Next.js/Tailwind APIs from memory without checking BUILD §3 deprecations; never ship indigo→violet-gradient/Inter-only/glassmorphism slop (DSD §0); never remove a focus outline.
- **Done when:** the screen matches the DSD, passes a11y, and its Playwright happy path is green.
- **Model hint:** balanced.

#### SAD-A3 — data-rag-engineer
- **Purpose:** owns Supabase schema/migrations and the evidence corpus (pgvector / Foundry IQ ingestion). Earns its slot: schema-safety guardrail + repeated work.
- **Derived from:** SDD §3 (schema); RFC-001 §3 (corpus, `toc_critiques`); RFC-002 §3 (`indicator_points`).
- **Responsibilities:** write forward-only, backward-compatible migrations; maintain RLS policies; ingest tiered evidence sources; keep embeddings current.
- **Inputs:** a schema change request tied to an SDD/RFC item.
- **Outputs:** a migration file + RLS policy + a rollback note.
- **Capabilities / tools:** Read, Edit, Bash (supabase CLI/migrations), Grep.
- **Spawn trigger:** any schema or corpus change.
- **Guardrails (never):** never write a migration that isn't backward-compatible for one release; never disable RLS; never store real beneficiary PII in non-prod.
- **Done when:** migration applies cleanly up+down on a Supabase test branch and RLS tests pass.
- **Model hint:** balanced.

#### SAD-A4 — eval-safety-runner
- **Purpose:** runs the QAD AI quality + adversarial safety suite and gates merges. Earns its slot: a guardrail that must never be skipped.
- **Derived from:** QAD §7 (AI-01..10); SDD §8.1.
- **Responsibilities:** run `scripts/run_eval.py`; compare to baseline; report regressions; **block** on any safety-eval failure or >5% quality regression.
- **Inputs:** a diff/branch + the eval baseline.
- **Outputs:** PASS, or FAIL with the specific failing evals + minimal repro.
- **Capabilities / tools:** Bash, Read, Grep.
- **Spawn trigger:** before any merge that touches AI, and on model/prompt upgrades.
- **Guardrails (never):** never edit prompts/source to make an eval pass; never lower a safety threshold to get green.
- **Done when:** it returns a clear verdict with evidence.
- **Model hint:** balanced.

#### SAD-A5 — compliance-checker
- **Purpose:** flags diffs that breach CLR obligations before they merge. Earns its slot: a guardrail.
- **Derived from:** CLR (RA 10173 obligations, provenance, audit); SDD §5/§7.
- **Responsibilities:** scan diffs for new PII fields without consent/retention handling, AI outputs without provenance, actions missing audit-log writes, or new sub-processors; raise a flag + cite the CLR row.
- **Inputs:** a diff.
- **Outputs:** a pass, or a flag listing each issue + the CLR obligation it touches (escalate to human; never auto-approve legal risk).
- **Capabilities / tools:** Read, Grep.
- **Spawn trigger:** diffs touching data models, AI outputs, logging, or third-party services.
- **Guardrails (never):** never give legal advice; never clear a Section-3 escalation itself — route to a human.
- **Done when:** it returns pass or a specific, sourced flag list.
- **Model hint:** fast.

---

## 4. Orchestration

- **Who spawns them:** main agent autonomously during the build; a developer on demand.
- **Sequencing:** `data-rag-engineer` (schema) → `ai-pipeline-engineer` / `frontend-builder` in parallel → `eval-safety-runner` + `compliance-checker` gate the merge.
- **Hand-off:** shared state = the repo + `docs/`; eval baselines live in the AI service; flags reference doc IDs.
- **Escalation:** any guardrail conflict, ambiguous compliance call, or repeated eval failure stops and hands back to a human.

```
data-rag-engineer (A3) ─┬─▶ ai-pipeline-engineer (A1) ─┐
                        └─▶ frontend-builder (A2) ──────┼─▶ eval-safety-runner (A4) ──gate──▶ merge
                                                        └─▶ compliance-checker (A5) ──gate──┘
```

---

## 5. Materialization (Platform Mapping)

### Materialize to: Claude Code (`.claude/agents/`)

| Agent ID | Materialized file | Format |
|----------|-------------------|--------|
| SAD-A1 | `.claude/agents/ai-pipeline-engineer.md` | Claude Code frontmatter |
| SAD-A2 | `.claude/agents/frontend-builder.md` | Claude Code frontmatter |
| SAD-A3 | `.claude/agents/data-rag-engineer.md` | Claude Code frontmatter |
| SAD-A4 | `.claude/agents/eval-safety-runner.md` | Claude Code frontmatter |
| SAD-A5 | `.claude/agents/compliance-checker.md` | Claude Code frontmatter |

Model map: deep→opus, balanced→sonnet, fast→haiku. Files are generated artifacts — edit the cards here and re-materialize.

---

## 6. Maintenance

- The SAD is the source of truth; edit cards → bump version → re-materialize. Don't hand-edit `.claude/agents/`.
- Reconcile orphans/missing against §5's table.
- If a `PRD-F#` an agent derives from is cut, revisit that agent (log a CR).
- Re-run the anti-sprawl rule on any new-agent proposal; if it fails all three criteria, add it to §2's rejected table instead.
