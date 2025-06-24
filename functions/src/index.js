const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger"); // logging in server
const apiHandler = require("./handlers/api");

setGlobalOptions({ maxInstances: 10 }); // Max instances at the same time using

exports.helloWorld = onRequest(apiHandler.callback());
