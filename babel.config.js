// 项目根 Babel 配置

// 只做语法配置，React 等配置子项目自行配置
module.exports = function babelConfig(api) {
  api.cache(true);

  // 预设
  const presets = [
    // 配合 plugin-transform-runtime 只导入使用到的 API
    ['@babel/preset-env', { modules: false, useBuiltIns: 'usage', corejs: 3 }],
  ];

  // 插件
  const plugins = [
    // 使用transform进行运行时转换，避免引入全局 pollify
    ['@babel/plugin-transform-runtime', { corejs: false }],
    // 支持装饰器语法
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ];

  return {
    // 根模块指定为: root, 不需要后项寻找
    presets,
    plugins,
  };
};
