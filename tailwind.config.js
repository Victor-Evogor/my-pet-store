/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.tsx","./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
      "orange":"#d78a31",
      "light": "#fcfcfd",
      "dark":"#0b0a0f",
      "purple":"#2f19b3",
      "green":"#338277"
      }
    },
  },
  plugins: [],
}
