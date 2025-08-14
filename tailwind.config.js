/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  //darkMode: 'media', // Se activa automáticamente según el sistema del usuario
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      fontFamily: {
        'primary-thin': ['f-thin'],
        'primary-regular': ['f-regular'],
        'primary-medium': ['f-medium'],
        'primary-bold': ['f-bold'],
        'secondary-thin': ['s-thin'],
        'secondary-light': ['s-light'],
        'secondary-regular': ['s-regular'],
        'secondary-medium': ['s-medium'],
        'secondary-bold': ['s-bold']
      },
      colors: {
        'primary': {
          500: "#1D4ED8",
          400: "#265CE0",
          300: "#2F6AE8",
          200: "#3878F0",
          DEFAULT: "#3B82F6",
          100: "#5C96F7",
          50: "#7EA9F9",
        },
        'black': {
          DEFAULT: "#111827",
          100: "#1f2937",
        },
        'grays': {
          100: "#d1d5db",
        },
        white: "#FFF",
        'sage': {
          200: "#CFDBD5",
          100: "#E8EDDF",
        }

      },
      backgroundOpacity: ['active'],
      screens: {
        'h-tall': { 'raw': '(max-height: 800px)' },
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    // require("tw-elements/dist/plugin.cjs"),
  ],
}

