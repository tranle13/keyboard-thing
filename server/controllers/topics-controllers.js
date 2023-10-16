const { validationResult } = require("express-validator");

const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Topic = require("../models/topic");
const User = require("../models/user");

const createTopic = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid inputs passed, please check your data"),
        422
      );
    }

    const {
      title,
      images,
      ic_link,
      date_posted,
      categories,
      content,
      status,
      author,
    } = req.body;

    const user = await User.findById(author);
    if (!user)
      return next(new HttpError("Could not user with provided id"), 404);

    const newTopic = new Topic({
      title,
      images,
      ic_link,
      date_posted,
      categories,
      content,
      status,
      views: 0,
      author,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newTopic.save({ session });
    user.topics.push(newTopic);
    await user.save({ session });
    await session.commitTransaction();

    res.status(201).json(newTopic);
  } catch (err) {
    return next(new HttpError("Creating topic failed, please try again"), 500);
  }
};

const updateTopic = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid inputs passed, please check your data"),
        422
      );
    }

    const { title, images, ic_link, categories, content, status } = req.body;
    const topicId = req.params.pid;
    const existingTopic = await Topic.findById(topicId);

    existingTopic.title = title;
    existingTopic.images = images;
    existingTopic.ic_link = ic_link;
    existingTopic.categories = categories;
    existingTopic.content = content;
    existingTopic.status = status;

    await existingTopic.save();
    res.status(200).json(existingPlace);
  } catch (err) {
    return next("Something went wrong, could not update topic", 500);
  }
};

const deleteTopic = async (req, res, next) => {
  try {
    const topicId = req.params.pid;

    const existingTopic = await Topic.findById(topicId).populate("author");
    if (!existingTopic) return next("Could not find the topic", 500);

    const session = await mongoose.startSession();
    session.startTransaction();
    await existingTopic.remove({ session });
    existingTopic.author.topics.pull(existingTopic);
    await existingTopic.creator.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return next("Something went wrong. Please try again later", 500);
  }
};

module.exports = { createTopic, updateTopic, deleteTopic };
