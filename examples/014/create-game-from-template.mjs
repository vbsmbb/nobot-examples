import "colors";
import { keyInSelect, question, keyInYN } from "readline-sync";
import { join } from "path";
import { getAppPath } from "../../helpers/appUtils.mjs";
import pkg from "fs-extra";

const { readdirSync, copy } = pkg;
const GAME_TEMPLATES = "game-templates";
const NO_CHOICE_MADE = -1;

// 1. Use a game template already built
const appPath = getAppPath(import.meta.url);
const templatesDir = join(appPath, GAME_TEMPLATES);
const templates = readdirSync(templatesDir);

const index = keyInSelect(templates);

if (index === NO_CHOICE_MADE) {
  process.exit(0);
}

// 2. Create a new project reskin based on our template
const projectName = question("What is the name of your game? ", {
  limit: (input) => input.trim().length > 0,
  limitMessage: "The project has to have a name, try again",
});

const confirmCreateDirectory = keyInYN(
  `You entered '${projectName}', create directory with this name?`
);

// 3. If happy to create, copy the template to the new location
if (confirmCreateDirectory) {
  const template = templates[index];
  const src = join(templatesDir, template);
  const destination = join(appPath, projectName);
  copy(src, destination)
    .then(() => console.log(`Successfully created ${destination}`.green))
    .catch((err) => console.error(err));
} else {
  console.log("Aborted creating a new game");
}
