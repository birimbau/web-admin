module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: (config) => {
    config.resolve.alias.set('~', __dirname);
  },
}
