import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import validateToken from "../middleware/validateToken";
import cors from "cors";

cors({ origin: "http://localhost:5000", credentials: true });

// routes
import user from "../routes/user";
import note from "../routes/note";
import speechRecognition from "../routes/speechRecognition";

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
      path: [
        { url: "/user", method: "POST" },
        "/user/authenticate",
        "/user/refresh-token",
      ],
    })
  );

  app.use(express.json());

  app.use(user);
  app.use(note);
  app.use(speechRecognition);

  return app;
}

export default createServer;
