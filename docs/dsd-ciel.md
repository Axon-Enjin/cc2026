# Design System Document (DSD)

**System Name:** Ciel Foundation — the design system for Ciel
**Date:** 2026-06-25
**Version:** 1.0
**Owner:** Ciel Team — Create & Conquer 2026
**Status:** Locked
**Last reconciled:** 2026-06-25
**PRD:** [prd-ciel.md](prd-ciel.md) · **Brand assets:** [`/brand`](../brand)

---

## 0. Brand Stance

> Locked before any token below. Every aesthetic choice traces back here.

**The name.** *Ciel* — French for "sky," pronounced *ci-yel*. The metaphor is the whole product: lifting a social intervention from ground-level, donor-dependent **pilots** up to sustained, scaled **altitude**. Sky = *clarity* (see the whole system), *elevation* (break the ceiling that traps pilots), *horizon* (anticipatory, predictive M&E), and *shared infrastructure everyone lives under* (a public good). The signature gesture is **dawn breaking over a dark horizon** — the moment a pilot becomes a movement.

### The Three Rules

| Rule | What it demands | How Ciel satisfies it |
|---|---|---|
| **Make it relatable** | Ground every choice in a specific cultural moment/place/emotion | The palette is a **Philippine pre-dawn sky** — Sierra Madre twilight to a gold horizon over fishing boats. Typography borrows **civic-service language** (USWDS Public Sans), because this is public infrastructure, not a hype app. |
| **Make it human** | Show a person's judgment, not an algorithm's default | Display type is **Fraunces** (an optical serif with deliberate warmth) — a craft choice a generator wouldn't default to. The "intelligent failure" prompts are written in plain, kind, human language ("Here's what didn't work last time — worth a look before you commit"). |
| **Make them part of the branding** | Weave the user's real presence into the identity | The **organization's own mission statement is the hero** on its workspace; **user-submitted field photographs** become section textures; the **dawn-gold horizon line is drawn at the baseline of their actual impact charts** — their data literally becomes the brand motif. |

### Mode

- [ ] Brand Mode only  ·  [ ] Product Mode only  ·  [x] **Both**

**Selected mode:** `Both` — **Brand Mode** for the landing/pitch surface (impression-first: the dawn metaphor, big Fraunces display, image-led); **Product Mode** for the app (task-first: dense, calm dashboards, semantic states). Sections §2–§6 note which applies where.

### Aesthetic Provenance

| Question | Answer |
|---|---|
| **Specific cultural / aesthetic reference** | Philippine **pre-dawn sky over the Sierra Madre and coastal fishing communities** (deep twilight indigo → warm gold horizon), crossed with **USWDS civic signage** and the editorial restraint of impact reporting (Our World in Data / GiveDirectly annual reports). Not "modern/clean." |
| **One sentence that would NEVER appear in AI slop here** | *"We'll also tell you when to stop."* — an honest, anti-hype promise rooted in "intelligent failure." This governs the brand voice: candid, humane, never triumphalist. |
| **The archetypical user (named, specific)** | **Maria, 38, livelihood-program manager at a 25-person NGO in Cebu** — builds logframes after her kids are asleep, fluent in Excel and Facebook, burned once by a Salesforce rollout. (See PRD §2.) |
| **The slop default for this category** | Indigo→violet gradient hero, Inter everywhere, a glassmorphism dashboard screenshot, floating abstract "AI orbs," and a stock photo of a smiling foreign volunteer. Precisely what Ciel will not produce. |
| **How users appear in the brand** | The org's mission statement as the workspace hero; field workers' own photos as textures; their real impact data forming the horizon-line motif. |

### Anti-References

| Anti-reference | Why it's forbidden here |
|---|---|
| Generic AI-SaaS hype aesthetic (indigo gradient + glowing orbs) | Ciel must read as **trustworthy civic infrastructure**, not a disposable startup — trust is the entire B2G/NGO sale. |
| Enterprise CRM density (Salesforce/Blackbaud admin screens) | That over-engineered complexity is the exact pain Ciel exists to remove ([evidence B2](evidence-ciel.md)); imitating it would betray the thesis. |
| "Voluntourism"/savior imagery (outsiders as heroes) | The **local organization is the hero**, not a benefactor. Imagery centers the community and the frontline worker. |

---

## 1. Design Philosophy & Vision

**Core aesthetic:** Calm civic editorial. Generous negative space, a dusk-to-dawn palette, one warm gold accent doing the emotional work, restrained data-dense surfaces. Premium through restraint, not decoration.

**Emotional intent:** A frontline worker should feel *capable and in control* — the opposite of the overwhelm a legacy CRM produces. Trust first, delight second.

**Aesthetic references:** Our World in Data (honest data restraint), USWDS (civic legibility), Stripe docs (calm density), Linear (quiet product polish) — filtered through the Philippine-dawn palette.

**What this system explicitly avoids:**
- Indigo→violet gradients and glowing AI orbs
- Glassmorphism and rounded-everything for their own sake
- Auto-playing, attention-grabbing motion
- Stock "smiling volunteer" photography

---

## 2. Brand Primitives

### Colors

Palette = *twilight base + dawn-gold signature + fog neutrals + clear signal colors.* Gold is the signature accent (horizon line, highlights, logo) — **not** used as text-on-white CTA (contrast). CTAs use Horizon Blue.

**Light theme (Product Mode default):**

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#F6F8FC` | Page background (fog) |
| `--color-surface` | `#FFFFFF` | Cards, panels |
| `--color-border` | `#E3E8F2` | Dividers, input borders |
| `--color-primary` | `#2456C8` | CTAs, active states (Horizon Blue) |
| `--color-primary-hover` | `#1C46A6` | Hover |
| `--color-accent` | `#F2B450` | Dawn-gold signature: horizon line, highlights, logo |
| `--color-text` | `#0B1533` | Body copy (Twilight) |
| `--color-text-muted` | `#5A6685` | Secondary text, labels |
| `--color-success` | `#2E9E6B` | Confirmations / on-track indicators |
| `--color-warning` | `#E0922F` | Caution / assumption-at-risk |
| `--color-error` | `#D5443C` | Errors / "stop" signal |
| `--color-data` | `#3FA7C9` | Sky-cyan for charts / leading indicators |

**Dark theme (Brand Mode surfaces + dark app mode):**

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0B1533` | Twilight canvas |
| `--color-surface` | `#13224C` | Panels on dark |
| `--color-border` | `#26365F` | Dividers on dark |
| `--color-text` | `#EAF0FF` | Text on dark |
| `--color-text-muted` | `#9FB0D6` | Muted on dark |
| `--color-accent` | `#F2B450` | Dawn gold (unchanged — the through-line across themes) |

**Contrast check (WCAG):** `#0B1533` on `#F6F8FC` ≈ 16:1 (AAA); white on `#2456C8` ≈ 6.0:1 (AA for normal text); `#5A6685` on `#FFFFFF` ≈ 5.3:1 (AA). Gold `#F2B450` is decorative/large-text only on dark, never small text on white.

### Typography

A deliberate, meaningful pairing — not Inter.

| Role | Font | Weight | Size | Line Height |
|------|------|--------|------|-------------|
| Display / H1 | Fraunces (opt. serif) | 600 | 48px (brand) / 32px (app) | 1.1 |
| Heading 2 | Fraunces | 600 | 28px | 1.2 |
| Heading 3 | Public Sans | 600 | 20px | 1.3 |
| Body | Public Sans | 400 | 16px | 1.6 |
| Small / Caption | Public Sans | 400 | 13px | 1.5 |
| Mono / Code / Data | JetBrains Mono | 400 | 13px | 1.5 |

**Why:** *Fraunces* = warmth + craft (the "human" rule); *Public Sans* = USWDS civic legibility (the "relatable/public-good" rule); *JetBrains Mono* for data, IDs, and SMS codes.
**Font loading:** Google Fonts (Fraunces, Public Sans, JetBrains Mono) — `next/font` self-hosted, preloaded, `display: swap`.

### Elevation & Depth

| Level | CSS Value | Usage |
|-------|-----------|-------|
| `--shadow-sm` | `0 1px 2px rgba(11,21,51,0.06)` | Subtle cards |
| `--shadow-md` | `0 4px 12px rgba(11,21,51,0.08)` | Floating elements |
| `--shadow-lg` | `0 12px 32px rgba(11,21,51,0.12)` | Modals, overlays |

---

## 3. Layout & Spatial System

**Base unit:** `4px` — all spacing is a multiple.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight internal gaps |
| `--space-2` | 8px | Component padding |
| `--space-3` | 12px | — |
| `--space-4` | 16px | Default element spacing |
| `--space-6` | 24px | Section gaps |
| `--space-8` | 32px | Large section gaps |
| `--space-12` | 48px | Page-level spacing |

**Grid:** 12-column, max-width 1200px, 24px gutters; app uses a 240px left nav + fluid content.
**Breakpoints:** Mobile `375px` · Tablet `768px` · Desktop `1200px`. **Field Capture (PWA) is designed mobile-first at 375px and must remain fully usable offline.**

---

## 4. Core Component Specs

### Buttons

| Variant | Background | Text | Border | Hover | Disabled |
|---------|-----------|------|--------|-------|----------|
| Primary | `--color-primary` | white | none | `--color-primary-hover` | 40% opacity |
| Secondary | transparent | `--color-primary` | `--color-primary` | `--color-surface` bg | 40% opacity |
| Ghost | transparent | `--color-text` | none | `--color-surface` bg | 40% opacity |
| Destructive ("Stop") | `--color-error` | white | none | darkened error | 40% opacity |

**Border radius:** 8px · **Padding:** 10px 16px · **Font:** Public Sans 600, 14px.

### Inputs & Forms
- Border `1px solid --color-border`; radius 8px; focus ring `2px solid --color-primary, offset 2px`.
- Error state: `--color-error` border + message below. Padding `10px 12px`.
- **Field-capture inputs** show an explicit offline/queued state (badge) when no connectivity.

### Surfaces (Cards, Modals, Panels)
- Background `--color-surface`; border `1px solid --color-border`; radius 12px.
- Shadow `--shadow-md` floating / `--shadow-sm` inline. Modal backdrop `rgba(11,21,51,0.45)` blur(4px).
- **AI output surfaces carry a provenance chip** (source count or "unverified — needs human input").

### Signal component (Ciel-specific)
- Scale = `--color-success`, Adapt = `--color-warning`, Stop = `--color-error`; each shows the breached ToC assumption + recommended action. Never auto-executes.

---

## 5. Motion & Micro-interactions

**Transition default:** `all 150ms ease-in-out`.

| Interaction | Duration | Easing | Notes |
|-------------|----------|--------|-------|
| Button hover/active | 120ms | ease-out | |
| Modal open | 200ms | ease-out | fade + slight translate up |
| Modal close | 150ms | ease-in | |
| Page transitions | 180ms | ease-in-out | |
| ToC generation stream | — | linear | token-streamed text + a subtle dawn-gradient progress (the only "signature" motion) |
| Loading skeleton | 1.5s | linear | shimmer loop |

**Avoid:** anything > 400ms, intentless looping motion, motion that doesn't communicate a state change. Honor `prefers-reduced-motion`.

---

## 6. Accessibility (a11y)

- Contrast: WCAG **AA** (4.5:1 text, 3:1 UI). Verified pairs in §2.
- Focus indicators always visible; never remove `outline` without a replacement.
- Touch targets ≥ 44×44px (critical for field PWA on cheap phones).
- Full keyboard operability; semantic HTML first, ARIA only when needed.
- All non-essential animation wrapped in `@media (prefers-reduced-motion: reduce)`.
- **Bilingual-ready** copy slots (English / Filipino); never bake text into images.

---

## 7. Taste-Skill Settings

```
DESIGN_VARIANCE:    4   (restrained, coherent — civic trust over expressionism)
MOTION_INTENSITY:   2   (subtle only; one signature motion = the dawn stream)
VISUAL_DENSITY:     6   (information-dense dashboards, calm spacing)
```

**Dial guide:** variance 1=Swiss austerity→10=maximalist; motion 1=static→10=everything moves; density 1=airy→10=dashboard-dense.
**Chosen variant:** `minimalist-skill` (calm editorial product UI) with `soft-skill` cues for the Brand-Mode landing surface.
**Reason:** the product must feel trustworthy and legible to non-technical frontline staff; restraint *is* the brand.

---

## 8. Impeccable Quality Gate

### Phase: Start — Init
- [ ] `/impeccable init` to be run when the prototype repo is set up; commit PRODUCT.md / DESIGN.md alongside this DSD.

### Phase: Polish — Audit Score
*(Run `/impeccable audit src/` once the prototype UI exists. Target gate: no open P0/P1, every dimension ≥ 3.)*

| Dimension | Score (0–4) | Open P0 / P1 |
|---|---|---|
| Accessibility | TBD (prototype) | — |
| Performance | TBD | — |
| Theming | TBD | — |
| Responsive | TBD | — |
| Anti-patterns | TBD | — |

### Phase: Polish — Detected Anti-Patterns
*(Guard especially against the category slop named in §0: indigo→violet gradients, Inter-only, glassmorphism, AI-orb illustrations.)*

### Phase: Maintain — Document
**Last documented:** N/A until first prototype ship.

### Section 0 Compliance Check
- [x] **Relatable** — palette traces to the Philippine pre-dawn sky; type traces to USWDS civic language, not a generic default.
- [x] **Human** — deliberate idiosyncrasy: **Fraunces optical serif** for display + the **hand-noted "intelligent failure" voice** (an AI would default to Inter + triumphant copy).
- [x] **Part of the branding** — org mission as hero, field photos as texture, and the dawn-gold horizon line drawn at the user's own chart baseline are specified for implementation (not deferred).

---

## Brand Assets (see [`/brand`](../brand))

| Asset | File | Purpose |
|---|---|---|
| Brand-kit overview board | `brand/ciel-brandkit-overview.svg` | The premium 3×3 identity board (logo, construction, application, palette, type, tagline, atmosphere, system detail) |
| Logo construction board | `brand/ciel-logo-construction.svg` | Geometry + negative-space breakdown of the C-with-dawn mark |
| UI application board | `brand/ciel-ui-application.svg` | The ToC Studio / dashboard surface in-system |
| Logo (full) | `brand/ciel-logo.svg` | Wordmark + mark lockup |
| Logomark | `brand/ciel-logomark.svg` | App icon / favicon mark |

---

## Self-Check

- [x] §0 fully filled — no placeholders remain in Brand Stance
- [x] §0 Mode selected (Both)
- [x] §2 has exact HEX values (not "a muted blue")
- [x] §3 spacing scale consistent (multiples of 4px)
- [x] §4 defines component states incl. Disabled and Focus
- [x] §7 taste-skill dials set and a variant chosen
- [x] WCAG AA verified for primary text/background pairing (§2)
- [ ] Impeccable audit deferred until prototype code exists (documented above)
- [x] §0 Compliance Check completed — all three rules verified
- [ ] To exist in code as `next/font` + Tailwind v4 `@theme` tokens (see BUILD) — not just documentation
