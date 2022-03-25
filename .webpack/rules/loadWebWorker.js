// WebWorker加载

// 获取 WebWorker 加载器
module.exports = function getWebLoaders() {
  const webWorkerLoader = [
    // web worker 加载器
    {
      test: /\.worker\.(js|ts)$/,
      use: {
        loader: 'worker-loader',
      },
    },
  ];

  return webWorkerLoader;
}
