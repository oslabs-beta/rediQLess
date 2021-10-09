module.exports = {
  purge: ['./*.html', './client/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: { max: '575px' }, // Mobile (iPhone 3 - iPhone XS Max).
      sm: { min: '576px', max: '897px' }, // Mobile (matches max: iPhone 11 Pro Max landscape @ 896px).
      md: { min: '898px', max: '1199px' }, // Tablet (matches max: iPad Pro @ 1112px).
      lg: { min: '1200px' }, // Desktop smallest.
      xl: { min: '1159px' }, // Desktop wide.
      xxl: { min: '1359px' } // Desktop widescreen.
    },
    fontFamily: {
      sans: ['Jost', 'sans-serif'],
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