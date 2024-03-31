// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  router: {
    options: {
      strict: true,
    },
  },
  ssr: false,
  css: ['primevue/resources/themes/aura-light-green/theme.css', 'primeicons/primeicons.css', '~/assets/css/main.css'],
  modules: ['@nuxt/content', 'nuxt-primevue'],
  content: {
    // documentDriven: true,
    experimental: {
      clientDB: process.env.NODE_ENV === 'development' ? false : true,
      search: {
        indexed: true,
      },
    },
    highlight: {
      theme: 'github-light',
      langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'java', 'kt'],
    },
  },
  vite: {
    esbuild: {
      drop: ['console', 'debugger'],
    },
  },
})
