// @ts-expect-error JS import
import buildConfig from '@Root/buildConfig';

// 运行时请求配置
export const runtimeConfig = {
  htmlConfig: buildConfig.htmlConfig,
  api: {
    baseUrl: '/', // 请求路径。默认为空，通域名访问。启用 Mock 时，baseUrl 必须置位 '/'
    timeout: 10 * 1000, // api 请求超时时间设置
    uploadImageTimeOut: 60 * 1000, // 样本上传超时时间设置
  },
};
