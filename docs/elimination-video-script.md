# Elimination Round — Video Demo Script (1–3 minutes)

**Project:** Ciel — AI-native Impact Operating System  
**Target length:** 2 minutes 15 seconds (fits 1–3 min requirement)  
**Format:** Screen recording + voiceover (or live presenter + slides)  
**Rubric alignment:** Innovation & creativity (30%) · Execution (30%) · Relevance & feasibility (20%) · Theme (10%) · Impact (10%)

> **Before recording:** Deploy or run locally with demo data seeded (`python -m ai_service.scripts.seed_evidence`). Have one real PH social need ready (e.g., youth unemployment in a municipality).

---

## Shot list & script

| Time | Visual | Voiceover / on-screen text |
|------|--------|----------------------------|
| **0:00–0:12** | Title card: **Ciel** logo + tagline *From pilot to scale.* | "Social organizations find problems every day — but most pilots never scale. **Ciel** is the missing operating layer between need identified and solution scaled." |
| **0:12–0:22** | Hackathon Theme #2 slide: fragmented pathway graphic | "**Theme #2** asks: how might AI turn identified social needs into context-aware solutions that can be implemented and scaled? Ciel answers that end-to-end." |
| **0:22–0:45** | Screen: **Need Intake** — type a plain-language need (e.g., *"High youth unemployment in our municipality"*) | "Maria, an NGO program manager, describes the need in plain language — no consultant, no blank logframe." |
| **0:45–1:15** | Screen: **ToC Studio** — AI generates Theory of Change; show cited evidence chips + one "intelligent failure" prompt | "Ciel interrogates root causes and produces a rigorous Theory of Change — **every outcome cites evidence**. It also surfaces what failed in similar contexts, so teams don't repeat pilotitis." |
| **1:15–1:35** | Screen: Lock ToC → **Grant Workspace** — funder-matched draft with KPI alignment | "Lock the logic model, and Ciel drafts a **compliance-ready grant proposal** aligned to the funder's KPIs — grounded in the ToC, not generic AI slop." |
| **1:35–1:55** | Screen: **Project Dashboard** — indicator trending; **Scale / Adapt / Stop** signal fires | "Field data feeds a **predictive M&E loop**. When assumptions breach, Ciel recommends scale, adapt, or stop — *before* the grant runs out." |
| **1:55–2:05** | Quick architecture flash (PoC diagram): Vercel → Cloud Run → Foundry → Supabase | "Built on Next.js, a Python AI service on Cloud Run, Microsoft Foundry for grounded generation, and Supabase — deployable today." |
| **2:05–2:15** | Closing card: problem → design → fund → prove → scale | "**Ciel**: design a fundable program in an afternoon — and know in time whether to scale. Thank you." |

---

## Rubric talking points (weave into delivery)

| Criterion | Weight | What to show / say |
|-----------|--------|-------------------|
| Theme relevance | 10% | Explicit Theme #2 quote + need→solution→scale arc |
| Innovation & creativity | 30% | Unclaimed category (Impact OS, not CRM); intelligent failure; scale/adapt/stop signals |
| Impact | 10% | Pilotitis problem; Return on Mission; field reach (SMS/offline) |
| Execution | 30% | Live prototype walkthrough; cited evidence; working grant + M&E slice |
| Relevance & feasibility | 20% | PH-first (LGU/NGO beachhead); freemium entry; stack is real and deployed |

---

## Production checklist

- [ ] 1080p screen capture at 1.25× zoom for readability
- [ ] Voiceover recorded separately or clear live audio
- [ ] No secrets / API keys visible in browser or terminal
- [ ] Total runtime between **1:00 and 3:00**
- [ ] Export MP4; filename: `Ciel-Elimination-Demo.mp4`
- [ ] Optional: attach public GitHub repo link per [hackathon-guide.md](hackathon-guide.md) §7

---

## Alternate 1-minute cut

If time is tight, drop Grant Workspace (1:15–1:35) and architecture flash (1:55–2:05). Keep: problem → need intake → ToC with citations → M&E signal → closing tagline (~60 s).
