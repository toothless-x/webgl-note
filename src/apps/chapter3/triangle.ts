/* eslint-disable camelcase */
import { WebGLUtils } from '@WebGL/webglUtils'; // webgl utils

import trangleVert from './triangle.vert'; // vertex shader
import trangleFrag from './triangle.frag'; // fragment shader

// 三角形应用
class TraingleApp {
  constructor(gl: WebGLRenderingContext) {
    // 清理画布
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 初始化程序对象
    const program = WebGLUtils.initShader(gl, trangleVert, trangleFrag);
    if (!program) {
      throw new Error('create program error');
    }
    // 变量位置
    const a_Position = gl.getAttribLocation(program, 'a_Position');
    if (a_Position < 0) {
      throw new Error('get a_Position error');
    }

    // 初始化 Buffer
    const pointSize = this.initVertexBuffers(gl, a_Position);

    // 绘制点
    gl.drawArrays(gl.TRIANGLES, 0, pointSize);
  }

  initVertexBuffers = (gl: WebGLRenderingContext, aPointer: number) => {
    // Buffer 数据
    const pointSize = 3;
    const vertices = new Float32Array([
      0.0, 0.5,
      -0.5, -0.5,
      0.5, -0.5,
      // 100, 150,
      // -150, -150,
      // 150, 150,
    ]);

    // 创建缓冲区
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      throw new Error('create buffer error');
    }
    // 绑定缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 写入缓冲区数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // 将缓冲区对象分配给变量
    gl.vertexAttribPointer(aPointer, 2, gl.FLOAT, false, 0, 0);
    // 链接变量与分配给他的缓冲区
    gl.enableVertexAttribArray(aPointer);

    return pointSize;
  }
}

export {
  TraingleApp,
};
