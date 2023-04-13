import log from "./helpers/log.mjs";
import { SUCCESS, WARNING, ERROR } from "./constants/message-types.mjs";

log("This is a success message", SUCCESS);
log("This is a warning message", WARNING);
log("This is an error message", ERROR);
log("This is an info message");
