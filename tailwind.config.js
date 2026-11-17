/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FFFFFF',
          surface: '#F1F5F9',
          surfaceLift: '#FFFFFF',
          surfaceHover: '#E2E8F0',
          border: '#E2E8F0',
          borderHover: '#CBD5E1',
          lime: '#84CC16',
          limeDark: '#65A30D',
          limeGlow: 'rgba(132, 204, 22, 0.15)',
          turquoise: '#22D3EE',
          turquoiseDark: '#06B6D4',
          text: '#0F172A',
          textSecondary: '#64748B',
          textMuted: '#94A3B8',
          ink: '#0F172A',
        },
      },
      fontFamily: {
        outfit: ['"Outfit"', 'sans-serif'],
        dm: ['"DM Sans"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-lime-turquoise':
          'linear-gradient(135deg, #84CC16 0%, #22D3EE 100%)',
        'gradient-surface':
          'linear-gradient(180deg, #0B1120 0%, #090D16 100%)',
        'gradient-orbe':
          'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(132, 204, 22, 0.18), transparent 60%)',
      },
      boxShadow: {
        'glass': '0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.9) inset',
        'glass-hover': '0 8px 32px -4px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 1) inset',
        'orbe': '0 0 80px rgba(132, 204, 22, 0.15)',
        'orbe-turquoise': '0 0 80px rgba(34, 211, 238, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'full': '9999px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'orbe-move': 'orbeMove 20s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.85' },
        },
        orbeMove: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(12px, -18px) scale(1.05)' },
          '66%': { transform: 'translate(-16px, 14px) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
}
