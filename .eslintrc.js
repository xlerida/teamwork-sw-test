module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'padded-blocks': 'off',
    'no-restricted-syntax': 'off',
    'linebreak-style': 'off',
    'vue/no-setup-props-destructure': 'off',
    'max-len': 'off',
  },
};
