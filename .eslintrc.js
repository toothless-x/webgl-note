const path = require('path');

// typescript 配置文件
const tsConfig = path.resolve(__dirname, './tsconfig.json');

module.exports = {
  root: true,
  extends: './.eslint/typescript',
  settings: {
    // enable this when useing react
    // react: {
    //   version: 'detact',
    // },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.jsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: tsConfig,
      },
    },
  },
};
