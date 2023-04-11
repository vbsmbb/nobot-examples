console.log(`This process is pid ${process.pid}`);

process.on("exit", (code) => {
  console.log(`The process has now completed with code: ${code}`);
});

process.stdout.write("Hello, I am writing to standard output\n");

process.stdout.write(`Current working directory: ${process.cwd()}\n`);

console.log(`This script has been running for ${process.uptime()} seconds`);

process.stdout.write("TYpe something then hit Enter\n");

process.stdin.setEncoding("utf8");

process.stdin.on("readable", () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`You wrote: ${chunk}\n`);
    process.exit(0);
  }
});
