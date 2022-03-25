module.exports = {
  plugins: ['react', 'react-hooks'],
  overrides: [
    {
      // 仅对 tsx 文件关闭 prop-types 校验
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
  rules: {
    /**
    * 【关闭】 js文件需要 prop-types校验 ts文件不需要
    */
    // 'react/prop-types': 'off',
    /**
    * 【强制】 标签属性的换行，如果标签有多个属性，且存在换行，则每3个属性都需要换行独占一行
    */
    'react/jsx-max-props-per-line': [2, { maximum: 3 }],
    /**
     * 【关闭】 强制状态初始化样式在构造函数中或具有类属性
     */
    'react/state-in-constructor': 'off',
    /**
     * 【关闭】 static属性必须定义子在类名已外
     */
    'react/static-property-placement': 'off',
    /**
     * 【强制】 允许使用jsx的文件后缀，也就是jsx/tsx允许使用jsx, 其他不允许使用
     */
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.js', '.tsx', '.ts'] }],
    /**
     *  【关闭 】 防止 React 组件定义中缺少 displayName
     */
    'react/display-name': ['off', { ignoreTranspilerName: false }],
    // 【关闭】 强制任何 JSX 属性都没有传播
    'react/jsx-props-no-spreading': 'off',
    /**
     * 【推荐】 不要使用模糊的类型检查器 (any, array, object)
     */
    'react/forbid-prop-types': ['warn', { forbid: ['any', 'array', 'object'] }],

    /**
     * 【强制】 prop 值为 true 时，可以省略它的值
     */
    'react/jsx-boolean-value': ['error', 'never', { always: [] }],
    /**
     * 【强制】 标签的属性有多行时，结束标签需另起一行
     */
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    /**
     * 【强制】 JSX 语法闭合标签的缩进和换行
     */
    'react/jsx-closing-tag-location': 'error',

    /**
     * 【强制】JSX 行内属性间仅有一个空格
     */
    'react/jsx-props-no-multi-spaces': 'error',

    /**
    * 【强制】 JSX 属性的大括号内部两侧无空格
    */
    'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],

    /**
     * 【关闭】 JSX 中命名事件处理函数的前缀约定
     */
    'react/jsx-handler-names': [
      'off',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],

    /**
     * 【强制】 JSX 属性使用 2 个空格缩进
     */
    'react/jsx-indent-props': ['error', 2],

    /**
     * 【关闭】JSX 语法检查数组和迭代器的 key
     */
    'react/jsx-key': 'off',
    /**
     * 【推荐】 不要在 JSX 属性中使用 .bind()
     */
    'react/jsx-no-bind': [
      'warn',
      {
        ignoreRefs: false,
        allowArrowFunctions: true,
        allowBind: false,
      },
    ],
    /**
     * 【强制】 不要声明重复的属性名
     */
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],

    /**
     * 【关闭】 JSX 中不要直接使用字符串，而是通过{'TEXT'}
     */
    'react/jsx-no-literals': ['off', { noStrings: true }],

    /**
     * 【强制】 不要使用未声明的组件
     */
    'react/jsx-no-undef': 'error',
    /**
     * 【强制】 使用大驼峰风格命名组件
    */
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],

    /**
     * 【关闭】 类型检查器的属性名按首字母排序
     */
    'react/sort-prop-types': [
      'off',
      {
        ignoreCase: true,
        callbacksLast: false,
        requiredFirst: false,
      },
    ],

    /**
    * 【废弃】 用新规则代替 react/jsx-sort-props
    */
    'react/jsx-sort-prop-types': 'off',

    /**
     * 【关闭】 属性按首字母排序
     */
    'react/jsx-sort-props': [
      'off',
      {
        ignoreCase: true,
        callbacksLast: false,
        shorthandFirst: false,
        shorthandLast: false,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],

    /**
     * 【强制】 本条是对JS规约 no-unused-vars 的补充，防止React被错误地标记为未使用
     */
    'react/jsx-uses-react': ['error'],

    /**
     * 【强制】本条是对JS规约 no-unused-vars 的补充，防止变量被错误地标记为未使用
     */
    'react/jsx-uses-vars': 'error',

    /**
     * 【推荐】 不要使用危险属性
     */
    'react/no-danger': 'warn',

    /**
     * 【强制】 禁止使用已经废弃的方法
     */
    'react/no-deprecated': 'error',

    /**
     * 【推荐】 不要在 componentDidMount 使用 setState。
     */
    'react/no-did-mount-set-state': 'warn',
    /**
     * 【推荐】 不要在 componentDidUpdate 使用 setState。
     */
    'react/no-did-update-set-state': 'warn',
    /**
     * 【强制】 不要在 componentWillUpdate 内改变 state 值
     */
    'react/no-will-update-set-state': 'error',
    /**
     * 【关闭】 使用 this.state 获取状态，用 setState 改变状态；不能用 this.state 赋值改变状态
     */
    'react/no-direct-mutation-state': 'off',

    /**
     * 【强制】isMounted 已经被废弃
     */
    'react/no-is-mounted': 'error',

    /**
     * 【强制】 每个文件只包含一个 React 组件
     */
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    /**
     * 【关闭】 禁止使用 setState
     */
    'react/no-set-state': 'off',
    /**
     * 【强制】 使用 ref 回调函数或 React.createRef()，不要使用字符串
     */
    'react/no-string-refs': 'error',
    /**
     * 【强制】 不要在无状态组件中使用 this
     */
    'react/no-this-in-sfc': 'error',
    /**
     * 【强制】 在JSX中，所有DOM属性和属性命名都应该是小驼峰
     */
    'react/no-unknown-property': 'error',
    /**
     * 【强制】 使用 class extends React.Component ，而不是 React.createClass
     */
    'react/prefer-es6-class': ['error', 'always'],
    /**
     * 【关闭】 当未使用生命周期方法、setState 或者 ref，使用无状态函数定义组件
     */
    'react/prefer-stateless-function': 'off',
    /**
     * 【关闭】 防止 JSX 中未引入 React
     */
    'react/react-in-jsx-scope': 'off',
    /**
     * 【强制】 render 方法必须要有返回值
     */
    'react/require-render-return': 'error',
    /**
     * 【强制】 无子元素的标签需写成自闭合标签
     */
    'react/self-closing-comp': 'error',
    /**
     * 【关闭】 组件方法排序
     */
    'react/sort-comp': [
      'off',
      {
        order: [
          'static-methods',
          'instance-variables',
          'lifecycle',
          '/^on.+$/',
          'getters',
          'setters',
          '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
          'instance-methods',
          'everything-else',
          'rendering',
        ],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'getInitialState',
            'state',
            'getChildContext',
            'componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
          ],
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
    /**
     * 【强制】 多行的 JSX 标签需用小括号包裹
     */
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: true,
        assignment: true,
        return: true,
        arrow: true,
      },
    ],
    /**
     * 【强制】 设置第一个属性的位置。multiline-multiprop：如果JSX标签占用多行并且有多个属性，则第一个属性应始终放在新行上
     */
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    /**
     * 【强制】 不要在 JSX 属性的等号两边加空格
     */
    'react/jsx-equals-spacing': ['error', 'never'],
    /**
     * 【强制】 JSX 使用 2 个空格缩进
     */
    'react/jsx-indent': ['error', 2],
    /**
     * 【推荐】不要单独使用 target='_blank'
     */
    'react/jsx-no-target-blank': 'warn',
    /**
     * 【强制】 不要在 setState 中使用 this.state
     */
    'react/no-access-state-in-setstate': 'error',
    /**
      * 【强制】 JSX 语句的文本节点中不要使用注释字符串（例如，以//或/ *开头）
      */
    'react/jsx-no-comment-textnodes': 'error',
    /**
     * 【强制】 禁止使用 ReactDOM.render 的返回值
     */
    'react/no-render-return-value': 'error',

    /**
     * 【关闭】 组件必须包含 shouldComponentUpdate 或者 PureRenderMixin
     */
    'react/require-optimization': ['off', { allowDecorators: [] }],
    /**
     * 【强制】 不要使用 findDOMNode，严格模式下已经弃用
     */
    'react/no-find-dom-node': 'error',
    /**
     * 【关闭】禁止某些特定的 prop 命名，只对组件生效，DOM节点不生效
     */
    'react/forbid-component-props': ['off', { forbid: [] }],

    /**
     * 【关闭】 禁止某些特定的元素命名
     */
    'react/forbid-elements': ['off', { forbid: [] }],
    /**
     * 【关闭】 禁止在有子节点的组件或 DOM 元素中使用 dangerouslySetInnerHTML 属性
     */
    'react/no-danger-with-children': 'error',
    /**
     * 【强制】 声明的 prop 必须被使用
     */
    'react/no-unused-prop-types': [
      'error',
      {
        customValidators: [],
        skipShapeProps: true,
      },
    ],
    /**
     * 【强制】 style 的属性值必须是一个对象
     */
    'react/style-prop-object': 'error',
    /**
     * 【强制】 标签中禁止出现无意义字符，比如 > " } '
     */
    'react/no-unescaped-entities': 'error',
    /**
     * 【强制】禁止将 children 作为属性名
     */
    'react/no-children-prop': 'error',
    /**
     * 【强制】 自闭合标签的斜线前有且仅有一个空格
     */
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
      },
    ],

    /**
     * 【废弃】 该条废弃，被替代为 jsx-tag-spacing
     */
    'react/jsx-space-before-closing': ['off', 'always'],
    /**
     * 【推荐】 不要用数组索引作为 map 元素的 key
     */
    'react/no-array-index-key': 'warn',
    /**
     * 【关闭】 如果属性没有 isRequired 类型检查，需要在 defaultProps 内对其赋值
     */
    'react/require-default-props': 'off',
    /**
     * 【关闭】 禁止使用其他组件的prop类型，除非有明确的导入/导出
     */
    'react/forbid-foreign-prop-types': 'off',

    /**
     * 【强制】  HTML 自闭标签不能有子节点
     */
    'react/void-dom-elements-no-children': 'error',
    /**
     * 【推荐】 defaultProps 需要与 propTypes 相匹配
     */
    'react/default-props-match-prop-types': ['warn', { allowRequiredDefaults: false }],

    /**
     * 【强制】 在扩展 React.PureComponent 时禁止使用 shouldComponentUpdate
     */
    'react/no-redundant-should-component-update': 'error',
    /**
     * 【强制】  声明的 state 必须被使用
     */
    'react/no-unused-state': 'error',
    /**
      * 【关闭】 布尔类型的属性的命名约定，建议用 is 或 has 前缀
      */
    'react/boolean-prop-naming': 'off',

    /**
     * 【强制】 禁止大小写拼写错误，该检测规则未写入规约
     */
    'react/no-typos': 'error',

    /**
     * 【关闭】 JSX 属性或子元素强制使用花括号或禁止使用不必要的花括号
     */
    'react/jsx-curly-brace-presence': 'off',
    /**
    * React Hooks 配置滚则
    */
    // Checks rules of Hooks
    // @link https://reactjs.org/docs/hooks-rules.html
    'react-hooks/rules-of-hooks': 'error',

    // Checks effect dependencies
    // @link https://reactjs.org/docs/hooks-rules.html
    'react-hooks/exhaustive-deps': 'error',
  },
};
