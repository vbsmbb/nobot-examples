const args = process.argv.slice(2);
console.log(process.argv);
console.log(args);
const [user] = args;

if (user === undefined) {
  console.error("Please pass a name, e.g. node hello.js Shaun");
  process.exit(0);
}

console.log(`Good day to you, ${user}`);
