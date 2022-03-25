module.exports = {
  overrides: [
    {
      files: ['**/*.{ts, tsx}'],
      rules: {
        // 如果是ts情况关闭规则 tslint 已有对应的规则校验解决冲突
        'no-use-before-define': 'off',
        'no-shadow': 'off',
        // 暂时关闭以下内容检测
        'import/no-cycle': 'off', // 循环依赖
      },
    },
  ],
  rules: {
    'import/prefer-default-export': 'off', // 禁用默认导出
    'import/extensions': [2, 'always', {
      ignorePackages: true,
      pattern: {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    }],
    // 强制使用 unix 换行符
    'linebreak-style': ['error', 'unix'],
  },
};
