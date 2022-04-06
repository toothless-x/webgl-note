# WebGL2 GPGPU

`GPGPU`是 "General Purpose"GPU 也就是意味着用 GPU 做一些其他的事情而不是用来绘制图像

在 WebGL 中使用 GPGPU 的基础认知就是“纹理”不是一个图像，二是一份数值的 2 维数组。在[WebGL2 纹理](https://webgl2fundamentals.org/webgl/lessons/webgl-3d-textures.html)这一章中了解到了从纹理中读取数据，在[WebGL2 渲染到纹理](https://webgl2fundamentals.org/webgl/lessons/webgl-render-to-texture.html)这一章中也了解到了把数据渲染到纹理中。那么，如果意识到纹理是一个 2 维数组数据那就是说我们真的找到了一个办法从 2 维数据中进行读写。同样的，`buffer`也不仅是位置坐标、法线向量、纹理坐标、或者颜色，这里的数据可以是任何内容，速度、张力、股票价格等等；我们可以创造性地使用这些知识来做数学，这就是 WebGL 中 GPGPU 的精髓

## 我们先用纹理来做一些事情
