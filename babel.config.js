const VUE_CLI_BABEL_PRESET = '@vue/cli-plugin-babel/preset';
const JEST_BABEL_PRESET =     ['@babel/preset-env', { targets: { node: 'current' } } ];
const JEST_TYPESCRIPT_PRESET = '@babel/preset-typescript';

const vueConfig = {
  presets: [
    VUE_CLI_BABEL_PRESET,
    JEST_BABEL_PRESET,
    JEST_TYPESCRIPT_PRESET,
  ],
};

const cypressConfig = {};

module.exports = process.env.CYPRESS_ENV ? cypressConfig : vueConfig;
