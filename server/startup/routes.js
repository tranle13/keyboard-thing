const express = require("express");
const users = require("../routes/users.routes");
const topics = require("../routes/topics.routes");
const auth = require("../routes/auth.routes");
const comments = require("../routes/comments.routes");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/topics", topics);
  app.use("/api/comments", comments);
};
