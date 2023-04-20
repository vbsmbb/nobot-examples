import "colors";
import { createTransport } from "nodemailer";
import { getJSONData } from "../../helpers/appUtils.mjs";

const json = getJSONData(import.meta.url, "./config.json");
const { AUTH } = json;
const args = process.argv.slice(2);
const REQUIRED_FIELDS_COUNT = 2;

if (args.length !== REQUIRED_FIELDS_COUNT) {
  console.log(
    "Two arguments required: subject and body.".red,
    'E.g. node send-email.js "Where\'s my tea?" "So yeah... where is it?"'.cyan
  );
  process.exit(0);
}

const [subject, body] = args;
const { HOST, PORT, FROM_EMAIL, TO_EMAIL } = json;
const { USERNAME, PASSWORD } = AUTH;

const transporter = createTransport({
  host: HOST,
  port: PORT,
  secure: false,
  auth: {
    user: USERNAME,
    pass: PASSWORD,
  },
});

const message = {
  from: FROM_EMAIL,
  to: TO_EMAIL,
  subject,
  body,
  html: `<p>${body}</p>`,
};

transporter.sendMail(message, (err, info) => {
  if (err) {
    console.error(`Error occurred: ${err.message}`);
    return process.exit(0);
  }

  return console.log("Message sent: %s", info.messageId);
});
