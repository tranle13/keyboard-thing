const config = require("config");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose.connect(config.get("db")).then(() => console.log("Connected to DB"));
};
