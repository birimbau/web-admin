import colors from 'vuetify/es5/util/colors';

export default {
  mode: 'spa',

  target: 'static',

  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  css: [
  ],

  plugins: [
    '@/plugins/setup',
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {},

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        // Set the source maps
        // They are different to allow VS Code debugging
        // config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
        config.devtool = 'source-map';
      }
    },
  },

  server: {
    port: 3000,
    host: '0.0.0.0',
  },
};
