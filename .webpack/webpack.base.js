// 基础 Webpack 配置
// 需要自行添加以下内容:
//   entry, output, resolve.alias
// plugin, moduel.rules可自行拓展

// 添加基础 loader, plugins
const loadJavascript = require('./rules/loadJavascript');
const loadTypescript = require('./rules/loadTypescript');
const loadStyles = require('./rules/loadStyles');
const loadStaticAssets = require('./rules/loadStaticAssets');
const loadWebWorker = require('./rules/loadWebWorker');
// 添加基础 plugin
const basePlugins = require('./plugins/basePlugins');

// 获取配置环境
const getBuildEnv = require('./utils/getBuildEnv');
// isDev: 是否开发环境, isBeta: 是否预发环境, isProd: 是否生产环境
const { isDev, isBeta, isProd } = getBuildEnv();

// 导出配置
module.exports = {
  // 预发和生产需要设置为生产环境
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? '#eval-source-map' : (isBeta && 'source-map'),
  // 输出状态展示
  stats: {
    children: false,
    warnings: false,
    // 构建性能优化提示。生产、预发需要
    performance: isProd || isBeta,
  },
  performance: {
    maxEntrypointSize: 200000, // 最大入口文件配置
    maxAssetSize: 1000000, // 最大资源文件配置
  },
  resolve: {
    // 配置解析文件拓展名
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    // 配置别名
    alias: {},
  },
  module: {
    rules: [
      // 生产环境不需要 source-map
      !isProd ? {
        test: /\.(js|ts)x?$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      } : {},
      ...loadJavascript(),
      ...loadTypescript(),
      ...loadStyles(),
      ...loadStaticAssets(),
      ...loadWebWorker(),
    ]
  },
  plugins: [
    ...basePlugins(),
  ]
}
