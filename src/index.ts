import 'normalize.css'; // initialize all style
import { WebGLUtils } from '@WebGL/webglUtils'; // webgl utils
import { CanvasBufferSizeHandler } from '@Utils/domHelper';

import { TraingleApp } from '@Apps/chapter3/triangle';

// 主要应用程序
function MainAPP() {
  // 获取 Canvas
  const canvas = document.querySelector('#root > canvas');
  if (!canvas) {
    // eslint-disable-next-line no-console
    console.error('Can not find canvas~');
    return;
  }

  // 获取 WebGLReanderingContext
  const glContext = WebGLUtils.create3DContext(canvas as HTMLCanvasElement);
  // 设置 canvas 元素属性为耗时操作，设置完之后系统会更新 drawingBuffer 大小
  CanvasBufferSizeHandler(glContext); // Resize handler;

  // 运行程序
  setTimeout(() => {
    // eslint-disable-next-line no-new
    new TraingleApp(glContext);
  });
}

MainAPP();
