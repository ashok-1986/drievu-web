# AGENTS.md — Drievu Web Project

## Quick Reference

**Project**: Drievu Limited marketing website — Next.js 14 (App Router) + TypeScript + Tailwind CSS  
**Package Manager**: pnpm (v10+)  
**Node**: >=18.17.0  
**Fonts**: Hanken Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (mono) — self-hosted via `next/font/google`  
**Deployment**: Vercel (automatic on push to `main`)

---

## Core Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server (`next dev`) |
| `pnpm build` | Production build (`next build`) — must pass before deploy |
| `pnpm start` | Run production server (`next start`) |
| `pnpm lint` | Run ESLint (`next lint`) |
| `pnpm type-check` | TypeScript check (`tsc --noEmit`) — **run before commit** |

> **Always run**: `pnpm type-check` before committing. Build must pass locally before pushing.

---

## Architecture Overview

```
src/
├── app/                    # Next.js App Router pages
│   ├── (root)/             # Homepage (/)
│   ├── sectors/            # /sectors — sector landing page
│   ├── track-record/       # /track-record — leadership portfolio
│   ├── system-builder/     # /system-builder — interactive estimator
│   ├── consultation/       # /consultation — lead capture form
│   ├── compliance/         # /compliance — SLA & standards hub
│   ├── systems/[category]/ # Dynamic system detail pages
│   └── (legal)/            # privacy, terms, demo
├── components/
│   ├── common/             # GlobalNavbar, GlobalFooter, ParallaxEngine
│   ├── home/               # CanvasHero, BentoGrid, InteractiveSystemBuilder
│   ├── motion/             # MotionPrimitives (Tactile, Glider, ScrollReveal, etc.)
│   ├── consultation/       # ConsultationIntake
│   └── ui/                 # shadcn-style primitives (if any)
├── lib/
│   ├── physics.ts          # SPRING_TACTILE, SPRING_GLIDER, EASING constants
│   ├── client.ts           # useReducedMotion, useIsClient, storage utils
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
```

---

## Governance Rules (Non-Negotiable)

### 1. Font-Weight Ceiling
- **Maximum: `font-normal` (400)** — Never use `font-medium` (500), `font-semibold` (600), `font-bold` (700), `font-extrabold` (800), `font-black` (900)
- Visual hierarchy achieved via: size scaling (`clamp()`), letter-spacing (`tracking-tight` / `tracking-widest`), color contrast, layout

### 2. Two-Layer Language Rule
- **Front-of-house pages** (`/`, `/sectors`, `/track-record`, `/system-builder`, `/compliance`): **12th-grade plain English only** — zero jargon
- **Depth pages** (`/systems/[category]`): Technical jargon allowed (BS EN codes, bitrates, IP ratings) — explain on first use

### 3. Absolute Truth Governance
- **Never fabricate**: No fake accreditations, SLAs, case studies, testimonials, or insurance figures
- **Canonical identity**: `Apartment 3, Minotaur House, 3 Thunderer Walk, London SE18 6LH` | Company No. `15479482` | `+44 7442 605205`
- **Leadership portfolio** (real projects only): Wankhede Stadium, BARC Mumbai, Ahmedabad Airport, Kolkata/Nagpur Metros, GIFT City, Saint-Gobain, Honda Factory, Altair Towers
- **Mandatory disclaimer** on every portfolio display:
  > "Note: National-infrastructure projects listed were delivered by members of Drievu's leadership team over the past two decades in prior executive roles. Drievu Limited was incorporated in the UK in 2024 (Company No. 15479482)."

### 4. Banned Terms (Front-of-House)
| Banned | Use Instead |
|--------|-------------|
| IP67 | "Weather-proof outdoor cameras" |
| PoE | "One cable for power and video" |
| NVR | "On-site video recorder" |
| H.265+ | "Efficient video storage" |
| BS EN 50131 | "British safety standards" |
| Cat6a | "High-speed wiring" |
| Bitrate | "Video quality" |
| CT-Clamp | "Smart energy monitor" |

---

## Lead Generation Funnel

**Every page → `/consultation`** (Scoping Review booking form)

1. **Homepage** → "Book a Scoping Review" / "Try Interactive Estimator"
2. **System Builder** (`/system-builder`) → Pre-populates form via `sessionStorage`
3. **Sectors page** → Sector-specific CTAs
4. **Compliance page** → SLA anchor link (`/compliance#sla`) & CTA to `/consultation`
5. **Track Record** → Portfolio CTAs

---

## Animation System

| Layer | Tool | Purpose |
|-------|------|---------|
| Micro-interactions | Framer Motion (`MotionPrimitives.tsx`) | `Tactile` (tap scale 0.98), `Glider` (layoutId), `ScrollReveal` (GSAP ScrollTrigger) |
| Scroll-driven canvas | Raw Canvas 2D + `requestAnimationFrame` | Hero day→night transition (CanvasHero) |
| Smooth scroll | Lenis (`@studio-freight/lenis`) | 1.2s duration, cubic ease-out |
| Reduced motion | `prefers-reduced-motion` | Disables Lenis, sets GSAP timeScale=0, instant transitions |

**Physics Constants** (`src/lib/physics.ts`):
```ts
SPRING_TACTILE = { type: "spring", stiffness: 500, damping: 35, mass: 1 }
SPRING_GLIDER  = { type: "spring", stiffness: 450, damping: 30, mass: 0.8 }
EASING_OUT_EXPO = [0.16, 1, 0.3, 1]  // rapid entrance, soft decel
EASING_REVEAL   = [0.25, 0.1, 0.25, 1]
```

**Reduced motion**: All motion primitives check `prefers-reduced-motion` and disable animations.

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/lib/physics.ts` | Spring/easing constants — single source of truth |
| `src/lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) |
| `src/components/motion/MotionPrimitives.tsx` | `Tactile`, `TactileLink`, `Glider`, `ScrollReveal`, `TactileButton`, `OriginAccordion` |
| `src/components/home/CanvasHero.tsx` | 3-layer canvas day→dusk→night scroll scrub (300vh runway) |
| `src/components/home/BentoGrid.tsx` | Asymmetric 12-col grid with GSAP entrance |
| `src/components/home/InteractiveSystemBuilder.tsx` | 5-input estimator with live math + sessionStorage sync |
| `src/components/common/GlobalNavbar.tsx` | z-[50] sticky header, Lenis disabled on `/`, GliderTab mobile nav |
| `src/app/compliance/page.tsx` | SLA hub + British Standards grid + 4-hr SLA matrix |

---

## Design System Tokens

| Category | Key Tokens |
|----------|------------|
| **Colors** | `brand.teal` `#008080`, `brand.slate` `#1F2A2E`, `brand.paper` `#FAFAF9`, `brand.mist` `#EBF0F2`, `brand.grey` `#708088`, `brand.green` `#2E9960` |
| **Borders** | `1px` luminescence: `brand.border-dark` (white/12%), `brand.border-light` (slate/15%) |
| **Spacing** | Micro (12/16/24), Meso (32/48/64), Macro (80/112/144) |
| **Radius** | `sm` 8px, `md` 12px, `lg` 16px, `xl` 24px, `2xl` 32px |
| **Typography** | `font-display` (Hanken Grotesk), `font-body` (IBM Plex Sans), `font-mono` (IBM Plex Mono) |
| **Weights** | `normal` (400) — **ceiling enforced** |
| **Tracking** | `tightest` (-0.04em) → `widest` (0.1em) |

---

## TypeScript Config Notes

- `strict: false` — intentional (legacy), but `type-check` runs the project-configured type check
- `@/*` → `./src/*` path alias
- JSX: `preserve` (Next.js handles transform)

---

## Testing

- **Playwright** configured (`playwright.config.ts` if present)
- No unit test suite configured — Playwright for E2E only
- Run: `pnpm exec playwright test`

---

## Environment Variables

No `.env` required for local dev or production.
- None currently required (Node.js runtime serving pages + mock form submissions to `/api/consultation`)

---

## Common Pitfalls

| Issue | Cause | Fix |
|-------|-------|-----|
| Build fails on Vercel | pnpm-lock.yaml out of sync | Run `pnpm install` locally, commit `pnpm-lock.yaml` |
| Font not loading | `next/font` variable not applied | Check `layout.tsx` uses `hanken.variable` + `ibmPlex.variable` on `<html>` |
| Animation jank on mobile | Lenis + CanvasHero conflict | Lenis auto-disabled on `/` (homepage) via `isHome` check |
| Hydration mismatch | `window`/`document` accessed in render | Wrap in `useEffect` or use `useIsClient()` from `lib/client.ts` |
| Font weight > 500 slips in | Tailwind `font-bold` used | Use `font-medium` + size/tracking/color for hierarchy |

---

## File Locations Quick Reference

```
Configuration:
  tailwind.config.ts     → Design tokens, colors, spacing, fonts, shadows
  tsconfig.json          → Paths, JSX, module resolution
  package.json           → Scripts, deps, engines
  .gitignore             → node_modules, tsconfig.tsbuildinfo

Components:
  src/components/motion/MotionPrimitives.tsx   → Tactile, Glider, ScrollReveal, OriginAccordion
  src/components/home/CanvasHero.tsx           → Hero canvas (300vh)
  src/components/home/BentoGrid.tsx            → Asymmetric grid
  src/components/home/InteractiveSystemBuilder.tsx
  src/components/common/GlobalNavbar.tsx       → z-[100] header
  src/components/common/GlobalFooter.tsx

Pages:
  src/app/page.tsx                    → Homepage
  src/app/sectors/page.tsx              → Sectors landing
  src/app/track-record/page.tsx         → Leadership portfolio
  src/app/system-builder/page.tsx       → System builder landing
  src/app/consultation/page.tsx         → Intake form
  src/app/compliance/page.tsx           → SLA + Standards hub
  src/app/systems/[category]/page.tsx   → Dynamic system detail pages
```

---

## Key Conventions Summary

1. **Never** use `font-bold`, `font-semibold`, `font-extrabold`, `font-black`
2. **Never** use jargon on front-of-house pages
3. **Never** fabricate accreditations, SLAs, case studies, or testimonials
4. **Always** use `cn()` for class composition
5. **Always** run `pnpm type-check` before commit
6. **Always** use `headerClass` variable in GlobalNavbar (no inline ternaries)
7. **Prefer** `TactileLink` / `TactileButton` over raw `<a>`/`<button>` for consistent physics
8. **Use** `ScrollReveal` + `stagger` prop for list entrances
9. **Hero images**: 100vh, `object-cover`, `priority`, `fill` on `<Image />`
10. **Z-index scale**: canvas(0) → scrim(10) → content(20) → sticky-nav(50) → modal(100) → mobile-drawer(110)

---

## Deploy Notes

- Push to `main` → Vercel auto-deploys
- Build command: `pnpm build`
- Output: Server-rendered pages + dynamic routes (`/systems/[category]`, `/consultation`)
- No manual steps required post-merge