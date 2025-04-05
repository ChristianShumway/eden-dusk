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
        'primary-regular': ['c-regular'],
        'primary-medium': ['c-medium'],
        'primary-bold': ['c-bold'],
        'secondary-regular': ['static-regular'],
        'secondary-medium': ['static-medium'],
        'secondary-bold': ['static-bold'],
      },
      colors: {
        'primary': {
          200: "#D4A84A",
          DEFAULT: "#F5CB5C",
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
          100: "#333533"
        },
        'grays': {
          500: "#595959",
          400: "#7f7f7f",
          300: "#a5a5a5",
          200: "#cccccc",
          100: "#f2f2f2",
        },
        white: "#FFFFFF",
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

