import { getJSONData } from "../../helpers/appUtils.mjs";

const json = getJSONData(import.meta.url, "./data/config.json");
const { projectId, startDate, endDate } = json;

console.log(`The ID of the project is: ${projectId}`);
console.log(`The start date of the project is: ${startDate}`);
console.log(`The end date of the project is: ${endDate}`);
