const axios = require("axios");

const postMessage = async (message, id) => {
  console.log(message, id);
  if (!message || !id) {
    return { statusCode: 400, result: "message or id does not exists!" };
  }
  await postMessageToBotChat(message, id);
  return { statusCode: 200, result: null };
};

const postMessageToBotChat = async (attachments, id) => {
  await axios
    .post(
      "http://localhost:3978/api/messages",
      {
            type: "message",
            id: id,
            timestamp: "2016-10-19T20:17:52.2891902Z",
            serviceUrl: "http://localhost:8080/apis",
            channelId: "postman",
            from: {
            id: id,
            name: "khanh",
            },
            conversation: {
            id: id,
            name: "conversation's name",
            },
            recipient: {
            id: "12345678",
            name: "bot",
            },
            text: "ddddd",
            attachments: attachments
      },
      {
        headers: {
          'Authorization-Token': `${process.env.AUTHORIZATION_TOKEN}`,

        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const getMessage = async (body) => {
  console.log(body);
};

module.exports = {
  postMessage,
  getMessage,
};
