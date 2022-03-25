// 样式内容加载
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取出CSS，不注入JS
// 获取配置环境
const getBuildEnv = require('../utils/getBuildEnv');

// 构建样式加载器
module.exports = function getStyleLoaders() {
  // isDev: 是否开发环境, isBeta: 是否预发环境, isProd: 是否生产环境
  const { isDev, isProd } = getBuildEnv();

  // 样式加载器
  const stylesLoaders = [
    // Sass 加载、普通 Css 加载
    {
      test: /\.(s(c|a))ss$/,
      exclude: /node_modules/,
      use: [
        // 开发不需要环境提取 css 为单独文件
        // 预发、线上均需要保持一致
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: !isProd,
            modules: {
              auto: /\.scoped\.(s(c|a)|c)ss$/,
              localIdentName: isProd ? '[hash:base64]' : '[local]__[hash:8]',
            },
          },
        },
        'postcss-loader',
        'sass-loader',
      ],
    },
    // 引入已压缩CSS内容
    {
      test: /\.min.css$/,
      include: /node_modules/,
      use: [
        // 开发不需要环境提取 css 为单独文件
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    },
    // 引入纯 css
    {
      test: /\.css$/,
      include: /node_modules/,
      use: [
        // 开发不需要环境提取 css 为单独文件
        // 预发、线上均需要保持一致
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: !isProd,
            modules: {
              auto: /\.scoped\.(s(c|a)|c)ss$/,
              localIdentName: isProd ? '[hash:base64]' : '[local]__[hash:8]',
            },
          },
        },
        'postcss-loader',
      ],
    },
    // less 配置
    {
      test: /\.less$/,
      use: [
        // 开发不需要环境提取 css 为单独文件
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: !isProd,
            modules: {
              auto: /\.scoped\.less$/,
              localIdentName: isProd ? '[hash:base64]' : '[local]__[hash:8]',
            },
          },
        },
        'postcss-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: { javascriptEnabled: true },
          },
        },
      ],
    },
  ]

  return stylesLoaders;
}
