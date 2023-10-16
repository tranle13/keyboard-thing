const express = require("express");
const router = express.Router();
const {
  getUserWithId,
  signup,
  login,
  users,
  imageUpload,
} = require("../controllers/users-controllers");
const { check } = require("express-validator");

router.get("/:uid", getUserWithId);
router.post(
  "/signup",
  [
    check("username").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);
router.post("/login", login);
router.get("/", users);
router.post("/upload", imageUpload);

module.exports = router;
