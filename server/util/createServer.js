const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const validateToken = require("../middleware/validateToken");
const cors = require("cors")({
  origin: "http://localhost:5000",
  credentials: true,
});

// routes
const user = require("../routes/user");
const note = require("../routes/note");
const speechRecognition = require("../routes/speechRecognition");

function createServer() {
  const app = express();

  app.use(cors);
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(
    validateToken.unless({
      path: ["/user", "/user/authenticate", "/user/refresh-token"],
    })
  );

  app.use(express.json());

  app.use(user);
  app.use(note);
  app.use(speechRecognition);

  return app;
}

module.exports = createServer;
