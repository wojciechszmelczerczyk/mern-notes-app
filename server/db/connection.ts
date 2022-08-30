import mongoose, { ConnectOptions } from "mongoose";

// display message depends on db connection status

mongoose.connection.on("connected", () =>
  console.log("Database connection on")
);

mongoose.connection.on("disconnected", () =>
  console.log("Database connection off")
);

const dbConnection = async (uri: string) => {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  } catch (err) {
    // if error occured kill process
    process.exit(1);
  }
};

// disconnect db
const dbDisconnect = async () => {
  await mongoose.disconnect();
};

export { dbConnection, dbDisconnect };
