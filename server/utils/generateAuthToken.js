require("dotenv").config();

const jwt = require("jsonwebtoken");

const generateAuthToken = (_id, username, email) => {
  return jwt.sign({ _id, username, email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7h",
  });
};

module.exports = generateAuthToken;
