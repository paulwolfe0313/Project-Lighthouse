/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3A0CA3", // Indigo
        accent: "#A4508B",  // Magenta
        background: "#1A1B2F",
      },
    },
  },
  plugins: [],
};