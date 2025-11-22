/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          main: "#0f1016",
        },
        glass: "rgba(255, 255, 255, 0.05)",
        accent: "#4cc9f0",
        danger: "#ff4d4f",
        success: "#4ade80",
        text: {
          primary: "#ffffff",
          secondary: "#94a3b8",
        },
      },
      borderRadius: {
        lg: "12px",
        xl: "20px",
        pill: "9999px",
      },
    },
  },
  plugins: [],
}
