module.exports = function getShaderLoader() {
  // Shader 加载器
  const shaderLoader = [
    {
      test: /\.(vert|frag)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'shader-loader',
        },
      ],
    },
  ]

  return shaderLoader;
}
