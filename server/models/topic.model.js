const mongoose = require("mongoose");
const Joi = require("joi");

const imageSchema = new mongoose.Schema({
  url: String,
  caption: String,
});

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cover_image: String,
  status: { type: String, enum: ["IC", "GB", "Closed"] },
  ic_link: String,
  categories: [
    {
      type: String,
      enum: ["Keyboard", "Keycap", "Switch", "PCB", "Badge", "Other"],
    },
  ],
  images: [imageSchema],
  content: String,
  author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  date_posted: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
});

function validateReq(req) {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.base": "Title is required",
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
  });
  return schema.validate(req);
}

exports.Topic = mongoose.model("Topic", topicSchema);
exports.validate = validateReq;
