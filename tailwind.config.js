
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    screens: {
      mobile: '640px',
      tablet: '768px',
      desktop: '1024px',
      lgScreen: '1280px',
      xlScreen: '1536px'
    },
    extend: {
      fontFamily: {
        sans: ['Lexend', 'sans-serif']
      },
      colors: {
        primary: '#FFFAE0',
        secondary: '#607BDA',
        'accent-1': '#FF96C3',
        'accent-2': '#FFC6A5',
        dark: '#282A2F'
      },
      fontSize: {
        sm: '10px', // Caption
        base: 'clamp(14px, 1.085vw, 12px)', // Base / Body
        alt: 'clamp(14px, 2vw, 14.5px)', // Buttons / Bubbles
        xl: 'clamp(11px, 1.95vw, 13px)', // h3
        '2xl': 'clamp(20px, 2.4vw, 16px)', // h2
        '3xl': 'clamp(16px, 2.5vmax, 20px)', // h1
        '4xl': 'clamp(18px, 2.5vmax, 50px)', // tilted
        '5xl': 'clamp(30px, 5vmax, 90px)', // big boy
        '6xl': 'clamp(55px, 5vmax, 150px)' // giant
      },
      spacing: {
        mobile: '1.875rem',
        desktop: '16rem'
      }
    }
  }
}
