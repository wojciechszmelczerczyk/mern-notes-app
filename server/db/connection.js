require("dotenv").config({ path: `${process.cwd()}/.env` });

const mongoose = require("mongoose");

const uri = process.env.DB_URI;

const dbConnection = () => {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
};

module.exports = dbConnection;
