const axios = require("axios");
const template = require("../utils/template")

const verifyWebhook = async (req) => {
  try {
    let verify_token = "VanKhanh123";
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode && token) {
      if (mode === "subscribe" && token === verify_token) {
        console.log("WEBHOOK_VERIFIED");
        return { statusCode: 200, challenge: challenge };
      } else {
        return { statusCode: 403, challenge: null };
      }
    }
  } catch (err) {
    return { statusCode: 403, challenge: null };
  }
};

const postMessage = async (entry) => {
  try {

    entry.forEach(async (entry) => {
      entry.messaging.forEach(async (message) => {
        const text = message.message.text;
        console.log(text);
        console.log(entry);
        await postMessageToBotChat(
          message.message.text,
          entry.id,
          message.sender,
          message.recipient,
          entry.time
        );
      });
    });
    console.log(`\u{1F7EA} Received webhook:`);
    return { statusCode: 200, result: "EVENT_RECEIVED" };
  } catch (err) {
    return { statusCode: 403, challenge: null };
  }
};

const getMessage = async (body) => {
  console.log(body)
  // body.forEach(async (body) => {
  // await replyMessage(body.recipient.id, body.text);
  // });
  await replyMessage(body.recipient.id, body.text, body.attachments);
  return { statusCode: 200, result: "EVENT_RESPONSE" }
};

module.exports = {
  verifyWebhook,
  postMessage,
  getMessage,
};

const postMessageToBotChat = async (message, id, sender, recipient, timestamp) => {
  await axios
    .post(
      "http://localhost:3978/api/messages",
      {
        type: "message",
        id: id,
        timestamp: timestamp,
        serviceUrl: "https://9088-14-161-46-255.ngrok-free.app/apis",
        channelId: "MSG",
        from: {
          id: sender.id,
          name: ""
        },
        conversation: {
          id: "MSG_" + id,
        },
        recipient: {
          id: recipient.id,
          name: "",
        },
        attributes: {
          age: ""
        },
        text: message,
      },
      {
        headers: {
          "Authorization-Token": `${process.env.AUTHORIZATION_TOKEN_FB}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error.response);
    });
};

const replyMessage = async (recipientId, message, attachments) => {
  let body;
  const attachment = attachments && template.customTemplate(attachments);
  if (attachments) {
    body = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: attachment,
      }
    }
  }
  // body = {
  //   recipient: {
  //     id: "7199182753441977"
  //   },
  //   message: {
  //     attachment: {
  //       type: "template",
  //       payload: {
  //         template_type: "button",
  //         text: "What do you want to do next?",
  //         buttons: [
  //           {
  //             type: "web_url",
  //             url: "https://www.messenger.com",
  //             title: "Visit Messenger"
  //           }
  //         ]
  //       }
  //     }
  //   }
  // }
else {
  body = {
    recipient: { id: recipientId },
    message: { text: message },
    messaging_type: "RESPONSE",
  }
}
// console.log()
await axios
  .post(
    "https://graph.facebook.com/v17.0/me/messages?access_token=" + `${process.env.AUTHORIZATION_TOKEN_FB}`,
    body
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error.response);
  });
};
