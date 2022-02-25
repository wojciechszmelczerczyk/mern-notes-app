// express
const express = require("express");
const app = express();
const dbConnection = require("./db/connection");
const bodyParser = require("body-parser");

// connect to database
dbConnection();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

// routes
const user = require("./routes/user.js");
const note = require("./routes/note.js");
const speechRecognition = require("./routes/speechRecognition.js");

app.use(user);
app.use(note);
app.use(speechRecognition);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
