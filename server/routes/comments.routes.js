const express = require("express");
const { Comment } = require("../models/comment.model");
const { Topic } = require("../models/topic.model");
const auth = require("../middleware/auth");
const { default: mongoose } = require("mongoose");
const router = express.Router();

// GET a post's comment
router.get("/", async (req, res) => {
  const { page, limit, topicId } = req.query;
  const query = [
    { $match: { topic: new mongoose.Types.ObjectId(topicId) } },
    { $sort: { date: 1 } },
  ];
  const aggregate = Comment.aggregate(query);
  const result = await Comment.aggregatePaginate(aggregate, {
    page,
    limit,
  });
  res.status(200).send({
    comments: result.docs,
    page: result.page,
    limit: result.limit,
    total: result.totalPages,
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

router.delete("/:id", auth, async (req, res) => {
  const idComment = await Comment.findById(req.params.id);
  if (!idComment) return res.status(404).send("Could not find the comment");
  await idComment.deleteOne();
  res.end();
});

module.exports = router;
