const { validationResult } = require("express-validator");
const { hashPassword, comparePassword } = require("../utils/hashPassword");

const imageValidate = require("../utils/imageValidate");
const generateAuthToken = require("../utils/generateAuthToken");
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

const getUserWithId = async (req, res, next) => {
  try {
    const userId = req.params.uid;
    const user = await User.findById(userId);

    if (!user)
      return next(
        new HttpError("Could not find a user with the provided id", 404)
      );

    res.json(user);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, please try again later", 500)
    );
  }
};

const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty)
      return next(
        new HttpError("Invalid inputs passed, please check your data", 422)
      );

    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      return next(new HttpError("All inputs are required"), 400);
    }
    const usernameUser = await User.findOne({ username });
    if (usernameUser)
      return next(
        new HttpError("Username taken, guess great minds think alike :)", 400)
      );

    const emailUser = await User.findOne({ email });
    if (emailUser)
      return next(
        new HttpError(
          "An account was created with this email, please use another email",
          400
        )
      );

    const hashedPassword = hashPassword(password);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      topics: [],
    });
    await newUser.save();
    res
      .cookie(
        "access_token",
        generateAuthToken(newUser._id, newUser.username, newUser.email),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        }
      )
      .status(201)
      .json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        topics: newUser.topics,
      });
  } catch (err) {
    return next(
      // new HttpError("Signing up failed, please try again later",500)
      new HttpError(err, 500)
    );
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!(username && password))
      return next(new HttpError("All inputs are required", 400));

    const user = await User.findOne({ username });

    if (user && comparePassword(password, user.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      return res
        .cookie(
          "access_token",
          generateAuthToken(user._id, user.username, user.email),
          cookieParams
        )
        .json({ _id: user._id, username: user.username, email: user.email });
    } else return next(new HttpError("Invalid credentials", 401));
  } catch (err) {
    return next(new HttpError("Login failed, please try again later", 500));
  }
};

const imageUpload = async (req, res, next) => {
  try {
    if (!req.files || !!req.files.images === false) {
      return next(new HttpError("No files were uploaded", 400));
    }

    const image = req.files.images;

    const validateResult = imageValidate(image);

    if (validateResult.error)
      return next(new HttpError(validateResult.error, 400));

    const path = require("path");
    const { v4: uuidv4 } = require("uuid");
    const uploadDir = path.resolve(
      __dirname,
      "../../client",
      "public",
      "images",
      "users"
    );
    const user = await User.findById(req.query.userId).orFail();

    const fileName = uuidv4() + path.extname(image.name);
    const uploadPath = uploadDir + "/" + fileName;
    user.image = "/images/users/" + fileName;

    image.mv(uploadPath, function (err) {
      if (err) return next(new HttpError(err, 500));
    });

    await user.save();
    return res.send("File uploaded!");
  } catch (err) {
    return next(new HttpError("Upload failed, please try again later", 500));
  }
};

module.exports = { getUserWithId, signup, login, users, imageUpload };
