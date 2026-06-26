# Business Requirements Document (BRD)

**Project:** Ciel — AI-native Impact Operating System for the social sector
**Date:** 2026-06-25
**Version:** 1.0
**Owner:** Ciel Team — Create & Conquer 2026
**Status:** Locked
**Last reconciled:** 2026-06-25
**Evidence:** [evidence-ciel.md](evidence-ciel.md) · **Source idea:** [Idea.MD.md](../Idea.MD.md) · **Theme:** [hackathon-guide.md](hackathon-guide.md) §15 (Theme #2)

---

## 1. Executive Summary

The social sector is brilliant at *finding* problems and terrible at *scaling* solutions. Governments, NGOs, and community groups document education gaps, health-access limits, disaster vulnerability, and livelihood insecurity in exhaustive detail — then watch most interventions die as donor-funded pilots. This is not a motivation problem; it is an *operating-system* problem. The empirical picture confirms it: **88% of organizations now use AI in at least one function, but roughly two-thirds have not begun scaling it, and only 39% see enterprise-level impact** ([evidence A1–A2](evidence-ciel.md)).

**Ciel** is the missing operating layer between "need identified" and "solution scaled." It does three things existing nonprofit software does not: (1) generates a rigorous, evidence-grounded **Theory of Change** from a plain-language need; (2) turns that logic model into **funded, compliance-ready grant proposals**; and (3) runs a **predictive monitoring-and-evaluation loop** that works in low-connectivity field conditions and tells an organization whether to scale, adapt, or stop — *before* the money is gone. Where incumbents (Salesforce, Blackbaud, Bloomerang) manage the *money and relationships*, Ciel is the cognitive *brain* that designs and proves the mission itself. The timing is decisive: in June 2026 BCG committed **$500M to AI for social impact, partnered with Anthropic's Claude** ([evidence C2](evidence-ciel.md)) — validating both the problem and the approach Ciel is built on.

---

## 2. The Problem & Opportunity

**The Problem — "pilotitis."**
The dominant pathology of social innovation is *pilotitis*: small projects that show promise in a controlled setting and then fail to scale ([evidence A3](evidence-ciel.md)). Four drivers recur: financial unsustainability (grant runs out), ecosystem misalignment (ignores local policy/capacity), infrastructure assumptions (broadband/electricity that don't hold in the field), and the absence of any scaling framework. Compounding this, the tools the sector already pays for actively make it worse:

- Enterprise CRMs are **"free like a puppy"** — Salesforce gives 10 free 501(c)(3) licenses, but implementation routinely runs into five figures and needs dedicated administrators small orgs can't afford ([evidence B1–B2](evidence-ciel.md)).
- Those platforms manage **donors, fundraising, and volunteer shifts** — but provide *no cognitive help* designing an intervention or proving it changed the baseline ([evidence B3](evidence-ciel.md)). M&E remains manual, disjointed, and retroactive.

**The Opportunity — close the implementation gap with AI-native execution.**
The category gap is precise and unclaimed: **no platform helps an organization define the root cause, design an evidence-based intervention, fund it, and dynamically prove its real-world impact.** The macro conditions to fill it are now in place:

- **Market:** nonprofit software ≈ **$4.95B in 2026, growing 7.9%/yr, with APAC the fastest-growing region** ([evidence A4](evidence-ciel.md)).
- **Tailwind:** BCG's $500M + Anthropic commitment, and proven AI-in-social outcomes (IBM watsonx: ~700 extra patients/week at UHCW; 90% faster legal analysis at Blendow) ([evidence C2, D1–D2](evidence-ciel.md)).
- **Method:** the consulting playbooks for *how* to make this stick already exist and are verified — BCG's 10-20-70 (70% is people/process), McKinsey's Rewired six capabilities, Deloitte's seven-dimension Trustworthy AI ([evidence C1, C3, C4](evidence-ciel.md)). Ciel productizes them.

**Target Customer / User.**
The **"missing middle"**: mid-sized NGOs, regional advocacy groups, and progressive **Local Government Units (LGUs)** — organizations with enough operational complexity to need transformation but no budget for Big-Four consultants or full-time Salesforce admins. In the Philippines beachhead that means **1,715 primary LGUs** (81 provinces + 144 cities + 1,490 municipalities) plus accredited mid-size NGOs ([evidence F1–F2](evidence-ciel.md)). Secondary buyers: philanthropic foundations and CSR departments who want standardized impact reporting across their grantees.

---

## 3. Strategic Alignment

| Goal | How Ciel maps to it |
|---|---|
| **Hackathon Theme #2** — "use AI to transform identified social needs into context-aware solutions that can be immediately implemented and scaled" | Ciel *is* the implementation-and-scaling layer; the three modules map 1:1 to design → fund → scale. |
| **Judging criteria** — innovation (30%), execution (30%), feasibility (20%), theme (10%), impact (10%) | Innovation: an unclaimed category (program execution, not CRM). Execution: a deployable Next.js + Microsoft Foundry prototype. Feasibility: phased B2G motion + freemium entry. Impact: measured as "Return on Mission." |
| **Sector outcome** | Convert documented needs into sustainably funded, evidence-proven, *scaled* interventions — directly attacking the 39%-realize-impact gap ([evidence A2](evidence-ciel.md)). |

---

## 4. Scope

**In Scope (product vision):**
- Module 1 — AI-assisted **Theory of Change** generator (root-cause interrogation, evidence-grounded activities/outcomes, "intelligent failure" challenge).
- Module 2 — **Automated grant writing & resource alignment** (ToC → donor-matched, compliance-ready proposals).
- Module 3 — **Predictive M&E** with low-connectivity (SMS/USSD + offline-first) field ingestion and scale/adapt/stop signals.
- Trustworthy-AI governance, human-in-the-loop controls, and stakeholder impact reporting ("Return on Mission").
- Philippines-first compliance posture (RA 10173 data privacy; RA 12009 procurement readiness).

**Out of Scope:**
- Replacing donor CRM / payment processing / accounting — Ciel **integrates** with Bloomerang/Benevity et al. rather than rebuilding them ([evidence B3](evidence-ciel.md)).
- Direct disbursement of funds or acting as a financial institution.
- Rip-and-replace of incumbent enterprise contracts at the largest global NGOs (deliberately *not* the beachhead).
- Giving legal advice — the CLR is a register that escalates to counsel, not a law firm.
- Hardware/IoT sensing (field data arrives via human + SMS channels in v1).

---

## 5. Success Metrics

Each metric has a stable ID; the GTM tracks these and the PRD §5.5 instruments a feeding event for each. Baselines are sourced where a sector figure exists; targets are Ciel design goals.

| ID | Metric | Baseline | Target | Timeline |
|----|--------|----------|--------|----------|
| BRD-M1 | Time to produce a first rigorous Theory of Change | Weeks of consultant-led workshops (sector norm) | **< 30 minutes** in-app, draft-quality | Pilot (≤6 mo) |
| BRD-M2 | Grant-proposal drafting time | Days–weeks per proposal | **≥ 60% reduction** (vendor precedent: Valorem "materially reduces"; figure unconfirmed → we set our own target) ([D3](evidence-ciel.md)) | Pilot (≤6 mo) |
| BRD-M3 | Activated organizations (completed a ToC **and** connected ≥1 data source) | 0 | **25 orgs** in PH beachhead | 12 mo |
| BRD-M4 | Projects running a live predictive M&E loop (scale/adapt/stop signal fired ≥ once) | 0 (M&E is retroactive today) | **50 active projects** | 12 mo |
| BRD-M5 | "Return on Mission" — grant funding designed/managed through Ciel | 0 | **₱50M** managed | 12 mo |
| BRD-M6 | Pilot-to-scale conversion (project that expands geography/cohort after a Ciel signal) | Sector default ≈ pilots rarely scale ([A2/A3](evidence-ciel.md)) | **≥ 20%** of active projects | 18 mo |

*Hackathon-scoped success (separate from business metrics): a working prototype demonstrating the design→fund→scale flow end-to-end on one real PH social need, defensible in the 5-minute pitch + 15-minute Q&A.*

---

## 6. Stakeholders & Owners

| Role | Person | Responsibility |
|------|--------|----------------|
| Sponsor / Decision Maker | Ciel Team Lead | Final scope + submission approval |
| Business Owner | Product/Research lead | Accountable for the thesis, GTM, and impact outcome |
| Product / Tech Lead | Engineering lead(s) | Delivering the Next.js + Foundry prototype |
| Design | Designer | Brand system (DSD) + proof-of-concept UI |
| Presenter | Presenter | Demo flow + Q&A defense |

*Suggested 4–6 person split mirrors the hackathon guide's recommended team roles.*

---

## 7. Key Risks & Mitigations

| ID | Risk | Severity | Mitigation |
|----|------|----------|------------|
| R1 | **Sponsor-alignment (IBM).** Theme #2's slide carries the IBM logo and the source research leans on IBM watsonx, but the team chose **Microsoft Foundry**. | Medium | Keep watsonx as a *cited comparator and proof point* (D1–D2), and frame the stack choice on merit: Foundry is the only major cloud running **both Claude and GPT** ([evidence G](evidence-ciel.md)), directly enabling the BCG/Anthropic-validated Claude approach. Be ready to articulate this in Q&A. Decision stands. |
| R2 | **AI trust / harm to vulnerable populations** — a hallucinated or biased output mis-allocates aid. | High | Adopt Deloitte's seven Trustworthy-AI dimensions as hard NFRs (SDD §7), enforce human-in-the-loop at every consequential step, and ground all generation in retrieval (no ungrounded claims). Covered in QAD eval cases + CLR. |
| R3 | **B2G procurement friction** — long, risk-averse government cycles. | High | "Simplicity-first" motion; sell compliance/speed, not "disruptive AI"; design for **RA 12009 / PhilGEPS** from day one; lead with NGO freemium to build proof before B2G. (GTM) |
| R4 | **Financial unsustainability** (the pilotitis trap applied to Ciel's own customers). | Medium | Value-based pricing tied to funding *secured*, not seats; freemium ToC entry to prove value before spend. |
| R5 | **Low-connectivity reality** — field deployments lack reliable broadband/power. | Medium | Offline-first PWA + SMS/USSD ingestion as a first-class design constraint, not an afterthought (RFC-002). |
| R6 | **Scope overrun in hackathon window** (proposal 26 Jun, final 29 Jun, demo 30 Jun). | High | Prototype the *thinnest vertical slice* of the three-module flow; lean on the existing `client/` Next.js app; defer Modules 2–3 depth to "vision" in the PRD. |

---

## Self-Check

- [x] §1 is readable by a non-technical stakeholder and states the business value
- [x] §2 quantifies the problem (88%/⅔/39%; $4.95B market; five-figure CRM implementation)
- [x] §5 has metrics with numbers and timelines, each with a downstream owner (PRD §5.5 / GTM)
- [x] §4 explicitly names out-of-scope items (CRM replacement, fund disbursement, legal advice)
- [x] Nothing here describes *how* to build it — architecture lives in [sdd-ciel.md](sdd-ciel.md)
- [x] Every load-bearing number traces to [evidence-ciel.md](evidence-ciel.md)
