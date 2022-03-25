module.exports = {
  plugins: ['jsx-a11y'],
  rules: {
    /**
     * 【关闭】 label 需要有 associated
     */
    'jsx-a11y/label-has-associated-control': 'off',
    /**
     * 【关闭】  可点击元素必须绑定键盘事件
     */
    'jsx-a11y/click-events-have-key-events': 'off',
    /**
     * 【关闭】 不可访问元素必须绑定事件
     */
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    /**
     * 【关闭】 静态交互元素必须绑定 role
     */
    'jsx-a11y/no-static-element-interactions': 'off',
  },
};
