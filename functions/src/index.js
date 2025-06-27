const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const apiHandler = require("./handlers/api");

setGlobalOptions({ maxInstances: 10 }); // Max instances at the same time using

exports.api = onRequest(apiHandler.callback());
