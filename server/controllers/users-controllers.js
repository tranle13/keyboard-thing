const User = require("../models/user");

const users = async (req, res) => {
  try {
    const allUsers = await User.find({}, "-password");
    return res.status(201).json(allUsers);
  } catch (err) {
    return res.status(500).json({ error: "unexpected error" });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const user = await User.findOne({ email: email });
    console.log(user, email, password);

    if (user) {
      return res
        .status(422)
        .json({ error: "User already exists, please log in instead" });
    } else {
      const newUser = new User({ email, password });
      await newUser.save();
      res.status(201).send(newUser);
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Signing up failed, please try again later" });
  }
};

const login = async (req, res) => {};

module.exports = { signup, login, users };
