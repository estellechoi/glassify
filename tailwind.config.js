/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        height: {
          navbar: '4rem',
        },
        colors: {
          whiteo70: 'rgba(255, 255, 255, 0.7)',
          whiteo35: 'rgba(255, 255, 255, 0.35)',
          whiteo10: 'rgba(255, 255, 255, 0.1)',
        }
      },
    },
    plugins: [],
  }