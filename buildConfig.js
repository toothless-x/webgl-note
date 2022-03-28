const path = require('path');

// 代理配置
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const proxyConfig = {
  // example
  // targetName: 'http://targetAddress.com',
};
// 获取代理地址
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const getProxyTarget = (proxy = {}) => {
  // 本地开发代理地址
  let proxyTarget = '127.0.0.1:6008';
  if (proxy[process.env.BUILD_ENV]) {
    proxyTarget = proxy[process.env.BUILD_ENV];
  }

  return proxyTarget;
};

// 项目目录配置
const foldConfig = {
  rootDir: path.resolve(__dirname, './'), // 项目根目录
  srcDir: path.resolve(__dirname, './src'), // src 目录
  distDir: path.resolve(__dirname, './dist'), // dist 目录
  staticDir: path.resolve(__dirname, './public/static'), // 静态资源目录
};

// 导出构建时配置
module.exports = {
  // 项目目录配置
  foldConfig,
  // HTML 配置，参考 html-webpack-plugin 配置直接传入
  htmlConfig: {
    title: 'WebGL 笔记',
  },
  // 打包配置，简化
  optimiazion: {
    buildGzip: false,
  },
  // 请求相关配置
  devServer: {
    // **仅开发环境生效** 是否启用 Mock 数据。请求配置在 mock 目录中，mock 内容配置详见 https://github.com/jaywcjlove/mocker-api
    useMock: false,
    mockFolder: path.resolve(__dirname, './mock'),
    // **仅开发环境生效** 代理配置，直接传入 webpack，参考 webpack-dev-server 配置
    //  example: proxy api request
    // proxy: {
    //   '/api': {
    //     target: getProxyTarget(proxyConfig),
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
    contentBase: [foldConfig.distDir, foldConfig.staticDir],
  },
};
