import 'normalize.css'; // initialize all style
import { WebGLUtils } from '@WebGL/webglUtils'; // webgl utils
import { canvasBufferSizeHandler } from '@Utils/domHelper'; // dom utils
import { iApp } from '@Src/index.type'; // 应用类型

// import { TraingleApp } from '@Apps/chapter3/triangle'; // 变化的三角形
import { TextureApp } from '@Apps/chapter5/texture'; // 纹理贴图

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
  canvasBufferSizeHandler(glContext); // Resize handler;

  let rafRef: number | null = null; // 动画索引
  let rafAnim: (ts?: number) => void = () => {}; // 运行动画

  // @ts-ignore stop
  MainAPP.stop = () => {
    if (rafRef) {
      window.cancelAnimationFrame(rafRef);
    }
  };
  // @ts-ignore start
  MainAPP.start = () => {
    const now = Date.now();
    rafAnim(now);
  };

  // 运行动画
  const animationApp = (app: iApp, ts?: number) => {
    app.update(ts); // update app
    app.run(ts); // run app

    rafRef = window.requestAnimationFrame(rafAnim);
  };

  // 运行程序
  setTimeout(() => {
    // const app = new TraingleApp(glContext);
    const app = new TextureApp(glContext);
    // 执行动画
    rafAnim = (ts?: number) => animationApp(app, ts);

    // @ts-ignore start app
    // MainAPP.start();
  });
}

// @ts-ignore export
window.MainAPP = MainAPP;
MainAPP();

if ((module as any).hot) {
  (module as any).hot.accept();
}
