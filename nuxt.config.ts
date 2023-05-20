// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    '@nuxt/devtools',
    '@vueuse/nuxt',
    '@pinia/nuxt'
  ],
  build: {
    transpile: [
      'trpc-nuxt',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons'
    ]
  },
  typescript: {
    shim: false
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/sass/_main.scss";'
        }
      }
    }
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/styles/main.css'
  ],
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/about-us', '/contact-us', '/donate', '/event-workshops', '/templates', '/catalogue', '/']
    }
  }
})
