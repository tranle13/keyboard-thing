const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: String,
  caption: String,
});

const categorySchema = new mongoose.Schema({
  name: String,
  color: String,
});

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: { type: [imageSchema], default: [] },
  ic_link: String,
  date_posted: Date,
  categories: { type: [categorySchema], default: [] },
  content: String,
  status: String,
  views: { type: Number, default: 0 },
  author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

topicSchema.index({ views: 1 });

module.exports = mongoose.model("Topic", topicSchema);