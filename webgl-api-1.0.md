# WebGL 1.0 API 整理文档
本文主要根据《WebGL编程指南》中涉及到的 API 整理(基本上 webgl1.0 版本)
> 一些内容中 `gl` 代指 WebGLRenderingContext, 主要通过 canvas.getContext('webgl') 获取

## 整体
1. `gl.clearColor(red, green, blue, alpha)`: 指定绘图区域背景色
  * 参数:
    - red: 红色值(0.0 -> 1.0)
    - green: 绿色值(0.0 -> 1.0)
    - blue: 蓝色值(0.0 -> 1.0)
    - alpha: 透明度(0.0 -> 1.0)
  * 返回值: 无
  * 错误: 无

2. `gl.clear(buffer)`: 指定缓冲区设置为指定的值; 如果指定的是颜色缓冲区，那么将使用 `gl.clearColor` 指定的值
  * 参数:
    - buffer: 指定的颜色缓冲区；可使用位操作`|`指定多个缓冲区; 类型如下:
      - gl.COLOR_BUFFER_BIT: 颜色缓冲区
      - gl.DEPTH_BUFFER_BIT: 深度缓冲区
      - gl.STENCIL_BUFFER_BIT: 模板缓冲区
  * 返回值: 无
  * 错误:
    - INVALID_VALUE: 缓冲区类型错误

3. `gl.drawArrays(mode, first, count)`: 执行顶点着色器，按照 mode 指定的参数绘制图形
  * 参数:
    - mode: 指定绘制方式; 类型如下:
      - gl.POINTS: 绘制点
      - gl.LINES:
      - gl.LINE_STRIP:
      - gl.LINE_LOOP:
      - gl.TRIANGLES:
      - gl.TRIANGLE_STRIP:
      - gl.TRIANGLE_FAN:
    - first: 指定从哪个顶点开始绘制(非负整数)
    - count: 指定绘制需要用到多少顶点(非负整数)
  * 返回值: 无
  * 错误:
    - INVALID_ENUM: 传入的 mode 不是上述类型之一
    - INVALID_VALUE: 参数 first | count 是负数

## 着色器
### `attribute`变量
1. `gl.getAttribLocation(program, name)`: 获取由 name 指定的 attribute 变量的内存地址
  * 参数:
    - program: 指定包含顶点着色器和片元着色器的着色器程序对象
    - name: 需要获取内存地址的 attribute 变量名称
  * 返回值:
    - [大于等于 0]: attribute 变量的内容地址
    - -1: 指定的 attribute 变量不存在，或者其命名具有 `gl_` | `webgl_` 前缀(内部变量)
  * 错误:
    - INVALID_OPERATION: 程序对象未能成功链接
    - INVALID_VALUE: name 参数长度大于 attribute 变量名的最大长度(默认 256 字节)

2. `gl.vertexAttrib[1|2|3|4][f|fv](location, [v0, [v1, [v2, [v3]]]])`: 将数据(v0, v1, v2, v3)传给由 location 指定的 attribute 变量(·是指同族函数有四种，分别是: `vertexAttrib1f` -> `vertexAttrib4f`，对应传入的参数个数有`1->4`个; `[f|fv]`是指传入的数据类型格式: `f`为`float`浮点数, `fv`为`float`的向量格式(也就是浮点数组格式))
  * 参数:
    - location: 指定需要传入数据的 attribute 变量内存地址
    - v0, v1, v2, v3: 指定填充 attribute 变量的第1,2,3,4个分量的值
  * 返回值: 无
  * 错误:
    - INVALID_OPERATION: 没有当前的 program 对象
    - INVALID_VALUE: location 大于等于 attribute 变量的最大数目(默认为8)

### `uniform`变量
1. `gl.getUniformLocation(program, name)`: 获取指定名称的 uniform 变量的存储位置
  * 参数:
    - program: 指定包含顶点着色器和片元着色器的程序对象
    - name: 指定想要获取器存储位置的 uniform 变量
  * 返回值:
    - [non-null]: 指定的 uniform 变量的位置
    - null: 指定的 uniform 变量不存在，或者其命名具有 `gl_` | `webgl_` 前缀
  * 错误:
    - INVALID_OPERATION: 程序对象未能成功链接
    - INCALID_VALUE:  name 参数的长度大于 unifrom 变量名的最大长度(默认 256 字节)

2. `gl.uniform[1|2|3|4][f|fv](location, [v0, [v1, [v2, [v3]]]])`: 将数据传输给由 location 参数指定的 uniform 变量(同 attribute, `[1|2|3|4]`是指有同族函数, 分别是: `unifrom1f`->`unifrom4f`, 对应传入参数有`1->4`个; `[f|fv]`是指传入数据类型格式: `f`为`float`浮点数类型, `fv`为`float`向量格式数据(也就是浮点数))
  * 参数:
    - location: 指定将要修改的 uniform 变量的存储位置
    - v0, v1, v2, v3: 指定填充 uniform 变量的第1,2,3,4个分量的值
  * 返回值: 无
  * 错误:
    - INVALID_OPERATION: 没有当前的 program 对象，或者 location 是非法的存储位置
