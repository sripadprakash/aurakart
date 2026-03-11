/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#FF2A7A',
          orange: '#FF7B00',
          yellow: '#FFD700',
          blue: '#0052D4',
          cyan: '#00C9FF'
        }
      }
    },
  },
  plugins: [],
}