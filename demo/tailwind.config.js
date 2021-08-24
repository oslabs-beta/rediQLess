module.exports = {
  purge: ['./*.html', './client/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      rdgreen: {
        lighter: '#76ab98',
        default: '#67A28D',
        dark: '#3d6154',
      },
      deeppink: {
        default: '#ff1cc0',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'group-hover'],
      rotate: ['active', 'group-hover'], 
    }
  },
  plugins: [],
}
