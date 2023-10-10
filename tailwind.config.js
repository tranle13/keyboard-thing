/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fcffea",
        "sorta-blue": "#5398bf",
        "sorta-black": "#030304",
        "bubble-gum": "#ba9ffb",
      },
    },
  },
  plugins: [],
};
