const express = require("express");
const { Topic } = require("../models/topic");
const { User } = require("../models/user");
const router = express.Router();

// GET all topics (paginated)
router.get("/", async (req, res) => {
  // TODO: req validation here

  const { page, pageSize } = req.body;
  const topics = await Topic.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  res.send(topics);
});

// GET a topic
router.get("/:id", async (_, res) => {
  // TODO: req validation here

  const topic = await Topic.findOne({ _id: id });
  res.send(topic);
});

// GET topics by user
router.get("/:usn", async (req, res) => {
  // TODO: req validation here

  const topics = await User.findOne({ username: req.params.username }).populate(
    "topics"
  );

  if (!topics)
    return res.status(404).send({ message: "This user does not exist" });

  res.send(topics);
});

// POST a new topic
router.post("/", async (req, res) => {
  // TODO: req validation here

  const { title, images, ic_link, categories, content, status, _id } = req.body;

  const user = await User.findById(_id);

  if (!user)
    return res.status(404).send({ message: "Could not find the user" });

  const topic = new Topic({
    title,
    images,
    ic_link,
    categories,
    content,
    status,
    author: _id,
  });

  const session = await mongoose.startSession();
  session.startTransaction();
  await topic.save({ session });
  user.topics.push(topic);
  await user.save({ session });
  await session.commitTransaction();

  res.send(topic);
});

// PUT a topic
router.put("/:id", async (req, res) => {
  // TODO: req validation here

  const { title, images, ic_link, categories, content, status } = req.body;
  const topic = await Topic.findByIdAndUpdate(
    req.params.id,
    {
      title,
      images,
      ic_link,
      categories,
      content,
      status,
    },
    { new: true }
  );

  res.send(topic);
});

// DELETE a topic
router.delete("/:id", async (req, res) => {
  // TODO: req validation here

  const topic = await Topic.findById(req.params.id).populate("author");

  if (!topic)
    return res.status(404).send({ message: "Could not find the topic" });

  const session = await mongoose.startSession();
  session.startTransaction();
  await topic.deleteOne({ session });
  topic.author.topics.pull(topic);
  await topic.author.save({ session });
  await session.commitTransaction();

  res.end();
});

module.exports = router;
