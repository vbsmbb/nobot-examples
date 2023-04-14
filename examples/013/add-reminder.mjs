import { writeFileSync } from "fs";
import { JSON_WHITESPACE } from "./constants.mjs";
import { getAppCfg, getAppPath } from "./appUtils.mjs";
import { argv, exit } from "process";

const appCfg = getAppCfg("./.reminders.json");
const { reminders } = appCfg;

const args = argv.slice(2);
let reminder = args[0];

if (reminder === undefined) {
  console.log("Pass a reminder, e.g. 'pick up rabbit'");
  exit(0);
}

reminder = reminder.trim();

const hasReminderAlready = reminders.indexOf(reminder) > -1;

if (hasReminderAlready) {
  console.log(`Doh! Already have the reminder '${reminder}' set`);
  exit(0);
}

reminders.push(reminder);

const appPath = getAppPath();
writeFileSync(
  `${appPath}/.reminders.json`,
  JSON.stringify({ reminders }, null, JSON_WHITESPACE)
);

console.log("Yes! Added reminder");
