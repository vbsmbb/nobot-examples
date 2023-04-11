// import jiraData from "../data/mock-jira-data.json";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jiraData = require("../data/mock-jira-data.json");

// Imagine this data being retrieved from Jira and transformed
const fetchDataFromJira = (ticketNumber) => jiraData[ticketNumber];

export default fetchDataFromJira;
