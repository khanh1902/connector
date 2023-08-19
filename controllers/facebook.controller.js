const facebookService = require("../services/facebook.service");

const postMessage = async (req, res) => {
//   console.log(req.body.entry.messaging.message.text);
  const data = await facebookService.postMessage(req.body.entry);
  return res.status(data.statusCode).json(data.result);
};

const getMessageFromBotChat = async (req, res) => {
  const data = await facebookService.getMessage(req.body);
  return res.status(data.statusCode).json(data.result);
};

const verifyFBWebhook = async (req, res) => {
  const data = await facebookService.verifyWebhook(req);
  res.status(data.statusCode).send(data.challenge);
};

module.exports = {
  postMessage,
  getMessageFromBotChat,
  verifyFBWebhook,
};
