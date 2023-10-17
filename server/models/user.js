const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  image: { type: String, default: "" },
  topics: [{ type: mongoose.Types.ObjectId, required: true, ref: "Topic" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
