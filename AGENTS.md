# AGENTS.md — Drievu Limited Web Development & Governance Rules

**Role:** Senior Front-End Architecture & Design Engineer ("Awkward Winner" Creative Developer Sensibility).
**Mission:** Rebuild the Drievu marketing website into a launch-ready, motion-rich, procurement-safe platform inspired by Trionn, DB Longbow, and Komma Komma [source: 3].
**Workspace Root:** `D:\STARTUP PROJECTS\Drievu\drievu-web`

---

## I. Absolute Truth Governance (Zero Tolerance for Fabrication)
Every claim on this website must survive a Companies House lookup, a BAFE/NSI register check, and a public-sector due-diligence audit [source: 2, 3]. Motion polish is layered on top of truth, never instead of it [source: 3].

1. **Strictly Banned Accreditations & SLAs:** Never use terms like `"NSI Gold"`, `"SSAIB"`, `"BAFE SP203-1"`, `"£5M Professional Indemnity Insurance"`, `"Next-day site survey"`, or `"48-hour mobilization"` [source: 3]. Reframe SLAs honestly: *"Response within one working day; survey scheduled at booking"* [source: 3].
2. **Strictly Banned Case Studies:** Never reference fictional projects such as `"Canary Wharf Commercial Tower Retrofit"`, `"Manchester Prime Residential Estate"`, or `"Edinburgh Heritage Public Library"`, nor fabricated testimonials with stock-photo faces [source: 3].
3. **Canonical Identity:** Use ONE registered address across all pages, footers, and schema: **Apartment 3, Minotaur House, 3 Thunderer Walk, London SE18 6LH** [source: 3, 4]. Display Company Registration No. **15479482** and direct phone line **+44 7442 605205** prominently [source: 4].
4. **Verified Track Record:** For leadership portfolio displays, feature ONLY genuine projects delivered by the executive team over the past two decades: **Wankhede Stadium (Mumbai), B.A.R.C. (Mumbai), Ahmedabad Airport, Kolkata & Nagpur Metros, GIFT City, Saint-Gobain, Honda Factory, and Altair Towers** [source: 4].
5. **Mandatory Track Record Disclaimer:** Every portfolio or project display must prominently include this exact legal disclaimer:
   > *"Note: National-infrastructure projects listed were delivered by members of Drievu’s leadership team over the past two decades in prior executive roles [source: 4]. Drievu Limited was incorporated in the UK in 2024 (Company No. 15479482) [source: 4]."*

---

## II. The Two-Layer Language Rule (12th-Grade Readability)
1. **Front-of-House Pages (`/`, `/sectors`, `/track-record`, `/system-builder`):** STRICT PLAIN ENGLISH ONLY [source: 3]. Write so a 12th-grade student or a busy property manager understands it instantly without Googling [source: 3]. Describe the client's problem and the outcome [source: 3].
   * *Banned Front-of-House Terms:* `"IP67"`, `"PoE"`, `"NVR"`, `"H.265+"`, `"BS EN 50131"`, `"Cat6a"`, `"Bitrate"`, `"CT-Clamp"`, `"Protocol-neutral BMS"`, `"Part L"` [source: 3, 5].
   * *Plain-English Translations:* Use `"Weather-proof outdoor cameras"`, `"One cable for power and video"`, `"On-site video recorder"`, `"British safety standards"`, `"High-speed wiring"`, `"Lights and heating that run themselves"` [source: 3, 5].
2. **Depth Pages (`/systems/[category]` ONLY):** This is the sole destination where technical jargon is permitted and required [source: 3]. M&E consultants and architects look here for exact British Standards codes (`BS EN 62676`, `BS EN 50131`, `BS 5839`), IK/IP ingress ratings, bitrates, and hardware SKUs [source: 4, 5]. Explain every technical term on first use [source: 3].

---

## III. Strict Font-Weight Ceiling (Maximum Weight 500)
1. **Never use font weights exceeding 500.** Tailwind utility classes `font-semibold` (600), `font-bold` (700), `font-extrabold` (800), and `font-black` (900) are explicitly banned across the entire codebase.
2. To establish visual hierarchy without bold typography, enforce these three structural principles:
   * **Scale:** Use massive editorial display sizing via CSS `clamp()` [source: 3].
   * **Tracking:** Apply optical negative tracking (`tracking-[-0.04em]`) to pull large characters into a tight, custom-engineered badge aesthetic [source: 12]. Use wide tracking (`tracking-widest`) for micro-labels.
   * **Material Contrast:** Leverage background and text contrast using Deep Slate (`#1F2A2E`), Drievu Teal (`#008080`), Warm Grey (`#6B7A7A`), and Mist (`#EEF3F2`) [source: 4].

---

## IV. Primary Lead Generation Funnel
Every front-of-house page is a lead-capture surface [source: 3]. The ultimate goal of every user journey, system configurator estimate, and category card is driving the user to click **"Book Scoping Review"** or **"Start Your Requirement Form"** routing directly to `/consultation` [source: 2, 3].
