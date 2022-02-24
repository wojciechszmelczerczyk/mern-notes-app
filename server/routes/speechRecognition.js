require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const cors = require("cors");
const router = express.Router();

var whitelist = ["http://localhost:5000"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

router.use(bodyParser.urlencoded({ extended: false }));
router.use(pino);

router.get(
  "/api/get-speech-token",
  cors(corsOptions),
  async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    const speechKey = process.env.SPEECH_KEY;
    const speechRegion = process.env.SPEECH_REGION;
    if (
      speechKey === "paste-your-speech-key-here" ||
      speechRegion === "paste-your-speech-region-here"
    ) {
      res
        .status(400)
        .send("You forgot to add your speech key or region to the .env file.");
    } else {
      const headers = {
        headers: {
          "Ocp-Apim-Subscription-Key": speechKey,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      try {
        const tokenResponse = await axios.post(
          `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
          null,
          headers
        );
        res.send({ token: tokenResponse.data, region: speechRegion });
      } catch (err) {
        res.status(401).send("There was an error authorizing your speech key.");
      }
    }
  }
);

module.exports = router;
