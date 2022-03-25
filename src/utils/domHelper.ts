/* eslint-disable */
import { debounce } from 'lodash'

// Resize监听与处理，更新Canvas Buffer Size
export function CanvasBufferSizeHandler(gl: WebGLRenderingContext) {
  if (!gl || !gl.canvas) {
    throw new Error('canvas is null');
  }

  // 计算浏览器宽高赋值给Canvas
  const resizeHandler = debounce(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    // 设置Canvas缓存区
    gl.canvas.width = windowWidth;
    gl.canvas.height = windowHeight;

    if (gl.viewport) {
      gl.viewport(0, 0, windowWidth, windowHeight);
    }
  });
  resizeHandler(); // 执行一次，用来初始化
  // Resize 监听
  window.addEventListener('resize', resizeHandler);
  document.documentElement.addEventListener('unload', () => {
    window.removeEventListener('resize', resizeHandler);
  });
}
