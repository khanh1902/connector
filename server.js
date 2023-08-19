require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const messageRoute = require("./routes/message.route");
const facebookRoute = require("./routes/facebook.route");
const cors = require("cors");

const app = express();

// create data from json request
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(json({ verify: verifyRequestSignature }));
const corsOptions = {
  origin: "https://graph.facebook.com",
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// api
app.use("/", messageRoute);
app.use("/", facebookRoute);

// port
const { port } = process.env;
app.listen(port, () => {
  console.log(`Server started on PORT:${port}`);
});

const verifyRequestSignature = (req, res, buf) => {
  var signature = req.headers["x-hub-signature-256"];

  if (!signature) {
    console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
  } else {
    var elements = signature.split("=");
    var signatureHash = elements[1];
    var expectedHash = crypto
      .createHmac("sha256", config.appSecret)
      .update(buf)
      .digest("hex");
    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
};
