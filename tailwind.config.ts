// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* 
       * DRIEVU DESIGN SYSTEM — COMPLETE TOKEN ARCHITECTURE
       * Strict OKLCH color space, font-weight 500 ceiling, asymmetric spacing
       */
      colors: {
        brand: {
          teal: "#008080",        // Primary interactive accent (WCAG AA on white)
          "teal-deep": "#006666", // Pressed/hover state
          slate: "#1F2A2E",       // Primary dark background, all headings
          paper: "#FAFAF9",       // Primary light background
          mist: "#EBF0F2",        // Secondary component background
          grey: "#708088",        // Secondary prose, captions, borders
          green: "#2E9960",       // Verified/success state only
          "border-dark": "rgba(255, 255, 255, 0.12)",  // 1px luminescence on dark
          "border-light": "rgba(31, 42, 46, 0.15)",    // 1px luminescence on light
        },
      },
      fontFamily: {
        display: ["var(--font-hanken)", "sans-serif"],     // Hanken Grotesk
        body: ["var(--font-ibm-plex)", "sans-serif"],      // IBM Plex Sans
        mono: ["var(--font-ibm-plex-mono)", "monospace"],  // IBM Plex Mono
      },
      fontSize: {
        "display-hero": ["clamp(2.75rem, 7vw, 6.5rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        "display-section": ["clamp(2rem, 4vw, 3.75rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        "body-prose": ["clamp(1rem, 1.1vw, 1.125rem)", { lineHeight: "1.65", letterSpacing: "-0.005em" }],
        "label-technical": ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.08em" }],
      },
      fontWeight: {
        // STRICT CEILING: Only 400 (normal) and 500 (medium) allowed
        normal: "400",
        medium: "500",
        // NO semibold (600), bold (700), extrabold (800), black (900)
      },
      letterSpacing: {
        tightest: "-0.04em",   // Display hero titles
        tighter: "-0.025em",   // Display section headers
        tight: "-0.02em",      // Display sub-headers
        normal: "-0.005em",    // Body prose
        wide: "0.08em",        // Technical labels, micro-copy
        widest: "0.1em",       // Telemetry, uppercase tags
      },
      spacing: {
        // MICRO — Internal component padding, button sizing, badge offsets
        "micro-sm": "0.75rem",  // 12px
        "micro-md": "1rem",     // 16px
        "micro-lg": "1.5rem",   // 24px
        // MESO — Grid column separation, layout split-panes, header-to-body
        "meso-sm": "2rem",      // 32px
        "meso-md": "3rem",      // 48px
        "meso-lg": "4rem",      // 64px
        // MACRO — Major structural section dividers
        "macro-sm": "5rem",     // 80px
        "macro-md": "7rem",     // 112px
        "macro-lg": "9rem",     // 144px
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(31, 42, 46, 0.06)",
        elevated: "0 12px 30px -4px rgba(0, 128, 128, 0.18)",
        "inner-subtle": "inset 0 2px 4px 0 rgba(31, 42, 46, 0.04)",
      },
      borderRadius: {
        sm: "0.5rem",   // 8px
        md: "0.75rem",  // 12px
        lg: "1rem",     // 16px
        xl: "1.5rem",   // 24px
        "2xl": "2rem",  // 32px
      },
      borderWidth: {
        luminescence: "1px",
      },
      zIndex: {
        "canvas-bg": "0",
        scrim: "10",
        content: "20",
        "sticky-nav": "50",
        "modal-overlay": "100",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",   // Asymmetric rapid entrance
        reveal: "cubic-bezier(0.25, 0.1, 0.25, 1)",    // Smooth viewport reveal
      },
      animation: {
        "pulse-soft": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;