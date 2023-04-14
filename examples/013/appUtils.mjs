import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname } from "path";

function getAppCfg(cfgFile) {
  const require = createRequire(import.meta.url);
  return require(cfgFile);
}

function getAppPath() {
  return dirname(fileURLToPath(import.meta.url));
}

export { getAppPath, getAppCfg };
