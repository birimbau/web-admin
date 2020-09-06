const vueConfig = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
};

const cypressConfig = {};

module.exports = process.env.CYPRESS_ENV ? cypressConfig : vueConfig;
