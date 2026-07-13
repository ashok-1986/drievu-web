# DESIGN.md — Design System Tokens & UI/UX Pro Max Motion Laws

## I. Procurement-Safe Color Palette
* `--teal` (`#008080` | `bg-brand-teal`): Primary brand color. Logo accents, primary CTA buttons, active state indicators, and key numerical highlights [source: 4]. Passes WCAG AA contrast on white for normal text [source: 2, 4].
* `--slate` (`#1F2A2E` | `bg-brand-slate`): All body copy, structural headings, and dark section canvases [source: 4]. Serious and procurement-safe; never use pure black (`#000000`) [source: 4].
* `--green` (`#4CAF7D` | `bg-brand-green`): ESG, telemetry, and live system status accent [source: 4]. **WCAG Warning:** Fails AA contrast on white for small text [source: 2, 4]. Use strictly for large display numerals, borders, glowing indicator dots, and icons—never for body copy [source: 2, 4].
* `--grey` (`#6B7A7A` | `bg-brand-grey`): Secondary text, captions, metadata, borders, and table dividing lines [source: 4].
* `--mist` (`#EEF3F2` | `bg-brand-mist`): Light background tints for cards, table rows, and alternating section bands [source: 4].
* `--paper` (`#FFFFFF` | `bg-brand-paper`): Base website canvas [source: 4].

## II. Typography Utility Hierarchy (Weight 500 Ceiling)
Because weights above 500 are banned, implement hierarchy strictly through optical styling:
* **Display Hero H1:** `font-display font-medium text-[clamp(2.75rem,8vw,8rem)] leading-[0.92] tracking-[-0.04em] text-brand-slate uppercase select-none`
* **Section Header H2:** `font-display font-medium text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-brand-slate`
* **Card Title H3:** `font-display font-medium text-lg md:text-xl text-brand-slate tracking-tight`
* **Body Regular:** `font-body font-normal text-base text-brand-slate/85 leading-relaxed`
* **Micro-Label / Telemetry:** `font-display font-medium text-xs uppercase tracking-widest text-brand-teal`
* **Technical Spec / SKU:** `font-mono font-medium text-sm text-brand-slate`

## III. UI/UX Pro Max & Emil Kowalski Engineering Laws
1. **Sub-300ms Custom Easings:** Sluggish system transitions (`transition: all 300ms ease`) are banned [source: 6, 11]. Use high-precision cubic-bezier deceleration curves: `transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]` [source: 2, 11].
2. **Instant Tactile Press States:** Every interactive button, category card, and configurator pill must trigger instant physical feedback on pointer down (not click release): apply `active:scale-[0.97]` [source: 6, 11].
3. **Cross-Fade State Morphs:** When layout containers or imagery change states (e.g., sector tabs or interactive stage views), bridge the transition using a rapid cross-fade with subtle blur (`filter: blur(2px)`) to eliminate layout snapping [source: 11].
4. **Origin-Aware Scaling:** Any floating popover, tooltip, or expanding card must animate from its exact origin point (`transform-origin: var(--trigger-origin)`) [source: 6, 11].

## IV. Signature Animation Vocabulary
* **Word-Stagger Hero:** Headline words translate-Y from `100%` to `0%` inside clipped overflow containers (`duration: 800ms`, `stagger: 60ms`, `ease: cubic-bezier(0.16, 1, 0.3, 1)`) [source: 2].
* **DB Longbow Curtain Unmask:** 100vh imagery reveals on scroll via CSS clip-path wipe: `clip-path: inset(100% 0 0 0)` -> `inset(0 0 0 0)` combined with subtle image scale deceleration (`scale: 1.15` -> `1.0`) [source: 3].
* **Process Line Draw:** Horizontal process lines connect via SVG `stroke-dashoffset` drawing left-to-right as the section enters the viewport (`duration: 1500ms`, `ease: power2.inOut`) [source: 2].
* **Declarative Parallax Engine:** Use global `data-speed` attributes (`data-speed="0.85"` for slow background drift; `data-speed="1.15"` for faster foreground floating elements).
* **FLIP Sector Filtering:** Portfolio grids use Framer Motion `layout` props to execute smooth 350ms FLIP (First, Last, Invert, Play) positional animations when filtering by sector [source: 2, 3].
