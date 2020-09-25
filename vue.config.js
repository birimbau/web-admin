module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('~', __dirname);
    config.output.chunkFilename('js/[name].[id].[chunkhash:8].js');
  },
};
