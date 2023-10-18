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
      return res
        .status(422)
        .send({ message: "Invalid inputs passed, please check your data" });

    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      return res.status(400).send({ message: "All inputs are required" });
    }
    const usernameUser = await User.findOne({ username });
    if (usernameUser)
      return res.status(400).send({
        message: "Username taken, guess great minds think alike :)",
      });

    const emailUser = await User.findOne({ email });
    if (emailUser)
      return res.status(400).send({
        message:
          "An account was created with this email, please use another email",
      });

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
    return res
      .status(500)
      .send({ message: "Signing up failed, please try again later" });
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!(username && password))
      return res.status(400).send({ mesage: "All inputs are required" });

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
    } else return res.status(401).send({ message: "Invalid credentials" });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Login failed, please try again later" });
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

const deleteImage = async (req, res, next) => {
  // NOTE: FE needs to encode the path for this to work
  try {
    const imagePath = decodeURIComponent(req.params.imp);
    const path = require("path");
    const finalPath = path.resolve("../client/public") + imagePath;
    const fs = require("fs");
    fs.unlink(finalPath, (err) => {
      if (err) return next(new HttpError(err, 500));
    });
    await User.findOneAndUpdate(
      { _id: req.params.uid },
      { image: "" }
    ).orFail();
    return res.end();
  } catch (err) {
    return next(new HttpError(err, 500));
  }
};

module.exports = {
  getUserWithId,
  signup,
  login,
  users,
  imageUpload,
  deleteImage,
};
