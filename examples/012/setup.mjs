import "colors";
import { exec } from "child_process";
import { chdir } from "process";
import { getJSONData, getAppPath } from "../../helpers/appUtils.mjs";

const json = getJSONData(import.meta.url, "./config.json");
const { repository } = json;
const { delivery } = repository;

console.log(`Cloning ${delivery}`.cyan);

const appPath = getAppPath(import.meta.url);
chdir(appPath);

exec(`git clone ${delivery} --progress`);
