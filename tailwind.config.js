
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
        'accent-2': '#FF4E4E',
        dark: '#282A2F'
      },
      fontSize: {
        sm: '10px', // Caption
        base: 'clamp(14px, 1.4vw, 16px)', // Base / Body
        alt: 'clamp(14px, 2vw, 14.5px)', // Buttons / Bubbles
        xl: 'clamp(13px, 1.3vw, 15px)', // h3
        navIcon: 'clamp(30px, 10vw, 50px)',
        '2xl': 'clamp(20px, 2.4vw, 16px)', // h2
        '3xl': 'clamp(16px, 2.5vmax, 20px)', // h1
        '4xl': 'clamp(18px, 2.5vmax, 50px)', // tilted
        '5xl': 'clamp(30px, 4.5vmax, 90px)', // big boy
        '6xl': 'clamp(48px, 4.75vmax, 128px)',
        '7xl': 'clamp(55px, 5vmax, 150px)' // giant
      },
      spacing: {
        'mobile-w': '1.875rem',
        'mobile-h': '1.6rem',
        'desktop-w': '16rem',
        'desktop-h': '3.125rem',
        'default-w': 'clamp(1.875rem, 10vw, 16rem)',
        'default-h': 'clamp(1.6rem, 10vh, 3.125rem)'
      },
      plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp')
      ]
    }
  }
}
