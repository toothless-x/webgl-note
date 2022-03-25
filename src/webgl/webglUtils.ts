// WebGL 工具集
class WebGLUtils {
  // 创建 3D Context
  public static create3DContext(
    canvas: HTMLCanvasElement,
    options?: any,
  ) {
    const names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    let context: WebGLRenderingContext;
    for (let i = 0; i < names.length; i += 1) {
      try {
        context = canvas.getContext(names[i], options) as WebGLRenderingContext;
      // eslint-disable-next-line no-empty
      } catch (e) {}
      if (context) break;
    }
    return context;
  }

  // 创建着色器
  public static createShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string,
  ) {
    // Create shader object
    const shader = gl.createShader(type);
    if (!shader) {
      throw new Error('Shader not found!');
    }
    // Set the shader program
    gl.shaderSource(shader, source);
    // Compile the shader
    gl.compileShader(shader);

    // Check the result of compilation
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      const errMsg = gl.getShaderInfoLog(shader);
      // eslint-disable-next-line no-console
      console.error('WebGLUtils.createShader error: ', errMsg);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  // 创建渲染程序
  public static createProgram(
    gl: WebGLRenderingContext,
    vertex: WebGLShader,
    fragment: WebGLShader,
  ) {
    // Create a program object
    const program = gl.createProgram();
    if (!program) {
      throw new Error('Can\'t create program');
    }

    // Attach the shader objects
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);

    // Link the program object
    gl.linkProgram(program);

    // Check the result of linking
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      const errMsg = gl.getProgramInfoLog(program);
      // eslint-disable-next-line no-console
      console.error('WebGLUtils.createProgram error: ', errMsg);
      gl.deleteProgram(program);
      return null;
    }

    return program;
  }

  // 初始化着色器
  public static initShader(
    gl: WebGLRenderingContext,
    vShader: string,
    fShader: string,
  ) {
    const vertexShader = WebGLUtils.createShader(gl, gl.VERTEX_SHADER, vShader);
    const fragShader = WebGLUtils.createShader(gl, gl.FRAGMENT_SHADER, fShader);
    if (!vertexShader || !fragShader) {
      return null;
    }

    // Create a program object
    const program = WebGLUtils.createProgram(gl, vertexShader, fragShader);
    if (!program) {
      return null;
    }

    // Attach the shader object
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragShader);

    // Link the program object
    gl.linkProgram(program);

    // Check the result of linking
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      const errMsg = gl.getProgramInfoLog(program);
      // eslint-disable-next-line no-console
      console.error('WebGLUtils.initShader error: ', errMsg);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragShader);
      return null;
    }

    return program;
  }
}

export {
  WebGLUtils,
};
