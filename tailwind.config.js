const defaultTheme = require("tailwindcss/lib/public/default-theme");
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'Proxima Nova'],
      }
    },
  },
  plugins: [],
}
