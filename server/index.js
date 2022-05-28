const appRoot = require("app-root-path");

// env
require("dotenv").config({ path: `${appRoot}.env` });

// express
const createServer = require("../server/util/createServer");

// db connection
const { dbConnection } = require("../server/db/connection");

dbConnection(process.env.DB_URI);

const app = createServer();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
