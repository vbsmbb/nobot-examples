import { question, keyInSelect } from "readline-sync";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const NO_CHOICE_MADE = -1;

let { name, template, ticket } = argv;
const templates = ["pick-of-three", "tic-tac-toe", "spin-the-wheel"];

if (name === undefined) {
  name = question("What is the name of the new game? ", {
    limit: (input) => input.trim().length > 0,
    limitMessage: "The game must have a name",
  });
}

if (template === undefined || !templates.includes(template)) {
  const templateIndex = keyInSelect(templates, "Choose your template");
  if (templateIndex === NO_CHOICE_MADE) {
    console.log("No template chosen. Stopping execution.");
    process.exit(0);
  }
  template = templates[templateIndex];
}

if (ticket === undefined || ticket.indexOf("GS-")) {
  ticket = `GS-${question("Enter ticket number: GS-", {
    limit: (input) => input.trim().length > 0,
    limitMessage: "Cannot continue without a ticket number",
  })}`;
}

console.log(
  `Creating game '${name}' with template '${template}' on branch '${ticket}'`
);
