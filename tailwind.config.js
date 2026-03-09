/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      colors: {
        cream: "#F5EFE0",
        bark: "#1A2E0F",
        green: "#559632",
        lightgreen: "#E8F0E0",
        muted: "#8A9A7E",
        blush: "#EDE3D0",
      },
    },
  },
  plugins: [],
};