module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '130': '30rem',
        '131': '31rem',
        '132': '32rem',
        '133': '33rem',
        '134': '34rem',
        '135': '35rem',
        '136': '36rem',
        '137': '37rem',
        '138': '38rem',
        '139': '39rem',
        '140': '40rem',
        '150': '50rem',
        '160': '60rem',
      },
      colors: {
        'deep-purple': '#190624',
        'base-purple': '#2A1437',
        'light-purple': '#ad92b7',
        'purple': '#AD00FF',
        'deep-green': '#34A853',
        'base-green': '#00ff4a',
        'base-red': '#FF005C',
        'base-yellow': '#FBBC05',
      },
      fontFamily: {
        'nunito': ['nunito', 'sans-serif'],
        'roboto': ['roboto', 'sans-serif'],
        'ttnorms': ['ttnorms'],
        'benzin-semibold': ['benzin-semibold'],
        'benzin-bold': ['benzin-bold']
      },
      boxShadow: {
        brand: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;',
        big: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;',
        bigger: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;',
        x: '-1px 0px 0px 0px #ad92b7, 1px 0px 0px 0px #ad92b7',
        y: '0px 1px 0px 0px, 0px -2px 0px 0px',
        border: '0px 0px 0px 2px #ad92b7',
      }
    },
  },
  variants: {
    extend: {
      grayscale: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
