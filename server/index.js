// express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const validateToken = require("./middleware/validateToken");
const cors = require("cors")({
  origin: "http://localhost:5000",
  credentials: true,
});

// db connection
require("../server/db/connection")();

app.use(cors);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
const user = require("./routes/user");
const note = require("./routes/note");
const speechRecognition = require("./routes/speechRecognition");

app.use(validateToken.unless({ path: ["/user", "/user/authenticate"] }));

app.use(user);
app.use(note);
app.use(speechRecognition);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
