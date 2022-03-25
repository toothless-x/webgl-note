/* eslint-disable */

// 创建着色器
const createShader = (
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): (WebGLShader | null) => {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error('Shader not found!');
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log('create shader error: ', gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);

  return null;
}
  
// 创建渲染程序
const createProgram = (
  gl: WebGL2RenderingContext,
  vertex: WebGLShader,
  fragment: WebGLShader,
): WebGLProgram | null => {
  const program = gl.createProgram();
  if (!program) {
    throw new Error('Can\'t create program');
  }

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log('create program error: ', gl.getProgramInfoLog(program));
  gl.deleteProgram(program);

  return null
}

export {
  createShader,
  createProgram,
}