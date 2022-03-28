// /* eslint-disable */

// import {
//   createShader,
//   createProgram,
// } from 'Utils/glUtils';

// // 着色器代码
// import firstVert from 'WebGL/1/first.vert';
// import firstFrag from 'WebGL/1/first.frag';

// // 第一个 WebGL2 程序
// class FirstWebGLApp {
//   gl: WebGL2RenderingContext | null;
//   vertexShader?: WebGLShader | null;
//   fragmentShader?: WebGLShader | null;
//   program?: WebGLProgram | null;
//   buffer?: WebGLBuffer | null;

//   position: Array<number> = [
//     0, 0,
//     0, 0.5,
//     0.7, 0,
//   ]
//   // 位置信息
//   positionAttributeLocation?: number;
//   vertexArray?: WebGLVertexArrayObject | null

//   constructor(gl: WebGL2RenderingContext) {
//     this.gl = gl;
//     // 创建着色器
//     this.vertexShader = createShader(gl, gl.VERTEX_SHADER, firstVert);
//     this.fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, firstFrag);

//     if (!this.vertexShader || !this.fragmentShader) {
//       throw new Error('create shadler error')
//     }
//     // 创建渲染程序
//     this.program = createProgram(gl, this.vertexShader, this.fragmentShader);

//     if (!this.program) {
//       throw new Error('create program error')
//     }
//     // 获取数据位置
//     this.positionAttributeLocation = gl.getAttribLocation(this.program, "a_position")
//     // 开启位置属性
//     gl.enableVertexAttribArray(this.positionAttributeLocation);

//     // 创建缓冲区
//     this.buffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
//     // 缓存位置数据，将数据放入缓冲区
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position), gl.STATIC_DRAW);

//     // 创建顶点数组对象
//     this.vertexArray = gl.createVertexArray();
//     // 绑定顶点数据对象
//     gl.bindVertexArray(this.vertexArray);
//   }

//   drewPoint() {
//     if (this.gl) {
//       const size = 2; // 每次迭代渲染两个组件
//       const type = this.gl.FLOAT; // 数据类型：32bit float
//       const normalize = false; // 不需要序列化数据
//       const stride = 0; // 每次数据其长度
//       const offset = 0; // 距离开始位置的位移
//       if (this.positionAttributeLocation) {
//         // 绑定当前数据到这个属性：将size、type、normalize等数据绑定到 this.positionAttributeLocation 属性上
//         this.gl.vertexAttribPointer(
//           this.positionAttributeLocation, size, type, normalize, stride, offset,
//         )
//       }
//     }
//   }
// }

// export {
//   FirstWebGLApp,
// }

// export default 'xxxx';
