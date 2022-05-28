const mongoose = require("mongoose");

// display message depends on db connection status

mongoose.connection.on("connected", () =>
  console.log("Database connection on")
);

mongoose.connection.on("disconnected", () =>
  console.log("Database connection off")
);

const dbConnection = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    // if error occured kill process
    console.log(err.message);
    process.exit(1);
  }
};

// disconnect db
const dbDisconnect = async () => {
  await mongoose.disconnect();
};

module.exports = { dbConnection, dbDisconnect };
