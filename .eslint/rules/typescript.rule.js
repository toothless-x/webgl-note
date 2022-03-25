// typescript rules
module.exports = {
  rules: {
    /**
     * 【强制】禁止在外部作用域中声明的影子变量声明变量
     */
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    /**
     * 【强制】中缀运算符周围有空格
     */
    '@typescript-eslint/space-infix-ops': ['error', { int32Hint: false }],
    /**
     * 【强制】禁止在定义之前使用变量
     */
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    /**
     * 【强制】禁止未使用的变量
     */
    '@typescript-eslint/no-unused-vars': ['error'],
    /**
     * 【强制】定义类型时应正确添加空格
     */
    '@typescript-eslint/type-annotation-spacing': 'error',
    /**
     * 【强制】将重载的函数写在一起以增加代码可读性
     * @link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md
     */
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    /**
     * 【推荐】简单类型请使用 T[] 或 readonly T[]
     * 对于所有其他类型（联合类型，交集类型，对象类型，函数类型等），请使用 Array<T> 或 ReadonlyArray<T>
     * (后续迭代改为强制；目的: 既要强制类型检查，也想要简洁的代码)
     * @link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
     */
    '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
    /**
     * 【关闭】禁止对没有 then 方法的对象使用 await
     * @link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/await-thenable.md
     */
    '@typescript-eslint/await-thenable': 'off',
    /**
     * 【强制】使用 @ts-expect-error/@ts-ignore/@ts-nocheck/@ts-check 等指令时需跟随注释描述
     * @link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-comment.md
     */
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': 'allow-with-description',
      },
    ],
    // 函数换行
    // @link https://eslint.org/docs/rules/function-paren-newline
    'function-paren-newline': ['error', 'consistent'],
    // 警用默认导出
    'import/prefer-default-export': 'off',
  },
};
