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
        // rgb(var(--x) / <alpha-value>) lets Tailwind apply opacity modifiers
        // (e.g. `border-brand-grey/20`) — requires --color-* vars to hold
        // space-separated RGB channels (see globals.css), not hex strings.
        brand: {
          slate: "rgb(var(--color-brand-slate) / <alpha-value>)",
          teal: "rgb(var(--color-brand-teal) / <alpha-value>)",
          "teal-deep": "rgb(var(--color-brand-teal-deep) / <alpha-value>)",
          green: "rgb(var(--color-brand-green) / <alpha-value>)",
          grey: "rgb(var(--color-brand-grey) / <alpha-value>)",
          "grey-light": "rgb(var(--color-brand-grey-light) / <alpha-value>)",
          mist: "rgb(var(--color-brand-mist) / <alpha-value>)",
          paper: "rgb(var(--color-brand-paper) / <alpha-value>)",
          dark: "rgb(var(--color-brand-dark) / <alpha-value>)",
        },
        // Semantic aliases mapping for components
        void: "rgb(var(--color-void-canvas) / <alpha-value>)",
        charcoal: "rgb(var(--color-charcoal-plate) / <alpha-value>)",
        smoke: "rgb(var(--color-smoke-plate) / <alpha-value>)",
        graphite: "rgb(var(--color-graphite-lift) / <alpha-value>)",
        // Danger / error semantic (AA-safe text on white at --color-crimson-pure)
        danger: "rgb(var(--color-arterial-red) / <alpha-value>)",
        "danger-strong": "rgb(var(--color-crimson-pure) / <alpha-value>)",
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