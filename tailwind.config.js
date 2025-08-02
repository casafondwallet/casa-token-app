/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ton-blue': '#0088CC',
        'ton-dark': '#1A1A1A',
        'casa-primary': '#FF6B35',
        'casa-secondary': '#F7931E',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 