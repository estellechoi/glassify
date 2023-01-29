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
          black: '#000',
          white: '#FFF',
          whiteo70: 'rgba(255, 255, 255, 0.7)',
          whiteo35: 'rgba(255, 255, 255, 0.35)',
          whiteo10: 'rgba(255, 255, 255, 0.1)',
          gray50: '#fafafa',
          gray100: '#f5f5f5',
          gray200: '#efefef',
          gary300: '#e1e1e1',
          gray400: '#bebebe',
          gray500: '#9f9f9f',
          gray600: '#767676',
          gray700: '#626262',
          gray800: '#434343',
          gray900: '#222',
          lime50: '#fbffe6',
          lime100: '#f5fdc0',
          lime200: '#ecfc93',
          lime300: '#E8FF67',
          lime400: '#e0fc3a',
          lime500: '#d9f800',
          lime600: '#d0e800',
          lime700: '#bfd000',
          lime800: '#b0b800',
          lime900: '#979000',
          primary: '#f5fdc0',
          primary_hover: '#E8FF67',
          primary_hovero35: 'rgb(232 255 103 / 35%)',
          primary_hovero10: 'rgb(232 255 103 / 10%)',
        }
      },
    },
    plugins: [],
  }