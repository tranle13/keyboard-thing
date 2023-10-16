const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  topic: { type: mongoose.Types.ObjectId, required: true, ref: "Topic" },
  content: string,
  date: Date,
});

module.exports = mongoose.model("Comment", commentSchema);
