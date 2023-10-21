const mongoose = require("mongoose");
const Joi = require("joi");
const { categorySchema } = require("./category");

const imageSchema = new mongoose.Schema({
  url: String,
  caption: String,
});

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: [imageSchema],
  ic_link: String,
  date_posted: { type: Date, default: Date.now },
  categories: [categorySchema],
  content: String,
  status: String,
  views: { type: Number, default: 0 },
  author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

topicSchema.index({ views: 1 });

function validateTopic(topic) {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      "any.required": "Title is required",
    }),
    status: Joi.string().valid("IC", "GB", "Closed").messages({
      "any.only": "Not supported status, please contact us to add a new status",
    }),
  });
  return schema.validate(topic);
}

exports.Topic = mongoose.model("Topic", topicSchema);
exports.validate = validateTopic;
