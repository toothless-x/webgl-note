// 构建优化配置
const TerserWebpackPlugin = require('terser-webpack-plugin'); // 压缩JS代码
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩CSS代码
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // GZIP文件压缩
// 获取配置环境
const getBuildEnv = require('./utils/getBuildEnv');

module.exports = function buildOptimization(optConfig = {}) {
  // isDev: 是否开发环境, isBeta: 是否预发环境, isProd: 是否生产环境
  const { isBeta, isProd } = getBuildEnv();
  // 自定义配置
  const { buildGzip = false, ...optimiazion } = optConfig;

  // 压缩配置：预发、生产环境才执行压缩
  const minimizer = [];

  // 预发 or 生成需要压缩代码、代码提取
  if (isBeta || isProd) {
    minimizer.push(...[
      // 压缩JS代码
      new TerserWebpackPlugin({
        extractComments: false, // 不单独提取注释文件
        cache: true, // 缓存
        parallel: true, // 并行加载
        exclude: /node_modules/, // 不压缩node_modules文件
        sourceMap: true, // 预发生成 sourceMap
      }),
      // 压缩css
      new OptimizeCSSAssetsPlugin(),
    ]);

    // 预发、生产是否需要开启 gzip 压缩；本地不用
    if (buildGzip) {
      minimizer.push(
        // 构建时开启 gzip 压缩。需要nginx支持支持发送gzip文件
        new CompressionWebpackPlugin({
          test: new RegExp(`\\.(${['js', 'css'].join('|')})$`),
          threshold: 8192,
          minRatio: 0.8,
        }),
      );
    }
  }

  return {
    runtimeChunk: 'single',
    mangleWasmImports: true,
    // 压缩设置, 生产环境文件压缩
    minimizer,
    // 打包文件切分设置
    splitChunks: {
      chunks: 'all', // 默认async 可选值 all 和 initial
      maxInitialRequests: 6, // 一个入口文件最大的请求数
      maxAsyncRequests: 6, // 一个入口文件最大的并行请求数
      minSize: 100000, // 拆分后最小体积 10K
      maxSize: 500000, // chunk打包后最大体积 50K
      minChunks: 2, // 最小引用次数
    },
    ...(optimiazion || {}),
  };
};
