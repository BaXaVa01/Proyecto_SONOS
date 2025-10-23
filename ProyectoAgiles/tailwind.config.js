/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepNavy: "#212A3E",
        steelBlue: "#394867",
        slateGray: "#9BA4B5",
        softWhite: "#F1F6F9",
      },
    },
  },
  plugins: [],
}