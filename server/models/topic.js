const mongoose = require("mongoose");
const Joi = require("joi");

const imageSchema = new mongoose.Schema({
  url: String,
  caption: String,
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["Keyboard", "Keycap", "Switch", "PCB", "Badge"],
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
  status: { type: String, enum: ["IC", "GB", "Closed"] },
  views: { type: Number, default: 0 },
  author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

topicSchema.index({ views: 1 });

function validateTitle(title) {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.base": "Title is required",
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
  });
  return schema.validate(title);
}

exports.Topic = mongoose.model("Topic", topicSchema);
exports.validate = validateTitle;
