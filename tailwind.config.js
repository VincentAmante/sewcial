
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend', 'sans-serif']
      },
      colors: {
        primary: '#FFFAE0',
        secondary: '#607BDA',
        accent1: '#FF96C3',
        accent2: '#FFC6A5',
        dark: '#282A2F'
      },
      fontSize: {
        sm: '10px',
        base: 'clamp(14px, 1.085vw, 12px)',
        alt: 'clamp(14px, 2vw, 14.5px)',
        xl: 'clamp(11px, 1.95vw, 13px)',
        '2xl': 'clamp(20px, 2.4vw, 16px)',
        '3xl': 'clamp(16px, 2.5vmax, 20px)',
        '4xl': 'clamp(18px, 2.5vmax, 50px)',
        '5xl': 'clamp(30px, 5vmax, 90px)',
        '6xl': 'clamp(55px, 5vmax, 150px)'
      }
    }
  }
}
