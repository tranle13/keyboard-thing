const express = require("express");
const mongoose = require("mongoose");
const { Topic, validate } = require("../models/topic.model");
const { User } = require("../models/user.model");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();

// GET all topics (paginated)
router.get("/", async (req, res) => {
  const { page, limit, status } = req.query;
  const query = [
    { $sort: { views: -1 } },
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
  ];
  if (status) query.push({ $match: { status } });
  const aggregate = Topic.aggregate(query);
  const result = await Topic.aggregatePaginate(aggregate, { page, limit });
  res.status(200).send({
    topics: result.docs,
    page: result.page,
    limit: result.limit,
    total: result.totalPages,
  });
});

// GET a topic
router.get("/:id", validateObjectId, async (req, res) => {
  const topic = await Topic.findOne({ _id: req.params.id }).populate([
    { path: "author", select: "username image -_id" },
  ]);

  if (!topic) return res.status(404).send("This topic does not exist");

  res.send(topic);
});

// POST a new topic
router.post("/", auth, async (req, res) => {
  let { error } = validate({ title: req.body.title });
  if (error) return res.status(400).send(error.details[0].message);

  const {
    title,
    cover_image,
    status,
    ic_link,
    categories,
    images,
    content,
    author,
  } = req.body;

  const user = await User.findOne({ username: author });

  if (!user)
    return res.status(404).send({ message: "Could not find the user" });

  const topic = new Topic({
    title,
    cover_image,
    status,
    ic_link,
    categories,
    images,
    content,
    author: user._id,
  });

  const session = await mongoose.startSession();
  session.startTransaction();
  await topic.save({ session });
  user.topics.push(topic);
  await user.save({ session });
  await session.commitTransaction();

  res.send(topic);
});

// PUT edit a topic
router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { title, cover_image, status, ic_link, categories, images, content } =
    req.body;
  const topic = await Topic.findByIdAndUpdate(
    req.params.id,
    {
      title,
      cover_image,
      status,
      ic_link,
      categories,
      images,
      content,
    },
    { new: true }
  );

  if (!topic) return res.status(404).send("This topic does not exist");

  res.send(topic);
});

// DELETE a topic
router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  const topic = await Topic.findById(req.params.id).populate("author");

  if (!topic) return res.status(404).send("Could not find the topic");

  const session = await mongoose.startSession();
  session.startTransaction();
  await topic.deleteOne({ session });
  topic.author.topics.pull(topic);
  await topic.author.save({ session });
  await session.commitTransaction();

  res.end();
});

module.exports = router;
