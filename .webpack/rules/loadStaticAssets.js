// 静态资源文件加载

// 获取配置环境
const getBuildEnv = require('../utils/getBuildEnv');

// 构建静态文件加载器
module.exports = function getAssetsLoaders() {
  // isDev: 是否开发环境, isBeta: 是否预发环境, isProd: 是否生产环境
  const { isDev } = getBuildEnv();

  // 惊天资源加载器
  const assetsLoaders = [
    // 字体、音视频等静态资源直接加载
    {
      test: /\.(mp4|ogg|mp3|woff|woff2|eot|ttf|otf)$/,
      exclude: /node_modules/,
      use: ['file-loader'],
    },
    // 图片资源加载
    {
      test: /\.(png|jpg|svg|jpeg|gif)$/,
      exclude: /node_modules/,
      use: [
        // 开发模式不用转base64方便调试
        // 其他环境且文件小于5K则进行 base64 编码
        isDev ? 'file-loader' : {
          loader: 'url-loader',
          options: {
            // 生产、预发环境小于5k转换成base64编码
            limit: (!isDev) ? (1024 * 5) : Infinity,
          },
        },
      ],
    },
  ];

  return assetsLoaders;
}
