/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,astro}',
    './pages/**/*.{js,ts,jsx,tsx,astro}',
    './components/**/*.{js,ts,jsx,tsx,astro}',
  ],
  theme: {
  extend: {
    fontFamily: {
      sans: ['"Noto Sans SC"', 'Helvetica', 'Arial', 'sans-serif'],
    }
  }
},
  plugins: [],
}