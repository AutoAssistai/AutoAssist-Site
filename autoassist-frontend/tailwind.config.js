import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Elite color system - Billion-dollar precision
        blue: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#37a7f6',
          500: '#3164b5', // Primary - AutoAssist signature
          600: '#2854a0',
          700: '#1e4489',
          800: '#1d3a71',
          900: '#1c325f',
          950: '#0d1829',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#f0f0f0', // Surface light
          300: '#e5e5e5',
          400: '#d4d4d4',
          500: '#a3a3a3',
          600: '#737373',
          700: '#525252',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        background: {
          primary: '#ffffff',
          secondary: '#fafafa',
          tertiary: '#f5f5f5',
          dark: '#0a0a0a',
          surface: '#ffffff',
        },
        text: {
          primary: '#0a0a0a',
          secondary: '#525252',
          tertiary: '#737373',
          muted: '#a3a3a3',
          inverse: '#ffffff',
        },
        accent: {
          primary: '#3164b5',
          hover: '#2854a0',
          light: '#60a5fa',
          dark: '#1e4489',
        },
        border: {
          primary: '#e5e5e5',
          secondary: '#f0f0f0',
          light: '#f5f5f5',
          dark: '#d4d4d4',
          focus: '#3164b5',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
        serif: ['Playfair Display Variable', 'Georgia', 'serif'],
      },
      fontSize: {
        // Professional type scale
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0' }],
        'xl': ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
      },
      letterSpacing: {
        tighter: '-0.05em',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      boxShadow: {
        // Supreme shadow system - Apple/Stripe/Linear precision
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'luxury': '0 20px 40px -8px rgba(49, 100, 181, 0.08), 0 8px 16px -4px rgba(0, 0, 0, 0.04)',
        'premium': '0 30px 60px -12px rgba(49, 100, 181, 0.15), 0 18px 36px -6px rgba(0, 0, 0, 0.06)',
        'ultra': '0 40px 80px -16px rgba(49, 100, 181, 0.2), 0 24px 48px -8px rgba(0, 0, 0, 0.08)',
        'ambient': '0 0 0 1px rgba(0, 0, 0, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'glow': '0 0 0 1px rgba(49, 100, 181, 0.1), 0 0 40px rgba(49, 100, 181, 0.15)',
        'glow-intense': '0 0 0 1px rgba(49, 100, 181, 0.2), 0 0 60px rgba(49, 100, 181, 0.3)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.08), 0 4px 16px -4px rgba(0, 0, 0, 0.04)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'apple': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-slow': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left': 'slideLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right': 'slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in-slow': 'scaleIn 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'ticker': 'ticker 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(32px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-32px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(32px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-32px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(49, 100, 181, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(49, 100, 181, 0.6)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
