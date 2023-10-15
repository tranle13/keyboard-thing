const express = require("express");
const router = express.Router();
const { signup, login, users } = require("../controllers/users-controllers");

router.post("/sign-up", signup);
router.post("/log-in", login);
router.get("/", users);

module.exports = router;
