import "colors";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { chdir } from "process";
import { exec } from "child_process";

const require = createRequire(import.meta.url);
const json = require("./config.json");
const repositories = json.repositories;

const scriptPath = dirname(fileURLToPath(import.meta.url));
const repositoriesDirectory = join(scriptPath, "my-repositories");

function cloneRepositories(repositoryPath, repositoryList = []) {
  const repositoryCount = repositoryList.length;

  if (!repositoryPath || repositoryCount === 0) {
    console.log("Invalid path or repository list");
    return;
  }

  console.log(`Cloning repositories to: ${repositoriesDirectory}`.blue);

  chdir(repositoryPath);

  repositoryList.forEach((repositoryUrl, index) => {
    console.log(`Cloning ${index + 1} of ${repositoryCount}`.cyan);
    exec(`git clone ${repositoryUrl} --progress -b master`);
  });

  console.log("Completed cloning of repositories".green);
}

cloneRepositories(repositoriesDirectory, repositories);
