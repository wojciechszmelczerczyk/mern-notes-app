// express
const express = require("express");
const app = express();

// routes
const user = require("./routes/user.js");
const note = require("./routes/note.js");
const speechRecognition = require("./routes/speechRecognition.js");

app.use(user);
app.use(note);
app.use(speechRecognition);

// dotenv
require("dotenv").config();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
