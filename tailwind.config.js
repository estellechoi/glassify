const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Poppins', ...defaultTheme.fontFamily.sans],
        num: ['"Azeret Mono"', 'monospace', ...defaultTheme.fontFamily.mono],
      },
      borderRadius: {
        button: '9999px',
        icon: '9999px',
        tag: '9999px',
        card_lg: '5rem',
        card_md: '1rem',
        card_sm: '0.5rem',
        row: '0.375rem',
      },
      spacing: {
        safe_top: 'env(safe-area-inset-top, 44px)',
        safe_bottom: '36px',
        app_header_height: 'var(--size-app-header-height)',
        screen_exept_app_header: 'calc(100vh - var(--size-app-header-height))',
        app_header_padding_x: '2rem',
        app_header_padding_y: '2.75rem',
        bottom_sheet_max_height: 'calc(100vh - var(--size-app-header-height) - 2.25rem)',
        page_bottom: '6rem',
        page_top: 'calc(var(--size-app-header-height) + 2.25rem)',
        page_x: '10rem',
        page_x_mobile: '2rem',
        page_padding_safe_bottom: 'calc(6rem + 36px)',
        page_gap: '2.25rem',
        modal_padding_x: '1.5rem',
        modal_padding_y: '2.25rem',
        modal_gap: '1.75rem',
        modal_padding_safe_bottom: 'calc(2.25rem + 36px)',
        modal_margin_x: '2.5rem',
        modal_margin_y: '2.25rem',
        modal_height: 'calc(100vh - 4.75rem)',
        card_padding_x: '1rem',
        card_padding_y: '0.75rem',
      },
      zIndex: {
        base: 'var(--zindex-context-screen)',
        wall: 'calc(var(--zindex-context-screen) - 1)',
        overlay: 'var(--zindex-context-elevated)',
        navigation: 'var(--zindex-context-navigation)',
        top_context: 'var(--zindex-context-off_canvas)',
        instant_interaction: 'var(--zindex-context-instant-interaction)',
        hidden_on_base: 'calc(var(--zindex-context-screen) + var(--zindex-below))',
        hidden_on_top_context: 'calc(var(--zindex-context-off_canvas) + var(--zindex-below))',
        tooltip_on_base: 'calc(var(--zindex-context-screen) + var(--zindex-above))',
        tooltip_on_overlay: 'calc(var(--zindex-context-elevated) + var(--zindex-above))',
        tooltip_on_navigation: 'calc(var(--zindex-context-navigation) + var(--zindex-above))',
        tooltip_on_top_context: 'calc(var(--zindex-context-off_canvas) + var(--zindex-above))',
        tooltip_hidden_on_base: 'calc(var(--zindex-context-screen) + var(--zindex-below))',
        tooltip_hidden_on_overlay: 'calc(var(--zindex-context-elevated) + var(--zindex-below))',
        tooltip_hidden_on_navigation: 'calc(var(--zindex-context-navigation) + var(--zindex-below))',
        tooltip_hidden_on_top_context: 'calc(var(--zindex-context-off_canvas) + var(--zindex-below))',
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
        primary_variant_light: 'var(--color-primary-variant-light)',
        primary_line_light: 'var(--color-primary-variant-light)',
        primary_line_dark: 'var(--color-primary-variant-soft)',
        secondary: 'var(--color-scarlet600)',
        secondary_hover: 'var(--color-scarlet600-o80)',
        secondary_line: 'var(--color-scarlet300)',
        glass: 'var(--color-sky400-o10)',
        ground: 'var(--color-ground)',
        ground_o: 'var(--color-ground-o10)',
        ground_dark: 'var(--color-gray900)',
        ground_dark_o: 'var(--color-gray900-o10)',
        ground_effected: 'var(--color-sky400)',
        body: 'var(--color-black)',
        caption: 'var(--color-gray400)',
        caption_dark: 'var(--color-gray600)',
        effected: 'var(--color-blue400)',
        effected_varient_light: 'var(--color-blue200)',
        effected_whitened: 'var(--color-sky400)',
        effected_whitened_varient_light: 'var(--color-sky400)',
        /* semantic colors */
        disabled: 'var(--color-gray300)',
        semantic_bull: 'var(--color-green400)',
        semantic_bear: 'var(--color-red400)',
        semantic_danger: 'var(--color-red400)',
      },
      backgroundImage: {
        // app_gradient:
        //   'radial-gradient(101.87% 60.85% at 47.70% 50.00%, #C8FF2C 0%, #FFF72C 34.90%, #E1FF2C 51.56%, #FFAB2C 73.96%, #FF782C 100%)',
        primary_linear_4: 'linear-gradient(90deg, var(--color-gray900-o4) 0%, var(--color-gray900-o0) 100%)',
        secondary_linear_4: 'linear-gradient(90deg, var(--color-gray900-o4) 0%, var(--color-gray900-o0) 100%)',
        secondary_linear_2: 'linear-gradient(90deg, var(--color-gray900-o2) 0%, var(--color-gray900-o0) 100%)',
        skeleton_on_primary: 'linear-gradient(90deg, var(--color-white-o35) 0%, var(--color-white-o10) 100%)',
        skeleton_primary: 'linear-gradient(90deg, var(--color-primary-o35) 0%, var(--color-primary-o0) 100%)',
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
        effected_gradient: 'linear-gradient(180deg, var(--color-blue200) 0%, var(--color-sky500) 100%)',
      },
      transitionProperty: {
        filter: 'filter',
      },
      transitionTimingFunction: {
        momentum: 'cubic-bezier(0.73, 0, 0, 1)',
      },
      keyframes: {
        fast_in_y: {
          '0%': {
            transform: 'translateY(140%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        fast_in_y_back: {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(140%)',
          },
        },
        fast_in_x: {
          '0%': {
            transform: 'translateX(140%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        fast_in_x_back: {
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
          },
          '100%': {
            opacity: 1,
          },
        },
        fade_in_reverse: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        fade_in_x: {
          '0%': {
            opacity: 0,
            transform: 'translateX(-0.5rem)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        fade_in_x_reverse: {
          '0%': {
            opacity: 0,
            transform: 'translateX(0.5rem)',
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
        up: {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(-0.125rem)',
          },
        },
      },
      animation: {
        fast_in_y: 'fast_in_y 0.8s cubic-bezier(0.73, 0, 0, 1) both',
        fast_in_y_back: 'fast_in_y_back 0.8s cubic-bezier(0.73, 0, 0, 1) both',
        fast_in_x: 'fast_in_x 0.8s cubic-bezier(0.73, 0, 0, 1) both',
        fast_in_x_back: 'fast_in_x_back 0.8s cubic-bezier(0.73, 0, 0, 1) both',
        fade_in: 'fade_in 0.4s cubic-bezier(0, 0, 0.27, 1) both',
        fade_out: 'fade_in_reverse 0.4s cubic-bezier(0, 0, 0.27, 1) both',
        fade_in_x: 'fade_in_x 0.8s cubic-bezier(0, 0, 0.27, 1) 0.6s both',
        fade_in_x_reverse: 'fade_in_x_reverse 0.8s cubic-bezier(0, 0, 0.27, 1) 0.6s both',
        // fade_out: 'fade_out 0.4s cubic-bezier(0, 0, 0.27, 1) both',
        bouncing: 'up 0.4s ease-in-out infinite alternate',
        bouncing_delayed_1: 'up 0.4s ease-in-out 0.1s infinite alternate',
        bouncing_delayed_2: 'up 0.4s ease-in-out 0.2s infinite alternate',
        bouncing_delayed_3: 'up 0.4s ease-in-out 0.3s infinite alternate',
        bouncing_delayed_4: 'up 0.4s ease-in-out 0.4s infinite alternate',
      },
    },
  },
  plugins: [],
};
