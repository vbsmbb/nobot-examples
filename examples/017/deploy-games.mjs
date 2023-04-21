import "colors";
import { join } from "path";
import { stdout } from "process";
import parse from "csv-parse";
import transform from "stream-transform";
import { createReadStream } from "fs";
import { getAppPath } from "../../helpers/appUtils.mjs";

const DELAY_TIME = 500;
const CSV_FILE = "game-releases.csv";
const parser = parse({ delimiter: "," });
const appPath = getAppPath(import.meta.url);
const gameReleasesPath = join(appPath, CSV_FILE);
const input = createReadStream(gameReleasesPath);
let iterator = 1;

const processRecord = (record, callback) => {
  const [game, template] = record;
  let message = `Deploying game ${iterator} '${game}' with template: '${template}'`;
  message = iterator % 2 === 0 ? message.bgGreen : message.bgBlue;
  iterator += 1;
  setTimeout(() => {
    // build game here
    callback(null, `${message}\n`);
  }, DELAY_TIME);
};

const transformer = transform(processRecord);

input.pipe(parser).pipe(transformer).pipe(stdout);
