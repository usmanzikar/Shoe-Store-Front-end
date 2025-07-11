/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      extend: {
    fontFamily: {
      body: ['Satoshi', 'sans-serif'],
      heading: ['Clash Display', 'sans-serif'],
    },
  },
    },
  },
  plugins: [],
}
