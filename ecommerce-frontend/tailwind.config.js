/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          light: "#232F3E",
          DEFAULT: "#131921",
          orange: "#F90",
          buttonHover: "#f08804",
          background: "#EAEDED",
        }
      }
    },
  },
  plugins: [],
}
