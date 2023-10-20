const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const router = express.Router();

// POST log in
router.post("/", async (req, res) => {
  // TODO: req validation here

  let user = await User.findOne({ username: req.body.username });
  if (!user)
    return res.status(404).send({ message: "Invalid username or password" });

  const validPassword = bcrypt.compare(user.password, req.body.password);
  if (!validPassword)
    return res.status(400).send({ message: "Invalid email or password" });

  // TODO: generate token and send it back
  res.end();
});
