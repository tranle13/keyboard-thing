const express = require("express");
const router = express.Router();
const {
  getUserWithId,
  signup,
  login,
  users,
} = require("../controllers/users-controllers");
const { check } = require("express-validator");

router.get("/:uid", getUserWithId);
router.post(
  "/sign-up",
  [
    check("username").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);
router.post("/log-in", login);
router.get("/", users);

module.exports = router;
