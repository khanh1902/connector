const messageController = require("../controllers/message.controller")

const express = require("express");
const router = express.Router();

router.route("/api/webhook").post(messageController.postMessage);
router.route("/apis/v3/conversations/khanh/activities/khanh").post(messageController.getMessageFromBotChat);

module.exports = router