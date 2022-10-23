/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        public: ["PUBLIC", "sans-serif"],
        publicb: ["PUBLICB", "sans-serif"],
        publict: ["PUBLICT", "sans-serif"],
      },
    },
  },
  plugins: [],
}
