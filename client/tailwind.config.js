/** @type {import('tailwindcss').Config} */
import * as daisyui from "daisyui";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fcffea",
        "sorta-blue": "#5398bf",
        "sorta-black": "#030304",
        "bubble-gum": "#ba9ffb",
        "sorta-yellow": "#ffc642",
        "sorta-dark-yellow": "#e9b82f",
      },
    },
  },
  daisyui: {
    themes: [
      "dark",
      "cupcake",
      "bumblebee",
      "retro",
      "halloween",
      "dracula",
      "night",
    ],
  },
  plugins: [daisyui],
};
