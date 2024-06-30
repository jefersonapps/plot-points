/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': {'max': '770px'},
        // 'mds': {'max': '770px'},
      }
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    }
  },
  plugins: [],
}