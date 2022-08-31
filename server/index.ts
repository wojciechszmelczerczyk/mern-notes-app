import { path } from "app-root-path";
import { Port } from "./types/Port";
import { Application } from "express";

// env
import { config } from "dotenv";
config({ path: `${path}/../.env` });

// express
import createServer from "../server/utils/createServer";
// db connection
import { dbConnection } from "../server/db/connection";

dbConnection(process.env.DB_URI as string);

const app: Application = createServer();

const port: Port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port: ${port}`));
