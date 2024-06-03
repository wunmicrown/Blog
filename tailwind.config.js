/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'striped-gradient': 'linear-gradient(to bottom left, #4ADE80 48%, #ffff 55%, #ffff 40%)',
      // },
    },
  },
  plugins: [],
}