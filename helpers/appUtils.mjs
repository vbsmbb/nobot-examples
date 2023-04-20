import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname } from "path";

function getJSONData(path, jsonFile) {
  const require = createRequire(path);
  return require(jsonFile);
}

function getAppPath(path) {
  return dirname(fileURLToPath(path));
}

export { getAppPath, getJSONData };
