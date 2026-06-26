# Project Brief — Ciel

**Event:** Create & Conquer 2026 Hackathon · Theme #2  
**Date:** 2026-06-26  
**Team:** Ciel Team

---

## A. Creative Name of Your Project

**Ciel** *(French: "sky"; pronounced ci-yel)*

Tagline: **From pilot to scale.**

Ciel is an AI-native *Impact Operating System* for the social sector — the missing layer between *need identified* and *solution scaled*.

---

## B. The Problem

Social impact organizations — governments, NGOs, and community groups — continuously identify urgent needs: education gaps, healthcare access limits, disaster vulnerability, livelihood insecurity. These needs are often well documented, but the pathway from **identification → solution design → implementation → scaling** remains fragmented and inconsistent.

This produces **"pilotitis"**: promising small projects that fail to scale when grants end, local policy is ignored, or field infrastructure assumptions break down. Existing nonprofit software (Salesforce, Blackbaud, Bloomerang) manages donors and fundraising but provides **no cognitive help** designing interventions or proving real-world impact. Meanwhile, **88% of organizations use AI in at least one function, but roughly two-thirds have not begun scaling it, and only 39% see enterprise-level impact** ([evidence A1–A2](evidence-ciel.md)).

**Hackathon challenge (Theme #2):** *How might we use AI to transform identified social needs into effective, context-aware solutions that can be immediately implemented and scaled?*

---

## C. The Solution / Innovation

**Ciel** productizes the consulting playbooks the sector already trusts (BCG 10-20-70, McKinsey Rewired, Deloitte Trustworthy AI) into a deployable operating system with three integrated modules:

1. **Design** — AI-assisted Theory of Change from a plain-language need, with evidence citations and "intelligent failure" prompts.
2. **Fund** — Automated grant writing aligned to funder KPIs, grounded in the locked logic model.
3. **Prove & scale** — Predictive M&E with offline/SMS field ingestion and **scale / adapt / stop** signals before funding runs out.

**Innovation:** Ciel occupies an unclaimed category — program execution and impact proof — adjacent to, not competing with, donor CRMs. Incumbents manage the *money*; Ciel is the *brain* that designs and proves the mission.

---

## D. Solution Details / Components / Features

| Module | Feature ID | Description |
|--------|------------|-------------|
| **ToC Generator** | PRD-F1 | Root-cause interrogation → visual + narrative Theory of Change with RAG-grounded citations; adversarial "what failed before" critique before lock |
| **Grant Workspace** | PRD-F2 | Locked ToC → funder-matched, compliance-ready proposal drafts; human-edited, never silently overwritten |
| **Predictive M&E** | PRD-F3 | Leading indicators from web, offline PWA, or SMS; scale/adapt/stop recommendations tied to ToC assumptions |
| **Org Workspace** | PRD-F4 | Multi-org accounts, roles (admin/program/field/viewer), audit log |
| **Trustworthy AI** | PRD-F5 | Provenance on every output, HITL gates, grounded-or-silent rule |
| **Integrations** | PRD-F6 | v2: Bloomerang, Benevity (Ciel as brain, CRM as bank account) |

**Tech stack:** Next.js 16 (Vercel) · Python FastAPI + LangGraph (Google Cloud Run) · Microsoft Foundry (GPT-only) · Supabase (Postgres + pgvector + Auth)

---

## E. Proof of Concept / Prototype

The PoC demonstrates the full **design → fund → prove** loop on a real Philippine social need:

- **User flow:** Sign-in → org onboarding → need intake → ToC Studio (generate → challenge → lock) → Grant Workspace → Project Dashboard → field data → scale/adapt/stop signal.
- **Architecture:** Two-tier app (Next.js + Python AI service on Cloud Run) fronting Microsoft Foundry and Supabase — see [PoC.md](PoC.md) for diagrams.
- **Demo:** 1–3 minute video walkthrough per [elimination-video-script.md](elimination-video-script.md).
- **Repository:** Public GitHub with README and commit history.

---

## F. Team Members & Roles

| Name | Role | Responsibility |
|------|------|----------------|
| *[Team Lead]* | Sponsor / Product lead | Scope, story, submission approval |
| *[Member]* | Product / Research | Thesis, brief, citations, GTM narrative |
| *[Member]* | Engineering lead | Next.js + AI service + Cloud Run deploy |
| *[Member]* | Designer | DSD, wireframes, presentation visuals |
| *[Member]* | Presenter | Demo flow, pitch, Q&A defense |

*Replace placeholders with registered team names before submission.*

---

## G. References

1. McKinsey Global Survey on AI (2025) — adoption vs scaling gap ([evidence A1–A2](evidence-ciel.md))
2. BCG $500M AI for social impact commitment + Anthropic partnership ([evidence C2](evidence-ciel.md))
3. IBM watsonx at UHCW — ~700 extra patients/week ([evidence D1](evidence-ciel.md))
4. Salesforce nonprofit "free like a puppy" implementation costs ([evidence B1–B2](evidence-ciel.md))
5. Philippines Data Privacy Act (RA 10173) · New Government Procurement Act (RA 12009)
6. Create & Conquer 2026 Hackathon Guide — [hackathon-guide.md](hackathon-guide.md)
7. Ciel documentation suite — [docs/index.md](index.md)

---

## H. Use of AI in the Project

AI is **core to the product** and **used in development**:

### In the product (runtime)

| Use | Tool / model | Purpose |
|-----|--------------|---------|
| ToC generation + critique | Microsoft Foundry (GPT frontier) | Grounded reasoning, adversarial failure prompts |
| Grant section drafting | Microsoft Foundry (GPT frontier) | Structured long-form with citations |
| M&E signal rationale | Microsoft Foundry (GPT frontier) | Concise grounded interpretation |
| SMS / classify parse | Microsoft Foundry (GPT-mini) | Low-cost intent parsing |
| Evidence retrieval | Foundry IQ + pgvector | RAG over curated corpus |

All outputs are **grounded or explicitly flagged unverified**; consequential actions require human-in-the-loop approval (SDD §8.1).

### In development (build-time)

| Tool | How we used it |
|------|----------------|
| **Cursor / Claude / GPT coding agents** | Scaffolded Next.js UI, FastAPI routes, LangGraph nodes, migrations, and documentation |
| **Microsoft Foundry** | Model runtime for integration testing and eval gates |
| **GitHub Copilot-style assistance** | Boilerplate, test fixtures, refactors |

AI tools accelerated implementation; **architecture, product decisions, compliance posture, and final code review remain human-owned** per [clr-ciel.md](clr-ciel.md).

---

## Optional Content

### A. Market Segment

**Primary:** Mid-sized Philippine NGOs and progressive LGUs — the "missing middle" with operational complexity but no budget for Big-Four consultants or full-time CRM admins ([evidence F1–F2](evidence-ciel.md)).

**Secondary:** Foundations and CSR departments mandating standardized impact reporting across grantees.

### B. TAM, SAM, SOM

| Level | Estimate | Basis |
|-------|----------|-------|
| **TAM** | ~$4.95B global nonprofit software (2026) | [evidence A4](evidence-ciel.md) |
| **SAM** | PH NGOs + 1,715 LGUs needing program design + M&E tooling | [evidence F1–F2](evidence-ciel.md) |
| **SOM** | 25 activated orgs (pilot) → 50 live M&E projects (12 mo) | [BRD-M3/M4](brd-ciel.md) |

### C. Business Model

Freemium → value-based scaling: **Ciel Start** (free ToC) → **Ciel Scale** (grant + M&E tied to funding managed) → **Ciel Public** (B2G annual contract). Revenue aligns with funding secured, not per-seat ([gtm-ciel.md](gtm-ciel.md) §3).

### D. Target Customer

**Maria** — NGO program manager, 25-person org, spends evenings on logframes and late M&E spreadsheets ([prd-ciel.md](prd-ciel.md) §2).

**Engr. Dan** — LGU planning officer who buys compliance and audit-ready evidence, not "disruptive AI."

### E. Channels

NGO networks (PCNC), foundation grantee cohorts, university extension programs, hackathon/demo day, LinkedIn sector content, freemium ToC viral loop ([gtm-ciel.md](gtm-ciel.md) §5).

### F. Revenue Streams

- Value-based subscriptions (funding volume / projects)
- B2G annual contracts (procurement)
- Foundation portfolio mandates (top-down distribution)

### G. Cost Structure

- Cloud: Vercel + Cloud Run + Supabase (pilot-scale)
- AI inference: Microsoft Foundry per-token (Langfuse cost tracking)
- People: lean team; no telco-direct SMS in v1

### H. Target Partners

- Accredited NGO networks and FEU/DOST extension programs
- Progressive LGUs (RA 12009 procurement-ready pilots)
- Foundations mandating impact reporting standards
- v2: Bloomerang, Benevity (CRM integrations)

### I. Project Persona

**Maria, 38, Cebu NGO program manager** — mission-driven, under-resourced, fluent in Excel/Facebook, not CRMs. Success = design a defensible program in an afternoon, win the grant, and see whether it's working in time to fix it ([prd-ciel.md](prd-ciel.md) §2).
