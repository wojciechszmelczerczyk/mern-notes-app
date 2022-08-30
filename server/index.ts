import { path } from "app-root-path";

// env
import { config } from "dotenv";
config({ path: `${path}/../.env` });

// express
import createServer from "../server/utils/createServer";

// db connection
import { dbConnection } from "../server/db/connection";

dbConnection(process.env.DB_URI as string);

const app = createServer();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
