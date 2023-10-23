const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    author: {
      type: new mongoose.Schema({
        username: String,
        image: String,
      }),
      required: true,
    },
    topic: { type: mongoose.Types.ObjectId, required: true, ref: "Topic" },
    content: String,
    date: { type: Date, default: Date.now },
  })
);

exports.Comment = Comment;
