/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        navbar: 'var(--height-navbar)',
      },
      colors: {
        /* color tokens */
        ground: 'var(--color-coolgray100)',
        ground_o: 'var(--color-coolgray100-o10)',
        ground_dark: 'var(--color-gray900)',
        ground_dark_o: 'var(--color-gray900-o10)',
        primary: 'var(--color-scarlet600)',
        primary_hover: 'var(--color-scarlet600-o80)',
        secondary: 'var(--color-gray900)',
        secondary_hover: 'var(--color-gray900-o80)',
        disabled: 'var(--color-gray300)',
      },
      backgroundImage: {
        primary_linear_4: 'linear-gradient(90deg, var(--color-scarlet600-o4) 0%, var(--color-scarlet600-o0) 100%)',
        secondary_linear_4: 'linear-gradient(90deg, var(--color-gray900-o4) 0%, var(--color-gray900-o0) 100%)',
        'skeleton-pulse': 'linear-gradient(90deg, #e1e1e1 0%, #ffffff 100%)',
      },
      keyframes: {
        'skeleton-pulse': {
          '0%': {
            'background-position': '100% 0%',
          },
          '100%': {
            'background-position': '0% 0%',
          },
        },
      },
      animation: {
        'skeleton-pulse': 'skeleton-pulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
