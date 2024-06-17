/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme1: "#A4673D",
        theme2: "#F2D59D",
        theme3: "#FAF2C7",
        theme4: "#E5C5AD",
        theme5: "rgba(246, 230, 188, 1)",
      },

      fontFamily: {
        lato: ["Lato", "sans-serif"],
        indieFlower: ['"Indie Flower"', 'cursive'],
        amaticSc: ['"Amatic SC"', 'cursive'],
        laFlibustiere: ['"La Flibustière"', 'sans-serif'],

      },
    },
  },
  plugins: [],
};
