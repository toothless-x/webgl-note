
// 获取 ts 加载配置
module.exports = function getTypeSscriptLoader() {
  const tsLoaders = [
    // ts, tsx 加载配置
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: [
        {
          loader: 'babel-loader',
          options: {
            // 启用编译缓存加快打包速度
            cacheDirectory: true,
            compact: false,
          },
        },
        {
          loader: 'ts-loader',
          options: {
            // 仅转译不做类型检查, 类型检测使用 eslint 进行限定
            transpileOnly: true,
          },
        },
      ],
    },
  ];

  return tsLoaders;
}
