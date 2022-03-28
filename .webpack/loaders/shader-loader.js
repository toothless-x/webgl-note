// 导出 Webpack4 加载器
module.exports = function (source) {
  this.cacheable();
  const cb = this.async();
  cb(null, `module.exports = \`${source}\``)
}
