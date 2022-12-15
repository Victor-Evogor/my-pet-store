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
      "green":"#338277",
      "blue":{
        100:"#4fc7f7",
        200: "#0e9ffd",
        300: "#2f19b3"
      },
      "brown":{
        100:"#b4a6a2",
        200:"#4d3c4c"
      }
      }
    },
  },
  plugins: [],
}
