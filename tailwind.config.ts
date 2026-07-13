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
       * PROCUREMENT-SAFE COLOR TOKENS[cite: 7]
       * Strict contrast rules: Teal passes WCAG AA on white for normal text[cite: 5, 7].
       * Retrofit Green fails AA for small text; used only for telemetry & accents[cite: 5, 7].
       */
      colors: {
        brand: {
          teal: "#008080",   // Primary brand color, buttons, active highlights[cite: 7]
          slate: "#1F2A2E",  // All body copy and headings. Never pure black[cite: 7]
          green: "#4CAF7D",  // ESG, telemetry & highlight accent only[cite: 7]
          grey: "#6B7A7A",   // Secondary text, captions, borders, table rules[cite: 7]
          mist: "#EEF3F2",   // Section bands, card backgrounds, table striping[cite: 7]
          paper: "#FFFFFF",  // Base background canvas[cite: 7]
        },
      },
      /* 
       * SELF-HOSTED VARIABLE FONTS[cite: 5, 7]
       * Linked to Next.js font loader variables in RootLayout[cite: 5].
       */
      fontFamily: {
        display: ["var(--font-hanken)", "sans-serif"], // Hanken Grotesk[cite: 5, 7]
        body: ["var(--font-ibm-plex)", "sans-serif"],    // IBM Plex Sans[cite: 5, 7]
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      /* 
       * AWKWARD WINNER DETAIL: Custom Easing & Fluid Tracking
       * Matches DB Longbow heavy deceleration (0.16, 1, 0.3, 1)[cite: 5].
       */
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)", // Standard entrance easing[cite: 5]
      },
      letterSpacing: {
        tightest: "-0.04em", // Used for massive ~150px H1 titles[cite: 5]
        tighter: "-0.02em",  // Used for H2 section headers[cite: 5]
        widest: "0.1em",     // Used for micro-labels and telemetry
      },
      boxShadow: {
        soft: "0 4px 16px rgba(31, 42, 46, 0.04)",
        elevated: "0 12px 24px rgba(31, 42, 46, 0.08)", // Soft low shadows per spec[cite: 5]
      },
    },
  },
  plugins: [],
};

export default config;
