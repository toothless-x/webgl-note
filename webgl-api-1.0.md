# WebGL 1.0 API 整理文档
本文主要根据《WebGL编程指南》中涉及到的 API 整理(基本上 webgl1.0 版本)
> 以下内容中 `gl` 代指 WebGLRenderingContext, 主要通过 canvas.getContext('webgl') 获取

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
    - mode: 指定绘制方式(WebGL 支持的基本图形); 类型如下:
      - gl.POINTS: 绘制点。绘制在 v0,v1,v2,v3...处
      - gl.LINES: 绘制线段。绘制在(v0,v1),(v2,v3),(v3,v4)...处
      - gl.LINE_STRIP: 绘制连接的线段。绘制在(v0,v1),(v1,v2),(v2,v3)...处(`不会形成`闭合区域)
      - gl.LINE_LOOP: 绘制连接的线段。绘制在(v0,v1),(v1,v2),(v2,v3)...(vx,v0)处(`会`闭合区域)
      - gl.TRIANGLES: 绘制一系列单独的三角形。绘制在(v0,v1,v2),(v3,v4,v5)...处(最后剩余点不足以形成三角形时会被忽略)
      - gl.TRIANGLE_STRIP: 绘制一系列条带状的三角形。绘制在(v0,v1,v2),(v2,v1,v3),(v2,v3,v4)...处(**注意绘制顺序**)
      - gl.TRIANGLE_FAN: 绘制一系列三角形组成的类似于扇形的图形。绘制在(v0,v1,v2),(v0,v2,v3),(v0,v3,v4)...处(**注意绘制顺序**)
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
    - non-null: 指定的 uniform 变量的位置
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

3. `gl.uniformMaterix4fv(location, transpose, array)`: 将 array 表示的 4x4 矩阵分配给由 location 指定的 uniform 变量
  - 参数:
    - location: uniform 变量的存储位置
    - Transpose: WebGL 中必须置位 false(表示是否转置矩阵，WebGL 没有实现该方法，所以必须置位 false)。
    - array: 待传输的类型化数组。4x4 矩阵案列主序存储在其中
  - 返回值: 无
  - 错误:
    - INVALID_OPERATION: 不存在当前程序对象
    - INVALID_VALUE: transpose 不为 false, 或者数据长度小于16

## 缓冲区
> 缓冲区使用流程:
> 1. 创建缓冲区对象(gl.createBuffer)
> 2. 绑定缓冲区对象(gl.bindBuffer)
> 3. 将数据写入缓冲区对象(gl.bufferData)
> 4. 将换冲区对象分配给一个 attribute 变量(gl.vertexAttribPointer)
> 5. 开启 attribute 变量(gl.enableVertexAttribArray)
> 6. 使用完后之后可以关闭 attribute 变量(gl.disableVertexArray)
> 7. 使用完毕之后可以删除此缓冲区(gl.deleteBuffer)

1. `gl.createBuffer()`: 创建缓冲区对象
  * 参数: 无
  * 返回值:
    - non-null: 新创建的缓冲区对象
    - null: 创建缓冲区对象失败
  * 错误: 无

2. `gl.bindBuffer(target, buffer)`: 允许使用 buffer 表示的缓冲区对象并将其绑定到 target 表示的目标上
  * 参数:
    - target: 需要绑定的目标; 有如下类型:
      - gl.ARRAY_BUFFER: 表示缓冲区中包含了顶点的数据
      - gl.ELEMENT_ARRAY_BUFFER: 表示缓冲区对象中包含了顶点的索引值
    - buffer: 指定有 `gl.createBuffer` 创建的缓冲区对象
  * 返回值: 无
  * 错误:
    - INVALID_ENUM: target 不是上述值之一，这是将保持原有的绑定情况不变

3. `gl.bufferData(target, data, usage)`: 开启存储空间，向绑定在 target 上的缓冲区对象中写入数据 data
  * 参数:
    - target: 写入数据的对象; 同`bindBuffer`有两种类型: `gl.ARRAY_BUFFER` | `gl.ELEMENT_ARRAY_BUFFER`
    - data: 写入缓冲区对象的数据(类型化数组)
    - usage: 表示程序将如何使用存储在缓冲区对象中的数据(该参数由于帮助 WebGL 优化操作，即使错误也不会终止程序(仅会降低效率)); 有如下类型:
      - gl.STATIC_DRAW: 只会向缓冲区对象中写入一次数据，但需要绘制很多次
      - gl.STREAM_DRAW: 只会向缓冲区对象中写入一次数据，然后绘制若干次
      - gl.DYNAMIC_DRAW: 会向缓冲区对象中多次写入数据，并绘制很多次
  * 返回值: 无
  * 错误:
    - INVALID_ENUM: target 不是上述值之一，这是将保持原有的绑定情况不变

4. `gl.vertexAttribPointer(location, size, type, normalized, stride, offset)`: 将绑定到`gl.ARRAY_BUFFER`的缓冲区对象分配给由 location 指定的变量
  * 参数:
    - location: 指定待分配 attribute 变量的存储位置
    - size: 指定缓冲区中每个顶点的分量个数(1到4)。若 size 比 attribute 变量需要的分量数小，缺失分量将按照与`gl.vertexAttrib[1234]f()`相同的规则补全。比如，如果 size 为 1，那么第 2、3 分量自动设定为 0，第 4 分量为 1
    - type: 用以下类型之一来指定数据格式:
      - gl.UNSIGNED_BYTE: 无符号字节, UInt8Array
      - gl.SHORT: 短整形, Int16Array
      - gl.UNSIGNED_SHORT: 无符号短整形, UInt16Array
      - gl.INT: 整形, Int32Array
      - gl.UNSIGNED_INT: 无符号整形, UInt32Array
      - gl.FLOAT: 浮点型, Float32Array
    - normalize: 传入 true/false, 标明是否将非浮点数的数据归一化到[0, 1]或[-1, 1]之间
    - astride: 指定相邻顶点间的字节数(默认为0)
    - offset: 指定缓冲区对象中的偏移量(以字节为单位), 即 attribute 变量从缓冲区中的何处开始存储。如果是从起始位置开始的，offset 设为 0
  * 返回值: 无
  * 错误:
    - INVALID_OPERATION: 不存在当前程序对象
    - INVALID_VALUE: location 大于等于 attribute 变量的最大数目(默认为`8`)，或者 stride 或 offset 是负数
   
5. `gl.enableVertexArray(location)`: 开启 location 指定的 attribute 变量
  * 参数:
    - location: 指定 attribute 变量的存储位置
  * 返回值: 无
  * 错误:
    - INVALID_VALUE: location 大于等于 attribute 变量的最大数目

6. `gl.disableVertexArray(location)`: 关闭 location 指定的 attribute 变量
  * 参数:
    - location: 指定 attribute 变量的存储位置
  * 返回值: 无
  * 错误:
    - INVALID_VALUE: location 大于等于 attribute 变量的最大数据(默认为8)

7. `gl.deleteBuffer(buffer)`: 删除 buffer 指定的缓冲区对象
  * 参数:
    - buffer: 待删除的缓冲区对象
  * 返回值: 无
  * 错误: 无


s## WebGL 使用到的类型化数组

### 类型化数组类型
| 数组类型 | 每个元素所占字节数 | 描述(C 语言中的数据类型) |
| ------ | --------------- | --------------------- |
| Int8Array | 1 | 8位整型数(signed char) |
| UInt8Array | 1 | 8位无符号整型数(unsigned char) |
| Int16Array | 2 | 16位整型数(signed short) |
| UInt16Array | 2 | 16位无符号整型数(unsigned short) |
| Int32Array | 4 | 32位整型数(signed int) |
| UInt32Array | 4 | 32未无符号整型数(unsigned int) |
| Float32Array | 4 | 单精度32位浮点数(float) |
| Float64Array | 8 | 双精度64位浮点数(double) |

### 类型化数组方法、属性、常量
| 方法、属性、常量 | 描述 |
| ------------- | --- |
| get(index) | 获取第 index 个元素值 |
| set(index, value) | 设置第 index 个元素的值为 value |
| set(array, offset) | 从第 offset 个元素开始将数组 array 中的值填充进去 |
| length | 数据的长度 |
| BYTES_PER_ELEMENT | 数据中每个元素所占的字节数 |
