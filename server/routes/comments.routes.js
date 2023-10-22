const express = require("express");
const { Comment } = require("../models/comment.model");
const { Topic } = require("../models/topic.model");
const auth = require("../middleware/auth");
const router = express.Router();

// POST a new comment
router.post("/new", auth, async (req, res) => {
  const topic = await Topic.findOne({ _id: req.body.topicId });
  if (!topic) return res.status(404).send("This topic does not exist");
  const comment = new Comment({
    author: {
      username: req.body.username,
      image: req.body.image,
    },
    topic: req.body.topicId,
    content: req.body.content,
  });

  const session = await mongoose.startSession();
  session.startTransaction();
  await comment.save({ session });
  topic.comments.push(comment);
  await topic.save({ session });
  await session.commitTransaction();

  res.send(comment);
});

module.exports = router;
