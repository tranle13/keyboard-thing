const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const users = async (_, res, next) => {
  try {
    const allUsers = await User.find({}, "-password");
    return res.status(201).json(allUsers);
  } catch (err) {
    return next(new HttpError("Unexpected error", 500));
  }
};

const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty)
      return next(
        new HttpError("Invalid inputs passed, please check your data", 422)
      );

    const { email, password } = req.body;
    if (!(email && password)) {
      return next(new HttpError("All inputs are required"), 400);
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return next(
        new HttpError("User already exists, please log in instead"),
        422
      );
    } else {
      const newUser = new User({ email, password });
      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later"),
      500
    );
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return next(new HttpError("Invalid credentials, please try again"), 401);
    }
    res.status(201).json("Logged in!");
  } catch (err) {
    return next(new HttpError("Login failed, please try again later"), 500);
  }
};

module.exports = { signup, login, users };
