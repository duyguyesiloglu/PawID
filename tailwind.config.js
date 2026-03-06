/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      
      colors: {
        epoxy: {
          clear:   "#F0F4FF",
          frost:   "#E8EEFF",
          deep:    "#1E2A4A",
          accent:  "#6C8EFF",
          amber:   "#FFB547",
          success: "#4ECFA8",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
         sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}
