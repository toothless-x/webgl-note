import 'normalize.css'; // initialize all style
import { WebGLUtils } from '@WebGL/webglUtils'; // webgl utils
import { CanvasBufferSizeHandler } from '@Utils/domHelper';

// 主要应用程序
function MainAPP() {
  const canvas = document.querySelector('#root > canvas');
  if (!canvas) {
    // eslint-disable-next-line no-console
    console.error('Can not find canvas~');
    return;
  }

  const glContext = WebGLUtils.create3DContext(canvas as HTMLCanvasElement);
  CanvasBufferSizeHandler(glContext); // Resize handler
  console.log('glContext: ', glContext);
}

MainAPP();
