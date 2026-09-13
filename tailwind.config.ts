import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — values come from CSS vars in globals.css
        surface: "rgb(var(--surface) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        well: "rgb(var(--well) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        "line-strong": "rgb(var(--line-strong) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        fg2: "rgb(var(--fg2) / <alpha-value>)",
        fg3: "rgb(var(--fg3) / <alpha-value>)",
        fg4: "rgb(var(--fg4) / <alpha-value>)",
        fg5: "rgb(var(--fg5) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-fg": "rgb(var(--accent-fg) / <alpha-value>)",
        // Legacy aliases (kept so old class names still resolve)
        lime: {
          accent: "#A855F7",
        },
        dark: {
          bg: "#0A0A0A",
          card: "#111111",
          border: "#1E1E1E",
          muted: "#2A2A2A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        // Legacy aliases — both now resolve to Inter so existing
        // font-syne / font-dm class usage keeps working.
        syne: ["var(--font-inter)", "system-ui", "sans-serif"],
        dm: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "cursor-blink": "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
