import 'normalize.css'; // initialize all style
import { WebGLUtils } from '@WebGL/webglUtils'; // webgl utils
import { CanvasBufferSizeHandler } from '@Utils/domHelper';

import { TraingleApp } from '@Apps/chapter3/traingle';

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
  CanvasBufferSizeHandler(glContext); // Resize handler

  // 运行程序
  // eslint-disable-next-line no-new
  new TraingleApp(glContext);
}

MainAPP();
