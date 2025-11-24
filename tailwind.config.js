/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          main: "#0f1016",
          secondary: "#1a1b23",
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          heavy: "rgba(255, 255, 255, 0.1)",
          stroke: "rgba(255, 255, 255, 0.1)",
        },
        accent: "#4cc9f0",
        "accent-secondary": "#f97316",
        danger: "#ef4444",
        success: "#4ade80",
        text: {
          primary: "#ffffff",
          secondary: "#94a3b8",
          muted: "#64748b",
        },
      },
      borderRadius: {
        lg: "16px",
        xl: "24px",
        pill: "9999px",
      },
      fontFamily: {
        // Assuming system fonts for now, can add custom fonts later
        sans: ["System"],
      }
    },
  },
  plugins: [],
}
