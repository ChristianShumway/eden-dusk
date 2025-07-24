/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  //darkMode: 'media', // Se activa automáticamente según el sistema del usuario
  //darkMode: ['selector', '[data-theme="dark"]'],
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
          300: "#7C8D64",
          200: "#8E9F76",
          DEFAULT: "#A3B18A",
          100: "#DDE2D2",
          50: "#F3F5EF",
          'focus': '#C3CEA8'
        },
        'secondary': {
          DEFAULT: "darkgoldenrod"
        },
        'esmeralda': {
          DEFAULT: "#5FAD56",
        },
        'terracota': {
          DEFAULT: "#A76D60"
        },
        'black': {
          DEFAULT: "#242423",
          100: "#333533",
          200: "#252422",
        },
        'grays': {
          500: "#595959",
          400: "#7f7f7f",
          300: "#a5a5a5",
          200: "#cccccc",
          100: "#f2f2f2",
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

