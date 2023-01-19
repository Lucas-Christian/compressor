/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "gray-600": "#1c1c1c",
      "gray-400": "#242424",
      "gray-200": "#2E2E2E",
      "gray-150": "#343434",
      "gray-100": "#D4D4D4",
      "gray-50": "#D4D4D4",
      "gray-10": "#E1E1E6",

      "green-200": "#8AFF6C",

      "white": "#FFFFFF",

      "black": "#000000",

      "blue-900": "#1e3a8a",
      "blue-800": "#1e40af",
      "blue-700": "#1d4ed8",
      "blue-600": "#386BFB",

      "red": "#f13d3d",

      "transparent": "rgba(0,0,0,0)"

    },
    extend: {
      fontFamily: {
        sans: "Inter, sans-serif",
        assistant: "Assistant, sans-serif"
      }
    },
  },
  plugins: [],
}