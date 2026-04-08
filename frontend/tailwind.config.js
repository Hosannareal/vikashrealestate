/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C6A769', // Luxury Gold
        secondary: '#0F0F0F', // Deep Black
        background: '#F5F1EB', // Warm Beige
        accent: '#E8E1D9', // Soft Marble Beige
        text: {
          heading: '#111111',
          subtext: '#6B6B6B',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
