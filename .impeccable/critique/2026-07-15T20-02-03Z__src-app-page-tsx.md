---
target: the website (homepage anchor)
total_score: 34
p0_count: 0
p1_count: 1
timestamp: 2026-07-15T20-02-03Z
slug: src-app-page-tsx
---
# Critique — Drievu marketing site (homepage anchor, site-wide)

Method: ⚠️ DEGRADED single-context (harness policy: sub-agents not spawned unless user-requested). Evidence: static source review + deterministic detector. No live browser-overlay pass (no dev server running).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Form handles submission states clearly with timeout/API failure UI and assistive alerts |
| 2 | Match System / Real World | 4 | Plain-English front-of-house copy, jargon-free; strong |
| 3 | User Control and Freedom | 3 | Form back/cancel present; mobile menu dismissable |
| 4 | Consistency and Standards | 3 | BentoGrid uses raw Tailwind hues (emerald/amber/indigo) + slate-x off the brand token system; border-l-4 breaks discipline |
| 5 | Error Prevention | 3 | Typed/constrained inputs + required; no format validation for email/postcode beyond type |
| 6 | Recognition Rather Than Recall | 4 | Visible labeled options, prefilled defaults, session hydration from system-builder |
| 7 | Flexibility and Efficiency | 3 | Smart defaults + cross-page spec carryover; no shortcuts (fine for brand) |
| 8 | Aesthetic and Minimalist Design | 3 | Disciplined; faint multi-hue bento tints slightly muddy the system |
| 9 | Error Recovery | 4 | Robust form validation, field-level error mapping, and graceful recovery from network timeouts |
| 10 | Help and Documentation | 3 | Contextual helper text, "what happens next," no-obligation reassurance |
| **Total** | | **34/40** | **Strong — solid foundation, address minor weak areas** |

## Anti-Patterns Verdict

Does this look AI-generated? Mostly no. The committed 500-weight ceiling, the procurement-safe token palette, the custom cubic-bezier easings, and the genuinely well-structured multi-step form read as intentional engineering, not a template. It passes the brand slop test at the system level.

Deterministic scan (detect.mjs, 6 hits):
- **Real — side-stripe ban:** `border-l-4 border-brand-teal` at src/app/page.tsx:46 (due-diligence note). Absolute ban; classic AI tell.
- **False positives (4):** `gray-on-color` in BentoGrid.tsx:72/87/102/117 — flagged as text-slate-900 on bg-emerald/amber/indigo/teal-950, but the backgrounds carry `/5` opacity (near-white tints). Contrast is actually fine.
- **Low-severity:** `layout-transition` width/height in morphing-cursor.tsx:122 — intentional for a morphing cursor; minor perf note.

## What's Working

1. **The consultation funnel is the strongest surface.** 3-step progressive disclosure, sensible pre-filled defaults, session-storage hydration from the system-builder, keyboard-operable Tactile cards (role/tabIndex/onKeyDown), and a real success state with next-steps. This is well above marketing-site baseline.
2. **Design-system discipline.** Tokenized palette, enforced 500-weight ceiling, consistent TactileLink primitive, unified easing curve, global reduced-motion base rule. The site practices the engineering rigor it claims.
3. **Trust engineering for procurement buyers.** The honest due-diligence disclaimer (prior-role project attribution, company-number transparency) is exactly right for risk-averse institutional buyers.

## Priority Issues


**[P1] `brand-grey` caption text fails AA contrast.** `--brand-grey #6B7A7A` on white is ~4.2:1, under the 4.5:1 required for the small `text-xs` captions/helper text it's used for throughout (card subtitles, form hints, footer). On `--brand-mist` it's marginally worse. DESIGN.md flags green but not grey. Fix: darken the grey used for small text toward slate, or reserve #6B7A7A for ≥18px only. Command: `/impeccable audit` then `/impeccable colorize`

**[P2] BentoGrid palette drift.** Cards introduce emerald/amber/indigo/teal-950 tints and raw slate-300/500/600 rather than the documented teal/slate/green/grey/mist tokens — contradicting the "disciplined color usage" principle. And at `/5` opacity the hue-coding is nearly invisible, so it adds inconsistency with no perceptible payoff. Fix: collapse to brand tokens (mist/paper surfaces, slate text), or make the hue-coding intentional and visible. Command: `/impeccable colorize`

**[P2] Weak/removed focus indicators.** Inputs use `focus:outline-none` replaced only by a subtle `focus:border-brand-teal` color change; the sector/system selection cards have no visible focus ring at all. Keyboard users lose track of position. Fix: visible focus ring (`focus-visible:ring-2 ring-brand-teal ring-offset-2`) on all inputs and selectable cards. Command: `/impeccable audit`

**[P2] Side-stripe border (absolute ban).** `border-l-4` on the homepage due-diligence note. Fix: full 1px border or a mist background tint; lead with the "DUE DILIGENCE NOTE" label instead. Command: `/impeccable polish`

## Persona Red Flags

**Jordan (First-Timer):** Mostly served well — plain English, clear steps. Minor: theatrical microcopy ("Encrypting & Routing…", "Transmission Confirmed", "Scoping Blueprint") may read as jargon to a non-technical facilities manager.

**Sam (Accessibility):** Two real blocks — sub-4.5:1 grey caption text and missing/weak focus indicators on inputs and selection cards. Keyboard operation exists but isn't visible.

**Riley (Stress Tester):** Network failures trigger clear assistive alerts and timeout boundaries. Postcode and email validation rules are enforced. Refresh mid-form correctly restores progress from session drafts.

## Minor Observations

- Reduced-motion: global CSS zeroes durations and BentoGrid guards on `prefers-reduced-motion`, but verify JS-driven reveals (ScrollReveal/ProseReveal/SplitTextReveal via GSAP/Framer) don't gate content visibility — a scroll-reveal that never fires on a headless/hidden tab ships the section blank.
- Confirm a single semantic `<h1>` exists on the homepage (CanvasHero) and that `<h2><SplitTextReveal/></h2>` wrappers aren't producing empty or nested headings.
- `.next/` build output is committed to git — add to `.gitignore`.

## Questions to Consider

- Do the bento hue-tints earn their palette exception, or is one calm teal/slate/mist system more convincing for a procurement buyer?
- Is the technical-theatre microcopy building trust with a facilities director, or performing for an engineer?
