/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        p:"#6e6e77",
        red:"#E11D48",
        second_red:"#B41638"
      }
    },
  },
  plugins: [],
}