// 开发服务器设置
// 获取配置环境
const fs = require('fs');
const path = require('path');
const apiMocker = require('mocker-api'); // mock 请求数据
const getBuildEnv = require('./utils/getBuildEnv');

// 构建开发环境配置
module.exports = function buildDevServer(devServerConfig = {}) {
  // 自定义配置
  // useMock: 是否使用 Mock, proxy: 代理配置, ...其他自定义配置
  const {
    useMock = false,
    mockFolder = '',
    proxy = {},
    ...selfConfig
  } = devServerConfig;
  // isDev: 是否开发环境, isBeta: 是否预发环境, isProd: 是否生产环境
  const { isDev } = getBuildEnv();

  // 非开发环境不需要开发服务器
  if (!isDev) {
    return {};
  }

  // 基础配置
  const baseDevServerConfig = {
    // contentBase: [foldConfig.distDir, foldConfig.staticDir], // 打包后文件位置、静态资源位置
    clientLogLevel: 'silent', // 打印日志级别，有错误时显示
    quiet: false,
    stats: 'errors-only',
    compress: false, // 开发环境不启用压缩
    port: 6008, // 端口
    overlay: true, // 展示错误蒙层
    hot: true, // 启用热替换
    hotOnly: true, // 编译成功后刷新
    open: false, // 是否自动打开浏览器
    host: '0.0.0.0', // 允许通过ip访问
    disableHostCheck: true, // 解决 127.0.0.1 指向其他域名错误
    historyApiFallback: {
      index: '/',
    },
  };
  // 使用 mock 配置时，接口转移到 mock 服务器
  if (useMock && mockFolder) {
    // 获取所有 mock 数据文件, 传入Mock文件夹路径
    const mockFoldFiles = fs.readdirSync(mockFolder);
    const mockerFiles = mockFoldFiles.filter(
      (fileName) => /\**.mock.js$/.test(fileName),
    ).map(
      (fileName) => path.join(mockFolder, fileName),
    );

    return {
      before(app) {
        apiMocker(app, mockerFiles, {
          changeHost: true, // 默认更改 host
          proxy, // 自定义 proxy 配置
        });
      },
      ...baseDevServerConfig,
      ...(selfConfig || {}),
    };
  }

  // 否则接口转为代理
  return {
    proxy,
    ...baseDevServerConfig,
    ...(selfConfig || {}),
  };
};
