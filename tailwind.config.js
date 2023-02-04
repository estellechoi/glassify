/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        height: {
          navbar: 'var(--height-navbar)',
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
          gray300: '#e1e1e1',
          gray400: '#bebebe',
          gray500: '#9f9f9f',
          gray600: '#767676',
          gray700: '#626262',
          gray800: '#434343',
          gray900: '#222',
          warmgray50: '#f9f9f9',
          warmgray100: '#f3f3f3',
          warmgray200: '#ebebeb',
          warmgray300: '#dcdcdc',
          warmgray400: '#b8b8b8',
          warmgray500: '#989898',
          warmgray600: '#707070',
          warmgray700: '#5c5c5c',
          warmgray800: '#3d3d3d',
          warmgray900: '#1d1d1d',
          scarlet50: '#fce9e8',
          scarlet100: '#ffccbe',
          scarlet200: '#ffaa95',
          scarlet300: '#ff876a',
          scarlet400: '#ff6b4a',
          scarlet500: '#ff4e2c',
          scarlet600: '#ff4828',
          scarlet700: '#f14123',
          scarlet800: '#e33a1e',
          scarlet900: '#c92c15',
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
          /* color tokens */
          ground: '#f5f5f5',
          groundo10: 'rgb(245 245 245 / 10%)',
          primary: '#ff4828',
          primary_hover: '#ff6b4a',
          primary_hovero35: 'rgb(255 107 74 / 35%)',
          primary_hovero10: 'rgb(255 107 74 / 10%)',
        },
        backgroundImage: {
          'skeleton-pulse': 'linear-gradient(90deg, #e1e1e1 0%, #ffffff 100%)',
        },
        keyframes: {
          'skeleton-pulse': {
            '0%': { 
              'background-position': '100% 0%'
             },
            '100%': { 
              'background-position': '0% 0%'
             },
          }
        },
        animation: {
          'skeleton-pulse': 'skeleton-pulse 1.5s ease-in-out infinite',
        }
      },
    },
    plugins: [],
  }