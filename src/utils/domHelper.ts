import { debounce } from 'lodash';

// Resize监听与处理，更新Canvas Buffer Size
export const canvasBufferSizeHandler = (gl: WebGLRenderingContext) => {
  if (!gl || !gl.canvas) {
    throw new Error('canvas is null');
  }
  // canvas 元素
  // eslint-disable-next-line prefer-destructuring
  const canvas: HTMLCanvasElement = gl.canvas as HTMLCanvasElement;
  // computeStyle 会自动更新
  const computeStyle = window.getComputedStyle(canvas);

  // 计算浏览器宽高赋值给Canvas
  const resizeHandler = debounce(() => {
    const devicePixelRatio = window.devicePixelRatio || 1; // 获取变化窗口的 DPR
    const canvasWidth = Number.parseInt(computeStyle.getPropertyValue('width'), 10);
    const canvasHeight = Number.parseInt(computeStyle.getPropertyValue('height'), 10);

    // 需要设置的缓冲区域
    const updateWidth = Math.floor(devicePixelRatio * canvasWidth);
    const updateHeight = Math.floor(devicePixelRatio * canvasHeight);

    // 设置Canvas缓存区
    if (canvas.width !== updateWidth || canvas.height !== updateHeight) {
      // 调整 WebGL drawingBuffer 大小
      canvas.width = updateWidth;
      canvas.height = updateHeight;
      // 缩放视图 到 drawingBuffer 的大小
      gl.viewport(0, 0, updateWidth, updateHeight);
    }
  });
  resizeHandler(); // 执行一次，用来初始化

  // Resize 监听
  window.addEventListener('resize', resizeHandler);
  document.documentElement.addEventListener('unload', () => {
    window.removeEventListener('resize', resizeHandler);
  });
};
