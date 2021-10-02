module.exports = {
  purge: ['./*.html', './client/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '480px',
      'md':{'min': '480px', 'max': '1310px'},
      'lg':'1024px',
      'xl':'1280px'
    },
    fontFamily: {
      // WorkSans: ['"Work Sans"', 'sans-serif'],
      sans: ['"Work Sans"', 'sans-serif'],
    },
    colors: {
      rdgreen: {
        lighter: '#76ab98',
        default: '#67A28D',
        dark: '#3d6154',
      },
      white: {
        default: '#ecf2e8',
      },
      sand: {
        lighter: '#D9C97C',
        default: '#cab345',
      },
      deeppink: {
        default: '#ff1cc0',
      },
      khaki: {
        lighter: '#f9ed92',
        default: '#ffed4c',
        alt: '#fff148',
      },
      gold: {
        default: '#e3ad4d',
      },
      darkblue: {
        lighter: '#767b9c',
        default: '#293E56',
      },
      yellow: {
        newYellow: '#fcf148',
      },
      black: {
        midnight: '#021220',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'group-hover', 'motion-safe'],
      rotate: ['active', 'group-hover'],
    },
  },
  plugins: [],
}
