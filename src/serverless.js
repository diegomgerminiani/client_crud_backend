const serverless = require('serverless-http');
const app = require("./app").app;

exports.serverless = serverless(app)