// 样式
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
// 图片
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

// 着色器文件
declare module '*.vert';
declare module '*.frag';

// 函数声明
/* eslint-disable no-unused-vars */
declare function requestIdleCallback(callback: () => void): number;
declare function cancelIdleCallback(ref: number): void;

// Web Worker 声明
declare module '*.worker.ts' {
  // You need to change `Worker`, if you specified a different value for the `workerType` option
  class WebpackWorker extends Worker {
    constructor();
  }

  // Uncomment this if you set the `esModule` option to `false`
  // export = WebpackWorker;
  export default WebpackWorker;
}
