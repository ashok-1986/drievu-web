# Design System: Drievu — Master (Source of Truth)

> Generated for the `ui-ux-pro-max` hierarchical retrieval pattern. This file is a
> navigation layer over the project's real source of truth — it does not replace
> [`DESIGN.md`](../DESIGN.md), [`src/app/globals.css`](../src/app/globals.css),
> [`tailwind.config.ts`](../tailwind.config.ts), or [`src/lib/physics.ts`](../src/lib/physics.ts).
> When any of those change, update this file to match — never the other way round.
>
> Page-specific deviations live under [`pages/`](pages/) and override this file for
> that page only. If no page file exists, this Master applies exclusively.

## Product Context

Drievu Limited — B2B marketing site for security, life-safety, and smart-building
systems (CCTV, access control, energy monitoring, structured cabling). Audience is
risk-averse procurement teams and facilities managers at institutional sites, plus
SMB owners for single-site work. Every page funnels toward booking a Scoping Review
at `/consultation`. Full detail: [`PRODUCT.md`](../PRODUCT.md).

## Style

**Bold, technical, procurement-safe** — not a startup SaaS template, not a generic
marketplace. The site itself demonstrates engineering rigor through motion quality
(canvas hero, GSAP scroll choreography, tactile press states), not through hype copy.

**Explicit anti-patterns** (see [`PRODUCT.md`](../PRODUCT.md#anti-references)):
gradient text, hero-metric templates, cream/sand AI-default palettes, uppercase
tracked eyebrows on every section, identical icon-grid cards, fabricated proof
points (badges, testimonials, case studies without real projects behind them).

## Colors — Procurement-Safe Palette

| Token | Hex | Use |
| --- | --- | --- |
| `--color-brand-teal` | `#008080` | Primary CTA, active states, key numerals |
| `--color-brand-teal-deep` | `#006666` | Hover/pressed state for teal CTAs and icon badges |
| `--color-brand-slate` | `#1F2A2E` | Body copy, structural headings, dark canvases |
| `--color-brand-green` | `#4CAF7D` | ESG/telemetry accents only — **fails AA on white for small text**, never body copy |
| `--color-brand-grey` | `#6B7A7A` | Secondary text, captions, dividers |
| `--color-brand-grey-light` | `#A6AFAF` | Secondary/muted text on dark (`brand-slate`) surfaces only |
| `--color-brand-mist` | `#EEF3F2` | Light tints, card/table backgrounds |
| `--color-brand-paper` | `#FFFFFF` | Base canvas |
| `--color-brand-dark` | `#141C1F` | Deepest dark canvas |

> **2026-07-16 fix:** `teal-deep` and `grey-light` were used as Tailwind classes in
> `BentoGrid.tsx`, `GlobalNavbar.tsx`, and `InteractiveSystemBuilder.tsx` for months
> without ever being defined in `tailwind.config.ts` — Tailwind silently drops
> undefined utility classes, so icon badges, hover states, and secondary text across
> the homepage and navbar rendered colorless in production. Now wired through
> `globals.css` → `tailwind.config.ts` like every other brand color.

Full palette incl. semantic surface mapping: [`src/app/globals.css:5-25`](../src/app/globals.css).

## Typography — Weight 500 Ceiling

- **Display / headings:** Hanken Grotesk (`--font-display`)
- **Body:** IBM Plex Sans (`--font-body`)
- **Technical / SKU:** IBM Plex Mono (`--font-mono`)
- **Hard rule:** no weight above 500, anywhere. Hierarchy comes from optical scale
  and tracking (`tailwind.config.ts` clamps `bold`/`semibold` to 500 programmatically).

Full utility hierarchy (H1–micro-label): [`DESIGN.md § II`](../DESIGN.md).

## Motion — Emil Kowalski Engineering Laws

Canonical constants live in [`src/lib/physics.ts`](../src/lib/physics.ts):

- `SPRING_TACTILE` (`stiffness: 500, damping: 35`) — button/card press and hover
- `SPRING_GLIDER` (`stiffness: 450, damping: 30`) — layoutId tab/pill transitions
- `EASING_OUT_EXPO` (`[0.16, 1, 0.3, 1]`) — rapid entrance, snappy deceleration
- `EASING_REVEAL` (`[0.25, 0.1, 0.25, 1]`) — scroll-triggered section reveals

Rules already enforced in shared primitives ([`MotionPrimitives.tsx`](../src/components/motion/MotionPrimitives.tsx)):
1. Every pressable element gets `active:scale-[0.97]` (or `0.98` for large surfaces) — instant tactile feedback, never `scale(0)` on entry.
2. UI transitions stay under 300ms; use the custom cubic-bezier curves above, never bare `ease-in`.
3. State morphs (sector tabs, glider pills) cross-fade via `layoutId`, not layout snapping.
4. Global `prefers-reduced-motion: reduce` handling is already wired in [`globals.css:58-64`](../src/app/globals.css) — new animation code doesn't need to re-implement this, but should avoid large positional motion regardless.

**When adding new interactive components:** reuse `TactileButton` / `TactileLink` /
`Tactile` / `GliderTab` / `GliderPill` from `MotionPrimitives.tsx` rather than
hand-rolling new press/hover physics — that's how the 0.97/0.98 scale and spring
values stay consistent site-wide.

## Layout

- `--navbar-height-desktop: 80px`, `--hero-top-padding: 144px` (absorbs navbar + 64px clear gap) — see [`globals.css:39-41`](../src/app/globals.css).
- Border radius scale: `sm 8px / md 12px / lg 16px / xl 24px / 2xl 32px` (`tailwind.config.ts`).
- Shadows: `soft` and `elevated` only — no ad-hoc box-shadow values.

## Accessibility Checklist (apply to every new component)

- [ ] 4.5:1 text contrast minimum — `brand-green` is exempt from body text entirely
- [x] Touch targets ≥ 44×44px (`GliderTab`/`GliderPill` use `py-3.5` at `text-xs`, landing at 44px rendered height)
- [ ] `cursor-pointer` + visible `:active` state on every clickable element
- [ ] `focus-visible:ring-2 ring-brand-teal` on all interactive elements (already the default in `TactileButton`/`TactileLink`)
- [ ] Mouse-only decorative interactions (e.g. `MagneticText` in `morphing-cursor.tsx`) gated to `/demo`-style contexts, not shipped on funnel pages
- [ ] No emoji icons — SVG only (Heroicons/Lucide pattern already in use)

## How to Use This File

1. Building a new page? Check `pages/<page>.md` first — if it exists, its rules
   override this Master for that page only.
2. No page file? This Master applies exclusively.
3. Adding a new page-specific deviation? Create `pages/<page>.md` documenting only
   the delta from this Master — don't restate the whole system.
