/* eslint-disable lines-between-class-members */
import { WebGLUtils } from '@WebGL/webglUtils'; // webgl utils
import { loadImagePromise } from '@Utils/image';
import { iApp } from '@Src/index.type';

import texVert from './texture.vert'; // vertex shader
import texFrag from './texture.frag'; // fragment shader

class TextureApp implements iApp {
  private gl: WebGLRenderingContext; // 绘制上下文
  private program: WebGLProgram; // 当前程序对象
  private pointSize: number; // 需要绘制的点数量
  private aPosition: number; // 赋值给 gl_Position 变量的存储位置
  private aTexCoord: number; // 顶点着色器中 a_TexCoord 的变量
  private uSampler: WebGLUniformLocation; // 片元着色器中 u_Sampler 纹理变量的存储位置

  // private prevElapsed: number = 0; // 上一动画时间戳
  // private textureInited: boolean = false; // 纹理是否初始化完成
  private imageUrl = '/images/miao.jpg'; // 下载图片地址

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl;

    //  1. 初始化程序对象
    const program = WebGLUtils.initShader(gl, texVert, texFrag);
    if (!program) {
      throw new Error('create program error');
    } else {
      this.program = program;
    }

    // 2. 获取变量位置
    // 2.1获取赋值给 gl_Position 的 a_Position 的变量位置
    this.aPosition = gl.getAttribLocation(this.program, 'a_Position');
    if (this.aPosition < 0) {
      throw new Error('get a_Position error');
    }
    // 2.2获取着色器中 a_TexCoord 变量的存储位置，用作传递纹理坐标
    this.aTexCoord = gl.getAttribLocation(this.program, 'a_TexCoord');
    if (this.aTexCoord < 0) {
      throw new Error('get aTexCoord error');
    }
    // 2.3获取片元着色器中纹理变量
    const uSampler = gl.getUniformLocation(this.program, 'u_Sampler');
    if (!uSampler) {
      throw new Error('get uSampler error');
    } else {
      this.uSampler = uSampler;
    }

    // 3. 初始化 point position Buffer
    this.pointSize = this.initVertexBuffers(gl, this.aPosition, this.aTexCoord);
    // 4. 初始化纹理
    loadImagePromise(this.imageUrl).then((image) => {
      this.initTexture(this.gl, image, this.uSampler, 0);
      this.run();
    });
  }

  initVertexBuffers = (
    gl: WebGLRenderingContext,
    aPosition: number, aTexCoord: number,
  ) => {
    const pointSize = 4; // Buffer 数据
    const verticesTexCoords = new Float32Array([
      // 顶点坐标 和 纹理坐标
      // -0.5, 0.5, 0.0, 1.0,
      // -0.5, -0.5, 0.0, 0.0,
      // 0.5, 0.5, 1.0, 1.0,
      // 0.5, -0.5, 1.0, 0.0,
      // 纹理坐标进行拉伸
      -0.5, 0.5, 0.0, 1.0,
      -0.5, -0.5, 0.25, 0.25,
      0.5, 0.5, 0.75, 0.75,
      0.5, -0.5, 1.0, 0.0,
    ]);
    const bufferDataSize = verticesTexCoords.BYTES_PER_ELEMENT; // 缓存区数据大小单位值
    const sepDataSize = bufferDataSize * 4; // 间隔的数据大小

    // 创建缓冲区
    const vertexTexCoordBuffer = gl.createBuffer();
    if (!vertexTexCoordBuffer) {
      throw new Error('create buffer error');
    }
    // 绑定缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
    // 写入缓冲区数据
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

    // 1. 位置分配
    // 将缓冲区对象分配给变量
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, sepDataSize, 0);
    // 链接变量与分配给他的缓冲区
    gl.enableVertexAttribArray(aPosition);

    // 2. 颜色分配
    gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, sepDataSize, bufferDataSize * 2);
    gl.enableVertexAttribArray(aTexCoord);

    return pointSize;
  }

  initTexture = (
    gl: WebGLRenderingContext,
    image: HTMLImageElement, location: WebGLUniformLocation,
    texUnit: number,
  ) => {
    // @ts-ignore has textunit
    gl.activeTexture(gl[`TEXTURE${texUnit}`]); // 开启 texUnit 号纹理单元
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // 对纹理进行 Y 轴反转

    const texture = gl.createTexture(); // 创建纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture); // 向 target 绑定纹理对象

    // 必须配置四个参数，否则会有黑屏
    // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); // 放大方法
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // 缩小方法
    // Solved Problem: image is black problem
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); // 水平填充
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); // 竖直填充

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image); // 配置纹理图像
    gl.uniform1i(location, texUnit);

    return texture;
  }

  // eslint-disable-next-line class-methods-use-this
  update() {}

  run() {
    const { gl } = this;

    // 清理画布
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制点
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.pointSize);
  }
}

export {
  TextureApp,
};
