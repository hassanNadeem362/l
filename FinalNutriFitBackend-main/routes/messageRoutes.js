const express = require("express");
const router = express.Router();
const {sendMessage , allMessages, fetchallMessages} = require("../controllers/messageController")

router.route("/").post( sendMessage);
router.route("/:chatId").get( allMessages);
router.route("/").get(fetchallMessages);


module.exports = router;