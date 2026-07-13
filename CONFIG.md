# CONFIG.md — Technical Architecture & Environment Configuration

## I. Technology Stack
* **Framework:** Next.js 14+ (App Router) utilizing static generation for maximum speed and SEO [source: 2, 3].
* **Styling:** Tailwind CSS with brand design tokens mapped as CSS variables [source: 3].
* **Animation Engine:** Framer Motion for layout transitions/FLIP filtering, combined with GSAP (`ScrollTrigger`) and `@studio-freight/lenis` for smooth inertial scrolling and declarative parallax [source: 2, 3].
* **Icons:** Lucide React (`lucide-react`) utilizing single-weight line icons with 1.5px stroke [source: 2].
* **Deployment:** Vercel CDN targeted for custom domain `drievu.com` [source: 2, 3].

## II. Typography & GDPR Font Governance
* **Self-Hosted Variable Fonts:** Import `Hanken_Grotesk` and `IBM_Plex_Sans` exclusively via `next/font/google` with `display: 'swap'` [source: 2, 4].
* **Strict Weight Loading:** In `/src/app/layout.tsx`, load ONLY weights `["400", "500"]`. Do not bundle weights 600, 700, or 800.
* **Why Self-Host?** Both fonts use the SIL Open Font License [source: 4]. Serving them locally through Next.js eliminates third-party network requests to Google servers, preventing GDPR compliance violations during public-sector procurement audits [source: 2, 4].

## III. Safe-Area Navigation Clearance
* **The Layout Rule:** The global navbar (`GlobalNavbar.tsx`) is fixed at the top of the viewport.
* **Clearance Offset:** All main route containers and full-bleed hero wrappers MUST apply `pt-28 md:pt-36` (or `flex-col justify-between pt-32`) to guarantee that H1 headlines never collide with or render behind the navigation bar.

## IV. Performance Budgets & Core Web Vitals
* **Targets:** Largest Contentful Paint (LCP) under 2.5s on 4G connections; Cumulative Layout Shift (CLS) under 0.1; Interaction to Next Paint (INP) under 200ms [source: 2, 3].
* **JS Bundle:** Total first-load JavaScript must remain under 200KB gzipped [source: 2, 3]. Animation libraries must be code-split per route [source: 2, 3].

## V. Mandatory Reduced-Motion Compliance
* **Rule:** Accessibility is non-negotiable [source: 3]. The application must listen for `@media (prefers-reduced-motion: reduce)` [source: 2, 3, 10].
* **Execution:** When reduced motion is detected, GSAP `ScrollTrigger` scrubs, Lenis inertia, parallax drift, and image zoom reveals MUST instantly deactivate [source: 2, 3, 10]. All state transitions collapse to simple 0ms–200ms opacity cross-fades, and numerical counters must render their final values instantly [source: 2, 3, 10].
