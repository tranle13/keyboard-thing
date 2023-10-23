const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "" },
  topics: [{ type: mongoose.Types.ObjectId, required: true, ref: "Topic" }],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      image: this.image,
    },
    config.get("jwtPrivateKey"),
    { expiresIn: "24h" }
  );
  return token;
};

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,28}[a-zA-Z0-9]$/)
      .required()
      .messages({
        "string.base": "Invalid username",
        "string.empty": "Invalid username",
        "string.pattern.base":
          "Invalid username, please check the requirements again",
        "string.min": "Username must have 3 or more characters",
        "string.max": "Username must have less than 30 characters",
        "any.required": "Username is required",
      }),
    email: Joi.string().required().email().messages({
      "string.email": "Invalid email",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Password must have 8 or more characters",
      "any.required": "Password is required",
    }),
  });
  return schema.validate(user);
}

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validate = validateUser;
