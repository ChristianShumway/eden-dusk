/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  // darkMode: 'media', // Se activa automáticamente según el sistema del usuario
  // darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
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
          // 200: "#D4A84A",
          200: "#e0b847",
          DEFAULT: "#A3B18A",
          100: "#F9DF93",
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
          'secondary': "#595959",
        },
        'grays': {
          500: "#595959",
          400: "#7f7f7f",
          300: "#a5a5a5",
          200: "#cccccc",
          100: "#f2f2f2",
        },
        white: "#F5F3F0",
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

