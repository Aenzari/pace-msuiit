import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        // MSU-IIT Official Heritage Palette: Maroon & Gold
        // Seal of Excellence symbolism: Red (Determination) & Yellow (Bright Future)
        msuiit: {
          maroon: {
            DEFAULT: "#7A0016", // Official MSU-IIT Institutional Maroon
            deep: "#5C0011",    // Deep Foundation Maroon
            darkest: "#3B000B", // Structural Background Anchor
            light: "#9B0020",   // Interactive Hover Maroon
            crimson: "#B30026", // Seal of Excellence: Determination Red
          },
          gold: {
            DEFAULT: "#F5A623", // Official Institutional Gold
            burnished: "#D4AF37",// Traditional Regalia Gold
            bright: "#FFD700",  // Seal of Excellence: Radiant Future Yellow
            light: "#FFE57F",   // Subtle Highlight Yellow
            amber: "#C8851C",   // Deep Bronze Gold
          },
          surface: {
            base: "#0D0B0E",    // Midnight Charcoal with warm maroon undertone
            card: "#141117",    // Precision Card Surface
            elevated: "#1B171F",// Hover/Modal Surface
            border: "#29222E",  // 1px Subtle Framing Border
            borderHighlight: "rgba(245, 166, 35, 0.28)", // Gold focus ring
          },
          text: {
            primary: "#F8F8F9",
            secondary: "#A29BA8",
            muted: "#6B6472",
          }
        },
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
