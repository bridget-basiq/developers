export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  publicRuntimeConfig: {
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_API_PUBLIC_KEY: process.env.ALGOLIA_API_PUBLIC_KEY,
  },
  target: 'static',
  head: {
    title: 'dev-portal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'OZCKUFXK',
        spa: 'auto',
        defer: true,
        'data-spa': 'auto',
      },
    ],
  },
  router: {
    base:
      process.env.NODE_ENV === 'production' ? '/chargetrip-developers/' : '/',
    extendRoutes(routes) {
      routes.unshift({
        path: '/',
        redirect: '/home',
      })

      routes.push({
        path: '*',
        name: `catch-all`,
        component: 'pages/_slug.vue',
      })
    },
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/styles/index.scss',
    '@chargetrip/internal-vue-components/dist/components.css',
  ],

  content: {
    editor: '~/components/Editor.vue',
    markdown: {
      prism: {
        theme: false,
      },
    },
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/globals.ts',
    '~/plugins/axios.ts',
    '~/utilities/directives.ts',
    '~/utilities/filters.ts',
  ],
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
    '@nuxtjs/axios',
    '@nuxt/content',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config) {
      config.node = {
        fs: 'empty',
      }
    },
  },
}
