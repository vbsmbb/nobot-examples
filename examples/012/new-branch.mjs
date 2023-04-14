// const shell = require("shelljs");
import { question } from "readline-sync";
import { join, dirname } from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { chdir } from "process";

const require = createRequire(import.meta.url);
const appCfg = require("./config.json");
const repository = appCfg.repository;
// const repository = require("./config");
const { delivery, baseBranch } = repository;
const repoName = delivery.substring(delivery.lastIndexOf("/"));

// Changing into the repo's directory
const appPath = dirname(fileURLToPath(import.meta.url));
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
