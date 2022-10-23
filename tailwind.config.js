/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        visby: ["VISBY", "sans-serif"],
        visbyb: ["VISBYB", "sans-serif"],
      },
    },
  },
  plugins: [],
}
