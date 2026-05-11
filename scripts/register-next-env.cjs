const Module = require("module");

const originalRequire = Module.prototype.require;

Module.prototype.require = function patchedRequire(specifier) {
  const loaded = originalRequire.apply(this, arguments);
  if (specifier === "@next/env") {
    if (loaded && loaded.loadEnvConfig && !loaded.default) {
      return { default: loaded };
    }
  }
  return loaded;
};
