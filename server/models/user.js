const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minLength: [3, "Username must have at least 3 characters"],
    maxLength: [30, "Username has a maximum of 30 characters"],
    validate: {
      function(u) {
        return /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,28}[a-zA-Z0-9]$/.test(
          u
        );
      },
      message: "Invalid username, please think of a different one",
    },
  },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must have at least 8 characters"],
  },
  image: { type: String, default: "" },
  topics: [{ type: mongoose.Types.ObjectId, required: true, ref: "Topic" }],
});

const User = mongoose.model("User", userSchema);

userSchema.plugin(uniqueValidator);

exports.User = User;
