
const webpack = require('webpack'); // webpack 配置
const WebpackBar = require('webpackbar'); // 打包进度条
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清空打包文件夹
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 打包分析
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); // ts类型检测
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取出CSS，不注入JS

const getBuildEnv = require('../utils/getBuildEnv'); // 获取配置环境

// 获取基础插件配置
module.exports = function basePlugins() {
  // isDev: 是否开发环境, isBeta: 是否预发环境, isProd: 是否生产环境
  const { isDev, isBeta } = getBuildEnv();

  // 基础插件
  const configPlugins = [
    // 生成前清理之前构建内容
    new CleanWebpackPlugin(),
    // 打包进度条
    new WebpackBar(),
    // 单独进程进行TS类型检查, ts-loader跳过类型检测只做加载优化
    new ForkTsCheckerWebpackPlugin({
      // 异步检测代码，不影响 webpack 编译
      async: true,
      // 使用自定义 ESLint 配置
      eslint: {
        enabled: true,
        // 需要检测的文件。
        files: '**/*.{ts, tsx}',
      }
    }),
    // 注入构建环境变量到打包代码内
    new webpack.DefinePlugin({
      'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV),
    }),
  ];

  // 开发环境启用热替换
  if (isDev) {
    configPlugins.push(...[
      // 模块热替换
      new webpack.HotModuleReplacementPlugin(),
    ]);
  } else {
    configPlugins.push(...[
      // CSS 文件提取优化
      new MiniCssExtractPlugin({
        filename: '[name].[hash:6].css',
        chunkFilename: '[id].[hash:6].css',
        ignoreOrder: true,
      }),
    ]);
  }

  // 预发环境需要模块分析数据
  if (isBeta) {
    configPlugins.push(...[
      // 静态资源分析
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
    ]);
  }

  return configPlugins;
}
