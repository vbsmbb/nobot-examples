import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname } from "path";

function getJSONData(path, jsonFile) {
  if ((path = undefined) || jsonFile === undefined) {
    console.error(
      "You must pass an application path and a file name to this function (getJSONData)!"
    );
    process.exit(-1);
  }

  const require = createRequire(path);
  return require(jsonFile);
}

function getAppPath(path) {
  if (path === undefined) {
    console.error(
      "You must pass a path for the application to this function (getAPpPath)!"
    );
    process.exit(-1);
  }

  return dirname(fileURLToPath(path));
}

export { getAppPath, getJSONData };
