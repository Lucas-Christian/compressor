module.exports = {
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "gray-600": "#1c1c1c",
      "gray-400": "#242424",
      "gray-200": "#2E2E2E",
      "gray-150": "#343434",
      "gray-100": "#D4D4D4",
      "gray-10": "#E1E1E6",

      "green-200": "#8AFF6C",

      "white": "#FFFFFF",
      "white-weak": "#FFF",

      "black": "#000000",

      "blue-900": "#1e3a8a",
      "blue-700": "#1d4ed8",

      "red": "#f13d3d"
    },
    extend: {
      fontFamily: {
        sans: "Inter, sans-serif",
      },
    },
  },
  plugins: [],
}