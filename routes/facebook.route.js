const facebookController = require("../controllers/facebook.controller")

const express = require("express");
const router = express.Router();

router.route("/BotConnector/messenger/webhook").post(facebookController.postMessage);
router.route("/BotConnector/messenger/webhook").get(facebookController.verifyFBWebhook);
router.route("/apis/v3/conversations/MSG_:id/activities/:id").post(facebookController.getMessageFromBotChat);

module.exports = router