// const shell = require("shelljs");
import { question } from "readline-sync";
import { join } from "path";
import { exec } from "child_process";
import { chdir } from "process";
import { getJSONData, getAppPath } from "../../helpers/appUtils.mjs";

const json = getJSONData(import.meta.url, "./config.json");
const { repository } = json;
const { delivery, baseBranch } = repository;
const repoName = delivery.substring(delivery.lastIndexOf("/"));

// Changing into the repo's directory
const appPath = getAppPath(import.meta.url);
const repoPath = join(appPath, repoName);
chdir(repoPath);

// Checkout to base branch
exec(`git checkout ${baseBranch}`);

// Making sure we have the latest changes from the remote origin
exec(`git pull origin ${baseBranch}`);

// prompt for the ticket ID
const ticketId = question("What is the ticket ID? ", {
  limit: (input) => input.trim().length > 0,
  limitMessage: "Please enter a ticket ID (e.g. GOT-123)",
});

// Create a new branch
exec(`git checkout -b ${ticketId}`);
