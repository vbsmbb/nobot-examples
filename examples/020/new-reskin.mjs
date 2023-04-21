import "colors";
// const argv = require('minimist')(process.argv.slice(2));
import { join } from "path";
import { question, keyInYN } from "readline-sync";
import fse from "fs-extra";
import open from "opn";
import minimist from "minimist";
import { getAppPath } from "../../helpers/appUtils.mjs";

const argv = minimist(process.argv.slice(2));
const { copy, readJson, writeJson } = fse;
const GAME_JSON_FILENAME = "game.json";
let { gameName, gamePrimaryColor, gameSecondaryColor } = argv;

if (gameName === undefined) {
  gameName = question("What is the name of the new reskin? ", {
    limit: (input) => input.trim().length > 0,
    limitMessage: "The project has to have a name, try again",
  });
}

const confirmColorInput = (color, colorType = "primary") => {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (hexColorRegex.test(color)) {
    return color;
  }
  return question(`Enter a Hex Code for the game ${colorType} color `, {
    limit: hexColorRegex,
    limitMessage: "Enter a valid hex code: #efefef",
  });
};

gamePrimaryColor = confirmColorInput(gamePrimaryColor, "primary");
gameSecondaryColor = confirmColorInput(gameSecondaryColor, "secondary");

console.log(
  `Creating a new reskin '${gameName}' with skin color: Primary: '${gamePrimaryColor}' Secondary: '${gameSecondaryColor}'`
);

const appPath = getAppPath(import.meta.url);
const src = join(appPath, "template");
const destination = join(appPath, "releases", gameName);
const configurationFilePath = join(destination, GAME_JSON_FILENAME);
const projectToOpen = join(
  "http://localhost:8888",
  "releases",
  gameName,
  "index.html"
);

copy(src, destination)
  .then(() => {
    console.log(`Successfully created ${destination}`.green);
    return readJson(configurationFilePath);
  })
  .then((config) => {
    const newConfig = config;
    newConfig.primaryColor = gamePrimaryColor;
    newConfig.secondaryColor = gameSecondaryColor;
    return writeJson(configurationFilePath, newConfig);
  })
  .then(() => {
    console.log(`Updated configuration file ${configurationFilePath}`.green);
    openGameIfAgreed(projectToOpen);
  })
  .catch(console.error);

const openGameIfAgreed = (fileToOpen) => {
  const isOpeningGame = keyInYN("Would you like to open the game? ");
  if (isOpeningGame) {
    open(fileToOpen);
  }
};
