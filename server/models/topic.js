const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: String,
  caption: String,
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: {
      values: ["Keyboard", "Keycap", "Switch", "PCB", "Badge"],
      message: "{VALUE} is not supported, please contact us for a new addition",
    },
  },
  color: String,
});

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: [imageSchema],
  ic_link: String,
  date_posted: { type: Date, default: Date.now },
  categories: [categorySchema],
  content: String,
  status: {
    type: String,
    enum: {
      values: ["IC", "GB", "Closed"],
      message: "{VALUE} is nor supported, please contact us for a new addition",
    },
  },
  views: { type: Number, default: 0 },
  author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

topicSchema.index({ views: 1 });

exports.Topic = mongoose.model("Topic", topicSchema);