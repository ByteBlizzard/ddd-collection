// https://nuxt.com/docs/api/configuration/nuxt-config
const prefix = process.env.NUXT_APP_BASE_URL || ''
export default defineNuxtConfig({
  devtools: { enabled: true },
  router: {
    options: {
      strict: true,
    },
  },
  ssr: false,
  css: ['primeicons/primeicons.css', '~/assets/styles/default.scss'],
  modules: ['@nuxt/content', 'nuxt-primevue', '@nuxtjs/color-mode'],
  app: {
    head: {
      link: [
        {
          id: 'theme-link',
          rel: 'stylesheet',
          href: prefix + '/styles/aura-light-green/theme.css',
        },
      ],
    },
  },
  content: {
    markdown: {},
    documentDriven: {
      injectPage: false,
    },
    experimental: {
      clientDB: process.env.NODE_ENV === 'development' ? false : true,
      search: {
        indexed: true,
      },
    },
    highlight: {
      theme: 'github-dark',
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
