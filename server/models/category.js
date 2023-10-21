const mongoose = require("mongoose");
const Joi = require("joi");

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

const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string()
      .valid("Keyboard", "Keycap", "Switch", "PCB", "Badge")
      .messages({
        "any.only":
          "Not supported category, please contact us to add new category",
      }),
  });
  return schema.validate(category);
}

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validate = validateCategory;
