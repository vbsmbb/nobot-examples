import { join, dirname } from "path";
import { fileURLToPath } from "url";

// helpers
import writeJson from "./helpers/write-json.mjs";
import getJiraData from "./helpers/get-jira-data.mjs";

const args = process.argv.slice(2);
const [ticket] = args;

const CONFIG_FILE = "config.json";
const jiraTicket = ticket || "GS-1000";
const jiraData = getJiraData(jiraTicket);

if (jiraData === undefined) {
  console.log(`JIRA ticket ${jiraTicket} not found`);
  process.exit(0);
}

const scriptPath = dirname(fileURLToPath(import.meta.url));
const newConfigFile = join(scriptPath, "data", CONFIG_FILE);

writeJson(newConfigFile, jiraData)
  .then((msg) => console.log(msg))
  .catch((err) => {
    throw err;
  });
