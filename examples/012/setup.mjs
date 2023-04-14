import "colors";
import { exec } from "child_process";
import { chdir } from "process";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname } from "path";

const require = createRequire(import.meta.url);
const appCfg = require("./config.json");
const repository = appCfg.repository;
const { delivery } = repository;

console.log(`Cloning ${delivery}`.cyan);

const appPath = dirname(fileURLToPath(import.meta.url));
chdir(appPath);

exec(`git clone ${delivery} --progress`);
