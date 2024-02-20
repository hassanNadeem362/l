const express = require("express");
const router = express.Router();
const {
  fetchChats,
  createChat
} = require("../controllers/chatController");

router.post("/",  createChat);
router.route("/").get( fetchChats);

module.exports = router;
