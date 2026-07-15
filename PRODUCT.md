# Product

## Register

brand

## Users

Both small/mid business owners and enterprise/institutional buyers book a "Scoping Review," weighted toward the enterprise end: facilities managers, procurement teams, and project leads at large institutional sites (stadiums, metros, airports, hospitals, factories) evaluating security and building-systems integrators for major projects. SMB owners come through the same funnel for single-site CCTV/access-control work. All are risk-averse B2B buyers comparing vendors on credibility and technical competence, not price alone — they arrive via search, referral, or a specific sector/system page and need to be convinced enough to book a scoping call.

## Product Purpose

Drievu Limited's marketing site exists to generate qualified leads for security and building-systems integration work (CCTV, access control, energy monitoring, structured cabling, and related systems) by demonstrating engineering credibility, guiding visitors through sector- and system-specific content, and funneling every page toward the `/consultation` booking form. Success is a booked Scoping Review from a buyer who already trusts the firm's technical seriousness before the call starts.

## Brand Personality

Bold, technical, cutting-edge — the site itself is proof of engineering capability, not just a claim of it. The motion-rich, physics-driven interaction language (canvas hero, GSAP scroll choreography, tactile press states, FLIP filtering) is a deliberate differentiator: a security-systems firm whose website behaves like precision hardware. This sits alongside (not against) the existing procurement-safe governance in DESIGN.md/AGENTS.md — bold and technical, but never hype-driven or fabricated. No fake accreditations, case studies, or testimonials; confidence comes from real, verifiable engineering.

## Anti-references

Generic SaaS/startup landing-page tropes: gradient text, the hero-metric template, cream/sand AI-default palettes, tiny uppercase tracked eyebrows on every section, identical icon-grid cards. This is an established engineering firm's site, not a startup pitching a product demo. Front-of-house copy stays jargon-free (banned-terms table in AGENTS.md) even as the visual language stays technical and bold.

## Design Principles

- **Show, don't tell**: motion and interaction quality (canvas hero, scroll choreography, tactile physics) demonstrate engineering rigor rather than asserting it in copy.
- **Procurement-safe boldness**: bold and technical in visual execution, but every claim traceable to real projects — no fabricated proof points, ever (see AGENTS.md governance).
- **Plain English at the front door, technical depth on demand**: 12th-grade language on front-of-house pages; jargon permitted and explained on `/systems/[category]` depth pages.
- **One funnel**: every page's ultimate job is to move a visitor toward booking a Scoping Review at `/consultation`.
- **Restraint as credibility**: the font-weight-500 ceiling and disciplined color usage (teal for action, slate for substance, green used sparingly for live/ESG signals) read as engineering discipline, not stylistic limitation.

## Accessibility & Inclusion

Standard WCAG AA. Existing DESIGN.md flags `--green` as failing AA contrast on white for small text — keep it restricted to large display numerals, borders, and icons. `prefers-reduced-motion` must disable Lenis smooth scroll, zero out GSAP timelines, and remove Framer Motion spring animations across all motion primitives (already implemented per AGENTS.md).
