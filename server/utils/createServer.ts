import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import validateToken from "../middleware/validateToken";
import cors from "cors";

// routes
import user from "../routes/user";
import note from "../routes/note";
import speechRecognition from "../routes/speechRecognition";

function createServer(): Application {
  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:5000", "http://192.168.0.103:5000"],
      credentials: true,
    })
  );
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

  app.use("/user", user);
  app.use("/note", note);
  app.use("/api", speechRecognition);

  return app;
}

export default createServer;
