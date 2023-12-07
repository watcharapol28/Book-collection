/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
  safelist: [
    "animate-[fade-in_1s_ease-in-out]",
    "animate-[fade-in-down_1s_ease-in-out]",
  ],
};
