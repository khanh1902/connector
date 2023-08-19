const facebookController = require("../controllers/facebook.controller")

const express = require("express");
const router = express.Router();

router.route("/messaging-webhook").post(facebookController.postMessage);
router.route("/messaging-webhook").get(facebookController.verifyFBWebhook);
router.route("/apis/v3/conversations/MSG_:id/activities/:id").post(facebookController.getMessageFromBotChat);

module.exports = router