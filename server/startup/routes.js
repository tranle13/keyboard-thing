const express = require("express");
const users = require("../routes/users");
const topics = require("../routes/topics");
const auth = require("../routes/auth");

// module.exports = function (app) {
//   app.use(express.json());
//   app.use("/api/users", users);
//   app.use("/api/topics", topics);
//   app.use("/api/auth", auth);
// };

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
};
