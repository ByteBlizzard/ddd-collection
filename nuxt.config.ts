// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  router: {
    options: {
      strict: true,
    },
  },
  ssr: false,
  css: [
    'primevue/resources/themes/aura-light-green/theme.css',
    'primeicons/primeicons.css',
    '~/assets/styles/default.scss',
  ],
  modules: ['@nuxt/content', 'nuxt-primevue', '@nuxtjs/color-mode'],
  content: {
    // documentDriven: true,
    experimental: {
      clientDB: process.env.NODE_ENV === 'development' ? false : true,
      search: {
        indexed: true,
      },
    },
    highlight: {
      theme: 'vitesse-dark',
      langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'java', 'kt'],
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },
  vite: {
    esbuild: {
      drop: ['console', 'debugger'],
    },
  },
})
