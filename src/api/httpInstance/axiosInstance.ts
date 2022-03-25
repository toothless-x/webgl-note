import Axios from 'axios';
import { runtimeConfig } from '@Config/runtime';

// 请求配置类型
interface iAxiosRequestConfig {
  baseURL?: string; // 请求基础路径
  timeout?: number; // 请求超时时间
}
// 实例化配置
// interface iRequestInstConfig {
//   handleUnLogin: boolean; // 是否处理未登录情况
// }

// 创建请求实例方法
const createPublicAxiosInstance = (
  requestConfig: iAxiosRequestConfig,
  // instOptions?: iRequestInstConfig,
) => {
  // 默认请求路径: "/", 默认超时时间: 10s
  const { baseURL = '/', timeout = 10 * 1000 } = requestConfig;
  // 默认处理未登录情况
  // const { handleUnLogin = true } = instOptions || {};

  // 1. Axios 实例
  const tmpAxiosInstance = Axios.create({ baseURL, timeout });
  // 2. 添加请求劫持器
  tmpAxiosInstance.interceptors.request.use(async (config: any) => {
    const newConfig = { ...config };

    // 添加 TraceID 便于问题排查
    if (!newConfig.params) {
      newConfig.params = {};
    }

    return newConfig;
  });
  // 3. 添加响应劫持器
  tmpAxiosInstance.interceptors.response.use(
    async (res: any) => res.data,
    (err: unknown) => Promise.reject(err),
  );

  return tmpAxiosInstance;
};

// 获取配置
const { api: apiConfig } = runtimeConfig;
const { baseUrl: baseURL, timeout } = apiConfig;

// API 请求 Axios 实例
export const axiosInstance = createPublicAxiosInstance({ baseURL, timeout });
