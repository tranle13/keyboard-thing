const { validationResult } = require("express-validator");

const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Topic = require("../models/topic");
const User = require("../models/user");

const getTopicById = async (req, res, next) => {
  try {
    const topicId = req.params.pid;
    const topic = await Topic.findById(topicId);

    if (!topic)
      return next(
        new HttpError("Could not find  a topic with the provided id", 404)
      );

    res.json({ topic });
  } catch (err) {
    return next(
      new HttpError("Something went wrong, please try again later", 500)
    );
  }
};

const getTopicsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.uid;
    const userWithTopics = await User.findById(userId).populate("topics");

    if (!userWithTopics)
      return next(new HttpError("Could not find places for the provided", 404));

    res.json({
      topics: userWithTopics.topics,
    });
  } catch (err) {
    return next(
      new HttpError("Fetching topics failed, please try again later")
    );
  }
};

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
      return next(new HttpError("Could not find user with provided id"), 404);

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

    res.status(200).json(existingTopic);
  } catch (err) {
    return next("Something went wrong, could not update topic", 500);
  }
};

const deleteTopic = async (req, res, next) => {
  try {
    const topicId = req.params.pid;

    const topic = await Topic.findById(topicId).populate("author");

    if (!topic) return next(new HttpError("Could not find the topic", 404));

    const session = await mongoose.startSession();
    session.startTransaction();
    await topic.deleteOne({ session });
    topic.author.topics.pull(topic);
    await topic.author.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Topic deleted" });
  } catch (err) {
    return next("Something went wrong. Please try again later", 500);
  }
};

module.exports = {
  getTopicById,
  getTopicsByUserId,
  createTopic,
  updateTopic,
  deleteTopic,
};
