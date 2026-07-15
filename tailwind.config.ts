import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          slate: "var(--color-brand-slate)",
          teal: "var(--color-brand-teal)",
          green: "var(--color-brand-green)",
          grey: "var(--color-brand-grey)",
          mist: "var(--color-brand-mist)",
          paper: "var(--color-brand-paper)",
          dark: "var(--color-brand-dark)",
        },
        // Semantic aliases mapping for components
        void: "var(--color-void-canvas)",
        charcoal: "var(--color-charcoal-plate)",
        smoke: "var(--color-smoke-plate)",
        graphite: "var(--color-graphite-lift)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontWeight: {
        // Enforce the 500 ceiling programmatically across standard utility classes
        light: "400",
        normal: "400",
        medium: "500",
        semibold: "500",
        bold: "500",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(31, 42, 46, 0.08)",
        elevated: "0 12px 32px -4px rgba(31, 42, 46, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;