const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        navbar: 'var(--height-navbar)',
      },
      fontFamily: {
        primary: ['Poppins', ...defaultTheme.fontFamily.sans],
        num: ['"Azeret Mono"', 'monospace', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        /* color tokens */
        black: 'var(--color-black)',
        black_o70: 'var(--color-black-o70)',
        black_o35: 'var(--color-black-o35)',
        black_o10: 'var(--color-black-o10)',
        white: 'var(--color-white)',
        white_o70: 'var(--color-white-o70)',
        white_o35: 'var(--color-white-o35)',
        white_o10: 'var(--color-white-o10)',
        /* app colors */
        primary: 'var(--color-primary)',
        primary_hover: 'var(--color-primary-o80)',
        primary_variant_dark: 'var(--color-primary-variant-dark)',
        secondary: 'var(--color-gray900)',
        secondary_hover: 'var(--color-gray900-o80)',
        glass: 'var(--color-sky400-o10)',
        ground: 'var(--color-coolgray100)',
        ground_o: 'var(--color-coolgray100-o10)',
        ground_dark: 'var(--color-gray900)',
        ground_dark_o: 'var(--color-gray900-o10)',
        body: 'var(--color-black)',
        caption: 'var(--color-gray400)',
        caption_dark: 'var(--color-gray800)',
        disabled: 'var(--color-gray300)',
      },
      backgroundImage: {
        primary_linear_4: 'linear-gradient(90deg, var(--color-gray900-o4) 0%, var(--color-gray900-o0) 100%)',
        secondary_linear_4: 'linear-gradient(90deg, var(--color-gray900-o4) 0%, var(--color-gray900-o0) 100%)',
        secondary_linear_2: 'linear-gradient(90deg, var(--color-gray900-o2) 0%, var(--color-gray900-o0) 100%)',
        skeleton: 'linear-gradient(90deg, var(--color-white-o35) 0%, var(--color-white-o10) 100%)',
        primary_right_to_left:
          'linear-gradient(90deg, var(--color-primary-o0) 0%, var(--color-primary) 90% , var(--color-primary) 100%)',
        primary_inverted_right_to_left:
          'linear-gradient(90deg, var(--color-white-o0) 0%, var(--color-white) 90%, var(--color-white) 100%)',
        primary_left_to_right:
          'linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary) 10% , var(--color-primary-o0) 100%)',
        primary_bottom_to_top:
          'linear-gradient(180deg, var(--color-primary-o0) 0%, var(--color-primary) 20%, var(--color-primary) 100%)',
        primary_inverted_gradient_1:
          'linear-gradient(90deg, var(--color-white-o35) 0%, var(--color-white-o35) 10%, var(--color-white-o0) 100%)',
      },
      boxShadow: {
        subtle: '0px 1px 4px 4px var(--color-black-o10),',
        subtle_glass: '0px 1px 4px 4px var(--color-black-o10), inset -2px 2px 4px var(--color-white-o10)',
      },
      keyframes: {
        fast_in_y: {
          '0%': {
            transform: 'scale(1, 0)',
          },
          '100%': {
            transform: 'scale(1, 1)',
          },
        },
        fast_out_y: {
          '0%': {
            transform: 'scale(1, 1)',
          },
          '100%': {
            transform: 'scale(1, 0)',
          },
        },
        slide_in_x: {
          '0%': {
            transform: 'translateX(140%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        slide_out_x: {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(140%)',
          },
        },
        fade_in: {
          '0%': {
            opacity: 0,
            transform: 'translateX(-0.5rem)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        fade_out: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        fade_in_reverse: {
          '0%': {
            opacity: 0,
            transform: 'translateX(0.5rem)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        fast_in_y: 'fast_in_y 0.8s cubic-bezier(0.73, 0, 0, 1) both',
        fast_in_y_back: 'fast_out_y 0.8s cubic-bezier(0.73, 0, 0, 1) both',
        slide_in_x: 'slide_in_x 0.8s cubic-bezier(0.73, 0, 0, 1) both',
        slide_in_x_back: 'slide_out_x 0.8s cubic-bezier(0.73, 0, 0, 1) both',
        fade_in: 'fade_in 0.8s cubic-bezier(0, 0, 0.27, 1) 0.6s both',
        fade_in_reverse: 'fade_in_reverse 0.8s cubic-bezier(0, 0, 0.27, 1) 0.6s both',
        fade_out: 'fade_out 0.4s cubic-bezier(0, 0, 0.27, 1) both',
      },
    },
  },
  plugins: [],
};
