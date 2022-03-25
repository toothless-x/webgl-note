
// typescript 配置
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    './rules/javascript.rule',
    './rules/typescript.rule',
  ],
  plugins: [
    '@typescript-eslint',
  ],
};
