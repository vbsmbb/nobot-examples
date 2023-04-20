import { keyInSelect } from "readline-sync";
import Twilio from "twilio";
import { getJSONData } from "../../helpers/appUtils.mjs";

const NO_CHOICE_MADE = -1;

/**
 * Before you can send an SMS from Node.js using Twilio,
 * you'll need to sign up for a Twilio account
 */
const json = getJSONData(import.meta.url, "./config.json");
const { TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, MY_SPOUSE_NUMBER } =
  json;
const client = new Twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

const foodChoices = [
  "spag bowl 2nite",
  "chinese takeaway 2nite",
  "pie n mash 2nite",
  "mushroom risotto",
  "pizza and fries",
  "2 recover from my lunch, no food plz!",
  "2 cook 2nite",
];

const index = keyInSelect(foodChoices, "What would you like for dinner?");

if (index === NO_CHOICE_MADE) {
  process.exit(0);
}

const smsMessage = {
  body: `Hi Bub, I'd like ${foodChoices[index]}`,
  from: TWILIO_PHONE_NUMBER,
  to: MY_SPOUSE_NUMBER,
};

console.log(`sending message: ${smsMessage.body}`);

// Send the text message.
client.messages
  .create(smsMessage)
  .then(({ sid }) => {
    console.log("SMS sent. Id:", sid);
  })
  .catch((error) => {
    console.error("Error sending Twilio message", error);
  });
