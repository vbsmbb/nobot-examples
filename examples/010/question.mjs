import { existsSync, mkdirSync } from "fs";
import { createInterface } from "readline";
import { stdin, stdout } from "process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const onProjectInput = (name) => {
  interfaceInstance.close();
  stdin.destroy();
  createProjectDirectory(name);
};

const createProjectDirectory = (enteredName) => {
  const name = enteredName.trim();
  if (name === "") {
    console.log("Cannot create a project without a name");
    process.exit(0);
  }
  const scriptPath = dirname(fileURLToPath(import.meta.url));
  const projectPath = join(scriptPath, name);
  if (existsSync(projectPath)) {
    console.log(`${name} already exists`);
    process.exit(0);
  }
  console.log(`creating a new project called ${name}`);
  mkdirSync(projectPath);
};

const interfaceInstance = createInterface(stdin, stdout);

interfaceInstance.question(
  "What is the name of your project? ",
  onProjectInput
);
