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
          black: '#111',
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
          scarlet50: '#FBE9E7',
          scarlet100: '#FFCCBC',
          scarlet200: '#FFAB91',
          scarlet300: '#FF8A65',
          scarlet400: '#FF7043',
          scarlet500: '#FF5722',
          scarlet600: '#F4511E',
          scarlet700: '#E64A19',
          scarlet800: '#D84315',
          scarlet900: '#BF360C',
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
          ground: '#fafafa',
          groundo10: 'rgb(250 250 250 / 10%)',
          text: '#000',
          text_70: '#767676',
          primary: '#F4511E',
          primary_hover: '#FF8A65',
          primary_hovero35: 'rgb(255 138 101 / 35%)',
          primary_hovero10: 'rgb(255 138 101 / 10%)',
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