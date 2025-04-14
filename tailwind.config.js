/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Matches your app directory
    './components/**/*.{js,ts,jsx,tsx}', // Matches your components directory
    './src/**/*.{js,ts,jsx,tsx}', // Covers src structure if used
  ],
  theme: {
    extend: {
      colors: {
        'versal-black': '#000000', // Pure black base
        'versal-dark': '#1a1a1a', // Subtle dark gray for gradients
        'versal-gray': '#2d2d2d', // Mid-tone for backgrounds
        'neon-green': '#00ff00', // Bright neon for glow/accent
        'neon-highlight': '#ccff00', // Softer neon for hover effects
        'text-light': '#ffffff', // White for text
        'text-muted': '#a0a0a0', // Muted gray for secondary text
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['"Orbitron"', 'sans-serif'],
      },
      fontSize: {
        '5.5xl': '3.5rem',
        '6xl': '4rem',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 255, 0, 0.6), 0 0 30px rgba(0, 255, 0, 0.4)',
        'hover-glow': '0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionProperty: {
        'all': 'all',
        'transform-opacity': 'transform, opacity',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '300': '300ms',
        '500': '500ms',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
};