# Change Record — ciel-cr-005

**Date:** 2026-06-26
**Status:** Applied
**Author:** Ciel Team
**Trigger doc:** [sdd-ciel.md](sdd-ciel.md) §2, §6

---

## 1. Summary

Change the Python AI service hosting target from **Azure App Service (non-containerized)** to **Google Cloud Run (containerized)**. The Next.js frontend remains on **Vercel**; **Microsoft Foundry** remains the GPT model/runtime control plane (unchanged). Supersedes the hosting target in [cr-ciel-001.md](cr-ciel-001.md).

## 2. Motivation

- A production [ai_service/Dockerfile](../ai_service/Dockerfile) now exists (port 8000, `/health/` probe, non-root user) — the App Service non-container rationale in CR-001 is stale.
- Cloud Run provides managed HTTPS, autoscale-to-zero for pilot cost control, and container-native deploy (`gcloud run deploy` / Cloud Build) aligned with the existing Dockerfile.
- Foundry inference is unchanged: the AI service calls Microsoft Foundry over HTTPS regardless of where the FastAPI process runs (cross-cloud is acceptable for the hackathon pilot).
- Reconcile Python runtime to **3.12** across SDD, BUILD, and Dockerfile (CR-001 era had no Dockerfile; 3.13 in Dockerfile was drift).

## 3. Scope of change

| Doc / artifact | Section | Change |
|----------------|---------|--------|
| [sdd-ciel.md](sdd-ciel.md) | §2 Tech stack (Infrastructure row) + mermaid | App Service → Google Cloud Run (containerized) |
| [sdd-ciel.md](sdd-ciel.md) | §5 Secrets | "Vercel / Azure" → "Vercel / GCP Secret Manager" |
| [sdd-ciel.md](sdd-ciel.md) | §6 Hosting + Environments + CI/CD | App Service/Oryx zip → Cloud Run container deploy |
| [ops-ciel.md](ops-ciel.md) | §2 Observability (Logs row) | "Vercel + Azure App Service" → "Vercel + Cloud Run (Cloud Logging)" |
| [ai_service/Dockerfile](../ai_service/Dockerfile) | base image | `python:3.13-slim` → `python:3.12-slim` (align with BUILD/SDD) |
| [index.md](index.md) | Change Log | Add ciel-cr-005 row |

## 4. Non-goals / unchanged

- Frontend hosting (Vercel) — unchanged.
- Microsoft Foundry control plane, Supabase, Upstash Redis — unchanged.
- `FOUNDRY_*` env vars, `AsyncAzureOpenAI`, Foundry IQ retrieval — unchanged.
- CI/CD shape (GitHub Actions: lint → type-check → test → deploy) — unchanged; deploy step targets Cloud Run image push + `gcloud run deploy` instead of App Service zip deploy.

## 5. Risks

- Cloud Run cold-start may add latency on first request; validate against §7 NFRs (AI stream first token < 1.5s, uptime 99.5% pilot). Set `min-instances=1` in prod if needed.
- Cross-cloud latency (Cloud Run → Foundry in Azure region): monitor via Langfuse; prefer Foundry deployment region closest to Cloud Run region (e.g. `asia-southeast1`).

## 6. Propagation checklist

| Doc | Affected? | Action | Done |
|-----|-----------|--------|------|
| SDD | Yes | §2, §5, §6 updated | [x] |
| OPS | Yes | Logs row updated | [x] |
| BUILD | No | Python 3.12 already pinned; Dockerfile aligned | [x] |
| PRD / BRD / QAD / CLR / GTM / SAD | No | Hosting detail only | [x] |
| index.md | Yes | Change Log row added | [x] |

## 7. Rollback

Revert SDD §2/§5/§6 and OPS logs row to App Service wording; redeploy via App Service Oryx zip. Dockerfile can remain for local/container dev.
