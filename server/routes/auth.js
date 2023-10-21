const _ = require("lodash");
const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/user");
const router = express.Router();

// POST log in
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(404).send("Invalid username or password");

  const validPassword = bcrypt.compare(user.password, req.body.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "username"]));
});

function validate(user) {
  const schema = Joi.object({
    username: Joi.string().required().messages({
      "string.base": "Username is required",
      "string.empty": "Username is required",
      "any.required": "Username is required",
    }),
    password: Joi.string().required().messages({
      "string.base": "Password is required",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  });
  return schema.validate(user);
}

module.exports = router;
