export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'dev-portal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  router: {
    base:
      process.env.NODE_ENV === 'production' ? '/chargetrip-developers/' : '/',
    extendRoutes(routes) {
      routes.unshift({
        path: '/',
        redirect: '/getting-started',
      })
    },
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/styles/index.scss',
    '@chargetrip/internal-vue-components/dist/components.css',
  ],
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/globals.ts', '~/utilities/directives.ts'],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/mdx',
    '@nuxt/content',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config) {
      config.node = {
        fs: 'empty',
      }
    },
  },
}
