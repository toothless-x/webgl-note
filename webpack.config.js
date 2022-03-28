// 项目 Webpack 配置
const path = require('path'); // Path
const webpack = require('webpack'); // webpack 配置
const { merge: webpackMerge } = require('webpack-merge'); // 合并 Webpack 配置
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 处理html
const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // 构建完通知
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制静态资源文件

const baseWebpackConfig = require('./.webpack/webpack.base'); // 项目基础 webpack 配置
const buildOptimization = require('./.webpack/buildOptimization'); // 构建优化配置
const buildDevServer = require('./.webpack/buildDevServer'); // 构建开发 DevServer
const getBuildEnv = require('./.webpack/utils/getBuildEnv'); // 获取配置环境

// 项目内构建配置
const buildConfig = require('./buildConfig');

// isDev: 是否开发环境, isBeta: 是否预发环境, isProd: 是否生产环境
const {
  // isProd, isBeta,
  isDev,
} = getBuildEnv();
// 解析目录
const resolver = (..._path) => path.resolve(..._path);
// 构建配置
const {
  optimiazion = {},
  devServer = {},
  foldConfig = {},
  htmlConfig = {},
} = buildConfig;

// 构建应用打包用到的插件
const buildAppPlugins = (inerFoldConfig) => {
  // 基础插件
  const configPlugins = [
    new HtmlWebpackPlugin({
      ...htmlConfig,
      template: resolver(inerFoldConfig.rootDir, 'public/index.html'),
      filename: 'index.html',
    }),
    // 添加构建消息通知
    new WebpackBuildNotifierPlugin({
      ...htmlConfig,
      logo: resolver(inerFoldConfig.rootDir, 'public/favicon.ico'),
      suppressWarning: true,
    }),
  ];

  // 开发环境
  if (!isDev) {
    configPlugins.push(...[
      // 复制静态资源
      new CopyWebpackPlugin({
        patterns: [
          { from: inerFoldConfig.staticDir, to: inerFoldConfig.distDir },
        ],
      }),
      // 根据模块的相对路径生成 HASH 作为模块 ID
      new webpack.HashedModuleIdsPlugin(),
    ]);
  }

  return configPlugins;
};

// 项目内配置
module.exports = webpackMerge(baseWebpackConfig, {
  // 入口配置
  entry: {
    index: resolver(foldConfig.srcDir, 'index'),
    // vendor: ['react', 'react-dom', 'react-router', 'fabric'],
  },
  // 打包配置
  output: {
    filename: isDev ? '[name].js' : '[name].[hash:6].js',
    path: foldConfig.distDir,
    publicPath: '/',
  },
  // 优化配置
  optimization: isDev ? {} : buildOptimization({
    ...optimiazion,
  }),
  // 开发服务器配置
  devServer: buildDevServer({
    // 传入构建配置
    ...devServer,
  }),
  // 别名设置
  resolve: {
    alias: {
      '@Root': foldConfig.rootDir,
      '@Src': foldConfig.srcDir,
      '@Views': resolver(foldConfig.srcDir, 'views'),
      '@Api': resolver(foldConfig.srcDir, 'api'),
      '@Styles': resolver(foldConfig.srcDir, 'styles'),
      '@Assets': resolver(foldConfig.srcDir, 'assets'),
      '@WebGL': resolver(foldConfig.srcDir, 'webgl'),
      '@Utils': resolver(foldConfig.srcDir, 'utils'),
      '@Config': resolver(foldConfig.srcDir, 'config'),
    },
  },
  // 其他插件配置
  plugins: [
    ...buildAppPlugins(foldConfig),
  ],
});
