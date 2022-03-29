/* eslint-disable lines-between-class-members */
import { WebGLUtils } from '@WebGL/webglUtils'; // webgl utils
import { Matrix4 } from '@Math/materix4'; // 4x4 矩阵

import trangleVert from './triangle.vert'; // vertex shader
import trangleFrag from './triangle.frag'; // fragment shader

// 三角形应用
class TraingleApp {
  private gl: WebGLRenderingContext; // 绘制上下文
  private program: WebGLProgram | null = null; // 当前程序对象
  private pointSize: number; // 需要绘制的点数量
  private aPosition: number; // 赋值给 gl_Position 变量的存储位置
  private aColor: number; // 着色器中 a_Color 变量的存储位置
  private uXformMatrix: WebGLUniformLocation; // 变换矩阵变量的位置

  private rotateAngle: number = 45; // 旋转角度
  private transMatrix: Matrix4; // 变化矩阵

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl;

    // 初始化程序对象
    this.program = WebGLUtils.initShader(gl, trangleVert, trangleFrag);
    if (!this.program) {
      throw new Error('create program error');
    }
    // 获取赋值给 gl_Position 的 a_Position 的变量位置
    this.aPosition = gl.getAttribLocation(this.program, 'a_Position');
    if (this.aPosition < 0) {
      throw new Error('get a_Position error');
    }
    // 获取着色器中 a_Color 变量的存储位置
    this.aColor = gl.getAttribLocation(this.program, 'a_Color');
    if (this.aColor < 0) {
      throw new Error('get a_Position error');
    }

    // 获取赋值给变换矩阵的变量位置
    const uXformMatrix = gl.getUniformLocation(this.program, 'u_xformMatrix');
    if (!uXformMatrix) {
      throw new Error('get uniform location error');
    }
    this.uXformMatrix = uXformMatrix;
    // 初始化 point position Buffer
    this.pointSize = this.initVertexBuffers(gl, this.aPosition, this.aColor);
    // 计算初始化变化矩阵
    this.transMatrix = new Matrix4();
  }

  initVertexBuffers = (gl: WebGLRenderingContext, aPointer: number, aColor: number) => {
    const pointSize = 3; // Buffer 数据
    // 顶点坐标 和 颜色
    const vertices = new Float32Array([
      0.0, 0.5, 1.0, 0.0, 0.0,
      -0.5, -0.5, 0.0, 1.0, 0.0,
      0.5, -0.5, 0.0, 0.0, 1.0,
    ]);
    const bufferDataSize = vertices.BYTES_PER_ELEMENT; // 缓存区数据大小单位值
    const sepDataSize = bufferDataSize * 5; // 间隔的数据大小

    // 创建缓冲区
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      throw new Error('create buffer error');
    }
    // 绑定缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 写入缓冲区数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // 1. 位置分配
    // 将缓冲区对象分配给变量
    gl.vertexAttribPointer(aPointer, 2, gl.FLOAT, false, sepDataSize, 0);
    // 链接变量与分配给他的缓冲区
    gl.enableVertexAttribArray(aPointer);

    // 2. 颜色分配
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, sepDataSize, bufferDataSize * 2);
    gl.enableVertexAttribArray(aColor);

    return pointSize;
  }

  // 变换旋转矩阵
  rotateMatrix = (angle: number) => {
    // 饶 Z 轴旋转
    this.transMatrix.setRotate(angle, 0, 0, 1);
  }

  // 更新数据
  update = (gl: WebGLRenderingContext = this.gl) => {
    this.rotateAngle += 1; // 5度的增幅
    this.rotateMatrix(this.rotateAngle); // 计算旋转矩阵
    // 矩阵数据传入 webgl 变量
    gl.uniformMatrix4fv(this.uXformMatrix, false, this.transMatrix.elements);
  }

  // 执行绘制
  run = (gl: WebGLRenderingContext = this.gl) => {
    // 清理画布
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制点
    gl.drawArrays(gl.TRIANGLES, 0, this.pointSize);
  }
}

export {
  TraingleApp,
};
