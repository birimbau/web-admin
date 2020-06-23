module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended',
    ],
    plugins: [
    ],
    // add your custom rules here
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        indent: ['error', 4],
        'no-multiple-empty-lines': ['error', { max: 2 }],
        semi: ['error', 'always'],
        'space-before-function-paren': 'off',
        'vue/html-indent': ['error', 4],
    },
};
