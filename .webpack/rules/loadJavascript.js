module.exports = function getJavascriptLoader() {
  // js 加载器
  const jsLoader = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            // 启用编译缓存加快打包速度
            cacheDirectory: true,
            compact: false,
          },
        },
      ],
    },
  ]

  return jsLoader;
}
