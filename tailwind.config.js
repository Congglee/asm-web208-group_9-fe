/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        digital: {
          200: "#b7b7b7",
          400: "#ee3131",
          600: "#1d1d1d",
          800: "#0f0f0f",
        },
      },
    },
  },
  plugins: [],
};
