import archiver from "archiver";
import { createWriteStream, createReadStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ZLIB_BEST_COMPRESSION = 9;
// create a file to stream archive data to.
const scriptPath = dirname(fileURLToPath(import.meta.url));
const zipPath = join(scriptPath, "files.zip");
const output = createWriteStream(zipPath);
const archive = archiver("zip", {
  zlib: { level: ZLIB_BEST_COMPRESSION },
});

// listen for all archive data to be written
output.on("close", () => {
  console.log(`Total bytes: ${archive.pointer()}`);
  console.log("archiving has now finished.");
});

// good practice to catch this error explicitly
archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);

// add files (read the copy.txt and logo.jpg and output with different names)
const textPath = join(scriptPath, "copy.txt");
const logoPath = join(scriptPath, "logo.jpg");
archive.append(createReadStream(textPath), { name: "content.txt" });
archive.append(createReadStream(logoPath), { name: "nobot.jpg" });

// finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();
