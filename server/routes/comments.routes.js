const express = require("express");
const { Comment } = require("../models/comment.model");
const { Topic } = require("../models/topic.model");
const auth = require("../middleware/auth");
const router = express.Router();

// GET a post's comment
router.get("/", async (req, res) => {
  const { page, pageSize, topicId } = req.query;
  const query = { topic: topicId };
  const comments = await Comment.find({ topic: topicId });
  const count = await Comment.countDocuments(query);
  res.send({
    total: Math.ceil(count / pageSize),
    page: parseInt(page),
    pageSize: parseInt(pageSize),
    data: comments,
  });
});

// POST a new comment
router.post("/new", auth, async (req, res) => {
  const topic = await Topic.findOne({ _id: req.body.topic });
  if (!topic) return res.status(404).send("This topic does not exist");
  const comment = new Comment({
    author: {
      username: req.body.author.username,
      image: req.body.author.image,
    },
    topic: req.body.topic,
    content: req.body.content,
  });

  await comment.save();

  res.send(comment);
});

module.exports = router;
