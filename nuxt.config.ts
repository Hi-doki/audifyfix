// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  buildDir: 'nuxt-build',
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})
