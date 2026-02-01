/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        beige: {
          50: '#fdfcfb',
          100: '#faf8f5',
          200: '#f5f1e8',
          300: '#ede6d8',
          400: '#e3d7c3',
          500: '#d4c4a8',
          600: '#c0ac8d',
          700: '#a89372',
          800: '#8a7760',
          900: '#6f614f',
        },
        'bs-dark': '#000000',
        'bs-green': '#22c55e',
        'bs-green-light': '#4ade80',
        'bs-green-dark': '#16a34a',
        'bs-blue': '#1e40af',
        'bs-blue-light': '#3b82f6',
      },
    },
  },
  plugins: [],
}
