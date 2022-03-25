/* eslint-disable */

// 创建3D渲染上下文
export function create3DContext(canvas: HTMLCanvasElement, opt_attribs: any) {
  const names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl']
  let context: WebGLRenderingContext | null = null
  for (var ii = 0; ii < names.length; ++ii) {
    try {
      context = canvas.getContext(names[ii], opt_attribs) as WebGLRenderingContext;
    } catch(e) {}

    if (context) {
      break;
    }
  }
  return context
}

// 设置WebGL
export function setUpWebGL(
  canvas: HTMLCanvasElement,
  opt_attribs?: any,
  opt_onError?: (arg0: string) => void
) {
  if (!canvas) {
    throw new Error('canvas is null')
  }
  // 根据错误消息生成错误内容
  const makeFailHTML = (msg: string) => `
    <div style="margin:auto;width:500px;z-index:10000;margin-top:20em;text-align:center;">${msg}</div>
  `
  // 获取支持WebGL浏览器的提示
  const GET_A_WEBGL_BROWSER = `
    This page requires a browser that supports WebGL.<br/>
    <a href="http://get.webgl.org">Click here to upgrade your browser.</a>
  `
  // 其他错误消息
  const OTHER_PROBLEM = `
    It doesn't appear your computer can support WebGL.<br/>
    <a href="http://get.webgl.org">Click here for more information.</a>
  `

  // 处理创建错误
  function handleCreationError(msg: string) {
    const container = canvas.parentNode as HTMLElement
    if (container) {
      let str = window.WebGLRenderingContext ?
        OTHER_PROBLEM :
        GET_A_WEBGL_BROWSER

      if (msg) {
        str = `${str}<br/><br/>Status: ${msg}`
      }
      container.innerHTML = makeFailHTML(str)
    }
  };


  if (canvas.addEventListener) {
    canvas.addEventListener("webglcontextcreationerror", (event: any) => {
      const { statusMessage } = event
      if (opt_onError) {
        opt_onError(statusMessage)
      } else {
        handleCreationError(statusMessage)
      }
    }, false)
  }

  const context = create3DContext(canvas, opt_attribs)
  if (!context) {
    if (!window.WebGLRenderingContext) {
      opt_onError("");
    } else {
      opt_onError("");
    }
  }

  return context;
}


export function getWebGLContext(
  canvas: HTMLCanvasElement,
  opt_debug: boolean,
) {
  const gl = setUpWebGL(canvas)
  if (!gl) {
    return null
  }

  if (opt_debug) {

  }

  return gl
}