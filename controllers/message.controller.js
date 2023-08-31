const messageService = require("../services/message.service");

const postMessage = async (req, res) => {
  const data = await messageService.postMessage(req.body.attachments, req.body.id);
  console.log(req.body.attachments);
  return res.status(data.statusCode).json(data.result);
};

const getMessageFromBotChat = async(req, res, next) => {
    console.log(req.body);

    await messageService.getMessage(req.body);
    return res.status(200).json(null);
}

module.exports = {
    postMessage,
    getMessageFromBotChat
};
