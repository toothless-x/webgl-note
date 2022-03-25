const package = require('../../package.json');

// 获取工作区所有 Package
const getAllPackage = () => {
  // 避免 package 不存在。。
  const { workspaces = [] } = (package || {});
  // 去除路径分隔
  const pkgNameArr = workspaces.map((pkgName) => {
    if (pkgName.includes('/')) {
      return pkgName.split('/')[0];
    }

    return pkgName;
  })

  return pkgNameArr;
}

// 获取 Eslint 配置的的检测名称
const getEslintTSPackages = (pkgNameArr = getAllPackage()) => {
  // 组装规则名称
  const lintConfigName = pkgNameArr.map(
    (pkgName) => `${pkgName}/**/*.{ts,tsx}`,
  );

  return lintConfigName;
}

module.exports = {
  getAllPackage,
  getEslintTSPackages,
}
