const Joi = require("joi");
const config = require("config");
const express = require("express");
const app = express();

Joi.objectId = require("joi-objectid")(Joi);

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Listening on ${port}...`));
