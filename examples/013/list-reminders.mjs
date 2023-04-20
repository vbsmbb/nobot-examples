import "colors";
import { writeFileSync } from "fs";
import { keyInSelect } from "readline-sync";
import { JSON_WHITESPACE, NO_CHOICE_MADE } from "./constants.mjs";
import { exit } from "process";
import { getJSONData, getAppPath } from "../../hellpers/appUtils.js";

// const { reminders } = require("./.reminders");
const json = getJSONData(import.meta.url, "./.reminders.json");
const { reminders } = json;

if (reminders.length === 0) {
  console.log("No reminders!".green);
  exit(0);
}

const index = keyInSelect(reminders, "What reminder have you dealt with? ");

if (index === NO_CHOICE_MADE) {
  exit(0);
}

console.log(`you removed '${reminders[index]}'`.red);

reminders.splice(index, 1);

const appPath = getAppPath(import.meta.url);
writeFileSync(
  `${appPath}/.reminders.json`,
  JSON.stringify({ reminders }, null, JSON_WHITESPACE)
);
