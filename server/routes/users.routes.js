const _ = require("lodash");
const express = require("express");
const bcrypt = require("bcrypt");
// const path = require("path");
// const fs = require("fs");
// const { v4: uuid } = require("uuid");
const { User, validate } = require("../models/user.model");
const { Topic } = require("../models/topic.model");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const router = express.Router();

// GET current user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.query.id).select("-password -topics");
  res.send(user);
});

// GET a user
router.get("/:usn", auth, async (req, res) => {
  const user = await User.findById(req.params.id).select("-password -topics");

  if (!user) return res.status(404).send("This user does not exist");

  res.send(user);
});

// GET a user's posts
router.get("/:usn/topics", auth, async (req, res) => {
  const { page, limit } = req.query;

  const user = await User.findOne({ username: req.params.usn });

  if (!user) return res.status(404).send("This user does not exist");

  const aggregate = Topic.aggregate([
    { $match: { author: user._id } },
    { $sort: { date_posted: -1 } },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
        pipeline: [{ $project: { image: 1, username: 1, _id: 1 } }],
      },
    },
    { $unwind: "$author" },
  ]);
  const result = await Topic.aggregatePaginate(aggregate, { page, limit });

  res.status(200).send({
    topics: result.docs,
    page: result.page,
    limit: result.limit,
    total: result.totalPages,
  });
});

// POST a new user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, email, password } = req.body;

  let user = await User.findOne({ username });
  if (user)
    return res
      .status(400)
      .send("Username taken, guess great minds think alike :)");

  user = await User.findOne({ email });
  if (user)
    return res.status(400).send("Ack, email taken, please choose another one");

  user = new User({ username, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "username", "email"]));
});

// PATCH update a user
router.patch("/me", async (req, res) => {
  const { _id, bio, theme } = req.body;
  const user = await User.findOneAndUpdate(
    { _id },
    { bio, theme },
    { new: true, upsert: true }
  );

  if (!user)
    return res.status(404).send({ message: "This user does not exist" });

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "username", "image", "bio", "theme"]));
});

// TODO: go back to this once the profile is up and running normally
// POST upload a profile pic
// router.post("/upload", async (req, res) => {
//   if (!req.files || !!req.files.images === false) {
//     return res.status(400).json({ message: "No files were uploaded" });
//   }

//   const image = req.files.images;

//   const validateResult = imageValidate(image);

//   if (validateResult.error)
//     return res.status(400).send({ message: validateResult.error });

//   const uploadDir = path.resolve(
//     __dirname,
//     "../../client",
//     "public",
//     "images",
//     "users"
//   );

//   const user = await User.findById(req.body._id);
//   if (!user)
//     return res.status(404).send({ message: "This user does not exist" });

//   const fileName = uuid() + path.extname(image.name);
//   const uploadPath = uploadDir + "/" + fileName;

//   image.mv(uploadPath, function (err) {
//     if (err) return res.status(500).send({ message: err });
//   });

//   if (user.image) {
//     // NOTE: FE needs to encode the path for this to work
//     const imagePath = decodeURIComponent(req.params.image);
//     const finalPath = path.resolve("../client/public") + imagePath;
//     fs.unlink(finalPath, (err) => {
//       if (err) return res.status(500).send({ message: err });
//     });
//   }

//   user.image = "/images/users/" + fileName;
//   await user.save();
//   res.end();
// });

module.exports = router;
