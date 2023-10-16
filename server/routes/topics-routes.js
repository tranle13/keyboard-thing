const express = require("express");
const router = express.Router();
const {
  getTopicById,
  getTopicsByUserId,
  createTopic,
  updateTopic,
  deleteTopic,
} = require("../controllers/topics-controllers");

router.get("/:pid", getTopicById);
router.get("/user/:uid", getTopicsByUserId);
router.post("/", createTopic);
router.patch("/:pid", updateTopic);
router.delete("/:pid", deleteTopic);

module.exports = router;
