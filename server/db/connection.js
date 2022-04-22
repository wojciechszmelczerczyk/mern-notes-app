require("dotenv").config({ path: `${process.cwd()}/.env` });

const mongoose = require("mongoose");

const uri = process.env.DB_URI;

// display message depends on db connection status

mongoose.connection.on("connected", () =>
  console.log("Database connection on")
);

mongoose.connection.on("disconnected", () =>
  console.log("Database connection off")
);

const dbConnection = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    // if error occured kill process
    process.exit(1);
  }
};

const closeDbConnection = async () => await mongoose.disconnect();

module.exports = { dbConnection, closeDbConnection };
