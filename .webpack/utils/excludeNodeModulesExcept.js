const path = require('path');

// 除了传入的 package 外，忽略其他 node_modules 下内容
function excludeNodeModulesExcept(modules = []) {
  const pathSep = path.sep;
  // must be quoted for use in a regexp:
  if (pathSep == '\\')
    pathSep = '\\\\';

  const moduleRegExps = modules.map(
    modName => new RegExp("node_modules" + pathSep + modName),
  )

  return modulePath => {
    if (/node_modules/.test(modulePath)) {
      for (let i = 0; i < moduleRegExps.length; i++)
        if (moduleRegExps[i].test(modulePath)) return false;
      return true;
    }
    return false;
  };
}

module.exports = {
  excludeNodeModulesExcept,
}
