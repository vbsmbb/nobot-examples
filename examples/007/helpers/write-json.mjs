import { writeFile } from "fs";

const JSON_WHITESPACE = 4;

const writeJson = (file, contents) =>
  new Promise((resolve, reject) => {
    writeFile(file, JSON.stringify(contents, null, JSON_WHITESPACE), (err) => {
      if (err) {
        reject(err);
      }
      resolve(`${file} written`);
    });
  });

export default writeJson;
