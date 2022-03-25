const process = require('process'); // process

// Q: Why do not use NODE_ENV?
// A: I want to generate sourcemap file on beta env, but do not generate with prod env.
// A: And the other config just keep the same;


// 获取当前构建环境
module.exports = function getBuildEnv() {
  // 环境区分
  const BUILD_ENV = process.env.BUILD_ENV || '';
  const isDev = !BUILD_ENV || (BUILD_ENV.includes('dev')); // 开发环境
  const isBeta = (BUILD_ENV === 'beta'); // 语法环境
  const isProd = (BUILD_ENV === 'prod'); // 生产环境

  return {
    isDev, isBeta, isProd,
  }
}
